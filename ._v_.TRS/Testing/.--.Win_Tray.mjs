import SysTray from 'systray';

let systray = new SysTray.default({
  menu: {
    icon: "<base64 image string>",
    title: "标题",
    tooltip: "Tips",
    items: [{
      title: "FirstSampleTitle",
      tooltip: "FirstTitleToolTip",
      checked: true, // checked not implemented on Linux yet.
      enabled: true,
      trigger(action) {
        console.log("title: FirstSampleTitle");
        systray.sendAction({ type: 'update-item', item: { ...action.item, checked: !action.item.checked, }, seq_id: action.seq_id, });
        return "FirstSampleTitle";
      },
    }, {
      title: "aa2",
      tooltip: "bb",
      checked: false,
      enabled: true,
      trigger(action) {
        console.log("title: aa2");
        return "aa2";
      },
    }, {
      title: "Exit",
      tooltip: "bb",
      checked: false,
      enabled: true,
      trigger(action) {
        console.log("EXITING...");
        systray.kill();
        return "Exit";
      },
    }]
  },
  debug: false,
  copyDir: true, // copy go tray binary to outside directory, useful for packing tool like pkg.
})

systray.onClick(action => {
  systray._conf.menu.items[action.seq_id].trigger(action);
})

