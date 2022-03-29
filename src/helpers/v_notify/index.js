const notifier = require('node-notifier');
const notificationList = require('../../data/notifications.list');

const Votify = {
  app: {
    starting: () => notifier.notify(notificationList.app.starting),
    stopping: () => notifier.notify(notificationList.app.stopping),
    lowsysmem: () => notifier.notify(notificationList.app.lowsysmem)

  },
  tray: {
    leftClick: () => {
      notifier.notify(notificationList.tray.leftClick);
    },
    rightClick: () => {
      notifier.notify(notificationList.tray.rightClick);
    }
  }
};


module.exports = Votify;
