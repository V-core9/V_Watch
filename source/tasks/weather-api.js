var weather = require('openweather-apis');
const { cache } = require('../core');
const config = require('../config');

weather.setLang('en');
// English - en, Russian - ru, Italian - it, Spanish - es (or sp),
// Ukrainian - uk (or ua), German - de, Portuguese - pt,Romanian - ro,
// Polish - pl, Finnish - fi, Dutch - nl, French - fr, Bulgarian - bg,
// Swedish - sv (or se), Chinese Tra - zh_tw, Chinese Sim - zh (or zh_cn),
// Turkish - tr, Croatian - hr, Catalan - ca

// check http://openweathermap.org/appid#get for get the APPID
weather.setAPPID(config.weatherApiKey);


module.exports = weatherApi = async () => {

  // set city by name
  weather.setCity(config.weatherCity);

  // 'metric'  'internal'  'imperial'
  weather.setUnits(config.weatherUnits);

  // get all the JSON file returned from server (rich of info)
  weather.getAllWeather(async (err, JSONObj) => {
    if (config.debug) console.log(JSONObj);
    await cache.set('weatherApi', JSONObj);
  });

};
