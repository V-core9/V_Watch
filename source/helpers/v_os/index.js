const os = require('os');

const v_os = {};

Object.keys(os).forEach(key => {
  v_os[key] = os[key];
});

v_os.freememproc = () => {
  return Math.trunc((v_os.freemem() / v_os.totalmem()) * 100);
};

var osu = require('node-os-utils');
Object.keys(osu).forEach(key => {
  v_os[key] = osu[key];
});


module.exports = v_os;
