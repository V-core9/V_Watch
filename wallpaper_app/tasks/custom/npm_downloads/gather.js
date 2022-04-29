var downloads = require('downloads');
const v_fs = require('v_file_system');
const path = require('path');

const repoName = process.env.REPO || 'v_file_system';

downloads.repo(repoName, async (err, results) => {

  if (err) return console.error(err);

  const savedFile = await v_fs.write(path.join(__dirname, '../../../data/totalDownloads/' + repoName + '.json'), JSON.stringify(results));

  if (savedFile) console.log('Loaded and Saved');

});
