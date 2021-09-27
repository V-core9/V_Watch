
  const Votify = require('../v_notify/votify');
  const EventEmitter = require('events').EventEmitter;
  const NodeTray = require("../../../node_modules/windows-tray/build/Release/tray").NodeTray

  const util = require('util')

  
  util.inherits(NodeTray, EventEmitter)

  const path = require("path")

  process.title = 'Tray Demo';

  const vTray = new NodeTray(path.join(__dirname, "../../ASSETS/icon/rick.ico"))
  vTray.setToolTip(process.title);

  vTray.on('click', () => {
    
    let result = vTray.toggleWindow(process.title);
    console.log("click, result = ", result);

  })
  vTray.on('right-click', () => {

    // console.log("right-click");

    var menu = [
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

    vTray.showPopup(menu, function (err, result) {

      console.log('error:', err);
      console.log('result:', result);
      Votify.tray.leftClick();
      if (result == 50) {
        shutdown();
        return;
      }

    });

  })
  vTray.on('balloon-click', () => {

    console.log('balloon-click')

  })

  setInterval(function () {

    // console.log('Window Visibility: ', vTray.isWindowVisible(process.title));
    // console.log('Window Minimized: ', vTray.isWindowMinimized(process.title));

    if (vTray.isWindowMinimized(process.title) == true) {
      vTray.toggleWindow(process.title);

      vTray.balloon(process.title, 'Will continue in background', 5000);
      return;
    }

    console.log('In background');

  }, 1000)

  // vTray.on("double-click", () => {
  // 	vTray.destroy()
  // 	process.exit(0)
  // })

  var SHUTDOWN_EVENTS = [
    'exit',
    'SIGINT',
    'SIGUSR1',
    'SIGUSR2',
    'SIGTERM',
    'uncaughtException',
  ];

  var onShutdown = function (cb) {

    for (let i = 0; i < SHUTDOWN_EVENTS.length; i++) {
      let event = SHUTDOWN_EVENTS[i];
      process.on(event, cb);
    }

  };

  var shutdown = function () {
    console.log('Shutdown!');
    vTray.destroy();
    process.exit(0);
  }

  onShutdown(shutdown);


module.exports = vTray;
