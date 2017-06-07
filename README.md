# node-oba-api
Package to be able to interface with OBA's API a little more easier in Node.js

This package is just a wrapper for the OBA API. Checkout [the API documentation](http://obaliquid.staging.aquabrowser.nl/api/v1/) for a full overview of all available data and options.

## Installation
This module is not (yet) hosted on NPM. To install it through GitHub run:
```bash
$ npm install rijkvanzanten/node-oba-api
```

## Usage
```js
const OBA = require('oba-api');

// Setup authentication to api server
const client = new OBA({
  // ProQuest API Keys
  public: '1234567890',
  secret: '1234567890'
});

// General usage:
// client.get({ENDPOINT}, {PARAMS});
// ENDPOINT = search | details | refine | schema | availability | holdings
// PARAMS = API url parameter options (see api docs for more info)

// Client returns a promise which resolves the APIs output in JSON

// Example search to the word 'rijk' sorted by title:
client.get('search', {
  q: 'rijk',
  sort: 'title'
})
  .then(res => console.log(res)) // JSON results
  .catch(err => console.log(err)) // Something went wrong in the request to the API
```

## License
MIT License

Copyright © 2017 [Rijk van Zanten](https://github.com/rijkvanzanten)
