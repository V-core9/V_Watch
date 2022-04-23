const { cache, customWatch } = require('../../core');


module.exports = vWatchDebug = async () => {

  let stats = await customWatch.stats();

  stats.frequency = 1000 / stats.interval;

  stats.tasks= await customWatch.getAllTasks();

  await cache.set("vWatchDBG", stats);

};
