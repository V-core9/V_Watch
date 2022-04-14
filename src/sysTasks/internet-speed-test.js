const vCache = require('../vCache');
const speedTest = require('speedtest-net');

module.exports = async () => {
  const netStats = await speedTest({ acceptLicense: true });
  console.log(netStats);
  await vCache.set("netSpeed", netStats);
};
