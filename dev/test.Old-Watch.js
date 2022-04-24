const V_Watch = require('../source/core/v_watch');

let counter = 0;

const watch = new V_Watch({ autoStart: true, interval: 1 });

watch.newTask('TestTask', 1, async () => counter++);

setTimeout(async () => {
  await watch.stop();
  console.log(counter);
}, 1000);
