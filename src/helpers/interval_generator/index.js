const generateIntervalMS = {
  second(x = 1) {
    return (1000 * x);
  },
  minute(x = 1) {
    return (60 * this.second() * x);
  },
  hour(x = 1) {
    return (60 * this.minute() * x);
  },
  day(x = 1) {
    return (24 * this.hour() * x);
  },
  month(x = 1) {
    return (30 * this.day() * x);
  },
};

module.exports = generateIntervalMS;
