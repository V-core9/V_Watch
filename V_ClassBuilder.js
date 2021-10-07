console.time("⏳ V_ClassBuilder  -:-  Application_BOOT_Time");

const V_ClassBuilder = require('./src/loader')
console.log(V_ClassBuilder);
console.log(V_ClassBuilder.length);



V_ClassBuilder.forEach(itemInner => {
  console.log(itemInner.exec);
});


console.timeEnd("⏳ V_ClassBuilder  -:-  Application_BOOT_Time");

