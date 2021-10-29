console.time("⏳ V_ActionsLister  -:-  Application_BOOT_Time");

const V_ActionsLister = require('./src/loader');

V_ActionsLister.forEach(itemInner => {
  console.log(itemInner.exec);
});

console.timeEnd("⏳ V_ActionsLister  -:-  Application_BOOT_Time");
