const config = require('../config');

const vCache = require('../vCache');
const v_os = require('../helpers/v_os');
const wallpaperGUI = require('../wallpaperGUI');

const { byteSizer } = require('v_file_system');

const vTimer = {
  seconds: (val = 1) => {
    return val * 1000;
  },
  minutes: (val = 1) => {
    return vTimer.seconds(val * 60);
  },
  hours: (val = 1) => {
    return vTimer.minutes(val * 60);
  },
  days: (val = 1) => {
    return vTimer.hours(val * 24);
  },
  weeks: (val = 1) => {
    return vTimer.days(val * 7);
  }
};

const { roundNumber } = require('../helpers');


const speedTest = require('speedtest-net');

const actions = {};

actions.renderWallpaper = async () => await wallpaperGUI.render();

actions.freememproc = async () => await vCache.set("freememproc", v_os.freememproc());

actions.freemem = async () => await vCache.set("freemem", roundNumber(byteSizer.byteToGiga(v_os.freemem()), 2));

actions.totalmem = async () => await vCache.set("totalmem", roundNumber(byteSizer.byteToGiga(v_os.totalmem())));

actions.currentDeviceUserInfo = async () => await vCache.set("currentDeviceUserInfo", (process.env.USERNAME + " [ " + v_os.version() + " | " + v_os.platform() + process.arch + " ]"));

actions.netSpeedTest = async () => {
  const netStats = await speedTest({ acceptLicense: true });
  console.log(netStats);
  await vCache.set("netSpeedTest", netStats);
};


const sampleReferenceInterval = vTimer.seconds(5);

actions.cpuInfoStats = async () => {
  const cpuUsage = await v_os.cpu.usage(sampleReferenceInterval);
  if (config.debug) console.log('cpuUSage: ' + cpuUsage);
  await vCache.set("cpuInfoStats", {count: v_os.cpu.count(), cpuUsage: cpuUsage});
};

module.exports = sysTasks = (vWatch) => {

  //* DEMO/SAMPLE TASKS TO RUN
  //vWatch.newTask("justDoIt", 750, () => console.log("justDoIt PRINT TO CONSOLE TASK"));


  //! FEW REAL TASKS

  // This will do the rendering of wallpaperGUI.
  // This Tasks status should match config.backgroundUpdates value.
  vWatch.newTask("wallpaperGUI", sampleReferenceInterval, actions.renderWallpaper);
  vWatch.setTaskStatus("wallpaperGUI", config.backgroundUpdates);


  vWatch.newTask("freememproc", sampleReferenceInterval, actions.freememproc);
  vWatch.newTask("freemem", vTimer.seconds(), actions.freemem);
  vWatch.newTask("totalmem", vTimer.minutes(2), actions.totalmem);

  vWatch.newTask("currentDeviceUserInfo", vTimer.seconds(2), actions.currentDeviceUserInfo);

  vWatch.newTask("v_osHostname", vTimer.seconds(), () => console.log(v_os.hostname()));
  vWatch.newTask("netSpeedTest", vTimer.minutes(30), actions.netSpeedTest);

  vWatch.newTask("cpuInfoStats", sampleReferenceInterval, actions.cpuInfoStats);
};
