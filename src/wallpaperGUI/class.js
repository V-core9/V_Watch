const path = require('path');
const fs = require('fs');
const v_execute = require('v_execute');
// NPM: svg2png [many more options]
var svg2img = require('svg2img');

const cache = require('../cache');

const config = require('../config');


const svgTemplate = require('./template');
var mainSVG_Template = new svgTemplate({ useRandomColors: false });



function backgroundGUI(data = {}) {

  // Few variables setup.
  console.log(data);
  this.mFile = path.join(__dirname, './img/generated.jpg');
  this.templateHelper = "";
  this.autoInit = data.autoInit || false;
  this.scale = data.scale || 1;
  this.quality = data.quality || 75;
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
    var response = await v_execute(" powershell -c \" Add-Type -AssemblyName System.Windows.Forms ; [System.Windows.Forms.Screen]::AllScreens \" ", this.handleGettingResolution);
    console.time("- handleGettingResolution(response) ");
    var stdoutHelp = response.stdout.replace(/[&\/\\#+()$~%.'"*?<> ]/g, '');
    stdoutHelp = stdoutHelp.replace(/\r\n/g, ',');
    response.stdout = stdoutHelp;

    var displayWidthH = response.stdout.split("Bounds:{")[1].split(",Width=")[1].split(",Height=");
    this.screen.width = displayWidthH[0];
    this.screen.height = displayWidthH[1].split("},DeviceName")[0];

    this.screen.widthScaled = this.screen.width * this.scale;
    this.screen.heightScaled = this.screen.height * this.scale;
    console.log(`System Display Resolution\n[o> Height: ${this.screen.height}px\n[o> Width: ${this.screen.width}px`);
    console.timeEnd("- handleGettingResolution(response) ");
    return this.screen;
  };


  /*
  * Handles Saving the image to a file and executing powershell command to set the image as background;
  */
  this.saveAndSetBackground = async (error, buffer) => {
    try {
      fs.writeFileSync(this.mFile, buffer);
      await v_execute(" powershell -c \" powershell.exe -ExecutionPolicy Bypass  -NoProfile -WindowStyle Hidden -File " + path.join(__dirname, 'setBackground.ps1') + " \" ");
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
      imgLocation: this.mFile,
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
  this.start = () => {

    if (config.debug) console.log("BackgroundGUI: STARTING >>>");
    this.getScreenSize();

    this.loopObj = setInterval(async () => {
      this.render();
    }, this.interval);

  };


  /*
  * Stop the whole thing from running by clearing the Interval.
  */
  this.stop = () => {
    console.log("BackgroundGUI: STOPPING...🙋‍♂️");
    clearInterval(this.loopObj);
    this.loopObj = null;
    return this.loopObj;
  };


  this.getScreenSize();

  if (this.autoInit) this.start();

}

module.exports = backgroundGUI;
