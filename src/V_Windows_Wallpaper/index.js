const bashDo = require('v_cli_bash_do');
const mainSVG_Template = require('./_main_svg_template')
const path = require('path');
const fs = require('fs')

// NPM: svg2png [many more options]
var svg2img = require('svg2img');
var screenW = 0;
var screenH = 0;
var resScale = 0.5;
var screenWsc = screenW * resScale;
var screenHsc = screenH * resScale;
var totalUpdates = 0;
var lastExecTimeVal = 0;

const  vBackGUI = () => {
  console.time(":> INTO : vBackGUI");
  this.mFile = path.join(__dirname, './png/background_GUI_Template.jpg');
  this.templateHelper = "";
  this.screen = {};
  this.screen.width = 0;
  this.screen.height = 0;

  this.GetDisplayResolution = () => {
        var displayRes = bashDo(" powershell -c \" Add-Type -AssemblyName System.Windows.Forms ; [System.Windows.Forms.Screen]::AllScreens \" ", this.handleGettingResolution);
        return displayRes;
  };

  this.handleGettingResolution = (response) => {
    console.time("- handleGettingResolution(response) ");
    var stdoutHelp = response.stdout.replace(/[&\/\\#+()$~%.'"*?<> ]/g, '');
    stdoutHelp = stdoutHelp.replace(/\r\n/g, ',');
    response.stdout = stdoutHelp;
    var displayWidthH = response.stdout.split("Bounds:{")[1].split(",Width=")[1].split(",Height=");
    this.screen.width = displayWidthH[0] ;
    this.screen.height = displayWidthH[1].split("},DeviceName")[0] ;
    screenW = this.screen.width ;
    screenH = this.screen.height ;
    screenWsc = screenW * resScale;
    screenHsc = screenH * resScale;
    console.log(`System Display Resolution\n[o> Height: ${this.screen.height}px\n[o> Width: ${this.screen.width}px`);
    console.timeEnd("- handleGettingResolution(response) ");
    return { width: this.screen.width, height: this.screen.height };
  };


  this.saveFile = (error, buffer)=> {
    try {
      //console.time("-> File Save  ")
      fs.writeFileSync(this.mFile, buffer);
      //console.timeEnd("-> File Save  ")
      //console.time("[o> SetNewBackground  ")
      bashDo(" powershell -c \" powershell.exe -ExecutionPolicy Bypass  -NoProfile -WindowStyle Hidden -File " + path.join(__dirname,'setBackground.ps1') +" \" ");
      //console.timeEnd("[o> SetNewBackground  ")
      totalUpdates++;
      return true;
    } catch (err) {
      return err;
    }
  };

  console.time("> GetDisplayResolution() -> bash -> powershell");
  this.GetDisplayResolution();
  console.timeEnd("> GetDisplayResolution() -> bash -> powershell");

  setInterval(() => {
    var time_01 = Date.now();
    svg2img( mainSVG_Template( {title:"YEAAA SOME TITLE OPTINOS", totalUpdates: totalUpdates, lastExecTimeVal : lastExecTimeVal}), {'width': screenW, 'height': screenH, format:'jpg', 'quality': 60 }, this.saveFile);
    lastExecTimeVal = Date.now() - time_01;
  }, 10000);
};

console.time("vBackGUI() >>");
vBackGUI();
console.timeEnd("vBackGUI() >>");

module.exports = vBackGUI;
