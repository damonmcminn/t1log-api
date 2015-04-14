import bunyan from 'bunyan';
import CONFIG from '../config'

const Logger = bunyan.createLogger({name: CONFIG.name});
export default Logger;
