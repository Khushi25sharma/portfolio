document.addEventListener('DOMContentLoaded', () => {
    // Initialize the site
    initLoader();
    initThemeToggle();
    initScrollProgress();
    initNavigation();
    initMobileMenu();
    initProjectFilter();
    initContactForm();
    initSkillBars();
    initSkillsOrbit();
    logEvents();
});

// Loader Animation
function initLoader() {
    const loader = document.getElementById('loader');
    const loadingBar = document.querySelector('.loading-bar');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide loader after a small delay
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    
                    // Animate hero content
                    animateHeroContent();
                }, 500);
            }, 500);
        }
        loadingBar.style.width = `${progress}%`;
    }, 200);
}

// Animate Hero Content
function animateHeroContent() {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '1';
    heroContent.style.animation = 'fadeInUp 1s ease forwards';
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const body = document.body;
    
    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        setLightTheme();
    } else {
        setDarkTheme();
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            setLightTheme();
        } else {
            setDarkTheme();
        }
    });
    
    function setDarkTheme() {
        body.setAttribute('data-theme', 'dark');
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
        localStorage.setItem('theme', 'dark');
    }
    
    function setLightTheme() {
        body.setAttribute('data-theme', 'light');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
        localStorage.setItem('theme', 'light');
    }
}

// Scroll Progress
function initScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        scrollProgress.style.width = `${scrollPercentage}%`;
    });
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only for anchor links
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    document.body.classList.remove('mobile-menu-open');
                    document.getElementById('mobile-menu').style.transform = 'translateX(100%)';
                    
                    // Scroll to section
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    mobileMenuButton.addEventListener('click', () => {
        document.body.classList.toggle('mobile-menu-open');
        
        if (document.body.classList.contains('mobile-menu-open')) {
            mobileMenu.style.transform = 'translateX(0)';
            
            // Animate mobile links
            mobileLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, 100 * index);
            });
        } else {
            mobileMenu.style.transform = 'translateX(100%)';
            
            // Reset mobile links
            mobileLinks.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
            });
        }
    });
}

// Project Filter
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Set active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Animate skill bars on scroll
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = `${progress}%`;
        });
    };
    
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe the skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Skills Orbit Animation
function initSkillsOrbit() {
    const orbitItems = document.querySelectorAll('.orbit-item');
    const radius = 120;
    
    // Position items in orbit
    orbitItems.forEach((item, index) => {
        const angle = (index / orbitItems.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        item.style.left = `calc(50% + ${x}px)`;
        item.style.top = `calc(50% + ${y}px)`;
        
        // Add animation to orbit around
        item.style.animation = `orbit ${15 + Math.random() * 5}s linear infinite`;
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the form data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = 'Message Sent!';
            submitButton.classList.add('success');
            
            // Clear form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = 'Send Message';
                submitButton.classList.remove('success');
            }, 3000);
        });
    }
}

// Log events for testing
function logEvents() {
    const clickableElements = document.querySelectorAll('a, button');
    
    clickableElements.forEach(element => {
        element.addEventListener('click', (e) => {
            // Only log if it's not a navigation link that we already handle
            if (!element.classList.contains('nav-link') && !element.classList.contains('mobile-link')) {
                console.log(`Clicked: ${element.innerText || element.className}`);
            }
        });
    });
    
    // Log scroll events
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        
        // Log only on significant scroll changes to avoid flooding the console
        if (scrollTop % 500 === 0 && scrollTop > 0) {
            console.log(`Scrolled to: ${scrollTop}px`);
        }
    });
}

// Add keyframe animations dynamically
function addKeyframeAnimations() {
    const style = document.createElement('style');
    
    // Orbit animation
    style.innerHTML = `
        @keyframes orbit {
            0% {
                transform: rotate(0deg) translateX(120px) rotate(0deg);
            }
            100% {
                transform: rotate(360deg) translateX(120px) rotate(-360deg);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Call this function when DOM is loaded
addKeyframeAnimations();