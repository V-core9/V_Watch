const config = require('../config');


module.exports = function V_Watch(data = {}) {


  this.interval = data.interval || 1000;
  this.autoStart = data.autoStart || false;

  this.loopCore = null;

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

      if (this.loopCore !== null) return false;

      this.loopCore = setInterval(this.tick, this.interval);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };


  this.stop = async () => {
    try {
      if (this.loopCore === null) return false;

      if (config.debug) console.log("V_Watch: STOPPING ...");
      clearInterval(this.loopCore);
      this.loopCore = null;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };


  this.newTask = async (key, interval, callback, description = "", enabled = true) => {
    try {
      vwTasks[key] = {
        interval: interval || this.interval,
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



  this.changeInterval = async (value = this.interval) => {
    await this.stop();
    this.interval = value;
    await this.start();
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


  this.stats = async () => {
    return {
      status: (this.loopCore !== null) ? true : false,
      interval: this.interval, // in milliseconds
      autoStart: this.autoStart,
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




  if (this.autoStart) this.start();


};
