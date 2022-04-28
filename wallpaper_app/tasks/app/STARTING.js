const v_fs = require("v_file_system");
//? Config
const { cacheFilePath } = require("../../config");

const { cache, watch } = require("../../core");
const { notify } = require("../../helpers");

module.exports = application_start = () => {

  //! Exit Handler
  process.on("SIGINT", async () => await watch.run("EXITING"));

  let cacheData = v_fs.readSy(cacheFilePath);
  if (cacheData !== false) cache.fromString(cacheData);

  notify.app.starting();

};
