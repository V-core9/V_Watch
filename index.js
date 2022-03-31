const config = require('./src/config');
config.loadConfigFromFile();

const notify = require('./src/helpers/v_notify');
notify.app.starting();


// Windows System Tray Icon and Menu
const v_tray = require('./src/helpers/v_tray');

// wallpaperGUI - Background GUI
const wallpaperGUI = require('./src/wallpaperGUI/init');

// vWatch - Tasks Runner
const vWatch = require('./src/v_watch/init');




//* DEMO/SAMPLE TASKS TO RUN
vWatch.newTask("printToConsole", 500, () => console.log("printToConsole PRINT TO CONSOLE TASK"));
vWatch.newTask("justDoIt", 750, () => console.log("justDoIt PRINT TO CONSOLE TASK"));


//! FEW REAL TASKS

// This will do the rendering of wallpaperGUI.
vWatch.newTask("wallpaperGUI", 30000, async () => await wallpaperGUI.render());
// Setting Task status to match settings.
vWatch.setTaskStatus("wallpaperGUI", config.backgroundUpdates);




// Exit Handler
process.on('SIGINT', () => {
  console.log("Caught interrupt signal");


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
  setTimeout(() => process.exit(0), 1000);
});
