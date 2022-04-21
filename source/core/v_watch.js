const config = require('../config');


module.exports = function V_Watch(data = {}) {

  const vwTasks = {};

  this.version = "1.0.1";

  this.tickInterval = data.interval || 1000;
  this.autoStart = data.autoStart || true;

  this.loopCore = null;


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
    if (config.debug) console.log("V_Watch: STARTING >>>");
    this.loopCore = setInterval(this.tick, this.tickInterval);
  };


  this.stop = async () => {
    if (config.debug) console.log("V_Watch: STOPPING ...");
    clearInterval(this.loopCore);
    this.loopCore = null;
  };


  this.newTask = async (key, interval, callback, description = "") => {
    vwTasks[key] = {
      interval: interval || this.tickInterval,
      callback: callback,
      description: description,
      enabled: true,
      lastRun: 0,
      runs: 0,
    };
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
    return vwTasks[id] || null;
  };


  // All Tasks Listing
  this.getAllTasks = async () => {
    return vwTasks;
  };


  this.totalTasksCount = async () => Object.keys(vwTasks).length;


  this.activeTasksCount = async () => {
    let count = 0;
    for (const task in Object.values(vwTasks)) {
      if (task.enabled) {
        count++;
      }
    }
    return count;
  };


  this.disabledTasksCount = async () => {
    let count = 0;
    for (const task in Object.values(vwTasks)) {
      if (!task.enabled) {
        count++;
      }
    }
    return count;
  };



  if (this.autoStart) this.start();

}
