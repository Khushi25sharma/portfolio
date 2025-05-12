# Digital Void - Modern Portfolio Website

A cutting-edge portfolio website with 3D animations, custom cursor effects, and a modern digital void theme featuring both dark and light modes.

## Features

### Visual Elements
- **Dual Theme:** Toggleable dark and white theme with digital void aesthetics
- **Glass Morphism:** Modern transparent glass UI elements with backdrop blur
- **3D Elements:** Three.js powered 3D backgrounds, floating objects, and animations
- **Custom Cursor:** Interactive cursor with follow animation and hover effects
- **Scroll Animations:** GSAP animations triggered on scroll
- **Particle Effects:** Dynamic particle trails following cursor movement
- **Click Effects:** Visual feedback for user interactions with ripple animations
- **Loading Animation:** Engaging initial loading screen with floating letters
- **Scroll Progress:** Visual indicator of scroll position

### Functionality
- **Project Filtering:** Dynamic filtering of portfolio projects by category
- **Responsive Design:** Fully responsive layout for all device sizes
- **Smooth Scrolling:** Enhanced scrolling experience
- **Mobile Menu:** Animated mobile navigation
- **Form Validation:** Contact form with validation
- **Console Logging:** Event tracking for interactions
- **Theme Persistence:** Saves theme preference to localStorage

## File Structure

```
├── index.html              # Main HTML document
├── style.css               # Global styles and theme variables
├── js/
│   ├── main.js             # Core functionality (loader, theme toggle, navigation)
│   ├── cursor.js           # Custom cursor animations
│   ├── three-scene.js      # 3D animations using Three.js
│   ├── animations.js       # GSAP and ScrollMagic animations
│   └── effects.js          # Additional effects (particles, typewriter, etc.)
```

## Technical Implementation

### HTML Structure
The website is organized into distinct sections:
- Hero section with 3D background
- About section with floating 3D cube
- Projects section with filtering
- Skills section with animated progress bars
- Contact section with form validation

### CSS Features
- CSS Variables for theme switching
- Smooth transitions between themes
- Glass morphism effect using backdrop-filter
- Custom animations and keyframes
- Responsive design using Tailwind CSS utility classes

### JavaScript Components
- Three.js for 3D graphics
- GSAP for smooth animations
- ScrollMagic for scroll-triggered animations
- Intersection Observer for element visibility tracking
- Event logging for analytics

## Getting Started

1. Clone the repository
2. Open index.html in your browser
3. Customize content in the HTML file
4. Adjust styles in style.css
5. Modify animations in the JS files as needed

## Customization

### Changing the Theme Colors
Edit the CSS variables in the `:root` section of style.css:

```css
:root {
    --primary: #6366F1;     /* Change this for primary color */
    --secondary: #A855F7;   /* Change this for secondary color */
    /* Other variables... */
}
```

### Adding New Projects
Add new project cards by copying the existing project card structure in the projects section:

```html
<div class="project-card" data-category="your-category">
    <!-- Project content -->
</div>
```

### Adding Skills
Modify the skills section to include your own skills and proficiency levels.

## Browser Compatibility

This website is optimized for modern browsers that support:
- CSS Variables
- CSS Grid/Flexbox
- WebGL (for Three.js)
- Modern JavaScript (ES6+)

## Performance Optimizations

- Lazy loading of non-critical resources
- Debounced scroll and resize events
- Limited particle count for better performance
- Conditional rendering of effects based on device capability

---

&copy; 2025 Digital Void Portfolio. All rights reserved.