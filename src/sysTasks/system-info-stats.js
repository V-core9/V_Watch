const vCache = require('../vCache');
const v_os = require('../helpers/v_os');
const { byteSizer } = require('v_file_system');
const { roundNumber, vTime } = require('../helpers');


module.exports = async () => {

  const result = {

    ram: {
      freememproc: v_os.freememproc(),

      freemem: roundNumber(byteSizer.byteToGiga(v_os.freemem()), 5),

      totalmem: roundNumber(byteSizer.byteToGiga(v_os.totalmem())),
    },

    deviceUserInfo: process.env.USERNAME + " [ " + v_os.version() + " | " + v_os.platform() + process.arch + " ]",

    cpu: {
      count: v_os.cpu.count(),
      usage: await v_os.cpu.usage(vTime.seconds(5)),
    },

  };

  await vCache.set("systemInfoStats", result);

};
