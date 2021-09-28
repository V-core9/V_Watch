const notifier = require('node-notifier');
const notifList = require('../../data/notifications.list');

const Votify = {
  app : {
    starting: ()=> {
      notifier.notify(notifList.app.starting);
    },
    stopping: ()=> {
      notifier.notify(notifList.app.stopping);
    },
    lowsysmem: ()=> {
      notifier.notify(notifList.app.lowsysmem);
    }
  },
  tray : {
    leftClick: ()=> {
      notifier.notify(notifList.tray.leftClick);
    },
    rightClick: ()=> {
      notifier.notify(notifList.tray.rightClick);
    }
  }
}


module.exports = Votify;
