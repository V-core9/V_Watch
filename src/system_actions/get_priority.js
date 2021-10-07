const vNodeOS = require('../../helpers/v_os');
const generateIntervalMS = require('../../helpers/interval_generator');

module.exports = {
  name: "get_priority",
  description: "will print to console get_priority",
  interval: generateIntervalMS.minute(2),
  lastCheck: 0,
  exec ()  {
    var response = vNodeOS.getPriority();
    console.log('🌋 Priority [ 5s ]: ' + JSON.stringify(response));
    return response;
  }
}
