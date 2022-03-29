console.time("v_watch_:.:_Application_BOOT_Time");
const notify = require('./src/helpers/v_notify');

notify.app.starting();

// System Background GUI
const backgroundGUI = require('./src/V_BackgroundGUI');
var vBackgroundGUI = new backgroundGUI({ interval: 30000, scale: 1 });


// Windows System Tray Icon and Menu
require('./src/helpers/v_tray');


// v_watch - Tasks Queue Runner
require('./src/v_watch');


// Exit Handler
process.on('SIGINT', () => {
  console.log("Caught interrupt signal");

  // vBackgroundGUI Terminate
  vBackgroundGUI.stop();

  // Send Notification that we are about to stop running
  notify.app.stopping();

  // Set timeout to wait for all tasks to finish
  setTimeout(() => process.exit(0), 1000);
});

console.timeEnd("v_watch_:.:_Application_BOOT_Time");
