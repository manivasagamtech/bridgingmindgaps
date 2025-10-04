// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const testimonialCarousel = document.getElementById('testimonialCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselDots = document.getElementById('carouselDots');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
function initMobileNav() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Active Navigation Link
function initActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Testimonial Carousel
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        carouselDots.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(index) {
        // Hide all testimonials
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) {
                setTimeout(() => {
                    testimonial.classList.add('active');
                }, 100);
            }
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        showSlide(currentIndex);
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showSlide(currentIndex);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-advance carousel
    let autoAdvance = setInterval(nextSlide, 5000);
    
    // Pause on hover
    testimonialCarousel.addEventListener('mouseenter', () => {
        clearInterval(autoAdvance);
    });
    
    testimonialCarousel.addEventListener('mouseleave', () => {
        autoAdvance = setInterval(nextSlide, 5000);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
}

// Form Handling
function initContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data['session-type'] || !data.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent. I will get back to you within 24 hours.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            max-width: 400px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            animation: slideInRight 0.3s ease-out;
        }
        
        .notification-success {
            border-left: 4px solid #7C9885;
            background: linear-gradient(135deg, rgba(124, 152, 133, 0.1), rgba(168, 230, 207, 0.1));
        }
        
        .notification-error {
            border-left: 4px solid #FF5459;
            background: linear-gradient(135deg, rgba(255, 84, 89, 0.1), rgba(255, 211, 165, 0.1));
        }
        
        .notification-message {
            flex: 1;
            color: #2D3748;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #718096;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            color: #2D3748;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 480px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
        style.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
            style.remove();
        }
    }, 5000);
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .testimonial-card, .about-content, .contact-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Video Placeholder Interactions
function initVideoPlaceholders() {
    document.querySelectorAll('.video-placeholder').forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            showNotification('Video testimonials will be available soon. Thank you for your interest!', 'info');
        });
        
        placeholder.addEventListener('mouseenter', () => {
            placeholder.style.transform = 'scale(1.05)';
        });
        
        placeholder.addEventListener('mouseleave', () => {
            placeholder.style.transform = 'scale(1)';
        });
    });
}

// Preload Images
function preloadImages() {
    const imageUrls = [
        'https://imagizer.imageshack.com/img922/9554/MMjUt8.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Service Card Interactions
function initServiceCards() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Form Field Enhancements
function initFormEnhancements() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            if (input.value) {
                input.parentElement.classList.add('filled');
            } else {
                input.parentElement.classList.remove('filled');
            }
        });
        
        // Check if field is pre-filled
        if (input.value) {
            input.parentElement.classList.add('filled');
        }
    });
}

// Loading Animation
function initLoadingAnimation() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Add loading styles
        const style = document.createElement('style');
        style.textContent = `
            body {
                opacity: 0;
                transition: opacity 0.5s ease-out;
            }
            
            body.loaded {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    });
}

// Performance Optimization
function initPerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                // Scroll-dependent code here
                scrollTimeout = null;
            }, 10);
        }
    });
}

// Initialize all functions
function init() {
    // Check if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
}

function initializeApp() {
    try {
        initLoadingAnimation();
        initMobileNav();
        initNavbarScroll();
        initActiveNav();
        initSmoothScroll();
        initTestimonialCarousel();
        initContactForm();
        initScrollAnimations();
        initVideoPlaceholders();
        initServiceCards();
        initFormEnhancements();
        preloadImages();
        initPerformanceOptimizations();
        
        console.log('🌱 BridgingMindGaps website initialized successfully!');
    } catch (error) {
        console.error('Error initializing website:', error);
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Service Worker for caching (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Initialize the application
init();

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileNav,
        initTestimonialCarousel,
        initContactForm,
        showNotification
    };
}
