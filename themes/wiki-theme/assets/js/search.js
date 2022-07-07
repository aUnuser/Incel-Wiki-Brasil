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

/// https://gist.github.com/cmod/5410eae147e4318164258742dd053993 - modded
var fuse;
var firstRun = true;

var resultsMobile = document.getElementById("searchResultsMobile");
var resultsDesktop = document.getElementById("searchResultsDesktop");

var inputMobile = document.getElementById("searchInputMobile");
var inputDesktop = document.getElementById("searchInputDesktop");

var resultsAvailable = false;

var desktopSearchFocused = false;
var mobileSearchFocused = false;

document.addEventListener("focus", function(e){
    if(e.path[0].tagName === "INPUT") {
        if (firstRun) {
            loadSearch();
            firstRun = false;
        }
        if (e.path[0].id === "searchInputMobile") {

        } else if (e.path[0].id === "searchInputDesktop") {
            
        }
    } else if (e.path[0].tagName === "LI") {

    } else {
        resultsDesktop.style.display = "none";
        desktopSearchFocused = false;
    }
}, true);
document.addEventListener("focusout", function(e) {
    console.log(e.path[0]);
});

document.addEventListener('keydown', function (event) {
    var desktopFirst = resultsDesktop.firstChild;
    var desktopLast = resultsDesktop.lastChild;
    if (event.key === "ArrowUp" && desktopSearchFocused) {
        event.preventDefault();
        if (document.activeElement == inputDesktop) {
            inputDesktop.focus();
        }
        else if (document.activeElement == desktopFirst) {
            inputDesktop.focus();
        }
        else {
            document.activeElement.previousSibling.focus();
        }
    }
    if (event.key === "ArrowDown" && desktopSearchFocused) {
        event.preventDefault();
        if (document.activeElement == inputDesktop) {
            desktopFirst.focus();
        }
        else if (document.activeElement == desktopLast) {
            desktopLast.focus();
        }
        else {
            document.activeElement.nextSibling.focus();
        }
    }
});

inputMobile.onkeyup = function (e) {
    executeSearch(this.value, resultsMobile);
    
}
inputDesktop.onkeyup = function (e) {
    executeSearch(this.value, resultsDesktop);
    if (!desktopSearchFocused) {
        resultsDesktop.style.display = "block";
        desktopSearchFocused = true;
    }
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
        var options = {
            shouldSort: true,
            location: 0,
            distance: 100,
            threshold: 0.4,
            minMatchCharLength: 2,
            keys: [
                "title",
                "permalink",
                "content",
                "categorias"
            ]
        };
        fuse = new Fuse(data, options);
    });
}

function executeSearch(term, destination) {
    let results = fuse.search(term);
    let searchitems = "";

    if (results.length === 0) {
        resultsAvailable = false;
        searchitems = "";
    } else {
        for (let i in results.slice(0, 15)) { // only show first 15 results
            if (window.innerWidth < 1200) {
                searchitems = searchitems + "<li><a href=\"" + results[i].item.permalink + "\"><div class=\"thumb\"></div><div class=\"meta\"><h3>" + results[i].item.title + "</h3></div></a></li>";
            } else {
                searchitems = searchitems + "<li tabindex=\"0\"><a href=\"" + results[i].item.permalink + "\">" + results[i].item.title + "</a></li>";
            }
        }
        resultsAvailable = true;
    }
    destination.innerHTML = searchitems;
}