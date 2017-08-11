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

  document.getElementById("submit").addEventListener('click', function(event) {
    var acheInputElement = document.getElementById('ache-server');
    if(acheInputElement.value !== "") {
      chrome.storage.sync.set({'ache': acheInputElement.value}, function() {

      });
    }
  })
});
