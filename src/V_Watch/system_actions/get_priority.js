const Vos = require('../../helpers/v_os');
const generateIntervalMS = require('../../helpers/interval_generator');

module.exports = {
  name: "get_priority",
  description: "will print to console get_priority",
  interval: generateIntervalMS.minute(2),
  lastCheck: 0,
  exec ()  {
    console.log('🌋 Priority [ 5s ]: ');
    console.log( Vos.getPriority());
  }
}
