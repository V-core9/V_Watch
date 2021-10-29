const vNodeOS = require('../v_node_os');
const generateIntervalMS = require('../interval_generator');

module.exports = {
  name: "get_constants",
  description: "Print constants to console...",
  interval: generateIntervalMS.second(30),
  lastCheck: 0,
  exec() {
    var response = vNodeOS.constants();
    console.log('🧾 Constants [ 30s interval ]: ' + JSON.stringify(response));
    return response;
  }
};
