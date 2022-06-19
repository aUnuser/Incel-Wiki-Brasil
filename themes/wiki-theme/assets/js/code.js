document.addEventListener("DOMContentLoaded", function () {
    var single_content = document.querySelector("#single-main > #content");
    var single_content_headers = single_content.getElementsByTagName("h2");
    var degrees = 180;
    Object.keys(single_content_headers).forEach(function (i) {
        var header = single_content_headers[i];
        var towrap = Object.values(nextUntil(header, "h2"));
        var wrapper = document.createElement("section");
        if(header.parentNode.id != "toc"){
            wrapper = wrapAll(towrap, wrapper);
        }
        
    });

    if (window.innerWidth < 1200) {
        for (var i = 0; i < single_content_headers.length; i++) {
            single_content_headers[i].nextElementSibling.classList.toggle("hidden");
            single_content_headers[i].addEventListener("click", onClick);
        }
    }

    const mediaQuery = '(max-width: 1199px)';
    const mediaQueryList = window.matchMedia(mediaQuery);
    mediaQueryList.addEventListener("change", event => {
        if (event.matches) {
            for (var i = 0; i < single_content_headers.length; i++) {
                single_content_headers[i].nextElementSibling.classList.toggle("hidden");
                single_content_headers[i].addEventListener("click", onClick);
            }
        } else {
            for (var i = 0; i < single_content_headers.length; i++) {
                single_content_headers[i].nextElementSibling.classList.toggle("hidden");
                single_content_headers[i].removeEventListener("click", onClick);
            }
        }
    });

    function onClick () {
        console.log(this.querySelector("#collapse-chevron").style.transform);
        this.querySelector("#collapse-chevron").style.transform = "rotate(" + degrees + "deg)";
        degrees += 180;
        console.log(degrees);
        var section = this.nextElementSibling;
        section.classList.toggle("hidden");
    }

});

function nextUntil(elem, selector, filter) {
    // https://gomakethings.com/how-to-get-all-sibling-elements-until-a-match-is-found-with-vanilla-javascript/

    // matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    // Setup siblings array
    var siblings = [];
    // Get the next sibling element
    elem = elem.nextElementSibling;
    // As long as a sibling exists
    while (elem) {

        // If we've reached our match, bail
        if (elem.matches(selector)) break;

        // If filtering by a selector, check if the sibling matches
        if (filter && !elem.matches(filter)) {
            elem = elem.nextElementSibling;
            continue;
        }

        // Otherwise, push it to the siblings array
        siblings.push(elem);

        // Get the next sibling element
        elem = elem.nextElementSibling;

    }
    return siblings;
};

function wrapAll(nodes, wrapper) {
    // https://stackoverflow.com/questions/3337587/wrapping-a-set-of-dom-elements-using-javascript

    // Cache the current parent and previous sibling of the first node.
    var parent = nodes[0].parentNode;
    var previousSibling = nodes[0].previousSibling;

    // Place each node in wrapper.
    //  - If nodes is an array, we must increment the index we grab from 
    //    after each loop.
    //  - If nodes is a NodeList, each node is automatically removed from 
    //    the NodeList when it is removed from its parent with appendChild.
    for (var i = 0; nodes.length - i; wrapper.firstChild === nodes[0] && i++) {
        wrapper.appendChild(nodes[i]);
    }

    // Place the wrapper just after the cached previousSibling,
    // or if that is null, just before the first child.
    var nextSibling = previousSibling ? previousSibling.nextSibling : parent.firstChild;
    parent.insertBefore(wrapper, nextSibling);

    return wrapper;
}

function toggle(element) {
    if (element.classList.contains("hidden")) {
        element.classList.remove("hidden");
    } else {
        element.classList.add("hidden");
    }
}