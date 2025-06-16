
window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName('form')) {
        form.reset();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const servicio = document.getElementById('servicio');
    const tipoFunerario = document.getElementById('tipo-funerario');
    const tipoCementerio = document.getElementById('tipo-cementerio');

    const opcionesFunerario = document.getElementById('opciones-funerario');
    const opcionesCementerio = document.getElementById('opciones-cementerio');
    const planesVelacion = document.getElementById('planes-velacion');
    const planesHomenaje = document.getElementById('planes-homenaje');
    const planesTierra = document.getElementById('planes-tierra');
    const planesColumbario = document.getElementById('planes-columbario');

    servicio.addEventListener('change', () => {
        opcionesFunerario.classList.add('hidden');
        opcionesCementerio.classList.add('hidden');
        if (servicio.value === 'funerario') {
            opcionesFunerario.classList.remove('hidden');
        } else if (servicio.value === 'cementerio') {
            opcionesCementerio.classList.remove('hidden');
        }
        actualizarCamposOcultos();
    });

    tipoFunerario.addEventListener('change', () => {
        planesVelacion.classList.add('hidden');
        planesHomenaje.classList.add('hidden');
        if (tipoFunerario.value === 'velacion') {
            planesVelacion.classList.remove('hidden');
        } else if (tipoFunerario.value === 'homenaje') {
            planesHomenaje.classList.remove('hidden');
        }
        actualizarCamposOcultos();
    });

    tipoCementerio.addEventListener('change', () => {
        planesTierra.classList.add('hidden');
        planesColumbario.classList.add('hidden');
        if (tipoCementerio.value === 'tierra') {
            planesTierra.classList.remove('hidden');
        } else if (tipoCementerio.value === 'columbario') {
            planesColumbario.classList.remove('hidden');
        }
        actualizarCamposOcultos();
    });

    document.querySelectorAll('select, input[type="checkbox"]').forEach(el =>
        el.addEventListener('change', actualizarCamposOcultos)
    );

    function actualizarCamposOcultos() {
        const s = document.getElementById('servicio').value;
        let detalle = `Servicio: ${s}\n`;
        let especial = "no";

        if (s === "funerario") {
            const tipoF = tipoFunerario.value;
            detalle += `Tipo: ${tipoF}\n`;

            if (tipoF === "velacion") {
                const plan = document.getElementById('plan-velacion').value;
                const extras = [];
                if (document.getElementById('extra-domicilio').checked) extras.push('domicilio');
                if (document.getElementById('extra-cremacion').checked) extras.push('cremacion');
                if (document.getElementById('extra-combo').checked) extras.push('cremacion-domicilio');

                detalle += `Plan: ${plan}\nExtras: ${extras.join(', ') || 'ninguno'}\n`;

                if (
                    (plan === 'premium' && extras.includes('cremacion')) ||
                    (plan === 'basico' && extras.includes('cremacion') && extras.includes('domicilio'))
                ) {
                    especial = "sí";
                }

            } else if (tipoF === "homenaje") {
                const plan = document.getElementById('plan-homenaje').value;
                detalle += `Plan: ${plan}\n`;
            }

        } else if (s === "cementerio") {
            const tipoC = tipoCementerio.value;
            detalle += `Tipo: ${tipoC}\n`;

            if (tipoC === "tierra") {
                const plan = document.getElementById('plan-tierra').value;
                detalle += `Plan: ${plan}\n`;
            } else if (tipoC === "columbario") {
                const plan = document.getElementById('plan-columbario').value;
                detalle += `Plan: ${plan}\n`;
                if (plan === "familiar") especial = "sí";
            }
        }

        document.getElementById('detalle-servicio').value = detalle.trim();
        document.getElementById('condicion-especial').value = especial;
    }
});