const V_Core_Cache = require('v_core_cache');
const V_Watch  = require('./v_watch');

module.exports = {
  vWatch: new V_Watch({ interval: 500 }),
  cache: new V_Core_Cache()
};
