const Vos = require('../../helpers/v_os');
const generateIntervalMS = require('../../helpers/interval_generator');

module.exports = {
  name: "get_ram_status",
  description: "Repeated RAM status reading...",
  interval: generateIntervalMS.second(),
  lastCheck: 0,
  exec ()  {
    var response = Vos.freememproc();
    console.log('🔥 Free RAM [ 1s ]: '+ response +'% ');
    return response;
  }
}
