const hmacsha1 = require('hmacsha1');
const queryString = require('query-string');
const parser = require('xml2json');
const axios = require('axios');
const btoa = require('btoa');

class OBA {
  constructor(options) {
    this.publicKey = options.public;
    this.secretKey = options.secret;
  }

  get(endpoint, params) {
    return new Promise((resolve, reject) => {
      const baseUrl = 'http://obaliquid.staging.aquabrowser.nl/api/v1/';

      const nl = '\n';

      const acceptHeader = 'application/xml';
      const date = new Date().toUTCString();
      const hostHeader = 'obaliquid.staging.aquabrowser.nl';
      const path = endpoint + '/';
      const sortedQuery = queryString.stringify(params);
      const id = acceptHeader + nl + date + nl + hostHeader + nl + path + nl + sortedQuery + nl;

      const hash = hmacsha1(this.secretKey, id);

      const result = btoa(hash);

      axios.get(baseUrl + path + '/?' + sortedQuery, {
        headers: {
          'X-AquaBrowser-Date': date,
          Authorization: `AquaBrowser: ${this.publicKey};${result}`,
          Host: 'obaliquid.staging.aquabrowser.nl'
        }
      })
        .then(res => res.data)
        .then(xml => parser.toJson(xml))
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
}

module.exports = OBA;

