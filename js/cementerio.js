fetch('/compartido/global.html')
    .then(res => res.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const footer = doc.querySelector('footer');
        if (footer) document.getElementById('footer-placeholder').innerHTML = footer.outerHTML;

        document.body.style.visibility = 'visible';
    })
    .catch(err => {
        console.error('Error al cargar global.html:', err);
        document.body.style.visibility = 'visible';
    });

function redirectTo(url) {
    window.location.href = url;
}