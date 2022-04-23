const screenshot = require('screenshot-desktop');
const path = require('path');
const { cache } = require('../../core');

module.exports = screenshotDesktop = async () => {
  try {
    await screenshot({ format: 'png', filename: path.join(__dirname,'../../data/screenshots/desktop_' + Date.now() + '.png') });

    let listDisplays = await screenshot.listDisplays();
    console.log(listDisplays);

    await cache.set("ScreenResolutionInfo", listDisplays[0]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
