const config = require('../config');
const vwTasks = {};

function V_Watch(data = {}) {

  this.version = "1.0.1";

  this.tickInterval = data.interval || 1000;
  this.autoStart = data.autoStart || true;

  this.loopCore = null;


  this.tick = () => {

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


  this.start = () => {
    if (config.debug) console.log("V_Watch: STARTING >>>");
    this.loopCore = setInterval(this.tick, this.tickInterval);
  };


  this.stop = () => {
    if (config.debug) console.log("V_Watch: STOPPING ...");
    clearInterval(this.loopCore);
    this.loopCore = null;
  };


  this.newTask = (id, interval, callback, description = "") => {
    vwTasks[id] = {
      interval: interval || this.tickInterval,
      callback: callback,
      description: description,
      enabled: true,
      lastRun: 0,
      runs: 0,
    };
  };


  this.disableTask = (id) => {
    return this.setTaskStatus(id, false);
  };


  this.enableTask = (id) => {
    return this.setTaskStatus(id, true);
  };


  this.setTaskStatus = (id, value) => {
    if (typeof value === "boolean") {
      if (vwTasks[id]) {
        vwTasks[id].enabled = value;
      } else {
        console.log("V_Watch: Task not found: " + id);
      }
    } else {
      console.log("V_Watch: Invalid value: " + value);
    }
  };


  this.getTask = (id) => {
    return vwTasks[id] || null;
  };


  this.tasksCount = async () => {
    return Object.keys(vwTasks).length;
  };


  this.totalTasksCount = async () => this.tasksCount();


  this.activeTasksCount = async () => {
    let count = 0;
    for (const taskId in vwTasks) {
      if (vwTasks[taskId].enabled) {
        count++;
      }
    }
    return count;
  };


  this.disabledTasksCount = async () => {
    let count = 0;
    for (const taskId in vwTasks) {
      if (!vwTasks[taskId].enabled) {
        count++;
      }
    }
    return count;
  };


  this.allTasks = async () => {
    return vwTasks;
  };


  this.activeTasks = async () => {
    const activeTasks = [];
    for (const taskId in vwTasks) {
      const task = vwTasks[taskId];
      if (task.enabled) {
        activeTasks.push(task);
      }
    }
    return activeTasks;
  };


  this.disabledTasks = async () => {
    const disabledTasks = [];
    for (const taskId in vwTasks) {
      const task = vwTasks[taskId];
      if (!task.enabled) {
        disabledTasks.push(task);
      }
    }
    return disabledTasks;
  };


  if (this.autoStart) this.start();

}


module.exports = V_Watch;
