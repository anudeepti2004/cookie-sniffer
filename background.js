
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
