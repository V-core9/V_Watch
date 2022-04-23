const Watcher = require('./Watcher');

(async () => {
    
    let counter = 0;

    const watcher = new Watcher({ name: "Example Name", interval: 0, cb: () => counter++ });

    watcher.on("start", async (data) => console.log('START event ', data));

    watcher.on("run", async (data) => {
        return (counter % 100 == 0) ? console.log('RUN event ', data) : null;
    });

    watcher.on("end", async (data) => {
        console.log(counter);
        console.log('END event ', data);
    });

    watcher.start();

    console.log(await watcher.isRunning());

    setTimeout(async () => {
        await watcher.end();
        console.log(counter / 10 + "tps")
    }, 10000);

})();