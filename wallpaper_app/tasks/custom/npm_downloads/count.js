const path = require('path');
const v_fs = require('v_file_system');
const config = require('../../../config');
const { cache } = require('../../../core');

module.exports = async () => {
  let files = await v_fs.listDir(path.join(__dirname, '../../../data/totalDownloads'));
  if (config.debug) console.log(files);

  let data = {};

  let totalDownloads = 0;

  for (let file of files) {
    let content = JSON.parse(await v_fs.read(path.join(__dirname, '../../../data/totalDownloads/' + file)));
    if (config.debug) console.log(content);
    data[file] = content;

    content.forEach(item => totalDownloads += item.downloads);
  }

  if (config.debug) console.log(totalDownloads);
  await cache.set("npmTotalDownloads", totalDownloads);
};
