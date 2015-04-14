import ErrorFactory from 'simple-error-factory';
const ConfigError = ErrorFactory('config');

let CONFIG;

try {
  // export can't be used in a block
  module.exports = CONFIG = JSON.parse(process.env.T1LOG);
} catch (e) {
  let msg = `Environment variable T1LOG\n could not be parsed: ${process.env.T1LOG}`;
  throw ConfigError(msg);
}
