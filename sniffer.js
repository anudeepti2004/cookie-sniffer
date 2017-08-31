$(document).ready(function() {

  // if(document.referrer.indexOf(":8084") !== -1) {
    var passwordInputPresent = false,
        url = "";
    try {
      var passwordInput = $("input:password")[0];
      if (typeof passwordInput === "object") {
        passwordInputPresent = true;
        url = document.documentURI;
        passwordInput.addEventListener('blur', function(event) {

        });
      }

    } catch(error) {
      passwordInputPresent = false;
    }

    // START POLLING FOR A COOKIE CHANGE WHEN A LOGIN FORM IS DETECTED
    if(passwordInputPresent) {
       chrome.runtime.sendMessage({
         method: 'startTailing',
         domain: document.domain,
         origin: window.location.origin
        }, function(response) {
       }
     );
    }
  // }
});
