const v_execute = require('v_execute');
const config = require('../../../config');
const npmItems = require('../../../data/npm_items');

const count = require('./count');

module.exports = async () => {

  for (let i = 0; i < npmItems.length; i++) {
    console.log(npmItems[i]);
    let done = false;
    while (done === false) {

      let results = await v_execute(`bash -c "REPO='${npmItems[i]}' node source/tasks/custom/npm_downloads/gather.js"`);

      if (config.debug) console.log(results);

      if (results.stdout.length > 0) done = true;
    }

  }

  await count();

};
