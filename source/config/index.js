const v_fs = require('v_file_system');
const path = require('path');
const { fstat } = require('fs');


process.title = '-v-';


const config = {


  /*
  * Debug Enable/Disable
  */
  debugMode: false,

  set debug(value) {
    return (typeof value === 'boolean') ? config.debugMode = value : false;
  },

  get debug() {
    return config.debugMode;
  },

  toggleDebug() {
    config.debug = !config.debug;
  },



  /*
  * BackgroundUpdates Status
  */
  bgUpdates: true,

  set backgroundUpdates(value) {
    if (typeof value === 'boolean') {
      const { vWatch } = require('../core');
      config.bgUpdates = value;
      if (vWatch.hasTask("wallpaperGUI")) vWatch.setTaskStatus('wallpaperGUI', value);
      return true;
    } else {
      return false;
    }
  },

  get backgroundUpdates() {
    return config.bgUpdates;
  },

  toggleBackgroundUpdates() {
    config.backgroundUpdates = !config.backgroundUpdates;
  },




  /*
  * Notifications Enable/Disable
  */
  notify: true,

  set notifications(value) {
    return (typeof value === 'boolean') ? config.notify = value : false;
  },

  get notifications() {
    return config.notify;
  },

  toggleNotifications() {
    config.notifications = !config.notifications;
  },




  /*
  * Try to SET some Key to Value
  */
  set(key, value) {
    try {
      config[key] = value;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },




  /*
  * FILE - Save/Read Config
  */
  fileLocation: path.join(__dirname, '../data/userConfig.json'),

  saveConfigToFile() {

    var data = {
      debug: config.debug,
      notifications: config.notifications,
      backgroundUpdates: config.backgroundUpdates,
      extendedInfo: config.extendedInfo,
    };

    return v_fs.writeSy(config.fileLocation, `${JSON.stringify(data, null, 2)}`);

  },

  loadConfigFromFile() {
    try {
      const userConfig = JSON.parse(v_fs.readSy(config.fileLocation, 'utf8'));
      console.log(userConfig);

      if (userConfig.debug !== undefined) config.debug = userConfig.debug;
      if (userConfig.notifications !== undefined) config.notifications = userConfig.notifications;
      if (userConfig.backgroundUpdates !== undefined) config.backgroundUpdates = userConfig.backgroundUpdates;
      if (userConfig.extendedInfo !== undefined) config.extendedInfo = userConfig.extendedInfo;

      return userConfig;
    } catch (error) {
      console.log(error);
      return false;
    }
  },




  /*
  ! EXITING Timeout
  */
  _exitTimeout: 1000,

  set exitTimeout(value) {
    return (!isNaN(value)) ? config._exitTimeout = value : false;
  },

  get exitTimeout() {
    return config._exitTimeout;
  },




  /*
  * Redraw Interval / System Stats Gathering Interval
  */
  redrawTime: process.env.WALLPAPER_INTERVAL || 5,


  /*
  * extendedInfo Enable/Disable
  */
  _extendedInfo: false,

  set extendedInfo(value) {
    return (typeof value === 'boolean') ? config._extendedInfo = value : false;
  },

  get extendedInfo() {
    return config._extendedInfo;
  },

  toggleExtendedInfo() {
    config.extendedInfo = !config.extendedInfo;
  },


  cacheFilePath: path.join(__dirname, "../data/$_cache.json"),



  _exiting: false,

  set exiting(value) {
    return (typeof value === 'boolean') ? config._exiting = value : false;
  },

  get exiting() {
    return config._exiting;
  },


  // Weather Config.
  weatherApiKey: v_fs.readSy(path.join(__dirname, "openweather_api_key.txt")) || '',

  weatherCity: "Kljajicevo",

  weatherUnits: "metric",

};

module.exports = config;
