let path = require('path')
const NotificationCenter = require('node-notifier/notifiers/notificationcenter');
const options = {
    appID: "SAMPLE_ID",
    title: "Some Random Notification Title Space",
    subtitle: "Again we can just put some random string into it and hope to achive all needed.",
    message: "Well since this is now 3rd thing I am inputing it's starting to require being aware of limits of these text spaces:\n1>  50\n2> 100",
    sound: true, // Case Sensitive string for location of sound file, or use one of macOS' native sounds (see below)
    icon: path.join(__dirname, 'lgreen_fblue.png'), // Absolute Path to Triggering Icon
    contentImage: 'undefined', // Absolute Path to Attached Image (Content Image)
    open: 'undefined', // URL to open on Click
    wait: true, // Wait for User Action against Notification or times out. Same as timeout = 5 seconds

    // New in latest version. See `example/macInput.js` for usage
    timeout: 15, // Takes precedence over wait if both are defined.
    closeLabel: "Cancel", // String. Label for cancel button
    actions: ['OK', 'Cancel'], // String | Array<String>. Action label or list of labels in case of dropdown
    dropdownLabel: 'undefined', // String. Label to be used if multiple actions
    reply: true // Boolean. If notification should take input. Value passed as third argument in callback and event emitter.
  };
  
new NotificationCenter(options).notify();

const NotifySend = require('node-notifier/notifiers/notifysend');
new NotifySend(options).notify();

const WindowsToaster = require('node-notifier/notifiers/toaster');
new WindowsToaster(options).notify();

const Growl = require('node-notifier/notifiers/growl');
new Growl(options).notify();

const WindowsBalloon = require('node-notifier/notifiers/balloon');
new WindowsBalloon(options).notify();
