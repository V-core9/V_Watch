

var vWatchCore = null;
const V_Watch = {
  config: {
    printConsole: true,
    getExecTimes: true,
    relativeTimeSpeed: 1,
  },
  options: {
    exitSignal: false,
    status: 'not-running',
    tickTime: 1000, // 1s
  },
  data: {
    timeOf: 0,
    actions: require("./loader"),
  },

  exec(exec) {
    console.log(exec);
    if (V_Watch.config.printConsole === true) {
      return console.log(exec());
    } else {
      return exec();
    }
  },
  
  runIt(item) {
    if (( (this.data.timeOf - item.lastCheck) * this.config.relativeTimeSpeed )> item.interval) {
      if (V_Watch.config.getExecTimes === true) console.time("ExecTime of " + item.name);
      V_Watch.exec(item.exec);
      item.lastCheck = this.data.timeOf;
      if (V_Watch.config.getExecTimes === true) console.timeEnd("ExecTime of " + item.name);
    }
  },

  mainLoop() {
    vWatchCore = setInterval(() => {
      this.data.timeOf = Date.now();
      this.data.actions.forEach(item => {
        V_Watch.runIt(item);
      });
    }, (this.options.tickTime / this.config.relativeTimeSpeed));
  },

  init() {
    this.mainLoop();
  },
};

V_Watch.init();

module.exports = V_Watch;
