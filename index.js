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

    /*
     * Superhack du jour:
     * The OBA changed the API output ever so slightly for requests
     *   made with the "regular" auth flow (like below)
     *
     * To be able to still get the full output we need (including
     *   covers) we need to do requests without the auth flow
     *   (with the authorization) param
     */

    const baseUrl = 'http://obaliquid.staging.aquabrowser.nl/api/v1/';
    const path = endpoint + '/';

    return new Promise((resolve, reject) => {
      const sortedQuery = queryString.stringify(params);
      axios.get(baseUrl + path + '/?authorization=' + this.publicKey + '&' + sortedQuery)
        .then(res => res.data)
        .then(xml => parser.toJson(xml))
        .then(res => resolve(res))
        .catch(err => reject(err));


      //const nl = '\n';

      //const acceptHeader = 'application/xml';
      //const date = new Date().toUTCString();
      //const hostHeader = 'obaliquid.staging.aquabrowser.nl';
      //const sortedQuery = queryString.stringify(params);
      //const id = acceptHeader + nl + date + nl + hostHeader + nl + path + nl + sortedQuery + nl;

      //const hash = hmacsha1(this.secretKey, id);

      //const result = btoa(hash);

      //axios.get(baseUrl + path + '/?' + sortedQuery, {
        //headers: {
          //'X-AquaBrowser-Date': date,
          //Authorization: `AquaBrowser: ${this.publicKey};${result}`,
          //Host: 'obaliquid.staging.aquabrowser.nl'
        //}
      //})
        //.then(res => res.data)
        //.then(xml => parser.toJson(xml))
        //.then(res => resolve(res))
        //.catch(err => reject(err));
    });
  }
}

module.exports = OBA;

