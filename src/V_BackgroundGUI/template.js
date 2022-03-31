const config = require('../config');

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
    text: (x, y, text, color) => {
      return `<text x="${x}" y="${y}" fill="${color || this.main}">${text}</text>`;
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

  this.mainFontSize = 30;
  this.subFontSize = 20;
  this.minFontSize = 11;
  this.strokeWidth = 3;

  this.debugX = data.debugX || 980;
  this.debugY = data.debugY || 650;

  this.render = (val = {}) => {
    if (this.useRandomColors) this.randomColors();
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.helperWidth} ${this.helperHeight}"  height="${this.helperHeight}" width="${this.helperWidth}" class="${this.name}">
              <path d="M 0 0 l ${this.helperWidth} 0 0 60 -20 20 0 ${(this.helperHeight - 180)}  20 20 0 60 -20 20 -160 0 -20 -20${-(this.helperWidth - 400)}  0 -20 20 -160 0 -20 -20 0 -60 20 -20 0 ${-(this.helperHeight - 280)}  -20 -20" stroke="none" stroke-width="${this.strokeWidth}" fill="${this.containerBackground}" ></path>
              <path d="M 0 0 l ${(this.helperWidth - 330)}  0 -20 60 ${-(this.helperWidth - 350)}  0" stroke="none" stroke-width="${this.strokeWidth}" fill="${this.main}" ></path>
              <path d="M ${(this.helperWidth - 320)}  0 l 20 0 -20 60 -20 0" stroke="none" stroke-width="${this.strokeWidth}" fill="${this.main}" ></path>
              <path d="M ${(this.helperWidth - 290)}  0 l 50 0 -15 45 -50 0" stroke="none" stroke-width="${this.strokeWidth}" fill="${this.main}" ></path>
              <path d="M ${(this.helperWidth - 230)}  0 l 230 0 0 30 -240 0" stroke="none" stroke-width="${this.strokeWidth}" fill="${this.main}" ></path>
              <path d="M ${(this.helperWidth - 30)}  0 l 30 0 0 30 -40 0 10 -30" stroke="none" stroke-width="${this.strokeWidth}" fill="#3a0000" ></path>
              <path d="M ${(this.helperWidth - 22)}  7 l 2 0 5 5 5 -5 2 0 0 2 -5 5 5 5 0 2 -2 0 -5 -5 -5 5 -2 0 0 -2 5 -5 -5 -5" stroke="none" stroke-width="${this.strokeWidth}" fill="gray" ></path>
              <path d="M ${(this.helperWidth - 70)}  0 l 40 0 -10 30 -40 0 10 -30" stroke="none" stroke-width="${this.strokeWidth}" fill="#333333" ></path>
              <path d="M ${(this.helperWidth - 62)}  20 l 15 0 0 2 -15 0" stroke="none" stroke-width="${this.strokeWidth}" ></path>
              <path d="M 10 ${(this.helperHeight - 30)}  l  20 20 140 0 20 -20 -10 0 -15 15 -130 0 -15 -15" stroke="none" stroke-width="${this.strokeWidth}" fill="${this.background}" ></path>
              <path d="M ${(this.helperWidth - 190)}  ${(this.helperHeight - 30)}  l  20 20 140 0 20 -20 -10 0 -15 15 -130 0 -15 -15" stroke="none" stroke-width="${this.strokeWidth}" fill="${this.background}" ></path>

              <g font-size="${this.mainFontSize}"  font-family="monospace" fill="${this.background}" stroke="none"  >
                ${draw.text(20, 40, `DemoHeading Container Demo Heading Container`, this.backgroundAlt)}
                ${draw.text(120, 120, `Last Update @ ${Date.now()}`)}
                ${draw.text(220, 160, `Last Update @ ${Date.now()}`)}
              </g>

              <g font-size="${this.subFontSize}"  font-family="monospace" font-weight="bold" fill="${this.main}"  stroke="none" >
                <text x="220" y="200" >Title @ ${val.title}</text>
              </g>


              ${this.debug(val)}

            </svg>`;

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
    console.log(config);
    if (config.debug) {

      return `
              <path d="M ${this.debugX - 15} ${this.debugY - 15} l 300 0 0 75 -300 0" stroke="none" stroke-width="${this.strokeWidth}" fill="${this.background}" ></path>
              <g font-family="monospace" fill="#000000" stroke="1"  >

                <text x="${this.debugX}" y="${this.debugY}" fill="${this.whiteText}" font-size="${this.minFontSize}" >Update TimeStamp </text>
                <text x="${this.debugX + 140}" y="${this.debugY}" fill="${this.whiteText}" font-size="${this.minFontSize}" >[ <text fill="${this.main}">${Date.now()}</text> ]</text>

                <text x="${this.debugX}" y="${this.debugY + 15}" fill="${this.whiteText}" font-size="${this.minFontSize}" >Loop Execution Time </text>
                <text x="${this.debugX + 140}" y="${this.debugY + 15}" fill="${this.whiteText}" font-size="${this.minFontSize}" >[ <text fill="${this.main}">${val.lastExecTimeVal}</text> ms ]</text>

                <text x="${this.debugX}" y="${this.debugY + 30}" fill="${this.whiteText}" font-size="${this.minFontSize}" >TotalUpdates </text>
                <text x="${this.debugX + 140}" y="${this.debugY + 30}" fill="${this.whiteText}" font-size="${this.minFontSize}" >[ <text fill="${this.mainAlt}">${val.totalUpdates}</text> ]</text>

                <text x="${this.debugX}" y="${this.debugY + 45}" fill="${this.whiteText}" font-size="${this.minFontSize}" >TotalUpdates </text>
                <text x="${this.debugX + 140}" y="${this.debugY + 45}" fill="${this.whiteText}" font-size="${this.minFontSize}" >[ <text fill="${this.mainAlt}">${val.totalUpdates}</text> ]</text>

              </g>`;
    }
    return "";
  };

  return this.render();
}

//console.log(mainSVG_Template);
//console.log(mainSVG_Template());

module.exports = svgTemplate;
