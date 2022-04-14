const config = require('../config');
const vCache = require('../vCache');

const { vTime } = require('../helpers/');

const {
  wallpaperGUI,
  systemInfoStats,
  netSpeedTest,
  clockUpdate,
} = require('./actions');


const redrawTime = vTime.seconds(5);

module.exports = sysTasks = async (vWatch) => {

  //* DEMO/SAMPLE TASKS TO RUN
  await vWatch.newTask("justDoIt", 750, async () => console.log("justDoIt PRINT TO CONSOLE TASK"), "Demo Task Description Placeholder");
  await vWatch.disableTask("justDoIt");


  //! FEW REAL TASKS

  await vWatch.newTask("clock", vTime.seconds(), clockUpdate, "vWatch task that updates Clock in vCache");

  // This will do the rendering of wallpaperGUI.
  await vWatch.newTask("wallpaperGUI", redrawTime, wallpaperGUI, "This will do the rendering of wallpaperGUI");
  // This Tasks status should match config.backgroundUpdates value.
  await vWatch.setTaskStatus("wallpaperGUI", config.backgroundUpdates);


  // Getting Current User&Device Info
  await vWatch.newTask("systemInfoStats", redrawTime, async () => await systemInfoStats(redrawTime), "Getting Current User and System Info");

  // Internet Speed Test
  await vWatch.newTask("netSpeedTest", vTime.minutes(30), netSpeedTest, "Internet Speed Test");

  // vWatch Info Cache
  await vWatch.newTask("vWatchDBG", vTime.minutes(1), async () => {

    let vwDbgInfo = {
      status: (vWatch.loopCore !== null) ? true : false,
      tickInterval: vWatch.tickInterval, // in milliseconds
      frequency: (1000 / vWatch.tickInterval),
      autoStart: vWatch.autoStart,
      disabledTasksCount: await vWatch.disabledTasksCount(),
      activeTasksCount: await vWatch.activeTasksCount(),
      totalTasksCount: await vWatch.totalTasksCount(),
      vWatchVersion: vWatch.version,
      tasks: await vWatch.allTasks(),
    };

    await vCache.set("vWatchDBG", vwDbgInfo);

  }, "vWatch Info Cache");

};
