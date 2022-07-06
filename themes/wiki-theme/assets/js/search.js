

function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
          if (callback) callback(data);
      }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send(); 
}

function loadSearch() { 
  fetchJSONFile('/index.json', function(data){

    var options = { // fuse.js options; check fuse.js website for details
      ignoreLocation: true,
      threshold: 0.4,
      minMatchCharLength: 2,
      findAllMatches: true,
      useExtendedSearch: true,
      keys: [
        "title",
        "permalink",
        "content",
        "categories"
        ]
    };
    fuse = new Fuse(data, options); // build the index from the json file
  });
}
