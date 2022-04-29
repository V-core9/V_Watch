const v_os = require('../../wallpaper_app/helpers/v_os');

console.log(v_os);


(async () => {
  console.log("v_os.arch", v_os.arch());
  console.log("v_os.cpus", v_os.cpus());
  console.log("v_os.endianness", v_os.endianness());
  console.log("v_os.freemem", v_os.freemem());
  console.log("v_os.getPriority", v_os.getPriority());
  console.log("v_os.homedir", v_os.homedir());
  console.log("v_os.hostname", v_os.hostname());
  console.log("v_os.loadavg", v_os.loadavg());
  console.log("v_os.networkInterfaces", v_os.networkInterfaces());
  console.log("v_os.platform", v_os.platform());
  console.log("v_os.release", v_os.release());
  console.log("v_os.setPriority", v_os.setPriority(2));
  console.log("v_os.tmpdir", v_os.tmpdir());
  console.log("v_os.totalmem", v_os.totalmem());
  console.log("v_os.type", v_os.type());
  console.log("v_os.userInfo", v_os.userInfo());
  console.log("v_os.uptime", v_os.uptime());
  console.log("v_os.version", v_os.version());

  console.log("v_os.constants :", v_os.constants);

  console.log("v_os.EOL :", v_os.EOL);
  console.log("v_os.devNull :", v_os.devNull);
  console.log("v_os.options :", v_os.options);
  console.log("v_os.isNotSupported :", v_os.isNotSupported());

  console.log("v_os.cpu.average : ", v_os.cpu.average());
  console.log("v_os.cpu.usage : ", await v_os.cpu.usage());
  console.log("v_os.cpu.free : ", await v_os.cpu.free());
  console.log("v_os.cpu.count : ", v_os.cpu.count());
  console.log("v_os.cpu.model : ", v_os.cpu.model());
  console.log("v_os.cpu.loadavg : ", v_os.cpu.loadavg());
  console.log("v_os.cpu.loadavgTime : ", v_os.cpu.loadavgTime());

  //console.log("v_os.drive.info : ", await v_os.drive.info());
  //console.log("v_os.drive.free : ", await v_os.drive.free());
  //console.log("v_os.drive.used : ", await v_os.drive.used());

  console.log("v_os.mem.info : ", await v_os.mem.info());
  console.log("v_os.mem.free : ", await v_os.mem.free());
  console.log("v_os.mem.used : ", await v_os.mem.used());
  console.log("v_os.mem.totalMem : ", await v_os.mem.totalMem());

  console.log("v_os.netstat.stats : ", await v_os.netstat.stats());
  console.log("v_os.netstat.inOut : ", await v_os.netstat.inOut());

  console.log("v_os.openfiles", v_os.openfiles);


  console.log("v_os.osCmd.topCpu : ", await v_os.osCmd.topCpu());
  console.log("v_os.osCmd.topMem : ", await v_os.osCmd.topMem());
  console.log("v_os.osCmd.vmstats : ", await v_os.osCmd.vmstats());
  console.log("v_os.osCmd.processesUsers : ", await v_os.osCmd.processesUsers());
  console.log("v_os.osCmd.diskUsage : ", await v_os.osCmd.diskUsage("d"));
  console.log("v_os.osCmd.who : ", await v_os.osCmd.who());
  console.log("v_os.osCmd.whoami : ", await v_os.osCmd.whoami());
  console.log("v_os.osCmd.openPorts : ", await v_os.osCmd.openPorts());
  console.log("v_os.osCmd.ifconfig : ", await v_os.osCmd.ifconfig());

  console.log("v_os.os.oos : ", await v_os.os.oos());
  console.log("v_os.os.platform : ", v_os.os.platform());
  console.log("v_os.os.uptime : ", v_os.os.uptime());
  console.log("v_os.os.ip : ", v_os.os.ip());
  console.log("v_os.os.hostname : ", v_os.os.hostname());
  console.log("v_os.os.type : ", v_os.os.type());
  console.log("v_os.os.arch : ", v_os.os.arch());

  console.log("v_os.proc.totalProcesses : ", await v_os.proc.totalProcesses());
  console.log("v_os.proc.zombieProcesses : ", await v_os.proc.zombieProcesses());

  console.log("v_os.users.openedCount : ", await v_os.users.openedCount());

  // Customs
  console.log("v_os.freememproc", v_os.freememproc());

})();
