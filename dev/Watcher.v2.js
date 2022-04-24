let counter = 0;

const cb = async () => counter++;

let isRunning = true;

const tick = async (cb, tickTime) => {
  await cb();
  //console.log('tick');
  if (isRunning) setTimeout(async () => await tick(cb), tickTime);
};

tick(cb, 10);

setTimeout(() => isRunning = false, 1000);
setTimeout(() => console.log(counter), 1200);
