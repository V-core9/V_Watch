const config = require('../config');
const vCache = require('../vCache');
const { vTime } = require('../helpers/');
const actions = require('./actions');


module.exports = sysTasks = (vWatch) => {

  //* DEMO/SAMPLE TASKS TO RUN
  //vWatch.newTask("justDoIt", 750, () => console.log("justDoIt PRINT TO CONSOLE TASK"));


  //! FEW REAL TASKS

  // This will do the rendering of wallpaperGUI.
  // This Tasks status should match config.backgroundUpdates value.
  vWatch.newTask("renderWallpaperGUI", vTime.seconds(2), actions.renderWallpaperGUI);
  vWatch.setTaskStatus("renderWallpaperGUI", config.backgroundUpdates);


  // Getting Current User&Device Info
  vWatch.newTask("systemInfoStats", vTime.seconds(1), actions.systemInfoStats);


  //vWatch.newTask("netSpeedTest", vTime.minutes(30), actions.netSpeedTest);


  vWatch.newTask("vWatchInfoData", vTime.minutes(1), async () => {
    await vCache.set("vWatchInfoData", {
      status: (vWatch.loopCore !== null) ? true : false,
      tickInterval: vWatch.tickInterval, // in milliseconds
      frequency: (1000 / vWatch.tickInterval),
      autoStart: vWatch.autoStart,
      disabledTasksCount: await vWatch.disabledTasksCount(),
      activeTasksCount: await vWatch.activeTasksCount(),
      totalTasksCount: await vWatch.totalTasksCount(),
      vWatchVersion: vWatch.version,
    });
  });

};
