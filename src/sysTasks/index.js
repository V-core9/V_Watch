const config = require('../config');

const vCache = require('../vCache');
const v_os = require('../helpers/v_os');
const wallpaperGUI = require('../wallpaperGUI/init');

const { byteSizer } = require('v_file_system');

const vTimer = {
  seconds: (val = 1) => {
    return val * 1000;
  },
  minutes: (val = 1) => {
    return vTimer.seconds(val * 60);
  },
  hours: (val = 1) => {
    return vTimer.minutes(val * 60);
  },
  days: (val = 1) => {
    return vTimer.hours(val * 24);
  },
  weeks: (val = 1) => {
    return vTimer.days(val * 7);
  }
};

const roundNumber = (val, i = 0) => {
  i = 10 ^ i;
  return Math.round(val * i) / i;
};


const actions = {};

// Demo 'justPrintIt' action
actions.justPrintIt = async() => console.log('justPrintIt');

actions.renderWallpaper =  async () => await wallpaperGUI.render();

actions.freememproc = async () => await vCache.set("freememproc", v_os.freememproc());

actions.freemem = async () => await vCache.set("freemem", roundNumber(byteSizer.byteToGiga(v_os.freemem())));

actions.totalmem = async () => await vCache.set("totalmem", roundNumber(byteSizer.byteToGiga(v_os.totalmem())));



module.exports = sysTasks = (vWatch) => {

  //* DEMO/SAMPLE TASKS TO RUN
  vWatch.newTask("justDoIt", 750, () => console.log("justDoIt PRINT TO CONSOLE TASK"));


  //! FEW REAL TASKS

  // This will do the rendering of wallpaperGUI.
  // This Tasks status should match config.backgroundUpdates value.
  vWatch.newTask("wallpaperGUI", 3000, actions.renderWallpaper);
  vWatch.setTaskStatus("wallpaperGUI", config.backgroundUpdates);


  vWatch.newTask("freememproc", vTimer.seconds(), actions.freememproc);
  vWatch.newTask("freemem", vTimer.seconds(), actions.freemem );
  vWatch.newTask("totalmem", vTimer.minutes(2), actions.totalmem);

  vWatch.newTask("justPrintIt", 500, actions.justPrintIt);
};
