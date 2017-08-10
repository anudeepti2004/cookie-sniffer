$(document).ready(function() {
  var passwordInputPresent = false;

  try {
    var passwordInput = $("input:password");
    if (typeof passwordInput === "object")
      passwordInputPresent = true;
  } catch(error) {
    passwordInputPresent = false;
  }

  if(passwordInputPresent) {
    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
      if (msg.action === 'SendIt') {
        alert("Message recieved!");
      }
    });
  }
});
