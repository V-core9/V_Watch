//? Config
const config = require("./config");
config.loadConfigFromFile();

//! Starting App Notification
const notify = require("./helpers/v_notify");
notify.app.starting();

//* Init and load cache if available
const cache = require("./cache");
cache.fromFile("./cache/$.json");



//? Windows System Tray Icon and Menu
const v_tray = require("./helpers/v_tray");


//? wallpaperGUI - Background GUI
const wallpaperGUI = require("./wallpaperGUI");


//? vWatch - Tasks Runner
const vWatch = require("./v_watch");
//* Init tasks
require("./sysTasks")(vWatch);



//! Exit Handler
process.on("SIGINT", async () => {

  // Send Notification that we are about to stop running
  notify.app.stopping();

  // Save Cache
  cache.toFile("./cache/$.json");

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
