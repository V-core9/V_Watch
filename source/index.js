//? Config
const config = require("./config");
const {
  exitTimeout,
  cacheFilePath,
  saveConfigToFile,
  loadConfigFromFile,
} = config;

loadConfigFromFile();

//! Starting App Notification
const { notify, v_tray } = require("./helpers");
notify.app.starting();

//? vWatch - Tasks Runner
const { cache, vWatch } = require("./core");

//* Init and load cache if available
cache.fromFile(cacheFilePath);

//? wallpaperGUI - Background GUI
const wallpaperGUI = require("./wallpaperGUI");

//* Init the tasks
require("./tasks")();


//! Exit Handler
process.on("SIGINT", async () => {

  config.exiting = true;
  // Send Notification that we are about to stop running
  await notify.app.stopping();

  // Save Cache
  await cache.toFile(cacheFilePath);

  // Save Config
  await saveConfigToFile();

  // wallpaperGUI Terminate
  await wallpaperGUI.stop();

  // vWatch Terminate
  await vWatch.stop();

  // v_tray Terminate
  await v_tray.destroy();

  // Set timeout to wait for all tasks to finish
  setTimeout(() => process.exit(0), exitTimeout);

});
