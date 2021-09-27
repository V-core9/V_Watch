const Vos = require('../helpers/v_os/v_os');
const Votify = require('../helpers/v_notify/votify');


var VobCore = null;
const V_Observer = {
  config: {

  },
  options: {
    exitSignal: false,
    status: 'not-running',
    tickTime: 1000, // 1s
  },
  data: {
    actions: [
      {
        name: "hearth_beat",
        description: "will print to console just to get hearth bumping...",
        interval: 1000,
        lastCheck: 0,
        exec ()  {
          var tri = this.interval;
          console.log('\n\n💓 [.ARI.] >> [ 1000 || 1s ] => BASE_BEAT\n');
          console.log('Free RAM: '+ Vos.freememproc() +'% ');
          if (Vos.freememproc() < 10 ) {
            Votify.app.lowsysmem();
          }
        },
      },
      {
        name: "second_beat",
        description: "will print to console just to get hearth bumping...",
        interval: 2000,
        lastCheck: 0,
        exec ()  {
          console.log('🔥 [.ARI.] >> [ 2000 || 2s ] => Every Second Hit\n');
        },
      },
      {
        name: "fifth_beat",
        description: "will print to console just to get hearth bumping...",
        interval: 5000,
        lastCheck: 0,
        exec () {
          console.log('🚀 [.ARI.] >> [ 5000 || 5s ] => Every 5th Hit\n');
        },
      },
      {
        name: "10th_beat",
        description: "will print to console just to get hearth bumping...",
        interval: 10000,
        lastCheck: 0,
        exec () {
          console.log('🎮 [.ARI.] >> [ 10000 || 10s ] => 10th Hearth Beat\n');
        },
      },
      {
        name: "15th_beat",
        description: "will print to console just to get hearth bumping...",
        interval: 15000,
        lastCheck: 0,
        exec () {
          console.log('🚨 [.ARI.] >> [ 15000 || 15s ] => 15th Hearth Beat\n');
        },
      },
      {
        name: "10th_beat",
        description: "will print to console just to get hearth bumping...",
        interval: 30000,
        lastCheck: 0,
        exec () {
          console.log('🎉 [.ARI.] >> [ 30000 || 30s ] => 30th Hearth Beat\n');
        },
      }
    ],

  },
  mainLoop () {
    Votify.app.starting();
    VobCore = setInterval(() => {
      var timeOf = Date.now();
      //console.log(this.options.tickTime);
      this.data.actions.forEach(item => {
        if ( (timeOf - item.lastCheck ) > item.interval){
          //console.log("EXECUTING >>> " +item.name);
          item.exec();
          item.lastCheck = timeOf;
        }
      });
    }, this.options.tickTime);
  },
  init(){
    console.log("<[- V_Observer @ INIT() -]>");
    this.mainLoop();
  }
};

V_Observer.init();

module.exports = V_Observer;
