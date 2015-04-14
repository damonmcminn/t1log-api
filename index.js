'use strict';

const config = require('./src/config');
const api = require('./src/api');

api.listen(config.port, function(x) {
  console.log(x);
  console.log(`Listening on ${config.port}`);
});
