const { cache, vWatch } = require('../core');


module.exports = vWatchDebug = async () => {

  let vwDbgInfo = {
    status: (vWatch.loopCore !== null) ? true : false,
    tickInterval: vWatch.tickInterval, // in milliseconds
    frequency: (1000 / vWatch.tickInterval),
    autoStart: vWatch.autoStart,
    disabledTasksCount: await vWatch.disabledTasksCount(),
    activeTasksCount: await vWatch.activeTasksCount(),
    totalTasksCount: await vWatch.totalTasksCount(),
    vWatchVersion: vWatch.version,
    tasks: await vWatch.allTasks(),
  };

  await cache.set("vWatchDBG", vwDbgInfo);

};
