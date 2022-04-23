const config = require('../config');
const { vWatch } = require("../core");
const { seconds, minutes, hours } = require('../helpers').vTime;

//* Base time
const baseTime = seconds(config.redrawTime);


module.exports = sysTasks = async () => {

  //! App Tasks
  await vWatch.newTask("STARTING", 0, require('./app/STARTING'), "DISABLED Task that should only fire once STARTING.", false);

  await vWatch.newTask("EXITING", 0, require('./app/EXITING'), "DISABLED Task that should only fire once EXITING.", false);

  await vWatch.newTask("vWatchDBG", seconds(30), require('./app/vWatchDebug'), "vWatch Info Cache");


  //? Builtin Tasks
  await vWatch.newTask("wallpaperGUI", baseTime, require('./builtin/wallpapergui'), "This will do the rendering of wallpaperGUI", config.backgroundUpdates);

  await vWatch.newTask("clock", baseTime, require('./builtin/clock-update'), "vWatch task that updates Clock in cache");

  await vWatch.newTask("systemInfoStats", baseTime, require('./builtin/system-info-stats'), "Getting Current User and System Info");

  await vWatch.newTask("netSpeedTest", minutes(5), require('./builtin/internet-speed-test'), "Internet Speed Test");

  await vWatch.newTask("screenshot-desktop", minutes(5), require('./builtin/screenshot-desktop'), "Automatic Desktop Screenshots");


  //* Custom Tasks
  await vWatch.newTask("justDoIt", 750, require('./custom/justDoIt'), "Demo Task Description Placeholder");
  await vWatch.disableTask("justDoIt");

  await vWatch.newTask("weatherApi", hours(1), require('./custom/weather-api'), "Weather API Info Cache");

  await vWatch.newTask("totalDownloads", hours(12), require('./custom/total-downloads'), "Total Downloads");

};
