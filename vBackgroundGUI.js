
// System Background GUI
const backgroundGUI = require('./src/V_BackgroundGUI');
var vBackgroundGUI = new backgroundGUI({ interval: 20000, scale: 1, autoInit: false });

module.exports = vBackgroundGUI;