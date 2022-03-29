const notifier = require('node-notifier');
const notificationList = require('../../data/notifications.list');
const config = require('../config');

const notify = {

  
  app: {

    starting: () => {
      return config.notifications ? notifier.notify(notificationList.app.starting) : null;
    },

    stopping: () => {
      return config.notifications ? notifier.notify(notificationList.app.stopping) : null;
    },

    lowsysmem:() => {
      return config.notifications ? notifier.notify(notificationList.app.lowsysmem) : null;
    }

  },


  tray: {

    firstItem: () => {
      return config.notifications ? notifier.notify(notificationList.tray.firstItem) : null;
    },

    secondItem: () => {
      return config.notifications ? notifier.notify(notificationList.tray.secondItem) : null;
    },

  }


};


module.exports = notify;
