
const path = require('path');
const actions_folder = path.join(__dirname, './system_actions/');
const fs = require('fs');
const actions = [];
const foldersToLoad = [
  path.join(__dirname, './system_actions/'),
  path.join(__dirname, './system_helpers/'),
  path.join(__dirname, './user_actions/')
];


loadFolderContent = (folderPath) => {
  console.log("In FOLDER >> " + folderPath);
  fs.readdirSync(folderPath).forEach(file => {
    actions.push( require(path.join(folderPath, file) ));
  });
};

foldersToLoad.forEach(folderToLoad => {
  loadFolderContent(folderToLoad);
});


console.log(actions);
console.log(actions.length);

module.exports = actions;
