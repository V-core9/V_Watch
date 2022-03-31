const config = require('../config');
const wallpaperGUI = require('../wallpaperGUI/init');

// v_watch - Tasks Queue Runner
const V_Watch = require('.');
const vWatch = new V_Watch({ interval: 50 });


module.exports = vWatch;
