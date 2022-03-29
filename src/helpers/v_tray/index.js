const config = require('../config');

const notify = require('../v_notify');

const EventEmitter = require('events').EventEmitter;
const NodeTray = require("../../../node_modules/windows-tray/build/Release/tray").NodeTray;

const util = require('util');
util.inherits(NodeTray, EventEmitter);

const path = require("path");

const menu = [
  {
    id: 1,
    title: 'Toggle Notifications',
    exec: () => {
      console.log('Item 1 clicked');
      config.notifications = !config.notifications;
    }
  },
  {
    id: 10,
    title: 'Item 10',
    exec: () => {
      console.log('Item 10 clicked');
      notify.tray.firstItem();
    }
  },
  {
    id: 20,
    title: 'Item 20',
    exec: () => {
      console.log('Item 20 clicked');
      notify.tray.secondItem();
    }
  },
  {
    id: 30,
    title: '---',
    exec: () => {
      console.log('Item 3 clicked');
    }
  },
  {
    id: 50,
    title: 'Exit',
    exec: () => {
      shutdown();
      return;
    }
  },
];

const runRes = (id) => {
  menu.forEach(item => {
    if (item.id === id) {
      item.exec();
    }
  });
};


const SHUTDOWN_EVENTS = [
  'exit',
  'SIGINT',
  'SIGUSR1',
  'SIGUSR2',
  'SIGTERM',
  'uncaughtException',
];

process.title = '-v-';

const v_tray = new NodeTray(path.join(__dirname, "../../ASSETS/icon/rick.ico"));
v_tray.setToolTip(process.title);

v_tray.on('click', () => {

  let result = v_tray.toggleWindow(process.title);
  console.log("click, result = ", result);

});

v_tray.on('right-click', () => {

  // console.log("right-click");
  v_tray.showPopup(menu, (err, result) => {
    runRes(result);
  });

  v_tray.on("double-click", () => {
    let result = v_tray.toggleWindow(process.title);
    console.log("click, result = ", result);
    v_tray.destroy();
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


v_tray.interval = setInterval(() => {

  // console.log('Window Visibility: ', v_tray.isWindowVisible(process.title));
  // console.log('Window Minimized: ', v_tray.isWindowMinimized(process.title));

  if (v_tray.isWindowMinimized(process.title) == true) {
    v_tray.toggleWindow(process.title);

    v_tray.balloon(process.title, 'Will continue in background', 5000);
    return;
  }

  console.log('In background');

}, 1000);


var onShutdown = function (cb) {
  for (let i = 0; i < SHUTDOWN_EVENTS.length; i++) {
    let event = SHUTDOWN_EVENTS[i];
    process.on(event, cb);
  }
};

var shutdown = function () {
  console.log('Shutdown!');
  v_tray.destroy();
  process.emit('SIGINT');
};

module.exports = v_tray;
