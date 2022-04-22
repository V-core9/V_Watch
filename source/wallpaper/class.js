const path = require('path');
const fs = require('fs');
const wallpaper = require('wallpaper');
var svg2img = require('svg2img');
const { listDisplays } = require('screenshot-desktop');

const { cache } = require('../core');
const config = require('../config');

const svgTemplate = require('./template');


function backgroundGUI(data = {}) {

  let mainSVG_Template = new svgTemplate({ useRandomColors: false });

  // Few variables setup.
  if (config.debug) console.log(data);

  this.file = path.join(__dirname, './img/generated.jpg');
  this.templateHelper = "";
  this.autoInit = data.autoInit || false;
  this.scale = data.scale || 1;
  this.quality = data.quality || 100;
  this.totalUpdates = 0;
  this.lastExecTimeVal = 0;
  this.loopObj = null;
  this.interval = data.interval || 20000;

  this.screen = {
    width: 0,
    height: 0,
    widthScaled: 1,
    heightScaled: 1,
  };


  /*
  * Gets the screen size using powershell command.
  */
  this.getScreenSize = async () => {
    var screenData = (await listDisplays())[0];
    this.screen.width = screenData.width;
    this.screen.height = screenData.height;
    this.scale = screenData.dpiScale;

    this.screen.widthScaled = this.screen.width * this.scale;
    this.screen.heightScaled = this.screen.height * this.scale;

    if (config.debug) console.log(this.screen);
    return this.screen;
  };


  /*
  * Handles Saving the image to a file and executing powershell command to set the image as background;
  */
  this.saveAndSetBackground = async (error, buffer) => {
    try {
      fs.writeFileSync(this.file, buffer);
      await wallpaper.set(this.file);
      this.totalUpdates++;
      return this;
    } catch (err) {
      return err;
    }
  };


  this.render = async () => {
    var time_01 = Date.now();
    if (config.debug) console.log("RENDERING-->>");

    const svgStats = {
      totalUpdates: this.totalUpdates,
      lastExecTimeVal: this.lastExecTimeVal,
      running: (this.loopObj != null) ? true : false,
      imgLocation: this.file,
      scale: this.scale,
      quality: this.quality,
    };

    await cache.set('svgStats', svgStats);

    svg2img(await mainSVG_Template.render(), { width: this.screen.widthScaled, height: this.screen.heightScaled, format: 'jpg', 'quality': this.quality }, this.saveAndSetBackground);
    this.lastExecTimeVal = Date.now() - time_01;
  };


  /*
  * Starts the looping process.
  */
  this.start = async () => {

    if (config.debug) console.log("BackgroundGUI: STARTING >>>");
    await this.getScreenSize();

    this.loopObj = setInterval(async () => {
      this.render();
    }, this.interval);

  };


  /*
  * Stop the whole thing from running by clearing the Interval.
  */
  this.stop = async () => {
    if (config.debug) console.log("BackgroundGUI: STOPPING...🙋‍♂️");
    await this.render();
    clearInterval(this.loopObj);
    this.loopObj = null;
    return this.loopObj;
  };


  this.getScreenSize();

  if (this.autoInit) this.start();


}


module.exports = backgroundGUI;
