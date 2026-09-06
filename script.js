// Hamburger Menu Logic
const hamburger = document.getElementById('hamburger');
const navOverlay = document.getElementById('nav-overlay');
const navLinks = document.querySelectorAll('.nav-links a');

// Toggle menu on click
hamburger.addEventListener('click', () => {
    navOverlay.classList.toggle('active');
    
    // Animate the hamburger lines into an 'X'
    hamburger.classList.toggle('toggle');
    if (hamburger.classList.contains('toggle')) {
        hamburger.children[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
        hamburger.children[1].style.opacity = "0";
        hamburger.children[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
    } else {
        hamburger.children[0].style.transform = "none";
        hamburger.children[1].style.opacity = "1";
        hamburger.children[2].style.transform = "none";
    }
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navOverlay.classList.remove('active');
        hamburger.classList.remove('toggle');
        hamburger.children[0].style.transform = "none";
        hamburger.children[1].style.opacity = "1";
        hamburger.children[2].style.transform = "none";
    });
});

// Three.js 3D Rotating Globe Logic
const container = document.getElementById('globe-container');

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Create the globe (Sphere)
// Using wireframe combined with colors to match the brand (Blue & Green)
const geometry = new THREE.SphereGeometry(15, 64, 64);

// Material tailored to the green/blue aesthetic
const material = new THREE.MeshStandardMaterial({ 
    color: 0x2a9d8f, // Plant Green
    wireframe: true,
    transparent: true,
    opacity: 0.6
});

const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Add lighting to create a nice 3D feel
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x1d3557, 1); // Clean blue light
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

// Position camera
camera.position.z = 35;

// Animation loop to make it rotate smoothly
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the globe
    globe.rotation.y += 0.002;
    globe.rotation.x += 0.001;

    renderer.render(scene, camera);
}

animate();

// Make the 3D canvas responsive to window resizing
window.addEventListener('resize', () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});