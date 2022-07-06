var magButton = document.getElementById("searchLabel");
var searchInputMobile = document.getElementById("searchInputMobile");
var body = document.getElementsByTagName("body")[0];

document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth < 600) {
        // Mobile
        magButton.addEventListener("click", toggleBodyScroll);
    } else if (window.innerWidth >= 600 && window.innerWidth < 1200) {
        // Tablet
        searchInputMobile.addEventListener("focus", toggleBodyScroll);
    } else {
        // Desktop
    }
});

/// Media Queries
const mobileDesktop = window.matchMedia("(max-width: 1199px)");
const bigSmallMobile = window.matchMedia("(min-width: 600px)");
mobileDesktop.addEventListener("change", event => {
    if (event.matches) {
        // Tablet
        searchInputMobile.addEventListener("focus", toggleBodyScroll);
    } else {
        // Desktop
        searchInputMobile.removeEventListener("focus", toggleBodyScroll);
        resetBodyScroll();
    }
});
bigSmallMobile.addEventListener("change", event => {
    if (event.matches) {
        // Tablet
        searchInputMobile.addEventListener("focus", toggleBodyScroll);
        magButton.removeEventListener("click", toggleBodyScroll);
        resetBodyScroll();
    } else {
        // Mobile
        searchInputMobile.removeEventListener("focus", toggleBodyScroll);
        magButton.addEventListener("click", toggleBodyScroll);
        resetBodyScroll();
        if (document.getElementById("searchToggle").checked) {
            toggleBodyScroll();
        }
    }
});
function toggleBodyScroll() {
    body.classList.toggle("noScroll");
}
function resetBodyScroll() {
    for (var i = 0; i < body.classList.length; i++) {
        if (body.classList[i] === "noScroll") {
            body.classList.remove("noScroll")
        }
    }
}

/// Search proper
// https://gist.github.com/cmod/5410eae147e4318164258742dd053993 - modded
var fuse; // holds our search engine
var firstRun = true; // allow us to delay loading json data unless search activated

var resultsMobile = document.getElementById("searchResultsMobile"); // targets the <ul>
var resultsDesktop = document.getElementById("searchResults"); // targets the <ul>

var inputMobile = document.getElementById("searchInputMobile"); // input box for search
var inputDesktop = document.getElementById("searchInputDesktop");

var resultsAvailable = false; // Did we get any search results?

inputMobile.onkeyup = function (e) {
    executeSearch(this.value, resultsMobile);
}
inputDesktop.onkeyup = function (e) {
    executeSearch(this.value, resultsDesktop);
}

function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
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
    fetchJSONFile('/index.json', function (data) {
        var options = { // fuse.js options; check fuse.js website for details
            shouldSort: true,
            location: 0,
            distance: 100,
            threshold: 0.4,
            minMatchCharLength: 2,
            keys: [
                "title",
                "permalink",
                "content"
            ]
        };
        fuse = new Fuse(data, options); // build the index from the json file
    });
}

function executeSearch(term, destination) {
    let results = fuse.search(term); // the actual query being run using fuse.js
    let searchitems = ""; // our results bucket

    console.log(window.innerWidth)
    if (results.length === 0) { // no results based on what was typed into the input box
        resultsAvailable = false;
        searchitems = "";
    } else { // build our html 
        for (let item in results.slice(0, 15)) { // only show first 15 results
            searchitems = searchitems + '<li><a href="' + results[item].permalink + '" tabindex="0">' + '<span class="title">' + results[item].title + '</span><br /> <span class="sc">' + results[item].section + '</span> — ' + results[item].date + ' — <em>' + results[item].desc + '</em></a></li>';
        }
        resultsAvailable = true;
    }

    document.getElementById("searchResults").innerHTML = searchitems;
    if (results.length > 0) {
        first = destination.firstChild.firstElementChild; // first result container — used for checking against keyboard up/down location
        last = destination.lastChild.firstElementChild; // last result container — used for checking against keyboard up/down location
    }
}