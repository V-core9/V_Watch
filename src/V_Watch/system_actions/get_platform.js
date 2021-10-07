const Vos = require('../../helpers/v_os');
const generateIntervalMS = require('../../helpers/interval_generator');

module.exports = {
  name: "get_platform",
  description: "getPlatform function print",
  interval: generateIntervalMS.month(2),
  lastCheck: 0,
  exec ()  {
    console.log('📌 getPlatform [ 5s ]: ');
    console.log( Vos.getPlatform());
  }
}
