const vNodeOS = require('../v_node_os');
const generateIntervalMS = require('../interval_generator');

module.exports = {
  name: "get_uptime",
  description: "Print Device Uptime...",
  interval: generateIntervalMS.hour(),
  lastCheck: 0,
  exec ()  {
    var response = vNodeOS.uptime();
    console.log('🕜 Get Uptime [ 60s ]: ' + JSON.stringify(response));
    return response;
  }
}
