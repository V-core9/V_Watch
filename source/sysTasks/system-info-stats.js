const cache = require('../cache');
const v_os = require('../helpers/v_os');
const { byteSizer } = require('v_file_system');
const { roundNumber } = require('../helpers');


module.exports = async (timeLen = 1000) => {

  const result = {

    ram: {
      freememproc: v_os.freememproc(),

      freemem: roundNumber(byteSizer.byteToGiga(v_os.freemem()), 2),

      totalmem: roundNumber(byteSizer.byteToGiga(v_os.totalmem())),
    },

    deviceUserInfo: process.env.USERNAME + " [ " + v_os.version() + " | " + v_os.platform() + process.arch + " ]",

    cpu: {
      count: v_os.cpu.count(),
      usage: await v_os.cpu.usage(timeLen),
    },

  };

  await cache.set("system", result);

};
