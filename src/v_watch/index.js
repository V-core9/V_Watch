const v_os = require('../helpers/v_os');
const Votify = require('../helpers/v_notify');
//var desktopIdle = require('@genee/desktop-idle');

var VobCore = null;

const v_watch = {

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
        exec() {
          var tri = this.interval;
          console.log('\n\n💓 [.ARI.] >> [ 1000 || 1s ] => BASE_BEAT\n');
          console.log('Free RAM: ' + v_os.freememproc() + '% ');
          if (v_os.freememproc() < 15) {
            Votify.app.lowsysmem();
          }
        },
      },
      {
        name: "second_beat",
        description: "will print to console just to get hearth bumping...",
        interval: 2000,
        lastCheck: 0,
        exec() {
          console.log('🔥 [.ARI.] >> [ 2000 || 2s ] => Every Second Hit\n');
        },
      },
      {
        name: "fifth_beat",
        description: "will print to console just to get hearth bumping...",
        interval: 5000,
        lastCheck: 0,
        exec() {
          console.log('🚀 [.ARI.] >> [ 5000 || 5s ] => Every 5th Hit\n');
        },
      },
      {
        name: "10th_beat",
        description: "will print to console just to get hearth bumping...",
        interval: 10000,
        lastCheck: 0,
        exec() {
          //console.log(desktopIdle.getIdleTime());
          console.log('🎮 [.ARI.] >> [ 10000 || 10s ] => 10th Hearth Beat\n');
        },
      },
      {
        name: "15th_beat",
        description: "will print to console just to get hearth bumping...",
        interval: 15000,
        lastCheck: 0,
        exec() {
          console.log('🚨 [.ARI.] >> [ 15000 || 15s ] => 15th Hearth Beat\n');
        },
      },
      {
        name: "10th_beat",
        description: "will print to console just to get hearth bumping...",
        interval: 30000,
        lastCheck: 0,
        exec() {
          console.log('🎉 [.ARI.] >> [ 30000 || 30s ] => 30th Hearth Beat\n');
        },
      }
    ],
  },

  mainLoop() {
    VobCore = setInterval(() => {
      console.time("Tick_Exec_Time");
      var timeOf = Date.now();
      //console.log(this.options.tickTime);
      this.data.actions.forEach(item => {
        if ((timeOf - item.lastCheck) > item.interval) {
          //console.log("EXECUTING >>> " +item.name);
          item.exec();
          item.lastCheck = timeOf;
        }
      });

      console.timeEnd("Tick_Exec_Time");
    }, this.options.tickTime);
  },

  init() {
    console.log("<[- v_watch @ INIT() -]>");
    this.mainLoop();
  }

};

v_watch.init();

module.exports = v_watch;
