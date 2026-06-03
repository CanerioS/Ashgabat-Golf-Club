document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 1000);
        }, 1200);
    });

    // 2. Cinematic Slider — 4 saniyede bir değişir (eskiden 7 saniyeydi)
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000);

    // 3. Smart Navbar & Scroll Reveal
    const nav = document.getElementById('main-nav');
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });

    // 5. Hero sub expandable drawer
    const heroSubBox = document.getElementById('hero-sub-box');
    const heroSubTrigger = document.getElementById('hero-sub-trigger');
    if (heroSubTrigger) {
        heroSubTrigger.addEventListener('click', () => {
            heroSubBox.classList.toggle('open');
        });
    }

    // 4. Mobile Menu — compact slide panel
    const trigger = document.getElementById('mob-trigger');
    const closeBtn = document.getElementById('mob-close');
    const overlay = document.getElementById('mob-overlay');
    const panel = overlay.querySelector('.menu-panel');

    const openMenu = () => {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    };
    const closeMenu = () => {
        overlay.classList.remove('open');
        document.body.style.overflow = 'auto';
    };

    trigger.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    // Backdrop (dışı) tıklayınca kapat
    overlay.addEventListener('click', (e) => {
        if (!panel.contains(e.target)) closeMenu();
    });

    // Herhangi bir linke tıklayınca kapat
    overlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});
