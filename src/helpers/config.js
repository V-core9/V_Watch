const config = {

  notify: true,

  set notifications(value) {
    return (typeof value === 'boolean') ? config.notify = value : false;
  },


  get notifications() {
    return config.notify;
  },


  toggleNotifications() {
    config.notifications = !config.notifications;
  },

  set(key, value) {
    try {
      config[key] = value;
      return true;
    } catch (error) {
      console.log(error);
      return false; 
    }
  }

};

module.exports = config;