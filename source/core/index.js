const V_Core_Cache = require('v_core_cache');
const cache = new V_Core_Cache();


const V_Watch  = require('./v_watch');
const vWatch = new V_Watch({ interval: 500 });

module.exports = {
  vWatch: vWatch,
  cache: cache
};
