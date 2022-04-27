var downloads = require('downloads');
const v_fs = require('v_file_system');

const repoName = process.env.REPO || 'v_file_system';

downloads.repo(repoName, async (err, results) => {

  if (err) return console.error(err);

  await v_fs.write('./source/data/totalDownloads/' + repoName + '.json', JSON.stringify(results));

  console.log("Saved Results");

});
