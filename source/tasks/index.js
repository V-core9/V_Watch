const config = require('../config');
const { vWatch } = require("../core");
const { seconds, minutes, hours } = require('../helpers').vTime;

//! Base time
const baseTime = seconds(config.redrawTime);


module.exports = sysTasks = async () => {

  await vWatch.newTask("STARTING", 0, require('./app.STARTING'), "DISABLED Task that should only fire once STARTING.", false);
  await vWatch.newTask("EXITING", 0, require('./app.EXITING'), "DISABLED Task that should only fire once EXITING.", false);


  await vWatch.newTask("wallpaperGUI", baseTime, require('./render-wallpapergui'), "This will do the rendering of wallpaperGUI", config.backgroundUpdates);


  await vWatch.newTask("justDoIt", 750, require('./justDoIt'), "Demo Task Description Placeholder");
  await vWatch.disableTask("justDoIt");


  await vWatch.newTask("clock", baseTime, require('./clock-update'), "vWatch task that updates Clock in cache");

  await vWatch.newTask("systemInfoStats", baseTime, require('./system-info-stats'), "Getting Current User and System Info");

  await vWatch.newTask("netSpeedTest", minutes(5), require('./internet-speed-test'), "Internet Speed Test");

  await vWatch.newTask("totalDownloads", hours(12), require('./total-downloads'), "Total Downloads");

  await vWatch.newTask("vWatchDBG", seconds(30), require('./vWatchDebug'), "vWatch Info Cache");


};
