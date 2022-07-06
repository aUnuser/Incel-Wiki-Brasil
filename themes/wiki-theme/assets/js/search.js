document.addEventListener("DOMContentLoaded", function () {
    var magButton = document.getElementById("searchLabel");
    var searchInputMobile = document.getElementById("searchInputMobile");
    var body = document.getElementsByTagName("body")[0];
    if (window.innerWidth < 600) {
        // Mobile
        magButton.addEventListener("click", toggleBodyScroll);
    } else if (window.innerWidth >= 600 && window.innerWidth < 1200) {
        // Tablet
        searchInputMobile.addEventListener("focus", toggleBodyScroll);
    } else {
        // Desktop
    }
    const mobileDesktop = window.matchMedia("(max-width: 1199px)");
    const bigSmallMobile = window.matchMedia("(min-width: 600px)");
    mobileDesktop.addEventListener("change", event => {
        console.log(event);
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
        console.log(event);
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
        }
    });
    function toggleBodyScroll() {
        body.classList.toggle("noScroll");
    }
    function resetBodyScroll() {
        for(var i = 0; i < body.classList.length; i++) {
            if(body.classList[i] === "noScroll") {
                body.classList.remove("noScroll")
            }
        }
    }
});
