const { V_Watch } = require('..');

const watch = new V_Watch();

watch.on('new', (task) => console.log("Created New Task: ", task));
watch.on('stop', (task) => console.log("Stopped Task: ", task));
watch.on('end', () => console.log("Here my Watch has Ended."));

const delayedAction = async (waitTime, action) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(action());
      } catch (err) {
        reject(err);
      }
    }, waitTime);
  });
};

test("base test run", async () => {

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
  expect(Object.keys(await watch.getAll()).length).toBe(2);

  expect(await delayedAction(500, async () => await watch.get("yeaMissing"))).toBe(undefined);

  expect(await delayedAction(500, async () => await watch.end())).toBe(true);

  expect(Object.keys(await watch.getAll()).length).toBe(0);

  expect(counters.test1 * 2).toBe(counters.test3);
  expect(counters.test1).toBeGreaterThan(50);

  console.log(counters);

});
