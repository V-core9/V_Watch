

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

//? Debugging
const vWatchDebug = require('./vWatchDebug');



const config = require('../config');
const { vWatch } = require("../core");
const { vTime } = require('../helpers');



module.exports = sysTasks = async () => {

  //* This will do the rendering of wallpaperGUI.
  await vWatch.newTask("wallpaperGUI", vTime.seconds(config.redrawTime), wallpaperGUI, "This will do the rendering of wallpaperGUI");
  // This Tasks status should match config.backgroundUpdates value.
  await vWatch.setTaskStatus("wallpaperGUI", config.backgroundUpdates);



  //* DEMO/SAMPLE TASKS TO have [DISABLED]
  await vWatch.newTask("justDoIt", 750, justDoIt, "Demo Task Description Placeholder");
  await vWatch.disableTask("justDoIt");



  //* CLOCK Task
  await vWatch.newTask("clock", vTime.seconds(config.redrawTime), clockUpdate, "vWatch task that updates Clock in cache");



  //* Getting Current User&Device Info
  await vWatch.newTask("systemInfoStats", vTime.seconds(config.redrawTime), async () => await systemInfoStats(vTime.seconds(config.redrawTime)), "Getting Current User and System Info");



  //* Internet Speed Test
  await vWatch.newTask("netSpeedTest", vTime.minutes(30), netSpeedTest, "Internet Speed Test");
  await vWatch.disableTask("netSpeedTest");



  //* vWatch Info Cache
  await vWatch.newTask("vWatchDBG", vTime.minutes(1), vWatchDebug, "vWatch Info Cache");


};