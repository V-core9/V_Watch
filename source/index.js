//? Start with CONFIG
require('./config').loadConfigFromFile();

//? vWatch - Tasks Runner
const { vWatch } = require("./core");

(async () => {

  //* Init the tasks
  await require("./tasks")();

  await vWatch.runTask("STARTING");

})();
