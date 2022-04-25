const { cache, wallpaper } = require('../../core');
const { baseTemplate } = require('../../templates');

module.exports = {
  render: async () => {
    await cache.set('wallpaper_render_svg', await baseTemplate.render());
    await wallpaper.render(await cache.get('wallpaper_render_svg'));
    await cache.set('svgStats', await wallpaper.stats());
  },
  set: async () => await wallpaper.saveAndSetBackground(),
};
