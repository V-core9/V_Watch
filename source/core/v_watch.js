const config = require('../config');


module.exports = function V_Watch(cfg = {}) {


  interval = cfg.interval || 1000;
  autoStart = cfg.autoStart || false;

  let loopCore = null;

  const vwTasks = {};


  this.tick = async () => {

    for (const taskId in vwTasks) {
      const task = vwTasks[taskId];

      if ((task.lastRun + task.interval) <= Date.now() && task.enabled) {
        if (config.debug) console.log("Executing: " + taskId);
        task.callback();
        task.lastRun = Date.now();
        task.runs++;
      }
    }

    if (config.debug) console.log('Tick!');

  };


  this.start = async () => {
    try {
      if (config.debug) console.log("V_Watch: STARTING >>>");

      if (loopCore !== null) return false;

      loopCore = setInterval(this.tick, interval);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };


  this.stop = async () => {
    try {
      if (loopCore === null) return false;

      if (config.debug) console.log("V_Watch: STOPPING ...");
      clearInterval(loopCore);
      loopCore = null;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };


  this.newTask = async (key, inter, callback, description = "", enabled = true) => {
    try {
      vwTasks[key] = {
        interval: (!isNaN(inter)) ? inter : interval,
        callback: callback,
        description: description,
        enabled: enabled,
        lastRun: 0,
        runs: 0,
      };
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };


  this.disableTask = async (key) => {
    return await this.setTaskStatus(key, false);
  };


  this.enableTask = async (key) => {
    return await this.setTaskStatus(key, true);
  };


  this.setTaskStatus = async (key, value) => {
    if (typeof value === "boolean") {
      if (vwTasks[key]) {
        vwTasks[key].enabled = value;
      } else {
        console.log("V_Watch: Task not found: " + key);
      }
    } else {
      console.log("V_Watch: Invalid value: " + value);
    }
  };


  this.getTask = (key) => {
    return vwTasks[key] || undefined;
  };


  // All Tasks Listing
  this.getAllTasks = async () => {
    return vwTasks;
  };


  this.hasTask = (key) => (vwTasks[key]) ? true : false;


  this.totalTasksCount = async () => Object.keys(vwTasks).length;


  this.activeTasksCount = async () => {
    let count = 0;
    for (const task in vwTasks) {
      if (vwTasks[task].enabled) {
        count++;
      }
    }
    return count;
  };


  this.disabledTasksCount = async () => {
    let count = 0;
    for (const task in vwTasks) {
      if (!vwTasks[task].enabled) {
        count++;
      }
    }
    return count;
  };



  this.changeInterval = async (value = interval) => {
    let runningStatus = await this.status();
    interval = (!isNaN(value) && value > 10) ? value : interval;
    if (runningStatus) {
      await this.stop();
      await this.start();
    }
  };


  this.updateTaskInterval = async (key, value) => {
    if (vwTasks[key]) {
      vwTasks[key].interval = value;
      return true;
    } else {
      console.log("V_Watch: Task not found: " + key);
      return false;
    }
  };

  this.status = async () => (loopCore !== null);

  this.stats = async () => {
    return {
      status: await this.status(),
      interval: interval,
      autoStart: autoStart,
      disabledTasksCount: await this.disabledTasksCount(),
      activeTasksCount: await this.activeTasksCount(),
      totalTasksCount: await this.totalTasksCount(),
    };
  };


  this.runTask = async (key) => {
    try {
      const task = vwTasks[key];
      task.callback();
      task.lastRun = Date.now();
      task.runs++;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };




  if (autoStart) this.start();


};
