
// chrome.tabs.query.addListener(function (tabId, changeInfo, tab) {
//    if (changeInfo.status == 'complete') {
//       chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//          chrome.tabs.sendMessage(tabs[0].id, {action: "SendIt"}, function(response) {});
//       });
//    }
// });

chrome.cookies.onChanged.addListener(function(info) {
  if(info.cause === 'explicit' && info.removed === false) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
       chrome.tabs.sendMessage(tabs[0].id, {action: "SendIt"}, function(response) {});
    });
  }
});

function focusOrCreateTab(url) {
  chrome.windows.getAll({"populate":true}, function(windows) {
    var existing_tab = null;
    for (var i in windows) {
      var tabs = windows[i].tabs;
      for (var j in tabs) {
        var tab = tabs[j];
        if (tab.url == url) {
          existing_tab = tab;
          break;
        }
      }
    }
    if (existing_tab) {
      chrome.tabs.update(existing_tab.id, {"selected":true});
    } else {
      chrome.tabs.create({"url":url, "selected":true});
    }
  });
}

chrome.browserAction.onClicked.addListener(function(tab) {
  var serverPage = chrome.extension.getURL("server-info.html");
  focusOrCreateTab(serverPage);
});
