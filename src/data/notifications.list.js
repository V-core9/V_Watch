const notifList = {
  example: {
      title: 'My notification',
      message: 'Hello, there!',
  },
  app : {
    starting: {
      appID: process.title,
      title: 'v_watch - Starting',
      message: 'OS Monitor STARTING...🚀',
    },
    stopping: {
        appID: process.title,
        title: 'v_watch - Exiting',
        message: 'vOS Monitor STOPPING...🙋‍♂️',
    },
    lowsysmem: {
        appID: process.title,
        title: 'v_watch - Starting',
        message: 'Your RAM is getting full.',
    }
  },
  tray : {
    backgroundContinue: {
      appID: process.title,
      title: 'v_watch - Background',
      message: 'vOS Monitor is running in background.',
    },
    firstItem: {
      appID: process.title,
      title: 'v_watch - v_tray  _.:.:._  firstItem ',
      message: 'You have clicked firstItem.'
    },
    secondItem: {
        appID: process.title,
        title: 'v_watch - v_tray  _.:.:._  secondItem ',
        message: 'You have clicked secondItem.',
    }
  }
};

console.log(notifList);

module.exports = notifList;
