
const path = require('path')
const system_actions_folder = path.join(__dirname, './system_actions/');
const fs = require('fs');
const actions = [];

fs.readdirSync(system_actions_folder).forEach(file => {
  actions.push(require(path.join(system_actions_folder, file)));
});

console.log(actions);

module.exports = actions
