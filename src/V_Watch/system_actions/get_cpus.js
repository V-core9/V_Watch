const Vos = require('../../helpers/v_os');
const generateIntervalMS = require('../../helpers/interval_generator');

module.exports = {
  name: "get_cpus",
  description: "Print Device Uptime...",
  interval: generateIntervalMS.hour(12),
  lastCheck: 0,
  exec ()  {
    var response = Vos.cpus();
    console.log('💻 CPUs [ 12h ]: ' + JSON.stringify(response));
    return response;
  }
}
