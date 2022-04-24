const Watcher = require('./Watcher');

(async () => {
  let counter = 0;

  const watcher = new Watcher({ interval: 10, cb: async () => counter++, autoStart: false });

  watcher.on('start', (data) => console.log("STARTED : " + data));
  watcher.on('run', () => (counter % 10 == 0) ? console.log("RUN") : false);
  watcher.on('end', (data) => console.log("ENDED : " + data));

  await watcher.start();

  setTimeout(async () => {
    await watcher.end();
    console.log(counter);
  }, 1000);

})();
