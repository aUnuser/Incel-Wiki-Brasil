document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth < 1200) {
        overlay();
    }
    const mediaQuery = '(max-width: 1199px)';
    const mediaQueryList = window.matchMedia(mediaQuery);
    mediaQueryList.addEventListener("change", event => {
        if (event.matches) {
            console.log("MENOR");
            overlay();
        } else {
            console.log("MAIOR");
        }
    });

    function overlay () {
        var magButton = document.getElementById("searchLabel");
        magButton.addEventListener("click", function () {
            var body = document.getElementsByTagName("body")[0];
            body.classList.toggle("noScroll");
        });
    }
});

