const vTime = {
  seconds: (val = 1) => {
    return val * 1000;
  },
  minutes: (val = 1) => {
    return vTime.seconds(val * 60);
  },
  hours: (val = 1) => {
    return vTime.minutes(val * 60);
  },
  days: (val = 1) => {
    return vTime.hours(val * 24);
  },
  weeks: (val = 1) => {
    return vTime.days(val * 7);
  }
};

module.exports = vTime;
