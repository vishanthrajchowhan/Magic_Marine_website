/* ==========================================
   MAGIC MARINE SERVICE - JAVASCRIPT
   Professional Yacht & Marine Services
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    initFormHandler();
});

/* ===== MOBILE MENU TOGGLE ===== */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (!mobileMenuToggle || !navMenu) return;

    // Toggle menu on button click
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
    // Smooth scrolling is handled by CSS: scroll-behavior: smooth;
    // This function can be extended for additional scroll effects if needed

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

/* ===== FORM HANDLER ===== */
function initFormHandler() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();

            let isValid = true;
            const errors = [];

            if (!name) {
                errors.push('Name is required');
                isValid = false;
            }

            if (!email || !isValidEmail(email)) {
                errors.push('Valid email is required');
                isValid = false;
            }

            if (!service) {
                errors.push('Please select a service');
                isValid = false;
            }

            if (!message) {
                errors.push('Message is required');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
                showFormError(errors);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
}

/* ===== EMAIL VALIDATION ===== */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* ===== FORM ERROR DISPLAY ===== */
function showFormError(errors) {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    // Remove existing error message if any
    const existingError = contactForm.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }

    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = `
        background-color: #fee;
        color: #c33;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        border-left: 4px solid #c33;
    `;

    const errorList = errors.map(error => `<li style="margin-left: 1.5rem;">${error}</li>`).join('');
    errorDiv.innerHTML = `
        <strong>Please correct the following errors:</strong>
        <ul style="margin-top: 0.5rem;">
            ${errorList}
        </ul>
    `;

    contactForm.insertBefore(errorDiv, contactForm.firstChild);
}

/* ===== PAGE LOAD ANIMATIONS ===== */
window.addEventListener('load', function() {
    // Add animation class to elements as they come into view
    observeElements();
});

function observeElements() {
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        return;
    }

    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, options);

    // Observe all cards and items
    const elementsToObserve = document.querySelectorAll(
        '.service-card, .reason-item, .value-card, .trust-item, .step, .stat'
    );

    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

/* ===== ACTIVE NAV LINK ON PAGE LOAD ===== */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Set active link on page load
document.addEventListener('DOMContentLoaded', setActiveNavLink);

/* ===== UTILITY FUNCTIONS ===== */

/**
 * Scrolls to an element smoothly
 * @param {string} elementId - The ID of the element to scroll to
 */
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Adds a class to an element with a delay
 * @param {HTMLElement} element - The element to add class to
 * @param {string} className - The class name to add
 * @param {number} delay - Delay in milliseconds
 */
function addClassWithDelay(element, className, delay = 0) {
    setTimeout(() => {
        element.classList.add(className);
    }, delay);
}

/**
 * Removes a class from an element with a delay
 * @param {HTMLElement} element - The element to remove class from
 * @param {string} className - The class name to remove
 * @param {number} delay - Delay in milliseconds
 */
function removeClassWithDelay(element, className, delay = 0) {
    setTimeout(() => {
        element.classList.remove(className);
    }, delay);
}

/**
 * Checks if an element is in the viewport
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - True if element is in viewport
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* ===== CONSOLE MESSAGES ===== */
console.log('%cMagic Marine Service', 'font-size: 20px; font-weight: bold; color: #1F6AE1;');
console.log('%cProfessional Yacht & Marine Services', 'font-size: 14px; color: #0A1F33;');
console.log('%cVersion 1.0', 'font-size: 12px; color: #666;');
