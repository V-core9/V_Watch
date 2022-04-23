const config = require('../config');
const { vWatch } = require("../core");
const { seconds, minutes, hours } = require('../helpers').vTime;

//* Base time
const baseTime = seconds(config.redrawTime);

const { STARTING, EXITING, vWatchDBG } = require('./app');

const { clock, wallpaperGUI, systemInfoStats, netSpeedTest, screenshotDesktop } = require('./builtin');

const { justDoIt, weatherApi, totalDownloads } = require('./custom');

module.exports = sysTasks = async () => {

  //! App Tasks
  await vWatch.newTask("STARTING", 0, STARTING, "DISABLED Task that should only fire once STARTING.", false);
  await vWatch.newTask("EXITING", 0, EXITING, "DISABLED Task that should only fire once EXITING.", false);
  await vWatch.newTask("vWatchDBG", seconds(30), vWatchDBG, "vWatch Info Cache");


  //? Builtin Tasks
  await vWatch.newTask("wallpaperGUI", baseTime, wallpaperGUI, "This will do the rendering of wallpaperGUI", config.backgroundUpdates);
  await vWatch.newTask("clock", baseTime, clock, "vWatch task that updates Clock in cache");
  await vWatch.newTask("systemInfoStats", baseTime, systemInfoStats, "Getting Current User and System Info");
  await vWatch.newTask("netSpeedTest", minutes(5), netSpeedTest, "Internet Speed Test");
  await vWatch.newTask("screenshot-desktop", minutes(5), screenshotDesktop, "Automatic Desktop Screenshots");


  //* Custom Tasks
  await vWatch.newTask("justDoIt", 750, justDoIt, "Demo Task Description Placeholder");
  await vWatch.disableTask("justDoIt");

  await vWatch.newTask("weatherApi", hours(1), weatherApi, "Weather API Info Cache");
  await vWatch.newTask("totalDownloads", hours(12), totalDownloads, "Total Downloads");

};
