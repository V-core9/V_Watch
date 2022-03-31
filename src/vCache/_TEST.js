const path = require('path');

const vCache = require('.');

(async () => {

  console.log(vCache);

  console.log(await vCache.get('test'));

  console.log(await vCache.set('test', 11));

  console.log(await vCache.get('test'));

  console.log(await vCache.toString());

  console.log(await vCache.toFile(path.join(__dirname, 'demo.json')));


  console.log(await vCache.set('test1', 11111));
  console.log(await vCache.set('test2', 222222));
  console.log(await vCache.set('test3', 33333333333));
  console.log(await vCache.set('test4', 4444444444444));
  console.log(await vCache.set('test5', 555555555555555));

  const itemsCount = 1000000;

  for (let i = 0; i < itemsCount; i++) {
    await vCache.set(`test${i}`, i);
  }

  var size = await vCache.size();
  console.log(size);

  console.time("Test Read Speed 1");
  console.log(await vCache.get('test' + Math.trunc(size / 2)));
  console.timeEnd("Test Read Speed 1");


})();
