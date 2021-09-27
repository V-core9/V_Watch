const notifList = {
  example: {
      title: 'My notification',
      message: 'Hello, there!'
  },
  app : {
    starting: {
      appID: "V_Observer",
      title: 'V_Observer - Starting',
      message: 'OS Monitoring STARTING...'
    },
    stopping: {
        appID: "V_Observer",
        title: 'V_Observer - Starting',
        message: 'OS Monitoring STOPPING...'
    },
    lowsysmem: {
        appID: "V_Observer",
        title: 'V_Observer - Starting',
        message: 'Your RAM is getting full.'
    }
  },
  tray : {
    leftClick: {
      appID: "V_Observer",
      title: 'V_Observer -TRAY- leftClick ',
      message: 'You have clicked left click....'
    },
    rightClick: {
        appID: "V_Observer",
        title: 'V_Observer -TRAY- rightClick ',
        message: 'You have clicked right click....'
    }
  }
};

console.log(notifList);

module.exports = notifList;
