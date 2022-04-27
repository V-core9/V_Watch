const config = require('../../config');
const { cache } = require('../../core');
const { baseTemplate } = require('../../templates');
const path = require('path');
const fs = require('fs');
const wallpaper = require('wallpaper');
var svg2img = require('svg2img');
const { listDisplays } = require('screenshot-desktop');


let fileLoc = path.join(__dirname, '../../data/img/generated.jpg');
let lastExecTimeVal = 0;
let totalUpdates = 0;
let quality = 50;


module.exports = {
  render: async () => {
    const rez = (await cache.has("ScreenResolutionInfo")) ? await cache.get("ScreenResolutionInfo") : (await listDisplays())[0];
    var time_01 = Date.now();
    if (config.debug) console.log("RENDERING-->>");
    svg2img(await baseTemplate.render(), { width: rez.width, height: rez.height, format: 'jpg', 'quality': quality }, async (error, buffer) => await cache.set('wallpaper_buffer_value', buffer));
    lastExecTimeVal = Date.now() - time_01;

    await cache.set('svgStats', { totalUpdates, lastExecTimeVal, width: rez.width, height: rez.height, quality, file: fileLoc });
  },
  set: async () => {
    try {
      fs.writeFileSync(fileLoc, await cache.get('wallpaper_buffer_value'));
      await wallpaper.set(fileLoc);
      totalUpdates++;
      return this;
    } catch (err) {
      return err;
    }
  },
};
