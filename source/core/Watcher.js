const EventEmitter = require('events');


module.exports = class Watcher extends EventEmitter {

  constructor(props = {}) {

    super(props);

    let loop = null;

    let autoStart = (typeof props.autoStart === 'boolean') ? props.autoStart : true;

    this.interval = (!isNaN(props.interval) && props.interval > 0) ? props.interval : 100;
    this.cb = (typeof props.cb === 'function') ? props.cb : () => console.warn("missing callback");


    //* Begin/Start It
    this.begin = async () => {
      let result = false;
      if (loop === null) {
        loop = setInterval(async () => {
          this.run();
        }, this.interval);
        result = true;
      }
      this.emit('start', result);
      return result;
    };


    //* End/Stop it
    this.end = async () => {
      if (loop !== null) {
        clearInterval(loop);
        loop = null;
      }
      let result = (loop === null);
      this.emit('end', result);
      return result;
    };


    //* Is Running Status Check
    this.status = async () => (loop !== null);


    //* Change Interval
    this.setInterval = async (val = this.interval) => {
      if (isNaN(val) || val <= 0) return false;

      this.interval = val;

      if (await this.isRunning()) {
        this.end();
        this.begin();
      }

      return true;
    };


    //? HELPERS:
    //* Getting Interval
    this.getInterval = async () => this.interval;

    this.run = async () => {
      this.cb();
      this.emit('run');
    };

    //? ALIASES:
    //* this.end()
    this.stop = async () => await this.end();
    //* this.begin()
    this.start = async () => await this.begin();
    //* this.status()
    this.isActive = async () => await this.status();
    //* this.setInterval()
    this.changeInterval = async (val) => await this.setInterval(val);


    //! AutoStart if not disabled
    if (autoStart) this.start();

  }

};

