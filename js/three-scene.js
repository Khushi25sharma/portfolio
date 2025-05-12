document.addEventListener('DOMContentLoaded', () => {
    initHeroScene();
    initFloatingCube();
});

// Hero section 3D background
function initHeroScene() {
    const heroCanvas = document.getElementById('hero-canvas');
    if (!heroCanvas) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    heroCanvas.appendChild(renderer.domElement);
    
    // Add particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    const colorPalette = [
        new THREE.Color(0x6366F1), // Primary
        new THREE.Color(0xA855F7), // Secondary
        new THREE.Color(0x8B5CF6), // Purple
        new THREE.Color(0x06B6D4), // Cyan
        new THREE.Color(0x10B981)  // Green
    ];
    
    for (let i = 0; i < particlesCount; i++) {
        // Positions - random in 3D space
        positions[i * 3] = (Math.random() - 0.5) * 70;     // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 70; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 70; // z
        
        // Colors
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = color.r;     // r
        colors[i * 3 + 1] = color.g; // g
        colors[i * 3 + 2] = color.b; // b
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.3,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Add light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.01;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.01;
    });
    
    // Update on scroll
    let scrollY = 0;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Smooth follow mouse
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        // Rotate particles
        particles.rotation.x = targetY * 0.3;
        particles.rotation.y = targetX * 0.3;
        
        // Subtle constant rotation
        particles.rotation.y += 0.001;
        particles.rotation.z += 0.0005;
        
        // Fade out based on scroll
        const fadeOutPoint = 500; // Start fading at this scroll position
        const opacity = Math.max(0, 1 - (scrollY / fadeOutPoint));
        particlesMaterial.opacity = opacity * 0.8;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Floating 3D cube in the about section
function initFloatingCube() {
    const floatingCubeElement = document.getElementById('floating-cube');
    if (!floatingCubeElement) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(100, 100);
    floatingCubeElement.appendChild(renderer.domElement);
    
    // Create a cube with materials
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    
    // Materials with different colors for each side
    const materials = [
        new THREE.MeshBasicMaterial({ color: 0x6366F1 }),
        new THREE.MeshBasicMaterial({ color: 0xA855F7 }),
        new THREE.MeshBasicMaterial({ color: 0x8B5CF6 }),
        new THREE.MeshBasicMaterial({ color: 0x06B6D4 }),
        new THREE.MeshBasicMaterial({ color: 0x10B981 }),
        new THREE.MeshBasicMaterial({ color: 0xFB7185 })
    ];
    
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    
    // Add wireframe
    const wireframe = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 })
    );
    cube.add(wireframe);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Make the cube follow mouse movement slightly
    document.addEventListener('mousemove', (event) => {
        if (isInViewport(floatingCubeElement)) {
            const rect = floatingCubeElement.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            // Map mouse position to rotation
            cube.rotation.x = y * 0.01;
            cube.rotation.y = x * 0.01;
        }
    });
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}