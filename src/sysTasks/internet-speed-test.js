const speedTest = require('speedtest-net');

const cache = require('../cache');
const { byteSizer } = require('v_file_system');
const { roundNumber } = require('../helpers');


module.exports = async () => {
  const netStats = await speedTest({ acceptLicense: true });

  await cache.set("netSpeedDBG", netStats);

  const data = {
    download: roundNumber(byteSizer.byteToMega(netStats.download.bandwidth), 2),
    upload: roundNumber(byteSizer.byteToMega(netStats.upload.bandwidth), 2)
  };

  await cache.set("netSpeed", data);
};
