const Vos = require('../../helpers/v_os');
const generateIntervalMS = require('../../helpers/interval_generator');

module.exports = {
  name: "getTmpdir",
  description: "Temporary dir location print",
  interval: generateIntervalMS.second(15),
  lastCheck: 0,
  exec ()  {
    console.log('🌋 Priority [ 5s ]: ');
    console.log( Vos.getTmpdir());
  }
}
