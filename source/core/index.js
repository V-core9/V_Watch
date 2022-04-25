const Watch = require('./Watch');
const Wallpaper = require('./Wallpaper');

module.exports = {
  cache: require('./cache'),
  watch: new Watch(),
  wallpaper: new Wallpaper({ quality: 25 })
};
