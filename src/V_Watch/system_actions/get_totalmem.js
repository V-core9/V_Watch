const Vos = require('../../helpers/v_os');
const generateIntervalMS = require('../../helpers/interval_generator');


module.exports = {
  name: "get_totalmem",
  description: "Get System Total Memory",
  interval: generateIntervalMS.day(2),
  lastCheck: 0,
  exec ()  {
    console.log('🕜 Average Load [ 15s ]: ' + JSON.stringify(Vos.totalmem()));
  }
}
