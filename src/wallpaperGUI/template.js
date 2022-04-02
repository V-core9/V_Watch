const config = require('../config');
const vCache = require('../vCache');

const { byteSizer } = require('v_file_system');
const { roundNumber, getRandomColor } = require('../helpers');

function svgTemplate(data = {}) {

  const draw = {
    rect: async (x, y, width, height, color) => {
      return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${color}" />`;
    },
    circle: async (x, y, radius, color) => {
      return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" />`;
    },
    text: async (x, y, text, color, size) => {
      return `<text x="${x}" y="${y}" fill="${color || this.main}"  text-rendering="geometricPrecision" font-size="${size || this.normalFontSize}">${text}</text>`;
    },
    line: async (x1, y1, x2, y2, color) => {
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" />`;
    },
    polygon: async (points, color) => {
      return `<polygon points="${points}" fill="${color}" />`;
    },
    path: async (d, color) => {
      return `<path d="${d}" fill="${color}" />`;
    },
    image: async (x, y, width, height, url) => {
      return `<image x="${x}" y="${y}" width="${width}" height="${height}" xlink:href="${url}" />`;
    }
  };


  this.name = data.name || "customSVGdemoName";
  this.white = data.white || "#ffffff";
  this.main = data.main || "#a0c0ff";
  this.mainAlt = data.mainAlt || "#ffa0c0";
  this.background = data.background || "#40404050";
  this.backgroundAlt = data.backgroundAlt || "#404040";
  this.containerBackground = data.containerBackground || "#555555";
  this.mainSuccess = data.mainSuccess || "#40ff40";
  this.mainWarn = data.mainWarn || "#FFA500";
  this.useRandomColors = data.useRandomColors || false;

  this.helperWidth = 1280;
  this.helperHeight = 720;

  this.superFontSize = 45;
  this.mainFontSize = 30;
  this.subFontSize = 20;
  this.normalFontSize = 11;
  this.strokeWidth = 3;

  this.debugX = data.debugX || 140;
  this.debugY = data.debugY || 45;



  this.render = async (val = {}) => {
    if (this.useRandomColors) this.randomColors();


    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.helperWidth} ${this.helperHeight}"  height="${this.helperHeight}" width="${this.helperWidth}" class="${this.name}"  shape-rendering="geometricPrecision" >
              ${await this.bckLayerNew()}
              ${await this.printOsInfo()}
              ${await this.printBotStats()}
              ${await this.printClock()}
              ${await this.debug(val)}
            </svg>`;

  };


  this.printOsInfo = async () => {
    const cpuInfo = await vCache.get('cpuInfoStats');
    return `<g font-size="${this.mainFontSize}"  font-family="monospace" fill="${this.background}" stroke="none"  >
              <path d="M 170 2.5 l ${(this.helperWidth - 340)}  0 5 5 0 10 -5 5 ${-(this.helperWidth - 340)}  0 -5 -5 0 -10 5 -5" stroke="${this.main}80" stroke-width="1" fill="${this.main}50" ></path>
              ${await draw.text(180, 15, `CPU: ${cpuInfo.cpuUsage}% [Count: ${cpuInfo.count}]`, this.main, this.normalFontSize)}
              ${await draw.text(640, 15, `RAM: ${await vCache.get('freemem')}GB (${await vCache.get('freememproc')}%) [Total: ${await vCache.get('totalmem')}GB]`, this.main, this.normalFontSize)}
            </g>`;
  };


  this.printBotStats = async () => {
    const netSpeedTest = await vCache.get('netSpeedTest') || { download: {}, upload: {} };
    return `<g font-size="${this.mainFontSize}"  font-family="monospace" fill="${this.background}" stroke="none"  >
              <path d="M 170 697.5 l ${(this.helperWidth - 340)}  0 5 5 0 10 -5 5 ${-(this.helperWidth - 340)}  0 -5 -5 0 -10 5 -5" stroke="${this.main}80" stroke-width="1" fill="${this.main}50" ></path>
              ${await draw.text(180, 710, `👤 ${await vCache.get('currentDeviceUserInfo')}`, this.main, this.normalFontSize)}
              ${await draw.text(640, 710, `📦 Net Speed [ D: ${roundNumber(byteSizer.byteToMega(netSpeedTest.download.bandwidth), 2)} Mbs || U:${roundNumber(byteSizer.byteToMega(netSpeedTest.upload.bandwidth), 2)} Mbs ]`, this.main, this.normalFontSize)}
            </g>`;
  };


  this.printClock = async () => {

    const posX = 1115;
    const posY = 680;

    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var datePrint = String(date).split(' ');

    datePrint = datePrint[0] + ' ' + datePrint[1] + ' ' + datePrint[2] + ' ' + datePrint[3];

    hours = hours < 10 ? ' ' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    var strTime = hours + ':' + minutes + ':' + seconds;

    return `
            <path d="M ${(posX)}  ${(posY)}  l  20 -20 110 0 20 20 -10 0 -15 -15 -100 0 -15 15 -10 0" stroke="#444" stroke-width="2" fill="${this.background}" ></path>
            <g font-family="monospace" font-weight="bold"  >
              ${await draw.text(posX + 25, posY + 2.5, strTime, this.main, this.subFontSize)}
              ${await draw.text(posX + 22.5, posY + 15, datePrint, this.backgroundAlt, this.normalFontSize)}
            </g>
            <path d="M ${(posX)}  ${(posY + 5)}  l  20 20 110 0 20 -20 -10 0 -15 15 -100 0 -15 -15 -10 0" stroke="#444" stroke-width="2"  fill="${this.background}" ></path>`;
  };


  this.bckLayer = async () => {
    return `<path d="M 0 0 l ${this.helperWidth}  0 0 ${this.helperHeight} -${this.helperWidth} 0 -${this.helperWidth} -${this.helperHeight} " stroke="none" stroke-width="${this.strokeWidth}" fill="#000" ></path>
            <path d="M 0 0 l ${this.helperWidth} 0 0 60 -20 20 0 ${(this.helperHeight - 180)}  20 20 0 60 -20 20 -160 0 -20 -20${-(this.helperWidth - 400)}  0 -20 20 -160 0 -20 -20 0 -60 20 -20 0 ${-(this.helperHeight - 280)}  -20 -20" stroke="none" stroke-width="${this.strokeWidth}" fill="${this.containerBackground}" ></path>
            <path d="M 10 ${(this.helperHeight - 30)}  l  20 20 140 0 20 -20 -10 0 -15 15 -130 0 -15 -15" stroke="none" stroke-width="${this.strokeWidth}" fill="${this.background}" ></path>
            <path d="M ${(this.helperWidth - 190)}  ${(this.helperHeight - 30)}  l  20 20 140 0 20 -20 -10 0 -15 15 -130 0 -15 -15" stroke="none" stroke-width="${this.strokeWidth}" fill="${this.background}" ></path>`;
  };


  this.bckLayerNew = async () => {
    return `<path d="M 0 0 l ${this.helperWidth}  0 0 ${this.helperHeight} -${this.helperWidth} 0 -${this.helperWidth} -${this.helperHeight} " stroke="none" stroke-width="${this.strokeWidth}" fill="#000" ></path>
            <path d="M 30 10 l 120 0 20 20 ${this.helperWidth - 340} 0 20 -20 120 0 20 20 0 120 -20 20 0 ${this.helperHeight - 340} 20 20 0 120 -20 20 -120 0 -20 -20 -${this.helperWidth - 340} 0 -20 20 -120 0 -20 -20 0 -120 20 -20 0 -${this.helperHeight - 340} -20 -20 0 -120 20 -20" stroke="${this.main}50" stroke-width="${this.strokeWidth}" fill="${this.containerBackground}50" ></path>`;
  };


  // This is from the OLD thing where I used the original as a sample based SVG UI
  this.minimizeButton = () => {
    return `<path d="M ${(this.helperWidth - 70)}  0 l 40 0 -10 30 -40 0 10 -30" stroke="none" stroke-width="${this.strokeWidth}" fill="#333333" ></path>
            <path d="M ${(this.helperWidth - 62)}  20 l 15 0 0 2 -15 0" stroke="none" stroke-width="${this.strokeWidth}" ></path>`;
  };


  this.printCloseButton = () => {
    return `<path d="M ${(this.helperWidth - 30)}  0 l 30 0 0 30 -40 0 10 -30" stroke="none" stroke-width="${this.strokeWidth}" fill="#3a0000" ></path>
            <path d="M ${(this.helperWidth - 22)}  7 l 2 0 5 5 5 -5 2 0 0 2 -5 5 5 5 0 2 -2 0 -5 -5 -5 5 -2 0 0 -2 5 -5 -5 -5" stroke="none" stroke-width="${this.strokeWidth}" fill="gray" ></path>`;
  };


  this.randomColors = () => {
    try {
      this.main = getRandomColor();
      this.background = getRandomColor();
      this.containerBackground = getRandomColor();
      return true;
    } catch (error) {
      return error;
    }
  };


  this.debug = async (val = {}) => {
    if (config.debug) {
      const helpDim = {
        X: this.debugX + 20,
        X300: this.debugX + 20 + 300,
        X500: this.debugX + 20 + 500,
        X840: this.debugX + 20 + 840,
        Y: this.debugY + this.mainFontSize,
        Y60: this.debugY + this.mainFontSize + 60,
        Y75: this.debugY + this.mainFontSize + 75,
        Y90: this.debugY + this.mainFontSize + 90,
        Y105: this.debugY + this.mainFontSize + 105,
        Y140: this.debugY + this.mainFontSize + 140,
        Y155: this.debugY + this.mainFontSize + 155,
        Y170: this.debugY + this.mainFontSize + 170,
        Y185: this.debugY + this.mainFontSize + 185,
        Y200: this.debugY + this.mainFontSize + 200,
        Y215: this.debugY + this.mainFontSize + 215,
        Y230: this.debugY + this.mainFontSize + 230,
      };

      const vWatchInfoData = await vCache.get("vWatchInfoData");
      console.log(vWatchInfoData);

      return `<g font-family="monospace" fill="#000000" stroke="1"  >
                <path d="M ${helpDim.X} ${this.debugY} l 960 0 20 20 0 540 -20 20 -960 0 -20 -20 0 -540 20 -20" stroke="#203040" stroke-width="1" fill="#203040A0" ></path>
                <path d="M ${helpDim.X} ${this.debugY} l 960 0 20 20  -20 20 -960 0 -20 -20 20 -20" stroke="#203040" stroke-width="1" fill="#101520" ></path>
                ${await draw.text(helpDim.X + 5, helpDim.Y, "DEBUG INFO PANEL:", this.white, this.mainFontSize)}



                <path d="M ${helpDim.X} ${this.debugY + 50} l 460 0 10 10 0 230 -10 10 -460 0 -10 -10  0 -230 10 -10" stroke="${this.main}" stroke-width="1" fill="#203040" ></path>
                ${await draw.text(helpDim.X, helpDim.Y + 42.5, "WallpaperGUI", this.main, this.subFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y60, "Update TimeStamp", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y60, `[ <text fill="${this.main}">${Date.now()}</text> ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y75, "Render Exec. Time ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y75, `[ <text fill="${this.main}">${val.lastExecTimeVal}</text> ms ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y90, "TotalUpdates ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y90, `[ <text fill="${this.main}">${val.totalUpdates}</text> ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y105, "Running Looping Render ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y105, (val.running) ? '[ <text fill="'+this.mainSuccess+'">ACTIVE</text> ]' : '[ <text fill="'+this.mainWarn+'">DISABLED</text> ]', this.white, this.normalFontSize)}



                ${await draw.text(helpDim.X, helpDim.Y140, "SVG Template Info ", this.main, this.subFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y155, "Name ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y155, `[ <text fill="${this.main}">${this.name}</text> ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y170, "Random Colors ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y170, (this.useRandomColors) ? '[ <text fill="'+this.mainSuccess+'">ENABLED</text> ]' : '[ <text fill="'+this.mainWarn+'">DISABLED</text> ]', this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y185, "Render Height ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y185, `[ <text fill="${this.main}">${this.helperHeight}</text> ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y200, "Render Width ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y200, `[ <text fill="${this.main}">${this.helperWidth}</text> ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y215, "Debug Position (x,y)", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y215, `[ <text fill="${this.main}">${this.debugX}, ${this.debugY}</text> ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y230, "Resolution Scale ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y230, `[ <text fill="${this.main}">${val.scale}</text> ]`, this.white, this.normalFontSize)}





                <path d="M ${this.debugX + 520} ${this.debugY + 50} l 460 0 10 10 0 230 -10 10 -460 0 -10 -10  0 -230 10 -10" stroke="${this.main}" stroke-width="1" fill="#203040" ></path>
                ${await draw.text(helpDim.X500, helpDim.Y + 42.5, "vCache Info Stats:", this.main, this.subFontSize)}

                ${await draw.text(helpDim.X500, helpDim.Y60, "Items in Cache", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X840, helpDim.Y60, `[ <text fill="${this.main}">${await vCache.size()}</text> ]`, this.white, this.normalFontSize)}





                <path d="M ${helpDim.X} ${this.debugY + 320} l 460 0 10 10 0 230 -10 10 -460 0 -10 -10  0 -230 10 -10" stroke="${this.main}" stroke-width="1" fill="#203040" ></path>
                ${await draw.text(helpDim.X, helpDim.Y + 312.5, "vWatch Tasks Runner:", this.main, this.subFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y + 330, "Running Status" , this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y + 330, `[ ${(vWatchInfoData.status) ? '<text fill="'+this.mainSuccess+'">ACTIVE</text>' : '<text fill="'+this.mainWarn+'">STOPPED</text>' } ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y + 345, "Total Tasks Count", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y + 345, `[ <text fill="${this.main}">${vWatchInfoData.totalTasksCount}</text> ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y + 360, "Active Tasks ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y + 360, `[ <text fill="${this.mainAlt}">${vWatchInfoData.activeTasksCount}</text> ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y + 375, "Disabled Tasks ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y + 375, `[ ${vWatchInfoData.disabledTasksCount} ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y + 390, "Tick Interval ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y + 390, `[ ${vWatchInfoData.tickInterval}ms ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y + 405, "Tick Frequency ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y + 405, `[ ${vWatchInfoData.frequency}Hz ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y + 420, "AutoStart Option ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y + 420, `[ ${vWatchInfoData.autoStart} ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y + 435, "Placeholder ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y + 435, `[ WWWWW ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y + 450, "Placeholder ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y + 450, `[ 0 ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y + 465, "Placeholder ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y + 465, `[ 12 ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y + 480, "Placeholder ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y + 480, `[ 5555 ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y + 495, "Placeholder ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y + 495, `[ 4444 ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y + 510, "Placeholder ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y + 510, `[ 3333 ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X, helpDim.Y + 525, "Placeholder ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X300, helpDim.Y + 525, `[ 123 ]`, this.white, this.normalFontSize)}





                <path d="M ${this.debugX + 520} ${this.debugY + 320} l 460 0 10 10 0 230 -10 10 -460 0 -10 -10  0 -230 10 -10" stroke="${this.main}" stroke-width="1" fill="#203040" ></path>
                ${await draw.text(helpDim.X500, helpDim.Y + 312.5, "PLACEHOLDER Block:", this.main, this.subFontSize)}

                ${await draw.text(helpDim.X500, helpDim.Y + 330, "Placeholder ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X840, helpDim.Y + 330, `[ XXXXXXX ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X500, helpDim.Y + 345, "Placeholder ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X840, helpDim.Y + 345, `[ XXXXXXX ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X500, helpDim.Y + 360, "Placeholder ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X840, helpDim.Y + 360, `[ XXXXXXX ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X500, helpDim.Y + 375, "Placeholder ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X840, helpDim.Y + 375, `[ XXXXXXX ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X500, helpDim.Y + 390, "Placeholder ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X840, helpDim.Y + 390, `[ XXXXXXX ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X500, helpDim.Y + 405, "Placeholder ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X840, helpDim.Y + 405, `[ XXXXXXX ]`, this.white, this.normalFontSize)}

                ${await draw.text(helpDim.X500, helpDim.Y + 420, "Placeholder ", this.white, this.normalFontSize)}
                ${await draw.text(helpDim.X840, helpDim.Y + 420, `[ XXXXXXX ]`, this.white, this.normalFontSize)}


              </g>`;
    }
    return "";
  };

}


module.exports = svgTemplate;
