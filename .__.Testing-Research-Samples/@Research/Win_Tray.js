import SysTray from 'systray';

let systray = new SysTray.default({
    menu: {
        icon: "<base64 image string>",
        title: "标题",
        tooltip: "Tips",
        items: [{
            title: "aa",
            tooltip: "bb",
            checked: true, // checked not implemented on Linux yet.
            enabled: true
        }, {
            title: "aa2",
            tooltip: "bb",
            checked: false,
            enabled: true
        }, {
            title: "Exit",
            tooltip: "bb",
            checked: false,
            enabled: true
        }]
    },
    debug: false,
    copyDir: true, // copy go tray binary to outside directory, useful for packing tool like pkg.
})

systray.onClick(action => {
	//console.log(action);
    if (action.seq_id !== 2) {
		console.log(systray._conf.menu.items);
		systray.sendAction({
			type: 'update-item',
			item: {
			...action.item,
			checked: !action.item.checked,
			},
			seq_id: action.seq_id,
		})
	} else if (action.seq_id === 2) {
		systray.kill();
	}
})

