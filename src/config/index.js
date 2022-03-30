const v_fs = require('v_file_system');
const path = require('path');

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

  fileLocation: path.join(__dirname, './userConfig.json'),

  saveConfigToFile() {

    var data = {
      debug: config.debug,
      notifications: config.notifications,
    };

    return v_fs.writeSy(config.fileLocation, `${JSON.stringify(data, null, 2)}`);

  },

  loadConfigFromFile() {
    try {
      const userConfig = JSON.parse(v_fs.readSy(config.fileLocation, 'utf8'));
      console.log(userConfig);

      if (userConfig.debug !== undefined) config.debug = userConfig.debug;
      if (userConfig.notifications !== undefined) config.notifications = userConfig.notifications;

      return userConfig;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

};

/*
config.loadConfigFromFile();
console.log(config.debug);
console.log(config.notifications);
*/

module.exports = config;