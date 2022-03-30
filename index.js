const notify = require('./src/helpers/v_notify');
notify.app.starting();

// System Background GUI
const backgroundGUI = require('./src/V_BackgroundGUI');
var vBackgroundGUI = new backgroundGUI({ interval: 3000, scale: 1 });


// Windows System Tray Icon and Menu
const v_tray = require('./src/helpers/v_tray');


// v_watch - Tasks Queue Runner
require('./src/v_watch');


// Exit Handler
process.on('SIGINT', () => {
  console.log("Caught interrupt signal");

  // vBackgroundGUI Terminate
  vBackgroundGUI.stop();
  
  // v_tray Terminate
  v_tray.destroy();

  // Send Notification that we are about to stop running
  notify.app.stopping();

  // Set timeout to wait for all tasks to finish
  setTimeout(() => process.exit(0), 1000);
});
