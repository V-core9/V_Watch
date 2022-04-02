const path = require('path');

const config = require('../../config');
const notify = require('../v_notify');
const EventEmitter = require('events').EventEmitter;
const { NodeTray } = require("./build/Release/tray.node");
const util = require('util');
util.inherits(NodeTray, EventEmitter);


/*
* Getting Text Content for it.
*/
getNotifyTitle = () => ((config.notifications) ? "❌ Disable" : "✅ Enable") + " Notifications";

getDebugTitle = () => ((config.debug) ? "❌ Disable" : "✅ Enable") + " Debug";

getBackgroundTitle = () => ((config.backgroundUpdates) ? "❌ Disable" : "✅ Enable") + " wallpaperGUI";


/*
* Tray MENU
*/
const menu = [
  {
    id: 1,
    title: getNotifyTitle(),
    exec: () => {
      config.toggleNotifications();
      menu[0].title = getNotifyTitle();
    }
  },
  {
    id: 10,
    title: getDebugTitle(),
    exec: () => {
      config.toggleDebug();
      menu[1].title = getDebugTitle();
    }
  },
  {
    id: 20,
    title: getBackgroundTitle(),
    exec: () => {
      config.toggleBackgroundUpdates();
      menu[2].title = getBackgroundTitle();
      notify.wallpaperGUI();
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
      process.emit('SIGINT');
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


const v_tray = new NodeTray(path.join(__dirname, "../../ASSETS/icon/rick.ico"));

v_tray.setToolTip(process.title);

/*
v_tray.on('click', () => {
  let result = v_tray.toggleWindow(process.title);
  console.log("click, result = ", result);
});
*/

v_tray.on('right-click', () => {
  v_tray.showPopup(menu, (err, result) => {
    runRes(result);
  });
});



module.exports = v_tray;
