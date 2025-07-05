let planSeleccionado = null;
let precioBase = 0;
let precioConDescuento = 0;

document.querySelectorAll('.cotizador-plan-btn').forEach(btn => {
    btn.addEventListener('click', function () {

        document.querySelectorAll('.cotizador-plan-btn')
            .forEach(b => b.classList.remove('selected'));

        this.classList.add('selected');
        planSeleccionado = this.getAttribute('data-plan');
        precioBase = parseInt(this.getAttribute('data-precio'));
        precioConDescuento = Math.round(precioBase * 0.90);

        document.getElementById('plan-seleccionado').textContent =
            this.innerHTML.split('<br>')[0];

        document.getElementById('costo-total').textContent =
            `$${precioConDescuento.toLocaleString('es-MX')} MXN`;

        document.getElementById('precio-original').textContent =
            `$${precioBase.toLocaleString('es-MX')} MXN`;
        document.getElementById('precio-original').style.display = 'inline';

        document.getElementById('mensaje-descuento').style.display = 'block';

        calcularCotizacion();
    });
});

document.getElementById('anticipo-porcentaje').addEventListener('change', calcularCotizacion);
document.getElementById('meses-pago').addEventListener('change', calcularCotizacion);

function calcularCotizacion() {

    if (!planSeleccionado || !precioConDescuento) return;

    const anticipoMonto = parseInt(
        document.getElementById('anticipo-porcentaje').value) || 0;

    const mesesPago = parseInt(
        document.getElementById('meses-pago').value) || 0;

    document.getElementById('anticipo-monto').textContent =
        `$${anticipoMonto.toLocaleString('es-MX')} MXN`;

    const montoRestante = Math.max(precioConDescuento - anticipoMonto, 0);

    if (mesesPago > 0 && montoRestante > 0) {
        const mensualidad = montoRestante / mesesPago;
        document.getElementById('mensualidad').textContent =
            `$${mensualidad.toLocaleString('es-MX')} MXN`;
    } else {
        document.getElementById('mensualidad').textContent = '$0 MXN';
    }
}

function mostrarPopup() {
    if (!planSeleccionado) {
        alert('Por favor seleccione un plan');
        return;
    }

    const nombre = document.getElementById('nombre-completo').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    if (!nombre || !correo || !telefono) {
        alert('Por favor complete todos los campos de contacto');
        return;
    }

    document.getElementById('cotizador-popup').style.display = 'flex';
}

function cerrarPopup() {
    document.getElementById('cotizador-popup').style.display = 'none';
}

function enviarCotizacion() {
    const datosFormspree = {
        plan: planSeleccionado,
        precio_base: precioBase,
        precio_con_descuento: precioConDescuento,
        anticipo_monto: document.getElementById('anticipo-porcentaje').value,
        meses_pago: document.getElementById('meses-pago').value,
        nombre_completo: document.getElementById('nombre-completo').value,
        correo: document.getElementById('correo').value,
        telefono: document.getElementById('telefono').value
    };

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formspree.io/mvgrobjn';

    Object.keys(datosFormspree).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = datosFormspree[key];
        form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
}

window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName('form')) {
        form.reset();
    }
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

async function shareImage() {
    try {
        const imageUrl = './imgs/calendario/CALENDARIO-PROMOCIONES-FUNERALES-BRAVO.jpg';

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

    } catch (error) {
        console.error('Error al compartir:', error);
        copyToClipboard();
    }
}

shareBtn.addEventListener('click', shareImage);

function copyToClipboard() {
    const imageUrl = window.location.origin + './imgs/calendario/CALENDARIO-PROMOCIONES-FUNERALES-BRAVO.jpg';
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

document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});