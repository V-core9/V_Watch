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
  }
}


module.exports = Votify;
