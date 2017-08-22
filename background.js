
// chrome.tabs.query.addListener(function (tabId, changeInfo, tab) {
//    if (changeInfo.status == 'complete') {
//       chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//          chrome.tabs.sendMessage(tabs[0].id, {action: "SendIt"}, function(response) {});
//       });
//    }
// });


chrome.runtime.onMessage.addListener(function(request, sender, callback) {
  var initialCookie = null,
      intervalBuiltCookie = null,
      intervalBuiltSerializedCookie = null;
      attempts = 0;

  buildCookie(request.domain).then(function(response) {
    initialCookie = response.stringifiedCookie;
    intervalBuiltCookie = response.stringifiedCookie;
    intervalBuiltSerializedCookie = response.serializableCookie;

    if(request.method === 'startTailing') {
      setTimeout(function() {
        var interval = setInterval(function() {
          if(attempts > 10)
            clearInterval(interval);

          if(initialCookie !== intervalBuiltCookie) {
            var data = {};
            data[request.origin] = intervalBuiltSerializedCookie;
            $.ajax({
             url: "http://localhost:8081/cookies",
             method: "POST",
             contentType: "application/json",
             data: JSON.stringify(data),
             success: function(response) {
               alert("SUCCESSFULLY SENT TO ACHE");
             },
             error: function(err) {
               console.log(err);
               callback(null);
             }
           })

           $.ajax({
            url: "http://localhost:8080/cookies",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(response) {
              alert("SUCCESSFULLY SENT TO ACHE");
            },
            error: function(err) {
              console.log(err);
            }
          })
            // alert(intervalBuiltCookie);
            clearInterval(interval);
          }
          attempts++;
          buildCookie(request.domain).then(function(response) {
            intervalBuiltCookie = response.stringifiedCookie;
            intervalBuiltSerializedCookie = response.serializableCookie;
          });
        }, 2000);
      }, 10000);
    } else if (request.method === 'cookieMessenger') {
      //send response to ACHE which is intervalBuiltCookie.serializableCookie
    }
  });
});

function buildCookie(domainName) {
  var fullCookie = [],
      serializableCookie = [];

  return new Promise(function(success, error) {
    try {
      chrome.cookies.getAll({domain: domainName}, function(response) {
        response.forEach(function(cookie) {
          fullCookie.push(cookie.name + "=" + cookie.value);
          serializableCookie.push(mutateCookieResponse(cookie));
        })

        success({stringifiedCookie: fullCookie.join("; "), serializableCookie: serializableCookie});
      })
    } catch(err) {
      error(err)
    }
  });

}

function mutateCookieResponse(cookie) {
  var requiredKeyMap = {
    domain: "domain",
    expirationDate: "expiresAt",
    hostOnly: "hostOnly",
    httpOnly: "httpOnly",
    name: "name",
    path: "path",
    secure: "secure",
    value: "value",
    persistent: null
  }

  var mutatedObject = {};
  Object.keys(requiredKeyMap).forEach(function(key) {
    mutatedObject[requiredKeyMap[key]] = cookie[key];
  });
  return mutatedObject;
}

chrome.cookies.onChanged.addListener(function(info) {
  // if(info.cause === 'explicit' && info.removed === false) {
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      //  chrome.tabs.sendMessage(tabs[0].id, {action: "SendIt"}, function(response) {});
    // });
  // }
});

// ************************ NOTE **************************
// COMMENTING BECAUSE ICON CLICK SHOULD OPEN A POPUP RATHER THAN A NEW BROWSER TAB

// function focusOrCreateTab(url) {
//   chrome.windows.getAll({"populate":true}, function(windows) {
//     var existing_tab = null;
//     for (var i in windows) {
//       var tabs = windows[i].tabs;
//       for (var j in tabs) {
//         var tab = tabs[j];
//         if (tab.url == url) {
//           existing_tab = tab;
//           break;
//         }
//       }
//     }
//     if (existing_tab) {
//       chrome.tabs.update(existing_tab.id, {"selected":true});
//     } else {
//       chrome.tabs.create({"url":url, "selected":true});
//     }
//   });
// }

// chrome.browserAction.onClicked.addListener(function(tab) {
//   var serverPage = chrome.extension.getURL("server-info.html");
//   focusOrCreateTab(serverPage);
// });
