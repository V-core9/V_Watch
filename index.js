//? Config
const config = require("./src/config");
config.loadConfigFromFile();

//! Starting App Notification
const notify = require("./src/helpers/v_notify");
notify.app.starting();

//* Init and load cache if available
const cache = require("./src/cache");
cache.fromFile("./src/cache/$.json");



//? Windows System Tray Icon and Menu
const v_tray = require("./src/helpers/v_tray");


//? wallpaperGUI - Background GUI
const wallpaperGUI = require("./src/wallpaperGUI");


//? vWatch - Tasks Runner
const vWatch = require("./src/v_watch");
//* Init tasks
require("./src/sysTasks")(vWatch);



//! Exit Handler
process.on("SIGINT", async () => {

  // Send Notification that we are about to stop running
  notify.app.stopping();

  // Save Cache
  cache.toFile("./src/cache/$.json");

  // Save Config
  config.saveConfigToFile();

  // wallpaperGUI Terminate
  wallpaperGUI.stop();

  // v_tray Terminate
  v_tray.destroy();

  // vWatch Terminate
  vWatch.stop();

  // Set timeout to wait for all tasks to finish
  setTimeout(() => process.exit(0), config.exitTimeout);

});
