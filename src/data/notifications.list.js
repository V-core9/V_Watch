const notifList = {
  example: {
      title: 'My notification',
      message: 'Hello, there!'
  },
  app : {
    starting: {
      title: 'V_Observer - Starting',
      message: 'OS Monitoring STARTING...'
    },
    stopping: {
        title: 'V_Observer - Starting',
        message: 'OS Monitoring STOPPING...'
    },
    lowsysmem: {
        title: 'V_Observer - Starting',
        message: 'Your RAM is getting full.'
    }
  }
};

console.log(notifList);

module.exports = notifList;
