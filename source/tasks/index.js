const config = require('../config');
const { appWatch, builtinWatch, customWatch } = require("../core");
const { seconds, minutes, hours } = require('../helpers').vTime;

//* Base time
const baseTime = seconds(config.redrawTime);

const { STARTING, EXITING, vWatchDBG } = require('./app');

const { clock, wallpaperGUI, systemInfoStats, netSpeedTest, screenshotDesktop } = require('./builtin');

const { justDoIt, weatherApi, totalDownloads } = require('./custom');

module.exports = sysTasks = async () => {

  //! App Tasks
  await appWatch.newTask("STARTING", 0, STARTING, "DISABLED Task that should only fire once STARTING.", false);
  await appWatch.newTask("EXITING", 0, EXITING, "DISABLED Task that should only fire once EXITING.", false);
  await appWatch.newTask("vWatchDBG", seconds(30), vWatchDBG, "vWatch Info Cache");


  //? Builtin Tasks
  await builtinWatch.newTask("wallpaperGUI", baseTime, wallpaperGUI, "This will do the rendering of wallpaperGUI", config.backgroundUpdates);
  await builtinWatch.newTask("clock", baseTime, clock, "vWatch task that updates Clock in cache");
  await builtinWatch.newTask("systemInfoStats", baseTime, systemInfoStats, "Getting Current User and System Info");
  await builtinWatch.newTask("netSpeedTest", minutes(5), netSpeedTest, "Internet Speed Test");
  await builtinWatch.newTask("screenshot-desktop", minutes(5), screenshotDesktop, "Automatic Desktop Screenshots");


  //* Custom Tasks
  await customWatch.newTask("justDoIt", 750, justDoIt, "Demo Task Description Placeholder");
  await customWatch.disableTask("justDoIt");

  await customWatch.newTask("weatherApi", hours(1), weatherApi, "Weather API Info Cache");
  await customWatch.newTask("totalDownloads", hours(12), totalDownloads, "Total Downloads");

};
