
const { vWatch } = require("./core");
const config = require('./config');

const { seconds, minutes, hours } = require('./helpers').vTime;

//! Base time
const baseTime = seconds(config.redrawTime);

const {
  appSTARTING,
  appEXITING,
  wallpaperGUI,
  justDoIt,
  clock,
  systemInfo,
  netSpeed,
  screenshot,
  totalDownloads,
  vWatchDBG,
  weatherApi,
} = require('./tasks');


vWatch.newTask("STARTING", 0, appSTARTING, "DISABLED Task that should only fire once STARTING.", false);
vWatch.newTask("EXITING", 0, appEXITING, "DISABLED Task that should only fire once EXITING.", false);


vWatch.newTask("wallpaperGUI", baseTime, wallpaperGUI, "This will do the rendering of wallpaperGUI", config.backgroundUpdates);


vWatch.newTask("justDoIt", 750, justDoIt, "Demo Task Description Placeholder");
vWatch.disableTask("justDoIt");


vWatch.newTask("clock", baseTime, clock, "vWatch task that updates Clock in cache");

vWatch.newTask("systemInfoStats", baseTime, systemInfo, "Getting Current User and System Info");

vWatch.newTask("netSpeedTest", minutes(5), netSpeed, "Internet Speed Test");

vWatch.newTask("screenshot-desktop", minutes(5), screenshot, "Automatic Desktop Screenshots");

vWatch.newTask("totalDownloads", hours(12), totalDownloads, "Total Downloads");

vWatch.newTask("vWatchDBG", seconds(30), vWatchDBG, "vWatch Info Cache");

vWatch.newTask("weatherApi", hours(1), weatherApi, "Weather API Info Cache");


vWatch.runTask("STARTING");
