const hamburgerBtn = document.getElementById('hamburgerBtn');
const menuAccesos = document.getElementById('menuAccesos');
const overlay = document.getElementById('overlay');

function toggleMenu() {
    hamburgerBtn.classList.toggle('active');
    menuAccesos.classList.toggle('active');
    overlay.classList.toggle('active');

    // Prevenir scroll del body cuando el menú está abierto
    if (menuAccesos.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMenu() {
    hamburgerBtn.classList.remove('active');
    menuAccesos.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners
hamburgerBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);

// Cerrar menú al hacer clic en un enlace (opcional)
const menuLinks = document.querySelectorAll('.accesos a');
menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Cerrar menú con tecla Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuAccesos.classList.contains('active')) {
        closeMenu();
    }
});

// Manejar cambio de tamaño de ventana
window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && menuAccesos.classList.contains('active')) {
        closeMenu();
    }
});

fetch('global.html')
    .then(res => res.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const header = doc.querySelector('header');
        if (header) document.getElementById('header-placeholder').innerHTML = header.outerHTML;

        const footer = doc.querySelector('footer');
        if (footer) document.getElementById('footer-placeholder').innerHTML = footer.outerHTML;

        document.body.style.visibility = 'visible';
    })
    .catch(err => {
        console.error('Error al cargar global.html:', err);
        document.body.style.visibility = 'visible';
    });

window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName('form')) {
        form.reset();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const stripItems = document.querySelectorAll('.strip-item');
    const contentAreas = document.querySelectorAll('.content-area');

    stripItems.forEach(item => {
        item.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            stripItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.remove('active');
                }
            });

            contentAreas.forEach(content => {
                if (content !== targetContent) {
                    content.classList.remove('active');
                }
            });

            this.classList.toggle('active');
            targetContent.classList.toggle('active');
        });
    });
});