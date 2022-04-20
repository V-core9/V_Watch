var downloads = require('downloads');

const {cache} = require('../core/');


const items = [
  "v_to_md5",
  "v_to_sha256",
  "v_is_empty_value",
  "v_file_system",
  "v_execute",
  "v_scrolls",
  "v_database",
  "v_database_cli",
  "v_rifier",
  "v_lightmapper",
  "v_sitemap",
  "v_shortkeys",
  "x-powered-by-random",
  "v_core_cache",
];

let results = {};

var totalCount = 0;

module.exports = totalDownloads = async () => {
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
