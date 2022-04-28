const { V_Watch } = require('v_core_timers');

module.exports = {
  cache: require('./cache'),
  watch: new V_Watch(),
};
