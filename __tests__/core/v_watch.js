const V_Watch = require('../../source/core/v_watch');


test('empty watcher test', async () => {

  //? New Watcher
  const watcher = new V_Watch({ autoStart: true, interval: 10 });

  expect(watcher.interval).toBe(10);

  expect(await watcher.getAllTasks()).toEqual({});

  expect(await watcher.getTask('test')).toBe(undefined);

  //* All Tasks Count 0
  expect(await watcher.totalTasksCount()).toBe(0);
  expect(await watcher.activeTasksCount()).toBe(0);
  expect(await watcher.disabledTasksCount()).toBe(0);

  //! Stop watcher once done or it will continue to run.
  expect(await watcher.stop()).toBe(true);
  expect(await watcher.stop()).toBe(false);


  //? Create new task
  let testTask01 = await watcher.newTask('test', async () => console.log('test task print message'), 2500, 'random test task description');
  expect(testTask01).toBe(true);



  let stats = await watcher.stats();

  const testStats = {
    interval: 10,
    status: false,
    autoStart: true,
    activeTasksCount: 1,
    disabledTasksCount: 0,
    totalTasksCount: 1
  };

  expect(stats).toEqual(testStats);


  expect(await watcher.start()).toBe(true);
  expect(await watcher.start()).toBe(false);

  let testTask02 = await watcher.newTask('test2', async () => console.log('test task print message'), 50, 'random test task description');

  expect(testTask02).toBe(true);



  //! Stop watcher once done or it will continue to run.
  expect(await watcher.stop()).toBe(true);

});


test('executing manually tasks', async () => {
  const watcher = new V_Watch();

  const testStats = {
    interval: 1000,
    status: false,
    autoStart: false,
    activeTasksCount: 0,
    disabledTasksCount: 0,
    totalTasksCount: 0
  };

  let stats = await watcher.stats();

  expect(stats).toEqual(testStats);

  let testValue = 0;

  expect(await watcher.newTask('test',  1000, async () => testValue++,'')).toBe(true);

  for (let i = 0; i < 100; i++) {
    await watcher.runTask('test');
  }

  expect(testValue).toBe(100);


  stats = await watcher.stats();

  let testStats2 = testStats;
  testStats2.totalTasksCount = 1;
  testStats2.activeTasksCount = 1;

  expect(stats).toEqual(testStats2);

});
