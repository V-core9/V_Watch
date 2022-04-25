
//? Config
const config = require("../../config");
const { exitTimeout, cacheFilePath, saveConfigToFile, } = config;

const { cache, watch } = require("../../core");
const { notify, v_tray } = require("../../helpers");

const { wallpaper } = require("../builtin");


module.exports = application_exit = async () => {

  config.exiting = true;
  // Send Notification that we are about to stop running
  await notify.app.stopping();

  // Save Cache
  await cache.toFile(cacheFilePath);

  // Save Config
  await saveConfigToFile();

  // wallpaperGUI Terminate
  await wallpaper.render();

  // vWatch Terminate
  await watch.end();

  // v_tray Terminate
  await v_tray.stop();

  // Set timeout to wait for all tasks to finish
  setTimeout(() => process.exit(0), exitTimeout);

};
