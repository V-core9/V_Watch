
// System Background GUI
const backgroundGUI = require('./class');
var wallpaperGUI = new backgroundGUI({ interval: 20000, scale: 2, autoInit: false, quality: 50 });

module.exports = wallpaperGUI;
