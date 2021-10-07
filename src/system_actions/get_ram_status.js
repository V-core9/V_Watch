const vNodeOS = require('../v_node_os');
const generateIntervalMS = require('../interval_generator');

module.exports = {
  name: "get_ram_status",
  description: "Repeated RAM status reading...",
  interval: generateIntervalMS.second(),
  lastCheck: 0,
  exec ()  {
    var response = vNodeOS.freememproc();
    console.log('🔥 Free RAM [ 1s ]: '+ response +'% ');
    return response;
  }
}
