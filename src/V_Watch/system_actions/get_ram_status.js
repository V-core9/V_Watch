const Vos = require('../../helpers/v_os');
const generateIntervalMS = require('../../helpers/interval_generator');

module.exports = {
  name: "get_ram_status",
  description: "Repeated RAM status reading...",
  interval: generateIntervalMS.second(),
  lastCheck: 0,
  exec ()  {
    console.log('Free RAM [ 1s ]: '+ Vos.freememproc() +'% ');
    if (Vos.freememproc() < 10 ) {
      console.log("🔥 WARNING : LOW RAM  - Free RAM under 10%");
    }
  }
}
