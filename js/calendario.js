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

// Función para descargar la imagen
async function downloadImage() {
    try {
        const imageUrl = './imgs/calendario/CALENDARIO-PROMOCIONES-FUNERALES-BRAVO.jpg';
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'CALENDARIO-2025-FUNERALES-BRAVO.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

        showToast('¡Calendario descargado exitosamente!');
    } catch (error) {
        console.error('Error al descargar:', error);
        showToast('Error al descargar el calendario');
    }
}

downloadBtn.addEventListener('click', downloadImage);

// Función para compartir solo la imagen
async function shareImage() {
    try {
        const imageUrl = './imgs/calendario/CALENDARIO-PROMOCIONES-FUNERALES-BRAVO.jpg';

        // Verificar si el navegador soporta Web Share API con archivos
        if (navigator.canShare && navigator.share) {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], 'CALENDARIO-2025-FUNERALES-BRAVO.jpg', { type: blob.type });

            if (navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: 'Calendario de Promociones - Funerales Bravo',
                    text: 'Mira nuestro calendario de promociones especiales',
                    files: [file]
                });
                showToast('¡Calendario compartido exitosamente!');
                return;
            }
        }

        // Fallback: copiar enlace de la imagen
        const fullImageUrl = window.location.origin + '/' + imageUrl;
        await navigator.clipboard.writeText(fullImageUrl);
        showToast('¡Enlace de la imagen copiado al portapapeles!');

    } catch (error) {
        console.error('Error al compartir:', error);
        // Último fallback
        copyToClipboard();
    }
}

shareBtn.addEventListener('click', shareImage);

function copyToClipboard() {
    const imageUrl = window.location.origin + '/imgs/calendario/CALENDARIO-PROMOCIONES-FUNERALES-BRAVO.jpg';
    navigator.clipboard.writeText(imageUrl).then(() => {
        showToast('¡Enlace de la imagen copiado al portapapeles!');
    }).catch(() => {
        showToast('Compartir no disponible en este navegador');
    });
}

window.addEventListener('load', function () {
    const cards = document.querySelectorAll('.promotion-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Agregar estilos iniciales para las cards
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.promotion-card');
    cards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
    });
});