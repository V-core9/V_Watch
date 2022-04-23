const V_Watch = require('../source/core/v_watch');

(async () => {
    let counter = 0;

    const watch = new V_Watch({ autoStart: true, interval: 0 });

    watch.newTask('TestTask', 0, () => counter++)

    setTimeout(async () => {
        await watch.stop();
        console.log(counter / 10 + "tps")
    }, 10000)
})();