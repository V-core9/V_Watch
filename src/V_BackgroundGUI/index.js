const v_execute = require('v_execute');
const mainSVG_Template = require('./_main_svg_template');
const path = require('path');
const fs = require('fs');

// NPM: svg2png [many more options]
var svg2img = require('svg2img');

function backgroundGUI(data = {}) {
  this.mFile = path.join(__dirname, './png/background_GUI_Template.jpg');
  this.templateHelper = "";

  this.screen = {
    width: 0,
    height: 0,
    widthScaled: 1,
    heightScaled: 1,
  };

  this.scale = data.scale || 0.5;

  this.totalUpdates = 0;
  this.lastExecTimeVal = 0;

  this.loopObj = null;
  this.interval = data.interval || 2500;


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


  this.saveFile = async (error, buffer) => {
    try {
      fs.writeFileSync(this.mFile, buffer);
      await v_execute(" powershell -c \" powershell.exe -ExecutionPolicy Bypass  -NoProfile -WindowStyle Hidden -File " + path.join(__dirname, 'setBackground.ps1') + " \" ");
      this.totalUpdates++;
      return this;
    } catch (err) {
      return err;
    }
  };


  this.start = () => {
    this.loopObj = setInterval(async () => {
      var time_01 = Date.now();
      svg2img(mainSVG_Template({ title: "YEAAA SOME TITLE OPTINOS", totalUpdates: this.totalUpdates, lastExecTimeVal: this.lastExecTimeVal }), { 'width': this.screen.widthScaled, 'height': this.screen.heightScaled, format: 'jpg', 'quality': 60 }, this.saveFile);
      this.lastExecTimeVal = Date.now() - time_01;
    }, this.interval);
  };


  this.stop = () => {
    console.log("Stopping BackgroundGUI...🙋‍♂️");
    clearInterval(this.loopObj);
    this.loopObj = null;
    return this.loopObj;
  };


  process.on('exit',() => {
    console.log("process.exit() method is fired");
    this.stop();
  });
  
  process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    process.exit();
  });

  this.getScreenSize();
  this.start();

}

module.exports = backgroundGUI;