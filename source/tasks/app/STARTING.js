
//? Config
const { cacheFilePath } = require("../../config");

const { cache, appWatch } = require("../../core");
const { notify } = require("../../helpers");

module.exports = application_start = () => {

  //! Exit Handler
  process.on("SIGINT", async () => await appWatch.runTask("EXITING"));

  cache.fromFile(cacheFilePath);

  notify.app.starting();

};
