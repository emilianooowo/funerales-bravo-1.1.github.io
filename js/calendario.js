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

const toggleBtn = document.getElementById('toggleCalendar');
const calendarSection = document.getElementById('calendarSection');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const toast = document.getElementById('toast');

toggleBtn.addEventListener('click', function () {
    if (calendarSection.classList.contains('active')) {
        calendarSection.classList.remove('active');
        toggleBtn.innerHTML = 'MOSTRAR CALENDARIO';
    } else {
        calendarSection.classList.add('active');
        toggleBtn.innerHTML = 'OCULTAR CALENDARIO';

        setTimeout(() => {
            calendarSection.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            });
        }, 100);
    }
});

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

downloadBtn.addEventListener('click', function () {
    showToast('¡Calendario descargado exitosamente!');

    const link = document.createElement('a');
    link.href = '/calendario/CALENDARIO-PROMOCIONES-FUNERALES-BRAVO.jpg';
    link.download = 'CALENDARIO-PROMOCIONES-FUNERALES-BRAVO.jpg';
    link.click();
});

shareBtn.addEventListener('click', function () {
    if (navigator.share) {
        navigator.share({
            title: 'Calendario de Promociones',
            text: 'Mira nuestro calendario de promociones especiales',
            url: window.location.href
        }).then(() => {
            showToast('¡Calendario compartido exitosamente!');
        }).catch((error) => {
            copyToClipboard();
        });
    } else {
        copyToClipboard();
    }
});

function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('¡Enlace copiado al portapapeles!');
    }).catch(() => {
        showToast('Compartir no disponible en este navegador');
    });
}

window.addEventListener('load', function () {
    const cards = document.querySelectorAll('.promotion-card');
    cards.forEach((card) => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
});