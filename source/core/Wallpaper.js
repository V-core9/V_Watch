const path = require('path');
const fs = require('fs');
const wallpaper = require('wallpaper');
var svg2img = require('svg2img');
const { listDisplays } = require('screenshot-desktop');
const config = require('../config');
const cache = require('./cache');




module.exports = function Wallpaper(data = {}) {

  this.file = path.join(__dirname, '../data/img/generated.jpg');
  this.quality = data.quality || 100;
  this.totalUpdates = 0;
  this.lastExecTimeVal = 0;
  this.width = 0;
  this.height = 0;


  this.saveAndSet = async () => {
    try {
      fs.writeFileSync(this.file, await cache.get('wallpaper_buffer_value'));
      await wallpaper.set(this.file);
      this.totalUpdates++;
      return this;
    } catch (err) {
      return err;
    }
  };


  this.render = async (svgData = "") => {
    var time_01 = Date.now();
    if (config.debug) console.log("RENDERING-->>");
    svg2img(svgData, { width: this.width, height: this.height, format: 'jpg', 'quality': this.quality }, async (error, buffer) => await cache.set('wallpaper_buffer_value', buffer));
    this.lastExecTimeVal = Date.now() - time_01;
  };


  this.init = async () => {
    var screenData = (await listDisplays())[0];
    this.width = screenData.width;
    this.height = screenData.height;

    if (config.debug) console.log(this.screen);
    return this.screen;
  };

  this.stats = async () => {
    return {
      totalUpdates: this.totalUpdates,
      lastExecTimeVal: this.lastExecTimeVal,
      width: this.width,
      height: this.height,
      quality: this.quality,
      file: this.file
    };
  };

  this.init();

}
