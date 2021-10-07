const vNodeOS = require('../v_node_os');
const generateIntervalMS = require('../interval_generator');


module.exports = {
  name: "get_totalmem",
  description: "Get System Total Memory",
  interval: generateIntervalMS.day(2),
  lastCheck: 0,
  exec ()  {
    console.log('🕜 Average Load [ 15s ]: ' + JSON.stringify(vNodeOS.totalmem()));
  }
}
