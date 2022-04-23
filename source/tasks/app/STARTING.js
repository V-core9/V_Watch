
//? Config
const { cacheFilePath } = require("../../config");

const { cache, vWatch } = require("../../core");
const { notify } = require("../../helpers");

module.exports = application_start = () => {

  //! Exit Handler
  process.on("SIGINT", async () => await vWatch.runTask("EXITING"));

  cache.fromFile(cacheFilePath);

  notify.app.starting();

};
