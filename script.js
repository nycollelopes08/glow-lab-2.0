// script.js

// Loading Animation
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 500);
    }
});

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.custom-cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    cursorFollower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
    cursorFollower.style.transform = 'scale(1.5)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)';
});

// Hover effect on links
document.querySelectorAll('a, button, .btn, .filter-btn, .card-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scroll
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

// Active Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Counter Animation
const stats = document.querySelectorAll('.stat-number');
const speed = 200;

const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const count = parseInt(stat.innerText);
        const increment = target / speed;
        
        if (count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(animateStats, 1);
        } else {
            stat.innerText = target;
        }
    });
};

// Trigger counter when stats are visible
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.hero-stats').forEach(stat => {
    observer.observe(stat);
});

// Procedimentos Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const procedimentoCards = document.querySelectorAll('.procedimento-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        procedimentoCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = question.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.querySelector('.faq-question').classList.remove('active');
                otherItem.querySelector('.faq-answer').classList.remove('show');
            }
        });
        
        // Toggle current item
        question.classList.toggle('active');
        const answer = item.querySelector('.faq-answer');
        answer.classList.toggle('show');
    });
});

// Form Validation
const agendamentoForm = document.getElementById('agendamentoForm');
if (agendamentoForm) {
    agendamentoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation
        const inputs = agendamentoForm.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value) {
                isValid = false;
                input.style.borderBottomColor = '#ff4444';
            } else {
                input.style.borderBottomColor = '';
            }
        });
        
        if (isValid) {
            // Show success message
            alert('Agendamento solicitado com sucesso! Entraremos em contato para confirmar.');
            agendamentoForm.reset();
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });
}

// Contact Form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! Responderemos em breve.');
        contactForm.reset();
    });
}

// Add to Cart
const addToCartBtns = document.querySelectorAll('.btn-add-cart');
const cartCount = document.querySelector('.cart-count');

let count = 0;

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        count++;
        if (cartCount) {
            cartCount.textContent = count;
            
            // Animation
            cartCount.style.transform = 'scale(1.5)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);
        }
        
        // Show notification
        const product = btn.closest('.cosmetico-card').querySelector('h3').textContent;
        showNotification(`✅ ${product} adicionado ao carrinho!`);
    });
});

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--gradient);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navWrapper = document.querySelector('.nav-wrapper');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navWrapper.classList.toggle('active');
        
        if (navWrapper.classList.contains('active')) {
            navWrapper.style.display = 'block';
            setTimeout(() => {
                navWrapper.style.opacity = '1';
                navWrapper.style.transform = 'translateY(0)';
            }, 10);
        } else {
            navWrapper.style.opacity = '0';
            navWrapper.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                navWrapper.style.display = 'none';
            }, 300);
        }
    });
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
gsap.from('.hero-badge', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.5
});

gsap.from('.hero-title .line-reveal', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    delay: 0.8
});

gsap.from('.hero-description', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 1.5
});

gsap.from('.hero-cta', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 1.8
});

gsap.from('.hero-stats', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 2.1
});

// About Section Animations
gsap.from('.about-images .image-item', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: -100,
    duration: 1,
    stagger: 0.3
});

gsap.from('.about-content', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: 100,
    duration: 1
});

gsap.from('.feature-box', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2
});

// Cards Animations
gsap.from('.procedimento-card', {
    scrollTrigger: {
        trigger: '.procedimentos',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.1
});

gsap.from('.cosmetico-card', {
    scrollTrigger: {
        trigger: '.cosmeticos',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.1
});

// FAQ Animations
gsap.from('.faq-item', {
    scrollTrigger: {
        trigger: '.duvidas',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.1
});

// Initialize Swiper
const swiper = new Swiper('.resultados-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroVideo = document.querySelector('.hero-video');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroVideo) {
        heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Magnetic Buttons Effect
const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        gsap.to(btn, {
            x: deltaX * 10,
            y: deltaY * 10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Image Parallax on Scroll
gsap.utils.toArray('.parallax-image').forEach(image => {
    gsap.fromTo(image, 
        {
            y: -50
        },
        {
            y: 50,
            ease: 'none',
            scrollTrigger: {
                trigger: image.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        }
    );
});

// Text Reveal Animation
gsap.utils.toArray('.reveal-text').forEach(text => {
    gsap.from(text, {
        scrollTrigger: {
            trigger: text,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1
    });
});

// Smooth Scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 100
                },
                ease: 'power3.inOut'
            });
        }
    });
});

// Preloader
const preloader = document.createElement('div');
preloader.className = 'preloader';
preloader.innerHTML = `
    <div class="preloader-content">
        <div class="preloader-logo">glow lab</div>
        <div class="preloader-line"></div>
    </div>
`;

preloader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--light);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.5s ease;
`;

document.body.appendChild(preloader);

window.addEventListener('load', () => {
    gsap.to('.preloader', {
        opacity: 0,
        duration: 0.5,
        delay: 1,
        onComplete: () => {
            preloader.style.display = 'none';
        }
    });
});

// Back to Top Button
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';

backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gradient);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 99;
`;

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        gsap.to(backToTop, {
            opacity: 1,
            visibility: 'visible',
            duration: 0.3
        });
    } else {
        gsap.to(backToTop, {
            opacity: 0,
            visibility: 'hidden',
            duration: 0.3
        });
    }
});

backToTop.addEventListener('click', () => {
    gsap.to(window, {
        duration: 1,
        scrollTo: 0,
        ease: 'power3.inOut'
    });
});