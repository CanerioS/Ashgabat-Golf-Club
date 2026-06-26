document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 1000);
        }, 1200);
    });

    // 2. Cinematic Slider — 4 saniyede bir değişir
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000);

    // Görseller ve Slaytlar için Sağ Tık (Farklı Kaydet) Engelleme Fonksiyonu
    const blockImageProtection = () => {
        const targets = document.querySelectorAll('img, .slide, .hero-slider');
        targets.forEach(target => {
            target.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                return false;
            });
        });
    };
    blockImageProtection();

    // 3. Smart Navbar, Scroll Reveal & Dynamic Active Indicator
    const nav = document.getElementById('main-nav');
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const sections = document.querySelectorAll('header, section');
    const navLinks = document.querySelectorAll('.nav-links .link-item');
    const heroSubBox = document.getElementById('hero-sub-box');

    // Scroll Reveal Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // Scroll & Navigation handler
    window.addEventListener('scroll', () => {
        // Navbar Scrolled Effect
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Farklı bir yere scroll yapıldığında "Golf is..." kutucuğunu kapat
        if (window.scrollY > window.innerHeight * 0.3) {
            if (heroSubBox && heroSubBox.classList.contains('open')) {
                heroSubBox.classList.remove('open');
            }
        }

        // Scroll pozisyonuna göre Aktif Alt Çizgiyi dinamik olarak güncelleme
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; 
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // 5. Hero sub expandable drawer
    const heroSubTrigger = document.getElementById('hero-sub-trigger');
    if (heroSubTrigger) {
        heroSubTrigger.addEventListener('click', () => {
            heroSubBox.classList.toggle('open');
        });
    }

    // Butonlara doğrudan tıklandığında anında alt çizgiyi güncelleme ve kutuyu kapatma
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            
            if (heroSubBox && heroSubBox.classList.contains('open')) {
                heroSubBox.classList.remove('open');
            }
        });
    });

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

    // Herhangi bir linke tıklayınca kapat ve kutuyu kapat
    overlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
            if (heroSubBox && heroSubBox.classList.contains('open')) {
                heroSubBox.classList.remove('open');
            }
        });
    });
});
