
//? Config
const { cacheFilePath } = require("../../config");

const { cache, watch } = require("../../core");
const { notify } = require("../../helpers");

module.exports = application_start = () => {

  //! Exit Handler
  process.on("SIGINT", async () => await watch.run("EXITING"));

  cache.fromFile(cacheFilePath);

  notify.app.starting();

};
