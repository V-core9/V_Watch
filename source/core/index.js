const V_Core_Cache = require('v_core_cache');
const Watch = require('./Watch');

module.exports = {
  cache: new V_Core_Cache(),
  watch: new Watch(),
};
