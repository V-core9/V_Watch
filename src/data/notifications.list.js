const notificationList = {


  example: {
      title: 'My notification',
      message: 'Hello, there!',
  },


  app : {
    starting: {
      appID: process.title,
      title: 'Application Starting',
      message: 'OS Monitor STARTING...🚀',
    },
    stopping: {
        appID: process.title,
        title: 'Application Exiting',
        message: 'vOS Monitor STOPPING...🙋‍♂️',
    },
    lowsysmem: {
        appID: process.title,
        title: 'WARNING: Low RAM',
        message: 'Your RAM is getting full.',
    }
  },


  wallpaperGUI: {
    enabled: {
      appID: process.title,
      title: 'Wallpaper GUI -  ✅',
      message: 'Wallpaper updates have been enabled.',
    },
    disabled: {
      appID: process.title,
      title: 'Wallpaper GUI - 🔻',
      message: 'Wallpaper updates have been disabled.',
    }
  },


};


module.exports = notificationList;
