const Vos = require('../../helpers/v_os');
const generateIntervalMS = require('../../helpers/interval_generator');

module.exports = {
  name: "get_avg_load",
  description: "Average Load of System",
  interval: generateIntervalMS.second(10),
  lastCheck: 0,
  exec ()  {
    console.log('🕜 Average Load [ 15s ]: ');
    console.log(Vos.loadavg());
  }
}
