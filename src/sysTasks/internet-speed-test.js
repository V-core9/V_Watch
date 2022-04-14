const speedTest = require('speedtest-net');

const vCache = require('../vCache');
const { byteSizer } = require('v_file_system');
const { roundNumber } = require('../helpers');


module.exports = async () => {
  const netStats = await speedTest({ acceptLicense: true });

  await vCache.set("netSpeedDBG", netStats);

  const data = {
    download: roundNumber(byteSizer.byteToMega(netStats.download.bandwidth), 2),
    upload: roundNumber(byteSizer.byteToMega(netStats.upload.bandwidth), 2)
  };

  await vCache.set("netSpeed", data);
};
