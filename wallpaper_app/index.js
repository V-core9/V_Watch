const config = require('./config');
config.loadConfigFromFile();

const { watch } = require("./core");

const { vTime } = require('v_core_timers');
const { seconds, minutes, hours } = vTime;


const tasks = require('./tasks');
const { appTasks, builtinTasks, customTasks } = tasks;
const { STARTING, EXITING, vWatchDBG } = appTasks;
const { clock, wallpaper, systemInfoStats, netSpeedTest, screenshotDesktop } = builtinTasks;
const { justDoIt, weatherApi, totalDownloads } = customTasks;

(async () => {
  //* Base time
  const baseTime = await seconds(config.redrawTime);

  //! App Tasks
  await watch.new("STARTING", 0, STARTING, false);
  await watch.new("EXITING", 0, EXITING, false);
  await watch.new("vWatchDBG", await seconds(30), vWatchDBG);
  await watch.run("vWatchDBG");


  //? Builtin Tasks
  await watch.new("screenshot-desktop", await minutes(5), screenshotDesktop);
  await watch.run("screenshot-desktop");

  await watch.new("wallpaper_render", baseTime, wallpaper.render, config.backgroundUpdates);

  let wallpaperTask = await watch.get("wallpaper_render");
  wallpaperTask.on('run', wallpaper.set);

  await watch.run("wallpaper_render");


  await watch.new("clock", baseTime, clock);
  await watch.run("clock");

  await watch.new("systemInfoStats", baseTime, systemInfoStats);
  await watch.run("systemInfoStats");

  await watch.new("netSpeedTest", await minutes(5), netSpeedTest);
  await watch.run("netSpeedTest");


  //* Custom Tasks
  await watch.new("justDoIt", 750, justDoIt, false);

  await watch.new("weatherApi", await hours(1), weatherApi);
  await watch.run("weatherApi");

  await watch.new("totalDownloads", await hours(12), totalDownloads);
  await watch.run("totalDownloads");


  await watch.run("STARTING");
})();
