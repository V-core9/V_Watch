const vCache = require("./src/vCache");
const config = require("./src/config");
const notify = require("./src/helpers/v_notify");

config.loadConfigFromFile();
notify.app.starting();
vCache.fromFile("sample.json");

// Windows System Tray Icon and Menu
const v_tray = require("./src/helpers/v_tray");

// wallpaperGUI - Background GUI
const wallpaperGUI = require("./src/wallpaperGUI");

// vWatch - Tasks Runner
const vWatch = require("./src/v_watch");

require("./src/sysTasks")(vWatch);

// Exit Handler
process.on("SIGINT", async () => {
  console.log("Caught interrupt signal");

  vCache.toFile('sample.json');
  config.saveConfigToFile();

  // wallpaperGUI Terminate
  wallpaperGUI.stop();

  // v_tray Terminate
  v_tray.destroy();

  // vWatch Terminate
  vWatch.stop();

  // Send Notification that we are about to stop running
  notify.app.stopping();

  // Set timeout to wait for all tasks to finish
  setTimeout(() => process.exit(0), config.exitTimeout);
});
