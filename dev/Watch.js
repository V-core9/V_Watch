const EventEmitter = require('events');

const Watcher = require('./Watcher');


module.exports = class Core_Watch extends EventEmitter {
  constructor(props = {}) {

    super(props);

    const tasksList = {};

    this.new = async (name, interval, cb, autoStart = true) => {
      let task = new Watcher({ interval, cb, autoStart });
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

    this.getAll = async () => tasksList;

    this.get = async (task) => tasksList[task];

    this.has = async (key) => (tasksList[key] !== undefined);

  }
};
