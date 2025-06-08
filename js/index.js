//MENU
const menuTrigger = document.getElementById('menuTrigger');
const slideMenu = document.getElementById('slideMenu');
const menuOverlay = document.getElementById('menuOverlay');
const tooltip = document.querySelector('.menu-tooltip');

let tooltipTimeout;
let hasShownTooltip = false;

function showTooltip() {
    if (!hasShownTooltip) {
        tooltip.classList.add('show');
        hasShownTooltip = true;

        tooltipTimeout = setTimeout(() => {
            hideTooltip();
        }, 6000);
    }
}

function hideTooltip() {
    tooltip.classList.remove('show');
    if (tooltipTimeout) {
        clearTimeout(tooltipTimeout);
    }
}

function toggleMenu() {
    menuTrigger.classList.toggle('active');
    slideMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');

    if (slideMenu.classList.contains('active')) {
        hideTooltip();
    }
}

setTimeout(() => {
    showTooltip();
}, 1500);

let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!hasShownTooltip) return;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (!slideMenu.classList.contains('active')) {
            tooltip.classList.add('show');
            setTimeout(() => {
                hideTooltip();
            }, 1000);
        }
    }, 1000);
});

// Abrir/cerrar menú con el botón
menuTrigger.addEventListener('click', toggleMenu);

// Cerrar menú al hacer clic en el overlay
menuOverlay.addEventListener('click', toggleMenu);

// Cerrar menú con tecla ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && slideMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// Ocultar tooltip si el usuario hace clic en cualquier parte
document.addEventListener('click', function (e) {
    if (!menuTrigger.contains(e.target)) {
        hideTooltip();
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

//EXTRAS
const extrasData = [
    {
        title: "+ Cremación",
        description: "Servicio de cremación con entrega de cenizas en urna básica",
        features: ["Proceso de cremación", "Urna básica incluida", "Certificado de cremación"],
        price: "Desde $8,500",
        extraQuery: "cremacion"
    },
    {
        title: "+ Domicilio",
        description: "Velación en la comodidad del hogar familiar",
        features: ["Instalación en domicilio", "Equipo de refrigeración", "Decoración básica"],
        price: "Desde $4,200",
        extraQuery: "domicilio"
    },
    {
        title: "+ Cremación + Domicilio",
        description: "Combinación completa de ambos servicios con descuento especial",
        features: ["Todos los beneficios anteriores", "Descuento por paquete", "Gestión integral"],
        price: "Desde $11,900",
        extraQuery: "combo"
    }
];

const planes = ["basico", "estandar", "premier", "lux"];

function renderExtrasFor(plan) {
    const container = document.getElementById(`extras-${plan}`);
    if (!container) return;

    container.innerHTML = `
    <div class="extras-container">
      <h4 class="extras-title">Servicios Adicionales Disponibles</h4>
      <div class="extras-grid">
        ${extrasData.map(extra => `
          <div class="extra-card">
            <h4>${extra.title}</h4>
            <p>${extra.description}</p>
            <ul class="extra-features">
              ${extra.features.map(f => `<li>${f}</li>`).join("")}
            </ul>
            <div class="extra-price">${extra.price}</div>
            <a href="cotizador.html?plan=${plan}&extra=${extra.extraQuery}" class="cotizar-btn">Cotiza Ya</a>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
    planes.forEach(plan => renderExtrasFor(plan));
});

//CARDS
function toggleCard(card) {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(c => {
        if (c !== card) {
            c.classList.remove('expanded');
        }
    });

    card.classList.toggle('expanded');
}


document.addEventListener('click', function (event) {
    if (!event.target.closest('.card')) {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.remove('expanded');
        });
    }
});