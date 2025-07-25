function changeMainImage(thumbnails, mainImageId) {
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function () {
            thumbnails.forEach(t => t.classList.remove('active'));

            this.classList.add('active');

            const mainImage = document.getElementById(mainImageId);
            const newImageSrc = this.getAttribute('data-main');
            mainImage.src = newImageSrc;
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const nichoThumbnails = document.querySelectorAll('.nicho-ecologico .thumbnail');
    changeMainImage(nichoThumbnails, 'main-nicho');

    const jardinThumbnails = document.querySelectorAll('.jardin .thumbnail');
    changeMainImage(jardinThumbnails, 'main-jardin');

    const columbarioThumbnails = document.querySelectorAll('.columbario .thumbnail');
    changeMainImage(columbarioThumbnails, 'main-columbario');
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

document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('dynamicHeader');
    let ticking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 400) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
    updateHeader();
});