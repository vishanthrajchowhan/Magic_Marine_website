// ==========================================
// LUXURY YACHT MAINTENANCE - JAVASCRIPT
// Clean, Modern, Production-Ready
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 4px 16px rgba(15, 23, 42, 0.15)';
            } else {
                navbar.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.05)';
            }
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== COUNTER ANIMATION FOR STATS =====
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const numericTarget = parseInt(target.replace(/\D/g, ''));
        const duration = 2000;
        const increment = numericTarget / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < numericTarget) {
                element.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    console.log('✨ Luxury Yacht Maintenance page initialized');
});
