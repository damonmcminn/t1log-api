/**
 * If you have cloned this repo, you will need to compile lib:
 * npm run compile
 */

'use strict';

const config = require('./lib/config');
const api = require('./lib/api');

api.listen(config.port, function(x) {
  console.log(x);
  console.log(`Listening on ${config.port}`);
});
