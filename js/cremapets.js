function checkOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches && window.innerWidth < 768) {
        document.querySelector('.rotate-message').style.display = 'flex';
        document.querySelector('.main-container').style.display = 'none';
    } else {
        document.querySelector('.rotate-message').style.display = 'none';
        document.querySelector('.main-container').style.display = 'flex';
    }
}

window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

window.addEventListener('load', () => {
    document.body.classList.remove('loading');
    checkOrientation();
});

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);