document.addEventListener('DOMContentLoaded', () => {
    initParticleTrail();
    initScrollEffects();
    initGlowEffects();
    initClickEffects();
    initTypewriterEffect();
});

// Create particle trail that follows the cursor
function initParticleTrail() {
    // Check if device has hover capability (not mobile)
    if (!window.matchMedia("(hover: hover)").matches) return;

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '100';
    canvas.style.opacity = '0.7';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Resize canvas when window size changes
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Particle properties
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            // Random size between 1 and 3
            this.size = Math.random() * 2 + 1;
            // Random velocity
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            // Random lifetime
            this.life = Math.random() * 50 + 10;
            // Random color from portfolio palette
            this.colors = [
                '#6366F1', // Primary
                '#A855F7', // Secondary
                '#8B5CF6', // Purple
                '#06B6D4', // Cyan
                '#10B981'  // Green
            ];
            this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        }

        // Update particle position and properties
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;
            this.size = Math.max(0, this.size - 0.05);
        }

        // Draw particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Array to store particles
    const particles = [];

    // Mouse coordinates
    let mouse = {
        x: null,
        y: null
    };

    // Track mouse position
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;

        // Add particles at mouse position
        for (let i = 0; i < 2; i++) {
            particles.push(new Particle(mouse.x, mouse.y));
        }
    });

    // Animation loop
    function animate() {
        // Clear part of the canvas with transparency
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Remove particles that are too small or expired
            if (particles[i].size <= 0.2 || particles[i].life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }

        // Limit the number of particles for performance
        if (particles.length > 100) {
            particles.splice(0, 10);
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// Add scroll-triggered effects
function initScrollEffects() {
    // Parallax effect on scroll for background elements
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        
        // Parallax for background elements
        document.querySelectorAll('.bg-grid, .glass-gradient').forEach(bg => {
            const speed = 0.5;
            const yPos = -(scrollValue * speed);
            bg.style.backgroundPosition = `0px ${yPos}px`;
        });

        // Scale down nav on scroll
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (scrollValue > 100) {
                navbar.style.padding = '0.75rem 0';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.padding = '1.5rem 0';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        }
    });

    // Detect when elements enter viewport and add class
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // If it has count-up numbers, start counting
                if (entry.target.classList.contains('count-item')) {
                    startCounting(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all sections and animated elements
    document.querySelectorAll('section, .animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Add glowing effects to elements
function initGlowEffects() {
    // Add glow to headers on hover
    document.querySelectorAll('h1, h2, h3').forEach(header => {
        header.addEventListener('mouseenter', () => {
            header.style.textShadow = '0 0 10px rgba(99, 102, 241, 0.5)';
        });
        
        header.addEventListener('mouseleave', () => {
            header.style.textShadow = 'none';
        });
    });

    // Pulse effect for buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        setInterval(() => {
            btn.classList.add('pulse-glow');
            setTimeout(() => {
                btn.classList.remove('pulse-glow');
            }, 1000);
        }, 3000);
    });

    // Add this CSS for the pulse effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse-glow {
            0% { box-shadow: 0 0 15px rgba(163, 85, 247, 0.5); }
            50% { box-shadow: 0 0 25px rgba(163, 85, 247, 0.8); }
            100% { box-shadow: 0 0 15px rgba(163, 85, 247, 0.5); }
        }
        
        .pulse-glow {
            animation: pulse-glow 1s ease-in-out;
        }
    `;
    document.head.appendChild(style);
}

// Add click wave effects
function initClickEffects() {
    // Create click wave effect
    document.addEventListener('click', function(e) {
        // Don't create effect for right-clicks or if clicked on interactive elements
        if (e.button !== 0 || 
            e.target.tagName === 'A' || 
            e.target.tagName === 'BUTTON' || 
            e.target.closest('a') || 
            e.target.closest('button')) {
            return;
        }
        
        // Create ripple element
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        document.body.appendChild(ripple);
        
        // Position the ripple
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        
        // Add animation
        ripple.style.animation = 'ripple-effect 1s linear';
        
        // Remove after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
    
    // Add ripple effect CSS
    const style = document.createElement('style');
    style.textContent = `
        .click-ripple {
            position: fixed;
            border-radius: 50%;
            transform: scale(0);
            background: rgba(255, 255, 255, 0.4);
            pointer-events: none;
            z-index: 9999;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        }
        
        @keyframes ripple-effect {
            0% {
                transform: scale(0);
                opacity: 0.5;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Log click positions for analytics
    document.addEventListener('click', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const target = e.target.tagName;
        console.log(`Click: x=${x}, y=${y}, target=${target}`);
    });
}

// Typewriter effect for hero section
function initTypewriterEffect() {
    const heroText = document.querySelector('.hero-content h1');
    if (!heroText) return;
    
    const originalText = heroText.innerHTML;
    const words = originalText.split(' ');
    
    // Clear the text
    heroText.innerHTML = '';
    
    // Add a blinking cursor
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.innerHTML = '|';
    cursor.style.animation = 'blink 1s step-end infinite';
    
    
    // Function to type one word at a time
    function typeWords(index = 0) {
        if (index < words.length) {
            // Create a span for the word
            const wordSpan = document.createElement('span');
            wordSpan.innerHTML = (index > 0 ? ' ' : '') + words[index];
            
            // Apply special styling to specific words (like Digital and Void)
            if (words[index] === 'Digital' || words[index] === 'Void') {
                wordSpan.className = 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500';
            }
            
            heroText.appendChild(wordSpan);
            
            // Type the next word after a delay
            setTimeout(() => typeWords(index + 1), 200);
        } else {
            // Add cursor at the end
            heroText.appendChild(cursor);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWords, 1000);
}

// Start counting animation for numbers
function startCounting(element) {
    const valueElement = element.querySelector('.count-value');
    if (!valueElement) return;
    
    const targetValue = parseInt(valueElement.getAttribute('data-value'));
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    
    let frame = 0;
    const startValue = 0;
    const valueIncrement = (targetValue - startValue) / totalFrames;
    
    const counter = setInterval(() => {
        frame++;
        const currentValue = Math.round(startValue + valueIncrement * frame);
        
        valueElement.textContent = currentValue.toLocaleString();
        
        if (frame === totalFrames) {
            clearInterval(counter);
        }
    }, frameDuration);
}