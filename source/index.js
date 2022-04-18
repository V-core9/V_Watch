//? Config
const {
  exitTimeout,
  cacheFilePath,
  saveConfigToFile,
  loadConfigFromFile,
} = require("./config");

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

  // Send Notification that we are about to stop running
  notify.app.stopping();

  // Save Cache
  cache.toFile(cacheFilePath);

  // Save Config
  saveConfigToFile();

  // wallpaperGUI Terminate
  wallpaperGUI.stop();

  // v_tray Terminate
  v_tray.destroy();

  // vWatch Terminate
  vWatch.stop();

  // Set timeout to wait for all tasks to finish
  setTimeout(() => process.exit(0), exitTimeout);

});
