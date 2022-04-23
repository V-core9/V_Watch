//? Start with CONFIG
require('./config').loadConfigFromFile();

const { appWatch } = require("./core");

(async () => {

  //* Init the tasks
  await require("./tasks")();

  await appWatch.runTask("STARTING");

})();
