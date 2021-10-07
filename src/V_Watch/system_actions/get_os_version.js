const Vos = require('../../helpers/v_os');
const generateIntervalMS = require('../../helpers/interval_generator');

module.exports = {
  name: "get_os_version",
  description: "print value of get_os_version.js ...",
  interval: generateIntervalMS.second(10),
  lastCheck: 0,
  exec ()  {
    console.log('🙋‍♂️ User Info [ 10s ]: ');
    console.log(Vos.version());
  }
}
