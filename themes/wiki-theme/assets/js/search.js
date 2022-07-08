var fuse;
var firstRun = true;

var resultsMobile = document.getElementById("searchResultsMobile");
var resultsDesktop = document.getElementById("searchResultsDesktop");

var inputMobile = document.getElementById("searchInputMobile");
var inputDesktop = document.getElementById("searchInputDesktop");

var resultsAvailable = false;

var desktopSearchFocused = false;
var mobileSearchFocused = false;
var isTabletOverlayOn = false;
var tabletOverlayElement = document.getElementsByClassName("overlay")[0];

var magButton = document.getElementById("searchLabel");
var searchInputMobile = document.getElementById("searchInputMobile");
var body = document.getElementsByTagName("body")[0];

function overlayToggle() {
    if(!isTabletOverlayOn) {
        tabletOverlayElement.style.cssText = `
            visibility: visible;
            opacity: 1;
            display: block;`;
    } else {
        tabletOverlayElement.style.cssText = `
            visibility: hidden;
            opacity: 0;
            display: none;`;
    }
}

function tabletOverlayFunc(event) {
    if(event.target === inputMobile && !isTabletOverlayOn) {
        overlayToggle();
        isTabletOverlayOn = true;
    }
    if(isTabletOverlayOn) {
        if(event.target != inputMobile && !resultsMobile.contains(event.target)) {
            overlayToggle();
            resetBodyNoScroll();
            isTabletOverlayOn = false;
        }
    }
}

function upDownArrows(event) {
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
    } else if (event.key === "ArrowDown" && desktopSearchFocused) {
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
    } else if (event.key === "Enter" && desktopSearchFocused) {
        window.location.assign(event.target.children[0].href);
    }
}

function clickOutside(event) {
    if ((event.target !== inputDesktop && !inputDesktop.contains(event.target)) && (event.target !== resultsDesktop && !resultsDesktop.contains(event.target))) {
        resultsDesktop.style.display = "none";
        desktopSearchFocused = false;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth < 600) {
        // Mobile
        magButton.addEventListener("click", toggleBodyScroll);
    } else if (window.innerWidth >= 600 && window.innerWidth < 1200) {
        // Tablet
        searchInputMobile.addEventListener("focus", toggleBodyScroll);
        document.addEventListener("click", tabletOverlayFunc);
    } else {
        // Desktop
        document.addEventListener("keydown", upDownArrows);
        document.addEventListener("click", clickOutside);
    }
});

/// Media Queries
const mobileDesktop = window.matchMedia("(max-width: 1199px)");
const bigSmallMobile = window.matchMedia("(min-width: 600px)");
mobileDesktop.addEventListener("change", event => {
    if (event.matches) {
        // Tablet
        searchInputMobile.addEventListener("focus", toggleBodyScroll);
        document.addEventListener("click", tabletOverlayFunc);
        document.removeEventListener("keydown", upDownArrows);
        document.removeEventListener("click", clickOutside);
    } else {
        // Desktop
        document.removeEventListener("click", tabletOverlayFunc);
        searchInputMobile.removeEventListener("focus", toggleBodyScroll);
        resetBodyNoScroll();
        document.addEventListener("keydown", upDownArrows);
        document.addEventListener("click", clickOutside);
    }
});
bigSmallMobile.addEventListener("change", event => {
    if (event.matches) {
        // Tablet
        searchInputMobile.addEventListener("focus", toggleBodyScroll);
        document.addEventListener("click", tabletOverlayFunc);
        magButton.removeEventListener("click", toggleBodyScroll);
        resetBodyNoScroll();
    } else {
        // Mobile
        tabletOverlayElement.style.cssText = "";
        document.removeEventListener("click", tabletOverlayFunc);
        searchInputMobile.removeEventListener("focus", toggleBodyScroll);
        magButton.addEventListener("click", toggleBodyScroll);
        resetBodyNoScroll();
        if (document.getElementById("searchToggle").checked) {
            toggleBodyScroll();
        }
    }
});
function toggleBodyScroll() {
    body.classList.toggle("noScroll");
}
function resetBodyNoScroll() {
    for (var i = 0; i < body.classList.length; i++) {
        if (body.classList[i] === "noScroll") {
            body.classList.remove("noScroll")
        }
    }
}

/// https://gist.github.com/cmod/5410eae147e4318164258742dd053993 - modded
document.addEventListener("focus", function (e) {
    if (e.path[0].tagName === "INPUT") {
        if (firstRun) {
            loadSearch();
            firstRun = false;
        }
        if (e.path[0].id === "searchInputMobile") {

        } else if (e.path[0].id === "searchInputDesktop") {

        }
    }
}, true);

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
                searchitems = searchitems + "<li tabindex=\"0\"><a href=\"" + results[i].item.permalink + "\">" + results[i].item.title.replace(term, "<b>" + term + "</b>") + "</a></li>";
            }
        }
        resultsAvailable = true;
    }
    destination.innerHTML = searchitems;
}