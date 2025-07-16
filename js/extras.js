
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

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const menuDropdown = document.getElementById('menuDropdown');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenu = document.getElementById('closeMenu');

    console.log('Menu PC Elements:', {
        menuToggle: menuToggle,
        menuDropdown: menuDropdown,
        closeMenu: closeMenu
    });

    function openMenuPC() {
        console.log('Abriendo menú PC');
        if (menuToggle) menuToggle.classList.add('active');
        if (menuDropdown) menuDropdown.classList.add('active');
        if (menuOverlay) menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenuPC() {
        console.log('Cerrando menú PC');
        if (menuToggle) menuToggle.classList.remove('active');
        if (menuDropdown) menuDropdown.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function toggleMenuPC(e) {
        e.preventDefault();
        e.stopPropagation();

        const isActive = menuToggle && menuToggle.classList.contains('active');
        console.log('Toggle menú PC - Estado actual:', isActive);

        if (isActive) {
            closeMenuPC();
        } else {
            openMenuPC();
        }
    }

    if (menuToggle && menuDropdown) {
        console.log('Inicializando menú PC');

        menuToggle.addEventListener('click', toggleMenuPC);

        if (closeMenu) {
            closeMenu.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeMenuPC();
            });
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuToggle.classList.contains('active')) {
                closeMenuPC();
            }
        });

        document.querySelectorAll('.menu-pc-link').forEach(link => {
            link.addEventListener('click', () => {
                console.log('Clic en enlace del menú PC');
                closeMenuPC();
            });
        });

        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenuPC);
        }

        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) &&
                !menuDropdown.contains(e.target) &&
                menuToggle.classList.contains('active')) {
                closeMenuPC();
            }
        });

    } else {
        console.error('Elementos del menú PC no encontrados:', {
            menuToggle: !!menuToggle,
            menuDropdown: !!menuDropdown
        });
    }
});

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

    const porcentajeAnticipo = parseInt(document.getElementById('anticipo-porcentaje').value) || 0;
    const mesesPago = parseInt(document.getElementById('meses-pago').value) || 0;

    const anticipoMonto = Math.round((precioConDescuento * porcentajeAnticipo) / 100);
    const montoRestante = Math.max(precioConDescuento - anticipoMonto, 0);
    const mensualidad = (mesesPago > 0 && montoRestante > 0) ? montoRestante / mesesPago : 0;

    // Actualizar resumen
    document.getElementById('precio-original').textContent =
        `$${precioBase.toLocaleString('es-MX')} MXN`;
    document.getElementById('precio-original').style.opacity = '0.5';
    document.getElementById('precio-original').style.display = 'inline';

    document.getElementById('mensaje-descuento').style.display = 'block';

    document.getElementById('costo-total').textContent =
        `$${precioConDescuento.toLocaleString('es-MX')} MXN`;

    document.getElementById('anticipo-monto').textContent =
        `${porcentajeAnticipo}% ($${anticipoMonto.toLocaleString('es-MX')} MXN)`;

    document.getElementById('mensualidad').textContent =
        mesesPago > 0 ? `$${mensualidad.toLocaleString('es-MX')} MXN / mes` : '$0 MXN';
    document.getElementById('meses-sin-intereses').textContent =
        mesesPago > 0 ? `${mesesPago} meses` : '--';

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
    const porcentajeAnticipo = parseInt(document.getElementById('anticipo-porcentaje').value) || 0;
    const mesesPago = parseInt(document.getElementById('meses-pago').value) || 0;

    const anticipoMonto = Math.round((precioConDescuento * porcentajeAnticipo) / 100);
    const montoRestante = Math.max(precioConDescuento - anticipoMonto, 0);
    const mensualidad = (mesesPago > 0 && montoRestante > 0)
        ? Math.round(montoRestante / mesesPago)
        : 0;

    const nombre = document.getElementById('nombre-completo').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    const datosFormspree = {
        nombre_completo: nombre,
        correo: correo,
        telefono: telefono,
        plan: planSeleccionado,
        precio_base: precioBase.toLocaleString('es-MX'),
        precio_con_descuento: precioConDescuento.toLocaleString('es-MX'),
        anticipo_porcentaje: `${porcentajeAnticipo}%`,
        anticipo_monto: anticipoMonto.toLocaleString('es-MX'),
        meses_pago: mesesPago,
        mensualidad: mensualidad.toLocaleString('es-MX')
    };

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formspree.io/f/xovwokkk';
    form.style.display = 'none';

    Object.entries(datosFormspree).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
    });

    const replyTo = document.createElement('input');
    replyTo.type = 'hidden';
    replyTo.name = '_replyto';
    replyTo.value = correo;
    form.appendChild(replyTo);

    document.body.appendChild(form);
    form.submit();

    setTimeout(() => form.remove(), 1000);
}