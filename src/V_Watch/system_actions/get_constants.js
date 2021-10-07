const Vos = require('../../helpers/v_os');
const generateIntervalMS = require('../../helpers/interval_generator');

module.exports = {
  name: "get_constants",
  description: "Print constants to console...",
  interval: generateIntervalMS.second(30),
  lastCheck: 0,
  exec ()  {
    console.log('🧾 Constants [ 30s interval ]: ');
    console.log(Vos.constants());
  }
}
