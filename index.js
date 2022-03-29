console.time("v_watch_:.:_Application_BOOT_Time");


// System Background GUI
const backgroundGUI = require('./src/V_BackgroundGUI');
var vBackgroundGUI = new backgroundGUI({ interval: 1000, scale: 1 });


// Windows System Tray Icon and Menu
require('./src/helpers/v_tray');


// v_watch - Tasks Queue Runner
require('./src/v_watch');


console.timeEnd("v_watch_:.:_Application_BOOT_Time");
