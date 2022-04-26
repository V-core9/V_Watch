const config = require('./config');
config.loadConfigFromFile();

const { watch } = require("./core");
const { seconds, minutes, hours } = require('./helpers').vTime;

//* Base time
const baseTime = seconds(config.redrawTime);

const tasks = require('./tasks');
const { appTasks, builtinTasks, customTasks } = tasks;
const { STARTING, EXITING, vWatchDBG } = appTasks;
const { clock, wallpaper, systemInfoStats, netSpeedTest, screenshotDesktop } = builtinTasks;
const { justDoIt, weatherApi, totalDownloads } = customTasks;

(async () => {

  //! App Tasks
  await watch.new("STARTING", 0, STARTING, false);
  await watch.new("EXITING", 0, EXITING, false);
  await watch.new("vWatchDBG", seconds(30), vWatchDBG);
  await watch.run("vWatchDBG");


  //? Builtin Tasks
  await watch.new("wallpaper_render", baseTime, wallpaper.render, config.backgroundUpdates);

  let wallpaperTask = await watch.get("wallpaper_render");
  wallpaperTask.on('run', wallpaper.set);

  await watch.run("wallpaper_render");


  await watch.new("clock", baseTime, clock);
  await watch.run("clock");

  await watch.new("systemInfoStats", baseTime, systemInfoStats);
  await watch.run("systemInfoStats");

  await watch.new("netSpeedTest", minutes(5), netSpeedTest);
  await watch.run("netSpeedTest");

  await watch.new("screenshot-desktop", minutes(5), screenshotDesktop);
  await watch.run("screenshot-desktop");


  //* Custom Tasks
  await watch.new("justDoIt", 750, justDoIt);
  await watch.stop("justDoIt");

  await watch.new("weatherApi", hours(1), weatherApi);
  await watch.run("weatherApi");

  await watch.new("totalDownloads", hours(12), totalDownloads);
  await watch.run("totalDownloads");


  await watch.run("STARTING");
})();
