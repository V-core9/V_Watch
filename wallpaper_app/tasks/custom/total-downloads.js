var downloads = require('downloads');

const config = require('../../config');
const { cache } = require('../../core');

const items = require('../../data/npm_items');


module.exports = totalDownloads = async () => {

  let results = {};

  var totalCount = 0;

  for (let i = 0; i < items.length; i++) {

    setTimeout(async () => {
      let item = items[i];
      if (config.debug) console.log(`Downloading ${item}`);

      let data = await downloads.repo(item);

      results[item] = data;

      if (config.debug) console.log(data);

      data.forEach(value => {
        totalCount = totalCount + value.downloads;
      });


      if (config.debug) console.log(results);
      if (config.debug) console.log(`Total downloads: ${totalCount}`);

      await cache.set("npmTotalDownloads", totalCount);

    }, i * 60000);

  }

};
