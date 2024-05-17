// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Function to create the tree layers
function createTreeLayer(radius, height, positionY, color) {
    const geometry = new THREE.ConeGeometry(radius, height, 32);
    const material = new THREE.MeshLambertMaterial({ color });
    const cone = new THREE.Mesh(geometry, material);
    cone.position.y = positionY;
    return cone;
}

// Create the tree
const tree = new THREE.Group();
tree.add(createTreeLayer(3, 2, 0, 0x006400)); // Bottom layer
tree.add(createTreeLayer(2.5, 2, 2, 0x008000)); // Middle layer
tree.add(createTreeLayer(2, 2, 4, 0x00A000)); // Top layer

// Create the tree trunk
const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk.position.y = -1.5;

tree.add(trunk);

// Create the star on top of the tree
const starGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
const star = new THREE.Mesh(starGeometry, starMaterial);
star.position.y = 5.5;

tree.add(star);

// Add the tree to the scene
scene.add(tree);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the tree for a better view
    tree.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});