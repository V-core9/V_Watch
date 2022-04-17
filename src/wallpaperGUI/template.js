const config = require('../config');
const cache = require('../cache');


const { getRandomColor } = require('../helpers');

function svgTemplate(data = {}) {

  const draw = {
    rect: async (x, y, width, height, color) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${color}" />`,
    circle: async (x, y, radius, color) => `<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" />`,
    text: async (x, y, text, color, size) => `<text x="${x}" y="${y}" fill="${color || this.main}"  text-rendering="geometricPrecision" font-size="${size || this.normalFontSize}">${text}</text>`,
    line: async (x1, y1, x2, y2, color) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" />`,
    polygon: async (points, color) => `<polygon points="${points}" fill="${color}" />`,
    path: async (d, color) => `<path d="${d}" fill="${color}" />`,
    image: async (x, y, width, height, url) => `<image x="${x}" y="${y}" width="${width}" height="${height}" xlink:href="${url}" />`
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


  this.cacheData = {};


  this.clock = {
    posX: 1115,
    posY: 680
  };


  this.helpDim = {
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
    Y245: this.debugY + this.mainFontSize + 245,
  };


  this.render = async () => {
    if (this.useRandomColors) this.randomColors();

    this.cacheData = {
      clock: await cache.get('clock') || { strTime: "", datePrint: "" },
      system: await cache.get('system') || { cpu: {}, ram: {}, deviceUserInfo: {} },
      netSpeed: await cache.get('netSpeed') || { download: 0, upload: 0 },
      svgStats: await cache.get('svgStats') || { lastExecTimeVal: 0, totalUpdates: 0, scale: 1, running: false, quality: 75 },
      vWatch: (config.debug) ? await cache.get("vWatchDBG") : {},
    };

    //console.log(this.cacheData);

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.helperWidth} ${this.helperHeight}"  height="${this.helperHeight}" width="${this.helperWidth}" class="${this.name}"  shape-rendering="geometricPrecision" >
              ${await this.bckLayerNew()}
              ${await this.printOsInfo()}
              ${await this.printBotStats()}
              ${await this.printClock()}
              ${await this.extendedInfoPanel()}

              ${await this.debug()}
            </svg>`;

  };


  this.printOsInfo = async () => {
    const cpu = this.cacheData.system.cpu || { usage: -1, count: 0 };
    const ram = this.cacheData.system.ram;
    return `<g font-size="${this.mainFontSize}" font-family="monospace" fill="${this.background}" stroke="none"  >
              <path d="M 170 2.5 l ${(this.helperWidth - 340)}  0 5 5 0 10 -5 5 ${-(this.helperWidth - 340)}  0 -5 -5 0 -10 5 -5" stroke="${this.main}80" stroke-width="1" fill="${this.main}50" ></path>
              ${await draw.text(180, 15, `CPU: ${cpu.usage}% [Count: ${cpu.count}]`, this.main, this.normalFontSize)}
              ${await draw.text(640, 15, `RAM: ${ram.freemem}GB (${ram.freememproc}%) [Total: ${ram.totalmem}GB]`, this.main, this.normalFontSize)}
            </g>`;
  };


  this.printBotStats = async () => {
    return `<g font-size="${this.mainFontSize}" font-family="monospace" fill="${this.background}" stroke="none"  >
              <path d="M 170 697.5 l ${(this.helperWidth - 340)}  0 5 5 0 10 -5 5 ${-(this.helperWidth - 340)}  0 -5 -5 0 -10 5 -5" stroke="${this.main}80" stroke-width="1" fill="${this.main}50" ></path>
              ${await draw.text(180, 710, `👤 ${this.cacheData.system.deviceUserInfo}`, this.main, this.normalFontSize)}
              ${await draw.text(640, 710, `📦 Net Speed [ D: ${this.cacheData.netSpeed.download} Mbs || U:${this.cacheData.netSpeed.upload} Mbs ]`, this.main, this.normalFontSize)}
            </g>`;
  };


  this.printClock = async () => {
    return `
            <path d="M ${(this.clock.posX)}  ${(this.clock.posY)}  l  20 -20 110 0 20 20 -10 0 -15 -15 -100 0 -15 15 -10 0" stroke="#444" stroke-width="2" fill="${this.background}" ></path>
            <g font-family="monospace" font-weight="bold"  >
              ${await draw.text(this.clock.posX + 25, this.clock.posY + 2.5, this.cacheData.clock.strTime, this.main, this.subFontSize)}
              ${await draw.text(this.clock.posX + 22.5, this.clock.posY + 15, this.cacheData.clock.datePrint, this.backgroundAlt, this.normalFontSize)}
            </g>
            <path d="M ${(this.clock.posX)}  ${(this.clock.posY + 5)}  l  20 20 110 0 20 -20 -10 0 -15 15 -100 0 -15 -15 -10 0" stroke="#444" stroke-width="2"  fill="${this.background}" ></path>`;
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


  this.placeholder = async () => {
    let taskVIEW = "";

    let tasks = this.cacheData.vWatch.tasks || {};

    let taskNames = Object.keys(tasks);

    for (let i = 0; i < taskNames.length; i++) {
      taskVIEW += `${await draw.text(this.helpDim.X500, this.helpDim.Y + 340 + i * 30, `${taskNames[i]}`, this.white, this.normalFontSize)}
                   ${await draw.text(this.helpDim.X840, this.helpDim.Y + 340 + i * 30, `[ ${(tasks[taskNames[i]].enabled) ? "✔ Enabled" : "❌ Disabled"} ]`, this.main, this.normalFontSize)}
                   ${await draw.text(this.helpDim.X500, this.helpDim.Y + 350 + i * 30, `${tasks[taskNames[i]].description}`, this.white, 8)}
                   ${await draw.text(this.helpDim.X840, this.helpDim.Y + 350 + i * 30, `[ Δ ${tasks[taskNames[i]].interval}ms | Σ ${tasks[taskNames[i]].runs} ]`, this.main, 8)}`;
    }

    return `
            <path d="M ${this.debugX + 520} ${this.debugY + 320} l 460 0 10 10 0 230 -10 10 -460 0 -10 -10  0 -230 10 -10" stroke="${this.main}" stroke-width="1" fill="#203040" ></path>
            ${await draw.text(this.helpDim.X500, this.helpDim.Y + 312.5, "vWatch Tasks:", this.main, this.subFontSize)}

            ${taskVIEW}`;
  };


  this.vWatchDBG = async () => {
    return `<path d="M ${this.helpDim.X} ${this.debugY + 320} l 460 0 10 10 0 230 -10 10 -460 0 -10 -10  0 -230 10 -10" stroke="${this.main}" stroke-width="1" fill="#203040" ></path>
            ${await draw.text(this.helpDim.X, this.helpDim.Y + 312.5, "vWatch Tasks Runner:", this.main, this.subFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y + 330, "Running Status", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y + 330, `[ ${(this.cacheData.vWatch.status) ? '<text fill="' + this.mainSuccess + '">ACTIVE</text>' : '<text fill="' + this.mainWarn + '">STOPPED</text>'} ]`, this.white, this.normalFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y + 345, "Total Tasks Count", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y + 345, `[ <text fill="${this.main}">${this.cacheData.vWatch.totalTasksCount}</text> ]`, this.white, this.normalFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y + 360, "Active Tasks ", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y + 360, `[ <text fill="${this.mainAlt}">${this.cacheData.vWatch.activeTasksCount}</text> ]`, this.white, this.normalFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y + 375, "Disabled Tasks ", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y + 375, `[ ${this.cacheData.vWatch.disabledTasksCount} ]`, this.white, this.normalFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y + 390, "Tick Interval ", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y + 390, `[ ${this.cacheData.vWatch.tickInterval}ms ]`, this.white, this.normalFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y + 405, "Tick Frequency ", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y + 405, `[ ${this.cacheData.vWatch.frequency}Hz ]`, this.white, this.normalFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y + 420, "AutoStart Option ", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y + 420, `[ ${this.cacheData.vWatch.autoStart} ]`, this.white, this.normalFontSize)}`;
  };


  this.cacheDBG = async () => {

    return `<path d="M ${this.debugX + 520} ${this.debugY + 50} l 460 0 10 10 0 230 -10 10 -460 0 -10 -10  0 -230 10 -10" stroke="${this.main}" stroke-width="1" fill="#203040" ></path>
            ${await draw.text(this.helpDim.X500, this.helpDim.Y + 42.5, "cache Info Stats:", this.main, this.subFontSize)}

            ${await draw.text(this.helpDim.X500, this.helpDim.Y60, "Items in Cache", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X840, this.helpDim.Y60, `[ <text fill="${this.main}">${await cache.size()}</text> ]`, this.white, this.normalFontSize)}`;

  };


  this.wallGuiDBG = async () => {
    return `<path d="M ${this.helpDim.X} ${this.debugY + 50} l 460 0 10 10 0 230 -10 10 -460 0 -10 -10  0 -230 10 -10" stroke="${this.main}" stroke-width="1" fill="#203040" ></path>
            ${await draw.text(this.helpDim.X, this.helpDim.Y + 42.5, "WallpaperGUI", this.main, this.subFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y60, "Update TimeStamp", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y60, `[ <text fill="${this.main}">${Date.now()}</text> ]`, this.white, this.normalFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y75, "Render Exec. Time ", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y75, `[ <text fill="${this.main}">${this.cacheData.svgStats.lastExecTimeVal}</text> ms ]`, this.white, this.normalFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y90, "TotalUpdates ", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y90, `[ <text fill="${this.main}">${this.cacheData.svgStats.totalUpdates}</text> ]`, this.white, this.normalFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y105, "Running Looping Render ", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y105, (this.cacheData.svgStats.running) ? '[ <text fill="' + this.mainSuccess + '">ACTIVE</text> ]' : '[ <text fill="' + this.mainWarn + '">DISABLED</text> ]', this.white, this.normalFontSize)}



            ${await draw.text(this.helpDim.X, this.helpDim.Y140, "SVG Template Info ", this.main, this.subFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y155, "Name ", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y155, `[ <text fill="${this.main}">${this.name}</text> ]`, this.white, this.normalFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y170, "Random Colors ", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y170, (this.useRandomColors) ? '[ <text fill="' + this.mainSuccess + '">ENABLED</text> ]' : '[ <text fill="' + this.mainWarn + '">DISABLED</text> ]', this.white, this.normalFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y185, "Render Height ", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y185, `[ <text fill="${this.main}">${this.helperHeight}</text> ]`, this.white, this.normalFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y200, "Render Width ", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y200, `[ <text fill="${this.main}">${this.helperWidth}</text> ]`, this.white, this.normalFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y215, "Debug Position (x,y)", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y215, `[ <text fill="${this.main}">${this.debugX}, ${this.debugY}</text> ]`, this.white, this.normalFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y230, "Scale ", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y230, `[ <text fill="${this.main}">${this.cacheData.svgStats.scale}</text> ]`, this.white, this.normalFontSize)}

            ${await draw.text(this.helpDim.X, this.helpDim.Y245, "Quality ", this.white, this.normalFontSize)}
            ${await draw.text(this.helpDim.X300, this.helpDim.Y245, `[ <text fill="${this.main}">${this.cacheData.svgStats.quality}</text> ]`, this.white, this.normalFontSize)}`;
  };


  this.debug = async () => {
    if (config.debug) {

      return `<g font-family="monospace" fill="#000000" stroke="1"  >
                <path d="M ${this.helpDim.X} ${this.debugY} l 960 0 20 20 0 540 -20 20 -960 0 -20 -20 0 -540 20 -20" stroke="#203040" stroke-width="1" fill="#203040A0" ></path>
                <path d="M ${this.helpDim.X} ${this.debugY} l 960 0 20 20  -20 20 -960 0 -20 -20 20 -20" stroke="#203040" stroke-width="1" fill="#101520" ></path>
                ${await draw.text(this.helpDim.X + 5, this.helpDim.Y, "DEBUG INFO PANEL:", this.white, this.mainFontSize)}

                ${await this.wallGuiDBG()}
                ${await this.cacheDBG()}
                ${await this.vWatchDBG()}
                ${await this.placeholder()}
              </g>`;
    }
    return `${await draw.text(1130, 20, `[ <text fill="${this.main}">${this.cacheData.svgStats.lastExecTimeVal}</text> ms | ${this.cacheData.svgStats.totalUpdates} @ ${this.cacheData.svgStats.scale} ]`, this.white, this.normalFontSize)}`;
  };



  this.extendedInfoPanel = async () => {

    return (config.extendedInfo) ? `
              <g >
                <path d="M 35 15 l 110 0  20 20   -130 130  -20 -20  0 -110  20 -20" stroke="${this.main}" stroke-width="1" fill="#101520" ></path>
                ${await draw.text(35, 40, "💻 EIP#1", this.white, this.subFontSize)}

              </g>


              <g>
                <path d="M 35 705 l 110 0   20 -20   -130 -130  -20 20   0 110   20 20" stroke="${this.main}" stroke-width="1" fill="#101520" ></path>
                ${await draw.text(35, 695, "💻 EIP#2", this.white, this.subFontSize)}
              </g>


              <g>
                <path d="M 1135 15 l 110 0   20 20   0 110   -20 20   -130 -130  20 -20" stroke="${this.main}" stroke-width="1" fill="#101520" ></path>
                ${await draw.text(1140, 40, "💻 EIP#3", this.white, this.subFontSize)}
              </g>


              <g>
                <path d="M 1135 705 l 110 0   20 -20   0 -110 -20 -20 -130 130  20 20 " stroke="${this.main}" stroke-width="1" fill="#101520" ></path>
                ${await draw.text(1140, 695, "💻 EIP#4", this.white, this.subFontSize)}
              </g>


              <g>
                <path d="M 5 145 l   25 25   0 380   -25 25   0 -430  " stroke="${this.main}" stroke-width="1" fill="#101520" ></path>
                ${await draw.text(10, 185, "🆒", this.main, this.normalFontSize)}
              </g>


              <g>
                <path d="M 1275 145 l   -25 25   0 380   25 25   0 -430  " stroke="${this.main}" stroke-width="1" fill="#101520" ></path>
                ${await draw.text(1255, 545, "🆓", this.main, this.normalFontSize)}
              </g>

              ` : ``;
  };


}


module.exports = svgTemplate;
