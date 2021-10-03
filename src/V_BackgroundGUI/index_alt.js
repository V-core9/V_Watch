const bashDo = require('v_cli_bash_do');
const mainSVG_Template = require('./_main_svg_template')
const path = require('path');
let { writeFileSync } = require('fs');

// DEMO FILE EXPORTING SVG TO PNG
var svg_to_png = require('svg-to-png');

const bGuiConfig = {
  mainTemplate: path.join(__dirname, './svg/background_GUI_Template.svg'),
  output_folder: path.join(__dirname, "./png")
}
const outF = bGuiConfig.output_folder;


const  vBackGUI = () => {
  console.time(":> INTO : vBackGUI");
  this.repNum = 0;
  this.mFile = bGuiConfig.mainTemplate;
  this.outF = bGuiConfig.output_folder;
  this.templateHelper = "";
  this.screen = {};
  this.screen.width = 0;
  this.screen.height = 0;

  this.GetDisplayResolution = () => {
        console.time("> GetDisplayResolution() -> bash -> powershell");
        var displayRes = bashDo(" powershell -c \" Add-Type -AssemblyName System.Windows.Forms ; [System.Windows.Forms.Screen]::AllScreens \" ", this.handleGettingResolution);
        console.timeEnd("> GetDisplayResolution() -> bash -> powershell");
        return displayRes;
  };

  this.handleGettingResolution = (response) => {
    console.time("- handleGettingResolution(response) ");
    //console.log(response);
    var stdoutHelp = response.stdout.replace(/[&\/\\#+()$~%.'"*?<> ]/g, '');
    stdoutHelp = stdoutHelp.replace(/\r\n/g, ',');
    response.stdout = stdoutHelp;

    var displayWidthH = response.stdout.split("Bounds:{")[1].split(",Width=")[1].split(",Height=");
    this.screen.width = displayWidthH[0];
    this.screen.height = displayWidthH[1].split("},DeviceName")[0];

    console.log(`System Display Resolution\n[o> Height: ${this.screen.height}px\n[o> Width: ${this.screen.width}px`);
    console.timeEnd("- handleGettingResolution(response) ");
    return { width: this.screen.width, height: this.screen.height };
  };

  this.saveFile = ()=> {
    try {      
      console.time("- saveFile() ");
      writeFileSync(this.mFile, this.templateHelper);
      console.timeEnd("- saveFile() ");
      return  true;
    } catch (err) {
      return  err;
    }
  };

  this.generateSVG_FILE =()=>  {
    this.templateHelper = mainSVG_Template();    
    //console.log(helper)    
    return this.templateHelper;
  };

  this.SetNewBackground = () => {
    return bashDo(" powershell -c \" powershell.exe -ExecutionPolicy Bypass  -NoProfile -WindowStyle Hidden -File " + path.join(__dirname,'setBackground.ps1') +" \" ");
  };

  this.convert_and_apply =()=> {

    svg_to_png.convert(this.mFile, this.outF).then(data => {
      var helpering = this.SetNewBackground();
    });    
    this.repNum++;
  };

  this.process_background = () => {
    try {
        console.time("- process_background() ");
        
        var resDone = this.GetDisplayResolution();
        
        var svgDone = this.generateSVG_FILE();
        
        var saveDone = this.saveFile();
        
        var conAppDone = this.convert_and_apply();

        console.timeEnd("- process_background() ");
        return ({resDone,svgDone,saveDone,conAppDone});
    } catch (err) {
        return err;
    }
  }
  
  var doneProcessing = this.process_background();
  console.timeEnd(":> INTO : vBackGUI");
  return doneProcessing;
};

vBackGUI();

module.exports = vBackGUI;
