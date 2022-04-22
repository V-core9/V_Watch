const speedTest = require('speedtest-net');

const config = require('../config');
const { cache } = require('../core');
const { byteSizer } = require('v_file_system');
const { roundNumber } = require('../helpers');


module.exports = async () => {
  try {
    const netStats = await speedTest({ acceptLicense: true });

    const data = {
      latency: netStats.ping.latency,
      internal_ip: netStats.interface.internalIp,
      external_ip: netStats.interface.externalIp,
      download: roundNumber(byteSizer.byteToMega(netStats.download.bandwidth), 2),
      upload: roundNumber(byteSizer.byteToMega(netStats.upload.bandwidth), 2)
    };

    await cache.set("netSpeed", data);

    if (config.debug) {
      console.log(netStats);
      await cache.set("netSpeedDBG", netStats);
      console.log(data);
    }

  } catch (err) {
    console.error(err);
    return false;
  }
};
