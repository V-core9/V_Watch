const notifier = require('node-notifier');
const path = require('path');

notifier.notify(
  {
    title: "Some Random Notification Title Space",
    subtitle: "Again we can just put some random string into it and hope to achive all needed.",
    message: "Well since this is now 3rd thing I am of limits of these text spaces:\n[1>  50\n[2> 100",
    icon: path.join(__dirname, 'lgreen_fblue.png'), // String. Absolute path to Icon
    sound: true, // Bool | String (as defined by http://msdn.microsoft.com/en-us/library/windows/apps/hh761492.aspx)
    actions: ['OK', 'Cancel'],
    timeout: 30000,
    wait: true, 
    id: "<]_.-V-._[>",     // Number. ID to use for closing notification.
    appID: "<]_.-V-._[>"  // String. App.ID and app Name. Defaults to no value, causing SnoreToast text to be visible.
 //   remove: undefined,   // Number. Refer to previously created notification to close.
 //   install: undefined   // String (path, application, app id).  Creates a shortcut <path> in the start menu which point to the executable <application>, appID used for the notifications.
  },
  function (error, response) {
    console.log(response);
  }
);
