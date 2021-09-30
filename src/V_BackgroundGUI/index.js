const bashDo = require('v_cli_bash_do');
const mainSVG_Template = require('./_main_svg_template')
const path = require('path');
let { writeFile } = require('fs/promises');
let {Buffer} = require('buffer');

// DEMO FILE EXPORTING SVG TO PNG
var svg_to_png = require('svg-to-png');

const bGuiConfig = {
  mainTemplate: path.join(__dirname, './svg/background_GUI_Template.svg'),
  output_folder: path.join(__dirname, "./png")
}
const mFile = bGuiConfig.mainTemplate;
const outF = bGuiConfig.output_folder;


const  vBackGUI = () => {
  this.repNum = 0;
  this.mFile = bGuiConfig.mainTemplate;
  this.outF = bGuiConfig.output_folder;
  this.templateHelper = "";
  this.screen = {};
  this.screen.width = 0;
  this.screen.height = 0;

  this.GetDisplayResolution = () => {
    return bashDo(" powershell -c \" Add-Type -AssemblyName System.Windows.Forms ; [System.Windows.Forms.Screen]::AllScreens \" ", this.handleGettingResolution);
  };

  this.SetNewBackground = () => {
    return bashDo(" powershell -c \" powershell.exe -ExecutionPolicy Bypass  -NoProfile -WindowStyle Hidden -File " + path.join(__dirname,'setBackground.ps1') +" \" ");
  };

  this.handleGettingResolution = (response) => {
    //console.log(response);
    var stdoutHelp = response.stdout.replace(/[&\/\\#+()$~%.'"*?<> ]/g, '');
    stdoutHelp = stdoutHelp.replace(/\r\n/g, ',');
    response.stdout = stdoutHelp;

    var displayWidthH = response.stdout.split("Bounds:{")[1].split(",Width=")[1].split(",Height=");
    this.screen.width = displayWidthH[0];
    this.screen.height = displayWidthH[1].split("},DeviceName")[0];

    console.log(`System Display Resolution\n[o> Height: ${this.screen.height}px\n[o> Width: ${this.screen.width}px`);
      
    this.generateSVG_FILE();
    return { width: this.screen.width, height: this.screen.height };
  };

  this.convert =()=> {
    svg_to_png.convert(mFile, outF).then(data => {
      var helpering = this.SetNewBackground();
      if (this.repNum < 2000) {
        setTimeout(() => {
          this.generateSVG_FILE();
        }, 0);

        setTimeout(() => {
          this.convert();
        }, 0);
        
        
        setTimeout(() => {
          this.saveFile();
        }, 0);
        
        setTimeout(() => {
          this.saveFile();
        }, 0);
      };
    });
    
    this.repNum++;
  };

  this.generateSVG_FILE =()=>  {
    //console.log("generateSVG_FILE -> exec()")
    this.templateHelper = mainSVG_Template();
    var helper =  this.saveFile();
    
    this.convert();

    //console.log(helper)    
    return helper;
  };

  this.saveFile = ()=> {
    //console.log("saveFile -> exec()")
    try {
      
      const promise = writeFile(mFile, this.templateHelper);

      return  promise;
    } catch (err) {
      // When a request is aborted - err is an AbortError
      console.error(err);
    }
  };
  
  this.GetDisplayResolution();
};

vBackGUI();

module.exports = vBackGUI;
