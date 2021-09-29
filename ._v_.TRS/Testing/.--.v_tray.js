const WindowsTrayicon = require("windows-trayicon");
const path = require("path");
const fs = require("fs");


const myTrayApp = new WindowsTrayicon({
  title: "Trayicon Test",
  icon: path.join(__dirname, "rick.ico"),
  menu: [
    {
      id: "item-1-id",
      caption: "First Item"
    },
    {
      id: "item-2-id",
      caption: "Second Item"
    },
    {
      id: "item-3-id-exit",
      caption: "Exit"
    }
  ]
});

const vTray = () => {

  myTrayApp.item((id) => {
    console.log(`Menu id selected=${id}`);
    switch (id) {
      case "item-1-id": {
        console.log("First item selected...");
        break;
      }
      case "item-2-id": {
        myTrayApp.balloon("Hello There!", "This is my message to you").then(() => {
          console.log("Balloon clicked");
        })
        break;
      }
      case "item-3-id-exit": {
        myTrayApp.exit();
        process.exit(0)
        break;
      }
    }
  });

  process.stdin.resume()

}

console.log( "rick.ico"));
console.log(path.join(__dirname, "rick.ico"));
vTray();

module.exports = vTray;