const EventEmitter = require('events').EventEmitter;
const NodeTray = require("../../node_modules/windows-tray/build/Release/tray").NodeTray

const util = require('util')
util.inherits(NodeTray, EventEmitter)

const path = require("path")

process.title = 'Tray Demo';

const tray = new NodeTray(path.join(__dirname, "colors.ico"))
tray.setToolTip(process.title);

tray.on('click', () => {

	let result = tray.toggleWindow(process.title);
	console.log("click, result = ", result);

})
tray.on('right-click', () => {

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

	tray.showPopup(menu, function (err, result) {

		console.log('error:', err);
		console.log('result:', result);

		if (result == 50)
		{
			shutdown();
			return;
		}

	});

})
tray.on('balloon-click', () => {

	console.log('balloon-click')

})

setInterval(function () {

	// console.log('Window Visibility: ', tray.isWindowVisible(process.title));
	// console.log('Window Minimized: ', tray.isWindowMinimized(process.title));

	if (tray.isWindowMinimized(process.title) == true)
	{
		tray.toggleWindow(process.title);

		tray.balloon(process.title, 'Will continue in background', 5000);
		return;
	}

	console.log('In background');

}, 1000)

// tray.on("double-click", () => {
// 	tray.destroy()
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

	for (let i = 0; i < SHUTDOWN_EVENTS.length; i++)
	{
		let event = SHUTDOWN_EVENTS[i];
		process.on(event, cb);
	}

};

var shutdown = function() {
	console.log('Shutdown!');
	tray.destroy();
	process.exit(0);
}

onShutdown(shutdown);
