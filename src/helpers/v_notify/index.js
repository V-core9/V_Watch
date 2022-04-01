const notifier = require('node-notifier');
const notificationList = require('../../data/notifications.list');
const config = require('../../config');


const sendNotification = async (notification) => {
  return config.notifications ? notifier.notify(notification) : null;
};


const notify = {


  app: {

    starting: async () => {
      return sendNotification(notificationList.app.starting);
    },

    stopping: async() => {
      return sendNotification(notificationList.app.stopping);
    },

    lowsysmem: async() => {
      return sendNotification(notificationList.app.lowsysmem);
    }

  },


  wallpaperGUI: async () => {
    let notificationItem = (config.backgroundUpdates) ? notificationList.wallpaperGUI.enabled : notificationList.wallpaperGUI.disabled;
    return sendNotification(notificationItem);
  },


};


module.exports = notify;
