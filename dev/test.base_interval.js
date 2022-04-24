let counter = 0;

let looper = setInterval(() => counter++, 1);

setTimeout(async () => {
  clearInterval(looper);
  console.log(looper);
  console.log(counter);
}, 1000);
