const vReq = require('v_req');
const generateIntervalMS = require('../../helpers/interval_generator');

const qmcRoot = {
  options: {
    hostname: 'quickmedcards.com',
    port: 443,
    path: '/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

module.exports = {
  name: "get_cpus",
  description: "Print Device Uptime...",
  interval: generateIntervalMS.minute(1),
  lastCheck: 0,
  exec() {
    var response = vReq(qmcRoot);
    console.log('💻 QMC_Status [ 1m ]: ' + JSON.stringify(response));
    return response;
  }
}
