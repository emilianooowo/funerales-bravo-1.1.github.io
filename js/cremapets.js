function checkOrientation() {
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    const isSmallScreen = window.innerWidth < 768;

    if (isPortrait && isSmallScreen) {
        document.querySelector(".rotate-message").style.display = "flex";
        document.querySelector(".main-container").style.display = "none";
    } else {
        document.querySelector(".rotate-message").style.display = "none";
        document.querySelector(".main-container").style.display = "flex";
    }
}

window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
