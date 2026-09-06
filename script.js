// 1. Form Handling Logic
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    alert('Thank you! Your information has been submitted successfully.');
    this.reset(); 
});

// 2. Three.js Realistic Earth Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globe-container').appendChild(renderer.domElement);

// Load realistic Earth textures
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
const bumpMap = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-topology.png');

// Create a solid sphere with textures
const geometry = new THREE.SphereGeometry(5, 64, 64);
const material = new THREE.MeshPhongMaterial({
    map: earthTexture,
    bumpMap: bumpMap,
    bumpScale: 0.1,
    specular: new THREE.Color('grey')
});

const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Add lighting for realism
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.002; 
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});