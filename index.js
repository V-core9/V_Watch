const config = require('./src/config');
config.loadConfigFromFile();
process.title = '-v-';

const notify = require('./src/helpers/v_notify');
notify.app.starting();


// Windows System Tray Icon and Menu
const v_tray = require('./src/helpers/v_tray');

// vBackgroundGUI - Background GUI
const vBackgroundGUI = require('./src/vBackgroundGUI');

// vWatch - Tasks Runner
const vWatch = require('./src/vWatch');

// Exit Handler
process.on('SIGINT', () => {
  console.log("Caught interrupt signal");


  config.saveConfigToFile();

  // vBackgroundGUI Terminate
  vBackgroundGUI.stop();

  // v_tray Terminate
  v_tray.destroy();

  // vWatch Terminate
  vWatch.stop();

  // Send Notification that we are about to stop running
  notify.app.stopping();

  // Set timeout to wait for all tasks to finish
  setTimeout(() => process.exit(0), 1000);
});
