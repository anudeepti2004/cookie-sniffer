$(document).ready(function() {
  // chrome.storage.sync.set({'value': 100}, function() {
  //   // Notify that we saved.
  //   // alert('Settings saved');
  // });

  // if(document.referrer.indexOf(":8084") !== -1) {
    var passwordInputPresent = false;

    try {
      var passwordInput = $("input:password")[0];
      if (typeof passwordInput === "object") {
        passwordInputPresent = true;
        passwordInput.addEventListener('blur', function(event) {
          // alert("HAHA YOUR PASSWORD IS " + event.target.value);
        });
      }

    } catch(error) {
      passwordInputPresent = false;
    }

    if(passwordInputPresent) {
       chrome.runtime.sendMessage({
         method: 'startTailing',
         domain: document.domain
        }, function(response) {
       });
      // chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
      //   if (msg.action === 'SendIt') {
      //     alert("Message recieved!");
      //   }
      // });
    }
  // }
});
