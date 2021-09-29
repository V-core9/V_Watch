
const path = require("path")

const menu = [
  {
    id: 10,
    title: 'Item 1',
  },
  {
    id: 20,
    title: 'Item 2',
  },
  {
    id: 30,
    title: '---',
  },
  {
    id: 50,
    title: 'Exit',
  },
];


const SHUTDOWN_EVENTS = [
  'exit',
  'SIGINT',
  'SIGUSR1',
  'SIGUSR2',
  'SIGTERM',
  'uncaughtException',
];

const EventEmitter = require('events').EventEmitter;
const NodeTray = require("../../../node_modules/windows-tray/build/Release/tray").NodeTray;

const util = require('util')
util.inherits(NodeTray, EventEmitter)

process.title = 'Tray Demo';

const v_tray = new NodeTray(path.join(__dirname, "../../ASSETS/icon/rick.ico"))
v_tray.setToolTip(process.title);

v_tray.on('click', () => {

  let result = v_tray.toggleWindow(process.title);
  console.log("click, result = ", result);

});

v_tray.on('right-click', () => {

  // console.log("right-click");
  v_tray.showPopup(menu, function (err, result) {

    console.log('error:', err);
    console.log('result:', result);

    if (result == 50) {
      shutdown();
      return;
    }

  });


v_tray.on("double-click", () => {
  let result = v_tray.toggleWindow(process.title);
  console.log("click, result = ", result);
  v_tray.destroy()
  process.exit(0);
  return;
});

v_tray.on('balloon-click', () => {
  let result = v_tray.toggleWindow(process.title);
  console.log("click, result = ", result);
  console.log('balloon-click');
  return;
});


});


v_tray.interval = setInterval( () => {

  // console.log('Window Visibility: ', v_tray.isWindowVisible(process.title));
  // console.log('Window Minimized: ', v_tray.isWindowMinimized(process.title));

  if (v_tray.isWindowMinimized(process.title) == true) {
    v_tray.toggleWindow(process.title);

    v_tray.balloon(process.title, 'Will continue in background', 5000);
    return;
  }

  console.log('In background');

}, 1000)


var onShutdown = function (cb) {
  for (let i = 0; i < SHUTDOWN_EVENTS.length; i++) {
    let event = SHUTDOWN_EVENTS[i];
    process.on(event, cb);
  }
};

var shutdown = function () {
  console.log('Shutdown!');
  v_tray.destroy();
  process.exit(0);
}

module.exports = v_tray;
