const config = require('./src/config');
config.loadConfigFromFile();
process.title = '-v-';

const notify = require('./src/helpers/v_notify');
notify.app.starting();

// System Background GUI
const backgroundGUI = require('./src/V_BackgroundGUI');
var vBackgroundGUI = new backgroundGUI({ interval: 20000, scale: 1, autoInit: false });


// Windows System Tray Icon and Menu
const v_tray = require('./src/helpers/v_tray');


// v_watch - Tasks Queue Runner
const V_Watch = require('./src/v_watch');
const vWatch = new V_Watch({ interval: 50 });

//* DEMO/SAMPLE TASKS TO RUN
vWatch.newTask("printToConsole", 500, () => console.log("printToConsole PRINT TO CONSOLE TASK"));
vWatch.newTask("justDoIt", 750, () => console.log("justDoIt PRINT TO CONSOLE TASK"));

//! FEW REAL TASKS 
vWatch.newTask("vBackgroundGUI", 2000, async () => await vBackgroundGUI.render());
vWatch.setTaskStatus("vBackgroundGUI", config.backgroundUpdates);


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


module.exports = {
  setTaskStatus: (name, value) => vWatch.setTaskStatus(name, value)
};