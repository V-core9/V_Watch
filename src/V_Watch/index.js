

var vWatchCore = null;
const V_Watch = {
  config: {

  },
  options: {
    exitSignal: false,
    status: 'not-running',
    tickTime: 1000, // 1s
  },
  data: {
    actions: require("./loader"),
  },
  mainLoop () {
    vWatchCore = setInterval(() => {
      var timeOf = Date.now();
      this.data.actions.forEach(item => {
        if ( (timeOf - item.lastCheck ) > item.interval){
          item.exec();
          item.lastCheck = timeOf;
        }
      });
    }, this.options.tickTime);
  },
  init(){
    this.mainLoop();
  },
};

V_Watch.init();

module.exports = V_Watch;
