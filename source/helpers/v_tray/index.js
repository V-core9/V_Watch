const config = require('../../config');
const notify = require('../v_notify');
const EventEmitter = require('events').EventEmitter;
const NodeTray = require("../../../node_modules/windows-tray/build/Release/tray").NodeTray;
const util = require('util');
util.inherits(NodeTray, EventEmitter);
const path = require("path");



/*
* Getting Text Content for it.
*/
getNotifyTitle = () => ((config.notifications) ? "❌ Disable" : "✅ Enable") + " Notifications";

getDebugTitle = () => ((config.debug) ? "❌ Disable" : "✅ Enable") + " Debug";

getBackgroundTitle = () => ((config.backgroundUpdates) ? "❌ Disable" : "✅ Enable") + " wallpaperGUI";

extendedInfoTitle = () => ((config.extendedInfo) ? "❌ Disable" : "✅ Enable") + " Extended Info";


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
      const { watch } = require("../../core");
      if (config.backgroundUpdates === true) {
        watch.start("wallpaper_render");
      } else {
        watch.stop("wallpaper_render");
      }
    }
  },
  {
    id: 25,
    title: extendedInfoTitle(),
    exec: () => {
      config.toggleExtendedInfo();
      console.log("Extended Info");
      menu[3].title = extendedInfoTitle();
      notify.extendedInfoToggle();
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


v_tray.on('click', () => {
  let result = v_tray.toggleWindow(process.title);
  console.log("click, result = ", result);
});


v_tray.on('right-click', () => {
  v_tray.showPopup(menu, (err, result) => {
    runRes(result);
  });
});


v_tray.stop = async () => await v_tray.destroy();


module.exports = v_tray;
