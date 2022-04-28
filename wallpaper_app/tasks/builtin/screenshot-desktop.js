const screenshot = require('screenshot-desktop');
const path = require('path');
const { cache } = require('../../core');
const config = require('../../config');

module.exports = screenshotDesktop = async () => {
  try {
    await screenshot({ format: 'png', filename: path.join(__dirname, '../../data/screenshots/desktop_' + Date.now() + '.png') });

    let listDisplays = await screenshot.listDisplays();
    if (config.debug) console.log(listDisplays);

    await cache.set("ScreenResolutionInfo", listDisplays[0]);
    return true;
  } catch (error) {
    if (config.debug) console.log(error);
    return false;
  }
};
