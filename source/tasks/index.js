module.exports = sysTasks = {

  appSTARTING: require('./app.STARTING'),
  appEXITING: require('./app.EXITING'),


  wallpaperGUI: require('./render-wallpapergui'),

  justDoIt: require('./justDoIt'),

  clock: require('./clock-update'),

  systemInfo: require('./system-info-stats'),

  netSpeed: require('./internet-speed-test'),

  screenshot: require('./screenshot-desktop'),

  totalDownloads: require('./total-downloads'),

  vWatchDBG: require('./vWatchDebug'),

  weatherApi: require('./weather-api'),

};
