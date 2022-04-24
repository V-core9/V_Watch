const Watch = require('./Watch');

const watch = new Watch();

watch.on('new', (task) => console.log("Created New Task: ", task));
watch.on('stop', (task) => console.log("Stopped Task: ", task));
watch.on('end', () => console.log("Here my Watch has Ended."));

(async () => {

  let counters = {
    test1: 0,
    test2: 0,
    test3: 0,
  };

  await watch.new('TestTask', 1, () => counters.test1++, false);
  await watch.new('SecondaryTask', 10, () => counters.test2++);

  let testTask = await watch.get('TestTask');

  await testTask.on("start", async () => console.log("testTask STARTED"));
  await testTask.on("run", async () => counters.test3++);
  await testTask.on("run", async () => counters.test3++);
  await testTask.on("end", async () => console.log("testTask ENDED"));

  console.log(testTask);

  await testTask.start();

  console.log(await watch.getAll());

  setTimeout(async () => {

    console.log(await watch.get("yeaMissing"));

    await watch.end();

    console.log(counters);

    console.log(await watch.getAll());

  }, 1000);

})();
