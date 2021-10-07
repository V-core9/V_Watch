const vNodeOS = require('../v_node_os');
const generateIntervalMS = require('../interval_generator');

module.exports = {
  name: "get_avg_load",
  description: "Average Load of System",
  interval: generateIntervalMS.second(10),
  lastCheck: 0,
  exec:()=>  {
    var response = vNodeOS.loadavg();
    console.log('🕜 Average Load [ 15s ]: ' + JSON.stringify(response));
    return response;
  }
}
