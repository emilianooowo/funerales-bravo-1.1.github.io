//MENU
const menuTrigger = document.getElementById('menuTrigger');
const slideMenu = document.getElementById('slideMenu');
const menuOverlay = document.getElementById('menuOverlay');

let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        slideMenu.classList.add('active');
        menuOverlay.classList.add('active');
        menuTrigger.classList.add('active');
    }
    else {
        slideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        menuTrigger.classList.remove('active');
        document.body.style.overflow = '';
    }
}

menuTrigger.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(() => {
            toggleMenu();
        }, 200);
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
        toggleMenu();
    }
});

slideMenu.addEventListener('touchmove', (e) => {
    if (isMenuOpen) {
        e.stopPropagation();
    }
});

let startY = 0;
let currentY = 0;

slideMenu.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
});

slideMenu.addEventListener('touchmove', (e) => {
    currentY = e.touches[0].clientY;
    const diff = currentY - startY;

    if (diff > 50 && e.target.closest('.menu-content').scrollTop === 0) {
        toggleMenu();
    }
});

//FOOTER
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

//TIRA

document.addEventListener('DOMContentLoaded', function () {
    const stripItems = document.querySelectorAll('.strip-item');
    const contentAreas = document.querySelectorAll('.content-area');

    stripItems.forEach(item => {
        item.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            // Desactiva todas las otras pestañas
            stripItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.remove('active');
                }
            });

            // Oculta todos los otros contenidos
            contentAreas.forEach(content => {
                if (content !== targetContent) {
                    content.classList.remove('active');
                }
            });

            // Activa/desactiva la pestaña clickeada y su contenido
            this.classList.toggle('active');
            targetContent.classList.toggle('active');
        });
    });
});

//CARDS
function toggleCard(card) {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(c => {
        if (c !== card) {
            c.classList.remove('expanded');
        }
    });

    card.classList.toggle('expanded'); // <- aquí se expande o contrae
}


document.addEventListener('click', function (event) {
    if (!event.target.closest('.card')) {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.remove('expanded');
        });
    }
});