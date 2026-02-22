// The Southern Standard - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');

            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.setAttribute('data-lucide', 'menu');
            } else {
                icon.setAttribute('data-lucide', 'x');
            }

            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });
        });
    }

    // Sticky Navbar Shadow Enhancement
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                navbar.classList.add('shadow-xl');
                navbar.classList.remove('shadow-lg');
            } else {
                navbar.classList.add('shadow-lg');
                navbar.classList.remove('shadow-xl');
            }
        });
    }

    // ✅ NETLIFY FORM ENHANCEMENT (NO preventDefault)
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function () {

            const submitBtn = quoteForm.querySelector('button[type="submit"]');

            if (submitBtn) {
                submitBtn.innerHTML = 'Sending...';
                submitBtn.disabled = true;
                submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
            }

            // DO NOT prevent default
            // Let Netlify submit normally and redirect to thankyou.html
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Intersection Observer Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('stagger-item');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });

    // Active Navigation Highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a[href="' + currentPage + '"]');

    navLinks.forEach(link => {
        if (!link.classList.contains('bg-[#f4b73f]')) {
            link.classList.add('text-[#f4b73f]');
            if (link.classList.contains('font-medium')) {
                link.classList.remove('font-medium');
                link.classList.add('font-semibold');
            }
        }
    });

    // ✅ Phone Input Masking (fixed selector)
    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 10) {
                value = value.substring(0, 10);
            }

            if (value.length >= 6) {
                value = '(' + value.substring(0, 3) + ') ' +
                    value.substring(3, 6) + '-' +
                    value.substring(6);
            } else if (value.length >= 3) {
                value = '(' + value.substring(0, 3) + ') ' +
                    value.substring(3);
            }

            e.target.value = value;
        });
    }

    // Form Validation Styling (visual only)
    const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (!this.value.trim()) {
                this.classList.add('border-red-500');
                this.classList.remove('border-gray-300');
            } else {
                this.classList.remove('border-red-500');
                this.classList.add('border-gray-300');
            }
        });

        input.addEventListener('input', function () {
            if (this.value.trim()) {
                this.classList.remove('border-red-500');
                this.classList.add('border-gray-300');
            }
        });
    });

    console.log('The Southern Standard - Website Loaded Successfully');
});
