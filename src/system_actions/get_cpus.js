const vNodeOS = require('../v_node_os');
const generateIntervalMS = require('../interval_generator');

module.exports = {
  name: "get_cpus",
  description: "Print Device Uptime...",
  interval: generateIntervalMS.hour(12),
  lastCheck: 0,
  exec ()  {
    var response = vNodeOS.cpus();
    console.log('💻 CPUs [ 12h ]: ' + JSON.stringify(response));
    return response;
  }
}
