const Vos = require('../../helpers/v_os');
const generateIntervalMS = require('../../helpers/interval_generator');

module.exports = {
  name: "get_cpus",
  description: "Print Device Uptime...",
  interval: generateIntervalMS.hour(12),
  lastCheck: 0,
  exec ()  {
    console.log('💻 CPUs [ 12h ]: ');
    console.log(Vos.cpus());
  }
}
