document.getElementById("searchInput").onkeyup = function(e) { 
  executeSearch(this.value);
}

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

function executeSearch(term) {
  let results = fuse.search(term); // the actual query being run using fuse.js
  let searchitems = ''; // our results bucket

  if (results.length === 0) { // no results based on what was typed into the input box
    resultsAvailable = false;
    searchitems = '';
  } else { // build our html 
    for (let item in results.slice(0,5)) { // only show first 5 results
      searchitems = searchitems + '<li><a href="' + results[item].permalink + '" tabindex="0">' + '<span class="title">' + results[item].title + '</span><br /> <span class="sc">'+ results[item].section +'</span> — ' + results[item].date + ' — <em>' + results[item].desc + '</em></a></li>';
    }
    resultsAvailable = true;
  }

  document.getElementById("searchResults").innerHTML = searchitems;
  if (results.length > 0) {
    first = list.firstChild.firstElementChild; // first result container — used for checking against keyboard up/down location
    last = list.lastChild.firstElementChild; // last result container — used for checking against keyboard up/down location
  }
}
