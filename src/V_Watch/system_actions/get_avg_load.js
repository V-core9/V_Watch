const Vos = require('../../helpers/v_os');
const generateIntervalMS = require('../../helpers/interval_generator');

module.exports = {
  name: "get_avg_load",
  description: "Average Load of System",
  interval: generateIntervalMS.second(10),
  lastCheck: 0,
  exec ()  {
    var response = Vos.loadavg();
    console.log('🕜 Average Load [ 15s ]: ' + JSON.stringify(response));
    return response;
  }
}
