const config = require('../config');
const vCache = require('../vCache');

function svgTemplate(data = {}) {


  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };


  const draw = {
    rect: (x, y, width, height, color) => {
      return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${color}" />`;
    },
    circle: (x, y, radius, color) => {
      return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" />`;
    },
    text: (x, y, text, color, size) => {
      return `<text x="${x}" y="${y}" fill="${color || this.main}"  font-size="${size || this.normalFontSize}">${text}</text>`;
    },
    line: (x1, y1, x2, y2, color) => {
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" />`;
    },
    polygon: (points, color) => {
      return `<polygon points="${points}" fill="${color}" />`;
    },
    path: (d, color) => {
      return `<path d="${d}" fill="${color}" />`;
    },
    image: (x, y, width, height, url) => {
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
  this.useRandomColors = data.useRandomColors || false;

  this.helperWidth = 1280;
  this.helperHeight = 720;

  this.superFontSize = 45;
  this.mainFontSize = 30;
  this.subFontSize = 20;
  this.normalFontSize = 11;
  this.strokeWidth = 3;

  this.debugX = data.debugX || 980;
  this.debugY = data.debugY || 650;



  this.render = async (val = {}) => {
    if (this.useRandomColors) this.randomColors();
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.helperWidth} ${this.helperHeight}"  height="${this.helperHeight}" width="${this.helperWidth}" class="${this.name}">
              ${this.bckLayerNew()}
              ${await this.printOsInfo()}
              ${await this.printBotStats()}
              ${this.printClock()}
              ${this.debug(val)}
            </svg>`;

  };


  this.printOsInfo = async () => {
    return `<g font-size="${this.mainFontSize}"  font-family="monospace" fill="${this.background}" stroke="none"  >
              <path d="M 170 2.5 l ${(this.helperWidth - 340)}  0 5 5 0 10 -5 5 ${-(this.helperWidth - 340)}  0 -5 -5 0 -10 5 -5" stroke="${this.main}80" stroke-width="1" fill="${this.main}50" ></path>
              ${draw.text(180, 15, `Free RAM: ${await vCache.get('freemem')}GB (${await vCache.get('freememproc')}%) [Total: ${await vCache.get('totalmem')}GB]`, this.main, this.normalFontSize)}
            </g>`;
  };


  this.printBotStats = async () => {
    return `<g font-size="${this.mainFontSize}"  font-family="monospace" fill="${this.background}" stroke="none"  >
              <path d="M 170 697.5 l ${(this.helperWidth - 340)}  0 5 5 0 10 -5 5 ${-(this.helperWidth - 340)}  0 -5 -5 0 -10 5 -5" stroke="${this.main}80" stroke-width="1" fill="${this.main}50" ></path>
              ${draw.text(180, 710, `Free RAM: ${await vCache.get('freemem')}GB (${await vCache.get('freememproc')}%) [Total: ${await vCache.get('totalmem')}GB]`, this.main, this.normalFontSize)}
            </g>`;
  };


  this.printClock = () => {

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
              ${draw.text(posX + 25, posY + 2.5, strTime, this.main, this.subFontSize)}
              ${draw.text(posX + 22.5, posY + 15, datePrint, this.backgroundAlt, this.normalFontSize)}
            </g>
            <path d="M ${(posX)}  ${(posY + 5)}  l  20 20 110 0 20 -20 -10 0 -15 15 -100 0 -15 -15 -10 0" stroke="#444" stroke-width="2"  fill="${this.background}" ></path>`;
  };


  this.bckLayer = () => {
    return `<path d="M 0 0 l ${this.helperWidth}  0 0 ${this.helperHeight} -${this.helperWidth} 0 -${this.helperWidth} -${this.helperHeight} " stroke="none" stroke-width="${this.strokeWidth}" fill="#000" ></path>
            <path d="M 0 0 l ${this.helperWidth} 0 0 60 -20 20 0 ${(this.helperHeight - 180)}  20 20 0 60 -20 20 -160 0 -20 -20${-(this.helperWidth - 400)}  0 -20 20 -160 0 -20 -20 0 -60 20 -20 0 ${-(this.helperHeight - 280)}  -20 -20" stroke="none" stroke-width="${this.strokeWidth}" fill="${this.containerBackground}" ></path>
            <path d="M 10 ${(this.helperHeight - 30)}  l  20 20 140 0 20 -20 -10 0 -15 15 -130 0 -15 -15" stroke="none" stroke-width="${this.strokeWidth}" fill="${this.background}" ></path>
            <path d="M ${(this.helperWidth - 190)}  ${(this.helperHeight - 30)}  l  20 20 140 0 20 -20 -10 0 -15 15 -130 0 -15 -15" stroke="none" stroke-width="${this.strokeWidth}" fill="${this.background}" ></path>`;
  };


  this.bckLayerNew = () => {
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
      this.main = generateRandomColor();
      this.background = generateRandomColor();
      this.containerBackground = generateRandomColor();
      return true;
    } catch (error) {
      return error;
    }
  };



  this.debug = (val = {}) => {
    if (config.debug) {

      return `
              <path d="M ${this.debugX - 15} ${this.debugY - 15} l 300 0 0 75 -300 0" stroke="none" stroke-width="${this.strokeWidth}" fill="${this.background}" ></path>
              <g font-family="monospace" fill="#000000" stroke="1"  >

                <text x="${this.debugX}" y="${this.debugY}" fill="${this.whiteText}" font-size="${this.normalFontSize}" >Update TimeStamp </text>
                <text x="${this.debugX + 140}" y="${this.debugY}" fill="${this.whiteText}" font-size="${this.normalFontSize}" >[ <text fill="${this.main}">${Date.now()}</text> ]</text>

                <text x="${this.debugX}" y="${this.debugY + 15}" fill="${this.whiteText}" font-size="${this.normalFontSize}" >Loop Execution Time </text>
                <text x="${this.debugX + 140}" y="${this.debugY + 15}" fill="${this.whiteText}" font-size="${this.normalFontSize}" >[ <text fill="${this.main}">${val.lastExecTimeVal}</text> ms ]</text>

                <text x="${this.debugX}" y="${this.debugY + 30}" fill="${this.whiteText}" font-size="${this.normalFontSize}" >TotalUpdates </text>
                <text x="${this.debugX + 140}" y="${this.debugY + 30}" fill="${this.whiteText}" font-size="${this.normalFontSize}" >[ <text fill="${this.mainAlt}">${val.totalUpdates}</text> ]</text>

                <text x="${this.debugX}" y="${this.debugY + 45}" fill="${this.whiteText}" font-size="${this.normalFontSize}" >TotalUpdates </text>
                <text x="${this.debugX + 140}" y="${this.debugY + 45}" fill="${this.whiteText}" font-size="${this.normalFontSize}" >[ <text fill="${this.mainAlt}">${val.totalUpdates}</text> ]</text>

              </g>`;
    }
    return "";
  };

}


module.exports = svgTemplate;
