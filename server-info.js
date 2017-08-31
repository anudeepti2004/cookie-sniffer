document.addEventListener('DOMContentLoaded', function() {

  // SET DDT SERVER ADDRESS
  chrome.tabs.query({},function(tabs){
    tabs.forEach(function(tab){
      if(tab.url.indexOf(":8084") !== -1) {
        var ddtServerElement = document.getElementById('ddt-server');
        ddtServerElement.value = tab.url;
      }
    });
  });

  // SET ACHE SERVER ADDRESS IF PRESENT IN SYCN STORAGE
  chrome.storage.sync.get('ache', function(response) {
    var acheInputElement = document.getElementById('ache-server');
    if(acheInputElement) {
      acheInputElement.value = response.ache;
    }
  })

  // STORE ACHE SERVER CREDENTIALS INTO SYNC STORAGE
  document.getElementById("submit").addEventListener('click', function(event) {
    var acheInputElement = document.getElementById('ache-server');
    if(acheInputElement.value !== "") {
      chrome.storage.sync.set({'ache': acheInputElement.value}, function() {

      });
    }
  })

  // SEND MESSAGE TO BACKGROUND SCRIPT TO SEND CURRENT COOKIE OBJECT TO ACHE
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
