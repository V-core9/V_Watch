const v_fs = require('v_file_system');
const path = require('path');



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
      config.bgUpdates = value;
      require('../v_watch').setTaskStatus('wallpaperGUI', value);
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
  fileLocation: path.join(__dirname, './userConfig.json'),

  saveConfigToFile() {

    var data = {
      debug: config.debug,
      notifications: config.notifications,
      backgroundUpdates: config.backgroundUpdates,
      extendedInfo: config.extendedInfoStatus,
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
  exitingTimeout: 100,

  set exitTimeout(value) {
    return (!isNaN(value)) ? config.exitingTimeout = value : false;
  },

  get exitTimeout() {
    return config.exitingTimeout;
  },




  /*
  * Redraw Interval / System Stats Gathering Interval
  */
  redrawTime: 1,


  /*
  * extendedInfo Enable/Disable
  */
  extendedInfoStatus: false,

  set extendedInfo(value) {
    return (typeof value === 'boolean') ? config.extendedInfoStatus = value : false;
  },

  get extendedInfo() {
    return config.extendedInfoStatus;
  },

  toggleExtendedInfo() {
    config.extendedInfo = !config.extendedInfo;
  },
};


module.exports = config;
