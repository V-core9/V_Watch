const vNodeOS = require('../../helpers/v_os');
const generateIntervalMS = require('../../helpers/interval_generator');

module.exports = {
  name: "get_user_info",
  description: "will print to console just to get hearth bumping...",
  interval: generateIntervalMS.second(10),
  lastCheck: 0,
  exec ()  {
    var response = vNodeOS.userInfo();
    console.log('🙋‍♂️ User Info [ 10s ]: ' + JSON.stringify(response));
    return response;
  }
}
