const config = require('./config');
const vBackgroundGUI = require('./vBackgroundGUI');

// v_watch - Tasks Queue Runner
const V_Watch = require('./v_watch');
const vWatch = new V_Watch({ interval: 50 });


//* DEMO/SAMPLE TASKS TO RUN
vWatch.newTask("printToConsole", 500, () => console.log("printToConsole PRINT TO CONSOLE TASK"));
vWatch.newTask("justDoIt", 750, () => console.log("justDoIt PRINT TO CONSOLE TASK"));


//! FEW REAL TASKS 

// This will do the rendering of vBackgroundGUI.
vWatch.newTask("vBackgroundGUI", 2000, async () => await vBackgroundGUI.render());
// Setting Task status to match settings.
vWatch.setTaskStatus("vBackgroundGUI", config.backgroundUpdates);

module.exports = vWatch;