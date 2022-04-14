const v_os = require('.');

(async () => {

  console.log(v_os);

  console.log(await v_os.os.oos());
  console.log(await v_os.os.platform());
  console.log(await v_os.os.uptime());
  console.log(await v_os.os.ip());
  console.log(await v_os.os.hostname());
  console.log(await v_os.os.type());
  console.log(await v_os.os.arch());

  console.log(await v_os.proc.totalProcesses());

  console.log(await v_os.proc.zombieProcesses());

  console.log(await v_os.users.openedCount());

})();
