document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 1000);
        }, 1200);
    });

    // 2. Cinematic Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 7000);

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

    // 4. Mobile Menu
    const trigger = document.getElementById('mob-trigger');
    const close = document.getElementById('mob-close');
    const overlay = document.getElementById('mob-overlay');

    const toggleMenu = () => {
        overlay.classList.toggle('open');
        document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : 'auto';
    };

    trigger.addEventListener('click', toggleMenu);
    close.addEventListener('click', toggleMenu);
});