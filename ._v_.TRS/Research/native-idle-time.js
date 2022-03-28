const idleTime = require('@schlameel/native-idle-time');

console.log(" \n<[:o:]> Desktop Native Idle Time   >- - -\n  |'|  AppState :: [ ACTIVE ]  :> ");


async function clearINTERVAL() {
  console.log("[=> STOPPING  - >-> - ");
  clearInterval(intVAR_Loop);
  intVAR_Loop = null;
  return intVAR_Loop;
}


const timeOfStart = Date.now();
console.log(`<[.i.]> : Start Application Timestamp  :  ${timeOfStart}`);
const timeToContinue = 550000;
var UpTime = 0;
var IdleTime = 0;


getUptime = () => { 
  return (Date.now() - timeOfStart);
};

USER_IDLE = () => {
  IdleTime = idleTime.getMillis();

  if (timeToContinue > getUptime()) {
    console.log(`  |:|=[o> AppState : Running ->>- AppUpTime :  ${UpTime} ms <[i]> UserIdleTime: ${idleTime.getMillis()}ms  ]:>- - - `);
  } else {
    console.log(clearINTERVAL());
  }

};


var intVAR_Loop = setInterval(USER_IDLE, 1000);

module.exports = USER_IDLE;
