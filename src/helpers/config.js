var allowNotifications = true;

module.exports = {


  set notifications(value) {
    if (typeof value === 'boolean') allowNotifications = value;
  },

  get notifications() {
    return allowNotifications;
  },


};