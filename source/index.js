//? Start with CONFIG
require('./config').loadConfigFromFile();

const { watch } = require("./core");

(async () => {

  //* Init the tasks
  await require("./tasks")();

  await watch.run("STARTING");

})();
