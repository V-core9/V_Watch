const config = require('../config');
const { vWatch } = require("../core");
const { vTime } = require('../helpers');

const { seconds, minutes, hours, days } = vTime;

//! System actions [ functions to call/use in vWatch Tasks List ]
// Example [justDoIt()]
const justDoIt = require('./justDoIt');

//? Internet Speed Test
const netSpeedTest = require('./internet-speed-test');

//? Trigger WallpaperGUI [re]Render
const wallpaperGUI = require('./render-wallpapergui');

//? System Info Stats
const systemInfoStats = require('./system-info-stats');

//? Clock Update
const clockUpdate = require('./clock-update');

//? NPM Total Downloads for list of packages
const totalDownloads = require('./total-downloads');

//? Debugging
const vWatchDebug = require('./vWatchDebug');


//! Base time
const baseTime = seconds(config.redrawTime);

module.exports = sysTasks = async () => {

  //* This will do the rendering of wallpaperGUI.
  await vWatch.newTask("wallpaperGUI", baseTime, wallpaperGUI, "This will do the rendering of wallpaperGUI");
  // This Tasks status should match config.backgroundUpdates value.
  await vWatch.setTaskStatus("wallpaperGUI", config.backgroundUpdates);


  //* DEMO/SAMPLE TASKS TO have [DISABLED]
  await vWatch.newTask("justDoIt", 750, justDoIt, "Demo Task Description Placeholder");
  await vWatch.disableTask("justDoIt");


  //* CLOCK Task
  await vWatch.newTask("clock", baseTime, clockUpdate, "vWatch task that updates Clock in cache");

  //* Getting Current User&Device Info
  await vWatch.newTask("systemInfoStats", baseTime, systemInfoStats, "Getting Current User and System Info");

  //* Internet Speed Test
  await vWatch.newTask("netSpeedTest", minutes(5), netSpeedTest, "Internet Speed Test");

  //* NPM Downloads
  await vWatch.newTask("totalDownloads", hours(12), totalDownloads, "Total Downloads");

  //* vWatch Info Cache
  await vWatch.newTask("vWatchDBG", seconds(30), vWatchDebug, "vWatch Info Cache");

};
