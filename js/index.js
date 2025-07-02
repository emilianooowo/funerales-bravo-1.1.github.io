document.addEventListener('DOMContentLoaded', () => {
    const imagenes = document.querySelectorAll('.imagen-instalacion');
    const totalImagenes = imagenes.length;
    const seccionNosotros = document.getElementById('seccionNosotros');
    const contenedorImagenes = document.getElementById('contenedorImagenes');
    const contenidoTexto = document.getElementById('contenidoTexto');

    let imagenActual = 0;
    let intervaloCarrusel;

    const cambiarImagen = () => {
        imagenes[imagenActual].classList.remove('activa');
        imagenActual = (imagenActual + 1) % totalImagenes;
        imagenes[imagenActual].classList.add('activa');
    };

    const iniciarCarrusel = () => {
        if (!intervaloCarrusel) {
            intervaloCarrusel = setInterval(cambiarImagen, 3000);
        }
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                contenedorImagenes.classList.add('animar');
                contenidoTexto.classList.add('animar');

                setTimeout(() => {
                    requestAnimationFrame(() => {
                        iniciarCarrusel();
                    });
                }, 700);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    if (seccionNosotros) {
        observer.observe(seccionNosotros);
    }
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