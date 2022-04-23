const EventEmitter = require('events');

module.exports = class Watcher extends EventEmitter {
    constructor(props = {}) {

        super(props);

        this._loop = null;

        this.name = props.name || "Missing Name";
        this.interval = props.interval || 100;
        this.cb = (typeof props.cb === 'function') ? props.cb : () => console.warn("missing callback");

        this.enabled = (typeof props.enabled === 'boolean') ? props.enabled : false;

        //? Begin/Start It
        this.begin = async () => {
            let result = false;
            if (this._loop === null) {
                this._loop = setInterval(async () => {
                    this.cb();
                    this.emit('run', { name: this.name, ts: Date.now() })
                }, this.interval);
                result = true;
            }
            this.emit('start', result);
            return result;
        };

        //* [this.begin()] - Alias
        this.start = async () => await this.begin();

        //? End/Stop it
        this.end = async () => {
            let result = false;
            if (this._loop !== null) {
                clearInterval(this._loop);
                this._loop = null;
                result = true;
            }
            this.emit('end', result);
            return result;
        };
        
        //* [this.end()] - Alias
        this.stop = async () => await this.end();

        //? Is Running Status Check
        this.isRunning = async () => (this._loop !== null);

        //* [this.isRunning()] - Alias
        this.isActive = async () => await this.isRunning();


        if (this.enabled) this.start();
    
    }
}

