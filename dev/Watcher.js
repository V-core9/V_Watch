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
          this.cb();
          this.emit('run');
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
    this.isRunning = async () => (loop !== null);


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



    //? ALIASES:
    //* this.end()
    this.stop = this.end;
    //* this.begin()
    this.start = this.begin;
    //* this.isRunning()
    this.isActive = this.isRunning;
    //* this.setInterval()
    this.changeInterval = this.setInterval;


    //! AutoStart if not disabled
    if (autoStart) this.start();

  }

};

