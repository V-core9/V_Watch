module.exports = {


  v_tray: require('./v_tray'),

  notify: require('./v_notify'),

  v_os: require('./v_os'),

  vTime: require('./vTime'),

  roundNumber: (val, i = 0) => {
    i = Math.pow(10, i);
    return Math.round(val * i) / i;
  },


  getRandomInt: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },


  getRandomFloat: (min, max) => {
    return Math.random() * (max - min) + min;
  },


  getRandomColor: () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  },



};
