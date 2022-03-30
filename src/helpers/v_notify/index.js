const notifier = require('node-notifier');
const notificationList = require('../../data/notifications.list');
const config = require('../../config');

const notify = {

  
  app: {

    starting: async () => {
      return config.notifications ? notifier.notify(notificationList.app.starting) : null;
    },

    stopping: async() => {
      return config.notifications ? notifier.notify(notificationList.app.stopping) : null;
    },

    lowsysmem: async() => {
      return config.notifications ? notifier.notify(notificationList.app.lowsysmem) : null;
    }

  },


  tray: {

    backgroundContinue : async () => {
      return config.notifications ? notifier.notify(notificationList.tray.backgroundContinue) : null;
    },
    firstItem: async () => {
      return config.notifications ? notifier.notify(notificationList.tray.firstItem) : null;
    },

    secondItem: async () => {
      return config.notifications ? notifier.notify(notificationList.tray.secondItem) : null;
    },

  }


};


module.exports = notify;
