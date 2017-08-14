
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
      attempts = 0;

  buildCookie(request.domain).then(function(response) {
    initialCookie = response;
    intervalBuiltCookie = response;

    if(request.method === 'startTailing') {
      var interval = setInterval(function() {
        if(initialCookie !== intervalBuiltCookie) {
          //send request to ACHE
          alert("RESPONSE SENT TO ACHE");
          clearInterval(interval);
        }
        attempts++;
        buildCookie(request.domain).then(function(response) {
          intervalBuiltCookie = response;
        });
      }, 2000)
    }
  });
});

function buildCookie(domainName) {
  var fullCookie = [];

  return new Promise(function(success, error) {
    try {
      chrome.cookies.getAll({domain: domainName}, function(response) {
        response.forEach(function(cookie) {
          fullCookie.push(cookie.name + "=" + cookie.value);
        })

        success(fullCookie.join("; "));
      })
    } catch(err) {
      error(err)
    }
  });

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
