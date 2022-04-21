
//? Config
const { cacheFilePath } = require("../config");

const { cache } = require("../core");
const { notify } = require("../helpers");

module.exports = application_start = () => {

  cache.fromFile(cacheFilePath);

  notify.app.starting();

};
