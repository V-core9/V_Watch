const EventEmitter = require('events');

const V_Core_Timer = require('./V_Core_Timer');


module.exports = class V_Watch extends EventEmitter {
  constructor(props = {}) {

    super(props);

    const tasksList = {};

    this.getAll = async () => tasksList;

    this.get = async (task) => tasksList[task];

    this.has = async (key) => (tasksList[key] !== undefined);

    this.keys = async () => Object.keys(tasksList);

    this.count = async () => (await this.keys()).length;

    this.new = async (name, interval, cb, autoStart = true) => {
      let task = new V_Core_Timer({ interval, cb, autoStart });
      tasksList[name] = task;
      this.emit('new', task);
      return true;
    };

    this.delete = async (key) => {
      try {
        await tasksList[key].end();
        delete tasksList[key];
        this.emit('delete', key);
        return true;
      } catch (e) {
        console.warn(e);
        return false;
      }
    };

    this.end = async () => {
      for (let key in tasksList) {
        this.delete(key);
      }
      this.emit('end');
      return true;
    };

    this.stop = async (key) => {
      try {
        let task = await this.get(key);
        await task.end();
        this.emit('stop', task);
        return true;
      } catch (err) {
        console.warn(err);
        return false;
      }

    };

    this.start = async (key) => {
      try {
        let task = await this.get(key);
        await task.start();
        this.emit('start', task);
        return true;
      } catch (err) {
        console.warn(err);
        return false;
      }
    };

    this.run = async (key) => {
      try {
        let task = await this.get(key);
        await task.run();
        this.emit('run', task);
        return true;
      } catch (err) {
        console.warn(err);
        return false;
      }
    };

    this.countActive = async () => {
      let count = 0;
      for (const task in tasksList) {
        if (await tasksList[task].isActive()) {
          count++;
        }
      }
      return count;
    };

    this.countInactive = async () => (await this.count() - await this.countActive());

    this.stats = async () => {
      return {
        status: true,
        interval: 500,
        autoStart: true,
        disabledTasksCount: await this.countInactive(),
        activeTasksCount: await this.countActive(),
        totalTasksCount: await this.count(),
      };
    };

  }
};
