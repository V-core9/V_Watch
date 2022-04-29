const notifier = require('node-notifier');
const notificationList = require('../data/notifications.list');
const config = require('../config');


const sendNotification = async (notification) => config.notifications ? notifier.notify(notification) : null;


const notify = {

  app: {
    starting: async () => sendNotification(notificationList.app.starting),
    stopping: async () => sendNotification(notificationList.app.stopping),
    lowsysmem: async () => sendNotification(notificationList.app.lowsysmem),
  },

  wallpaperGUI: async () => sendNotification((config.backgroundUpdates) ? notificationList.wallpaperGUI.enabled : notificationList.wallpaperGUI.disabled),

  extendedInfoToggle: async () => sendNotification((config.extendedInfo) ? notificationList.extendedInfo.enabled : notificationList.extendedInfo.disabled)

};


module.exports = notify;
