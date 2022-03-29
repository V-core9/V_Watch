const notifList = {
  example: {
      title: 'My notification',
      message: 'Hello, there!',
  },
  app : {
    starting: {
      appID: "v_watch",
      title: 'v_watch - Starting',
      message: 'OS Monitor STARTING...🚀',
    },
    stopping: {
        appID: "v_watch",
        title: 'v_watch - Exiting',
        message: 'vOS Monitor STOPPING...🙋‍♂️',
    },
    lowsysmem: {
        appID: "v_watch",
        title: 'v_watch - Starting',
        message: 'Your RAM is getting full.',
    }
  },
  tray : {
    firstItem: {
      appID: "v_watch",
      title: 'v_watch - v_tray  _.:.:._  firstItem ',
      message: 'You have clicked firstItem.'
    },
    secondItem: {
        appID: "v_watch",
        title: 'v_watch - v_tray  _.:.:._  secondItem ',
        message: 'You have clicked secondItem.',
    }
  }
};

console.log(notifList);

module.exports = notifList;
