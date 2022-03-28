const notifList = {
  example: {
      title: 'My notification',
      message: 'Hello, there!',
  },
  app : {
    starting: {
      appID: "v_watch",
      title: 'v_watch - Starting',
      message: 'OS Monitoring STARTING...',
    },
    stopping: {
        appID: "v_watch",
        title: 'v_watch - Starting',
        message: 'OS Monitoring STOPPING...',
    },
    lowsysmem: {
        appID: "v_watch",
        title: 'v_watch - Starting',
        message: 'Your RAM is getting full.',
    }
  },
  tray : {
    leftClick: {
      appID: "v_watch",
      title: 'v_watch - v_tray  _.:.:._  LEFT_CLICK ',
      message: 'You have clicked left click....'
    },
    rightClick: {
        appID: "v_watch",
        title: 'v_watch - v_tray  _.:.:._  RIGHT_CLICK ',
        message: 'You have clicked right click....',
    }
  }
};

console.log(notifList);

module.exports = notifList;
