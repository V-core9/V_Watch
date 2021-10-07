const os = require('os');

const vNodeOS = {
  EOL: function () {
    return os.EOL;
  },
  arch: function () {
    return os.arch();
  },
  constants: function () {
    return os.constants;
  },
  cpus: function () {
    return os.cpus();
  },
  devNull: function () {
    return os.devNull;
  },
  endianness: function () {
    return os.endianness();
  },
  freemem: function () {
    return os.freemem();
  },
  getPriority: function () {
    return os.getPriority();
  },
  homedir: function () {
    return os.homedir();
  },
  hostname: function () {
    return os.hostname();
  },
  loadavg: function () {
    return os.loadavg();
  },
  networkInterfaces: function () {
    return os.networkInterfaces();
  },
  platform: function () {
    return os.platform();
  },
  release: function () {
    return os.release();
  },
  setPriority: function ( priorityVal = 18) {
    return os.setPriority(priorityVal);
  },
  tmpdir: function () {
    return os.tmpdir();
  },
  totalmem: function () {
    return os.totalmem();
  },
  type: function () {
    return os.type();
  },
  uptime: function () {
    return os.uptime();
  },
  userInfo: function () {
    return os.userInfo();
  },
  version: function () {
    return os.version();
  },
  freememproc: function () {
    return Math.trunc(( this.freemem() / this.totalmem() ) * 100) ;
  }
};

module.exports = vNodeOS
