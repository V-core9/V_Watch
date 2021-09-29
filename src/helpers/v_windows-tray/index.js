
const path = require("path")
const Votify = require('../v_notify');
const EventEmitter = require('events').EventEmitter;
const NodeTray = require("../../../node_modules/windows-tray/build/Release/tray").NodeTray

const util = require('util')


util.inherits(NodeTray, EventEmitter)


const vTray = new NodeTray(path.join(__dirname, "../../ASSETS/icon/rick.ico"))
vTray.setToolTip(process.title);



const appTRAY_Menu = [
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



async function vTrayShowPopup (err, result) {

  console.log('vTrayShowPopup  \n','error:', err);
  console.log('result:', result);
  if (result == 50) {
    shutdown();
    return;
  }
};

vTray.on('right-click', (event) => {
  console.log(JSON.stringify(event));
  //console.log("[_][X]  -- RIGHT-click");
  vTray.showPopup(appTRAY_Menu,   vTrayShowPopup );

});

vTray.on('balloon-click', (event) => {
  console.log(JSON.stringify(event));
  console.log('balloon-click')
});

vTray.on('click', (event) => {
  console.log(JSON.stringify(event));
  //console.log("LEFT-click\n[X][_]  -- LEFT-click");
  let result = vTray.toggleWindow(process.title);
  console.log("click, result = = - - -"+result);
});

vTray.on("double-click", (event) => {
  console.log(JSON.stringify(event));
  vTray.destroy()
  process.exit(0)
})

setInterval( () => {

  // console.log('Window Visibility: ', vTray.isWindowVisible(process.title));
  //console.log('Window Minimized: ', vTray.isWindowMinimized(process.title));

  if (vTray.isWindowMinimized(process.title) == true) {
    vTray.toggleWindow(process.title);

    vTray.balloon(process.title, 'Will continue in background', 5000);
    return;
  }

  //console.log('In background');

}, 1000)

const SHUTDOWN_EVENTS = [
  'exit',
  'SIGINT',
  'SIGUSR1',
  'SIGUSR2',
  'SIGTERM',
  'uncaughtException',
];

const onShutdown = function (cb) {

  for (let i = 0; i < SHUTDOWN_EVENTS.length; i++) {
    let event = SHUTDOWN_EVENTS[i];
    process.on(event, cb);
  }

};

const shutdown = function () {
  console.log('Shutdown!');
  vTray.destroy();
  process.exit(0);
}

onShutdown(shutdown);


module.exports = vTray;
