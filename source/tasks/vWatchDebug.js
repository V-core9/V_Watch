const { cache, vWatch } = require('../core');


module.exports = vWatchDebug = async () => {

  let vwDbgInfo = {
    status: (vWatch.loopCore !== null) ? true : false,
    interval: vWatch.interval, // in milliseconds
    frequency: (1000 / vWatch.interval),
    autoStart: vWatch.autoStart,
    disabledTasksCount: await vWatch.disabledTasksCount(),
    activeTasksCount: await vWatch.activeTasksCount(),
    totalTasksCount: await vWatch.totalTasksCount(),
    tasks: await vWatch.getAllTasks(),
  };

  await cache.set("vWatchDBG", vwDbgInfo);

};
