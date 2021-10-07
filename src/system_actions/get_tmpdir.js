const vNodeOS = require('../v_node_os');
const generateIntervalMS = require('../interval_generator');

module.exports = {
  name: "getTmpdir",
  description: "Temporary dir location print",
  interval: generateIntervalMS.second(5),
  lastCheck: 0,
  exec ()  {
    console.log('🌋 Priority [ 5s ]: ' + JSON.stringify(vNodeOS.tmpdir()));
  }
}
