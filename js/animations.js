document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations once DOM is loaded
    initScrollAnimations();
    initHoverAnimations();
    initRevealAnimations();
});

// ScrollMagic and GSAP animations triggered by scrolling
function initScrollAnimations() {
    // Create ScrollMagic controller
    const controller = new ScrollMagic.Controller();
    
    // Hero section parallax effect
    if (document.querySelector('.hero-content')) {
        new ScrollMagic.Scene({
            triggerElement: '#home',
            duration: '100%',
            triggerHook: 0
        })
        .setTween(gsap.to('.hero-content', {
            y: 100,
            opacity: 0.3,
            ease: 'power1.out'
        }))
        .addTo(controller);
    }
    
    // About section animations
    if (document.querySelector('.about-content')) {
        // Stagger text elements
        new ScrollMagic.Scene({
            triggerElement: '#about',
            triggerHook: 0.8
        })
        .setTween(gsap.from('.about-content > *', {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out'
        }))
        .addTo(controller);
        
        // Image reveal
        new ScrollMagic.Scene({
            triggerElement: '#about',
            triggerHook: 0.7
        })
        .setTween(gsap.from('.about-image', {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        }))
        .addTo(controller);
    }
    
    // Projects section animations
    if (document.querySelector('.project-card')) {
        // Animate project cards on scroll
        document.querySelectorAll('.project-card').forEach((card, index) => {
            new ScrollMagic.Scene({
                triggerElement: card,
                triggerHook: 0.9
            })
            .setTween(gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.5,
                delay: index * 0.1,
                ease: 'power2.out'
            }))
            .addTo(controller);
        });
    }
    
    // Skills section animations
    if (document.querySelector('.skill-item')) {
        // Animate skill items
        document.querySelectorAll('.skill-item').forEach((item, index) => {
            new ScrollMagic.Scene({
                triggerElement: item,
                triggerHook: 0.9
            })
            .setTween(gsap.from(item, {
                x: -30,
                opacity: 0,
                duration: 0.5,
                delay: index * 0.1,
                ease: 'power2.out'
            }))
            .addTo(controller);
        });
        
        // Animate skill cards
        document.querySelectorAll('.skill-card').forEach((card, index) => {
            new ScrollMagic.Scene({
                triggerElement: card,
                triggerHook: 0.8
            })
            .setTween(gsap.from(card, {
                y: 30,
                scale: 0.9,
                opacity: 0,
                duration: 0.5,
                delay: index * 0.1,
                ease: 'back.out(1.7)'
            }))
            .addTo(controller);
        });
    }
    
    // Contact section animations
    if (document.querySelector('.contact-info')) {
        new ScrollMagic.Scene({
            triggerElement: '#contact',
            triggerHook: 0.8
        })
        .setTween(gsap.from('.contact-info > *', {
            x: -30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out'
        }))
        .addTo(controller);
        
        new ScrollMagic.Scene({
            triggerElement: '.contact-form',
            triggerHook: 0.8
        })
        .setTween(gsap.from('.contact-form', {
            x: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }))
        .addTo(controller);
    }
    
    // Section headers animation
    document.querySelectorAll('.section-header').forEach((header) => {
        new ScrollMagic.Scene({
            triggerElement: header,
            triggerHook: 0.9
        })
        .setTween(gsap.from(header, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }))
        .addTo(controller);
    });
}

// Hover animations
function initHoverAnimations() {
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.project-image img'), {
                scale: 1.1,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            gsap.to(card.querySelector('.project-overlay'), {
                opacity: 1,
                duration: 0.3
            });
            
            // Staggered animation for links
            gsap.to(card.querySelectorAll('.project-link'), {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.project-image img'), {
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            gsap.to(card.querySelector('.project-overlay'), {
                opacity: 0,
                duration: 0.3
            });
            
            gsap.to(card.querySelectorAll('.project-link'), {
                y: 20,
                opacity: 0,
                stagger: 0.05,
                duration: 0.2
            });
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                y: -2,
                boxShadow: '0 0 25px rgba(163, 85, 247, 0.8)',
                duration: 0.3
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                y: 0,
                boxShadow: '0 0 15px rgba(163, 85, 247, 0.5)',
                duration: 0.3
            });
        });
    });
    
    // Skill cards hover effect
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -5,
                boxShadow: '0 0 25px rgba(163, 85, 247, 0.8)',
                duration: 0.3
            });
            
            gsap.to(card.querySelector('.skill-icon'), {
                scale: 1.2,
                color: '#A855F7',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
                duration: 0.3
            });
            
            gsap.to(card.querySelector('.skill-icon'), {
                scale: 1,
                color: '#6366F1',
                duration: 0.3
            });
        });
    });
    
    // Navigation link hover effect
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                color: '#6366F1',
                duration: 0.2
            });
            
            gsap.to(link.querySelector('::after'), {
                width: '100%',
                duration: 0.3
            });
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                gsap.to(link, {
                    color: 'var(--text-main)',
                    duration: 0.2
                });
                
                gsap.to(link.querySelector('::after'), {
                    width: '0%',
                    duration: 0.3
                });
            }
        });
    });
}

// Reveal animations for elements as they enter viewport
function initRevealAnimations() {
    // Create a reusable reveal animation
    function createRevealAnimation(elements, options = {}) {
        const defaults = {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.1
        };
        
        const settings = {...defaults, ...options};
        
        gsap.set(elements, {
            y: settings.y,
            opacity: 0
        });
        
        ScrollTrigger.batch(elements, {
            onEnter: batch => gsap.to(batch, {
                y: 0,
                opacity: 1,
                duration: settings.duration,
                stagger: settings.stagger,
                ease: settings.ease
            }),
            onEnterBack: batch => gsap.to(batch, {
                y: 0,
                opacity: 1,
                duration: settings.duration,
                stagger: settings.stagger,
                ease: settings.ease
            }),
            start: "top 85%"
        });
    }
    
    // Apply reveal animations to various elements
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Contact items
        createRevealAnimation('.contact-item', {
            x: -20,
            y: 0,
            stagger: 0.1
        });
        
        // Social links
        createRevealAnimation('.social-link', {
            y: 10,
            scale: 0.9,
            stagger: 0.05,
            ease: 'back.out(1.7)'
        });
        
        // Form groups
        createRevealAnimation('.form-group', {
            y: 15,
            stagger: 0.08
        });
    }
}