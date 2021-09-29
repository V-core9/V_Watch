const path = require('path');
const mainSVG_Template = require('./main_svg_template');
let { writeFile }  = require( 'fs/promises');
let  Buffer  = require( 'buffer');

// DEMO FILE EXPORTING SVG TO PNG
var svg_to_png = require('svg-to-png');

const bGuiConfig = {
  mainTemplate: path.join(__dirname, './svg/_._.background_GUI_Template.svg'),
  output_folder: path.join(__dirname, "./png")
}
const mFile = bGuiConfig.mainTemplate;
const outF = bGuiConfig.output_folder;


const vBackGUI_Generator = () => {

  this.new = () => {
    svg_to_png.convert(mFile, outF);
  };
  
  this.generateSVG_FILE = async function () {
    console.log("generateSVG_FILE -> exec()")
    var templateHelper = mainSVG_Template.getTemplate();
    return await this.saveFile(svg_url, templateHelper)
  };

  this.saveFile = async function (data) {
    console.log("saveFile -> exec()")
    try {
      const controller = new AbortController();
      const { signal } = controller;
      const data = new Uint8Array(Buffer.from('Hello Node.js'));
      const promise = writeFile(mFile, data);

      // Abort the request before the promise settles.
      controller.abort();

      await promise;
    } catch (err) {
      // When a request is aborted - err is an AbortError
      console.error(err);
    }
  };


  
  this.generateSVG_FILE();
  this.new();
}

module.exports = vBackGUI_Generator;
