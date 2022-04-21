var downloads = require('downloads');

const {cache} = require('../core/');


const items = require('../data/npm_items');

module.exports = totalDownloads = async () => {

  let results = {};

  var totalCount = 0;

  for (let i = 0; i < items.length; i++) {

    setTimeout(async () => {
      let item = items[i];
      console.log(`Downloading ${item}`);

      let data = await downloads.repo(item);

      results[item] = data;

      console.log(data);

      data.forEach(value => {
        totalCount = totalCount + value.downloads;
      });


      console.log(results);
      console.log(`Total downloads: ${totalCount}`);

      await cache.set("npmTotalDownloads", totalCount);
    }, i * 60000);
  }
}
