document.addEventListener('DOMContentLoaded', function() {
  // chrome.windows.getAll({populate:true},function(windows){
  //   windows.forEach(function(window){
  //     window.tabs.forEach(function(tab){
  //       //GET URLS FROM ALL WINDOWS AND ALL TABS
  //       console.log(tab.url);
  //     });
  //   });
  // });

  // SET DDT SERVER ADDRESS
  chrome.tabs.query({},function(tabs){
    tabs.forEach(function(tab){
      if(tab.url.indexOf(":8084") !== -1) {
        var ddtServerElement = document.getElementById('ddt-server');
        ddtServerElement.value = tab.url;
      }
    });
  });

  chrome.storage.sync.get('ache', function(response) {
    var acheInputElement = document.getElementById('ache-server');
    if(acheInputElement) {
      acheInputElement.value = response.ache;
    }
  })

  document.getElementById("submit").addEventListener('click', function(event) {
    var acheInputElement = document.getElementById('ache-server');
    if(acheInputElement.value !== "") {
      chrome.storage.sync.set({'ache': acheInputElement.value}, function() {

      });
    }
  })

  document.getElementById("send-cookie").addEventListener('click', function(event) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.runtime.sendMessage({
        method: 'cookieMessenger',
        domain: tabs[0].url // try tabs[0].domain here to just get the domain
       }, function(response) {
      });
    });
  });


});
