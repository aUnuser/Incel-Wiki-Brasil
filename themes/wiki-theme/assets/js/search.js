var fuseInBar;
var fuseInPage;
var firstRun = true;

var resultsMobile = document.getElementById("searchResultsMobile");
var resultsDesktop = document.getElementById("searchResultsDesktop");

var inputMobile = document.getElementById("searchInputMobile");
var inputDesktop = document.getElementById("searchInputDesktop");

var searchPageResults = document.getElementById("searchPageResults");

var resultsAvailable = false;

var desktopSearchFocused = false;
var resultsFocused = false;
var mobileSearchFocused = false;
var isTabletOverlayOn = false;
var tabletOverlayElement = document.getElementsByClassName("overlay")[0];

var magButton = document.getElementById("searchLabel");
var searchInputMobile = document.getElementById("searchInputMobile");
var body = document.getElementsByTagName("body")[0];

function overlayToggle() {
    if(!isTabletOverlayOn) {
        tabletOverlayElement.style.cssText = "visibility:visible;opacity:1;display:block;";
    } else {
        tabletOverlayElement.style.cssText = "visibility:hidden;opacity:0;display:none;";
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
    if (event.key === "ArrowUp" && desktopSearchFocused && resultsDesktop.hasChildNodes()) {
        event.preventDefault();
        if (document.activeElement == inputDesktop) {
            inputDesktop.focus();
            resultsFocused = true;
        }
        else if (document.activeElement == desktopFirst) {
            inputDesktop.focus();
            resultsFocused = false;
        }
        else {
            document.activeElement.previousSibling.focus();
            resultsFocused = true;
        }
    } else if (event.key === "ArrowDown" && desktopSearchFocused && resultsDesktop.hasChildNodes()) {
        event.preventDefault();
        if (document.activeElement == inputDesktop) {
            desktopFirst.focus();
            resultsFocused = true;
        }
        else if (document.activeElement == desktopLast) {
            desktopLast.focus();
            resultsFocused = false;
        }
        else {
            document.activeElement.nextSibling.focus();
            resultsFocused = true;
        }
    } else if (event.key === "Enter" && resultsFocused) {
        window.location.assign(event.target.children[0].href);
    }
}

// Desktop
function clickOutside(event) {
    if ((event.target !== inputDesktop && !inputDesktop.contains(event.target)) && (event.target !== resultsDesktop && !resultsDesktop.contains(event.target))) {
        resultsDesktop.style.display = "none";
        desktopSearchFocused = false;
    }
}
function focusOutside(event) {
    var searchContainerDesktop = document.getElementsByClassName("searchContainer")[0]
    if(!searchContainerDesktop.contains(event.target)) {
        resultsDesktop.style.display = "none";
        desktopSearchFocused = false;
    } else if (event.target == inputDesktop && inputDesktop.value) {
        executeSearchBar(inputDesktop.value, resultsDesktop);
    }
}
///

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
        document.addEventListener("focus", focusOutside, true);
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
        document.removeEventListener("focus", focusOutside, true);
    } else {
        // Desktop
        document.removeEventListener("click", tabletOverlayFunc);
        searchInputMobile.removeEventListener("focus", toggleBodyScroll);
        resetBodyNoScroll();
        document.addEventListener("keydown", upDownArrows);
        document.addEventListener("click", clickOutside);
        document.addEventListener("focus", focusOutside, true);
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
            createSearch();
            firstRun = false;
        }
        
    }
}, true);

inputMobile.onkeyup = function (e) {
    executeSearchBar(this.value, resultsMobile);
}
inputDesktop.onkeyup = function (e) {
    executeSearchBar(this.value, resultsDesktop);
    if(!this.value) {
        resultsDesktop.style.display = "none";
    } else if (resultsDesktop.style.display === "none") {
        resultsDesktop.style.display = "block";
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

function createSearch() {
    fetchJSONFile('/index.json', function (data) {
        var optionsInBar = {
            useExtendedSearch: true,
            shouldSort: true,
            ignoreLocation: true,
            threshold: 0,
            minMatchCharLength: 1,
            keys: [
                "title"
            ]
        };
        fuseInBar = new Fuse(data, optionsInBar);
        
        var searchQuery = param("q");
        if (searchQuery) {
            var optionsInPage = {
                useExtendedSearch: true,
                shouldSort: true,
                ignoreLocation: true,
                threshold: 0,
                minMatchCharLength: 1,
                keys: [
                    "content",
                    "categorias"
                ]
            };
            fuseInPage = new Fuse(data, optionsInPage);
            executeSearchPage(searchQuery, searchPageResults);
        }
    });
}

function executeSearchBar(term, destination) {
    var results = fuseInBar.search(term);
    let searchitems = "";

    if (results.length === 0) {
        resultsAvailable = false;
        searchitems = "";
    } else {
        for (let i in results.slice(0, 15)) { // only show first 15 results
            if (window.innerWidth < 1200) {
                searchitems = searchitems + "<li><a href=\"" + results[i].item.permalink + "\"><div class=\"thumb\"></div><div class=\"meta\"><h3>" + results[i].item.title + "</h3></div></a></li>";
            } else {
                var reg = new RegExp('(' + term + ')', 'gi');
                searchitems = searchitems + "<li tabindex=\"0\"><a href=\"" + results[i].item.permalink + "\">" + results[i].item.title.replace(reg, "<b>$1</b>") + "</a></li>";
            }
        }
        resultsAvailable = true;
    }
    searchitems = searchitems + "<li tabindex=\"0\" class=\"SearchPageThatContains\"><a href=\"/busca?q=" + term + "\"><div>Buscar por páginas que contenham</div><i>" + term + "</i></a></li>";
    destination.innerHTML = searchitems;

    if (!desktopSearchFocused) {
        resultsDesktop.style.display = "block";
        desktopSearchFocused = true;
    }
}

function param(name) {
    return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ')
}
var isSearchPage = window.location.href.search(/\/busca\//g)
if(isSearchPage != -1) {
    var searchQuery = param("q");
    createSearch();
    firstRun = false;
    
}
function executeSearchPage(term, destination) {
    var results = fuseInPage.search(term);
    let searchitems = "";

    if (results.length === 0) {
        searchitems = "";
    } else {
        for (let i in results.slice(0, 15)) { // only show first 15 results
            searchitems = searchitems + "<li><a href=\"" + results[i].item.permalink + "\"><span>" + results[i].item.title + "</span></a><div class=\"desc\">" + results[i].item.desc + "</div><div class=\"data\">" + results[i].item.wordcount + " palavras - " + results[i].item.lastmod + "</div></li>";
        }
    }
    destination.innerHTML = searchitems;

}