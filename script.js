// 1. Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// 2. Realistic Three.js Earth in a Bounded Container
const container = document.getElementById('globe-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 12;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
// Using high-res textures for realism
const earthTexture = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
const bumpMap = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-topology.png');

const geometry = new THREE.SphereGeometry(4, 64, 64);
const material = new THREE.MeshPhongMaterial({
    map: earthTexture,
    bumpMap: bumpMap,
    bumpScale: 0.1,
    specular: new THREE.Color('grey')
});

const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);

function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.003; 
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// 3. Stat Counter Animation on Scroll
const counters = document.querySelectorAll('.counter');
let hasCounted = false;

const startCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = target / 50; 
        
        const updateCount = () => {
            const current = +counter.innerText;
            if(current < target) {
                counter.innerText = Math.ceil(current + speed);
                setTimeout(updateCount, 40);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting && !hasCounted) {
            startCounters();
            hasCounted = true;
        }
    });
}, { threshold: 0.5 });

observer.observe(document.getElementById('impact'));

// 4. Form Submissions
document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        alert('Thank you! Your information has been submitted successfully.');
        this.reset(); 
    });
});