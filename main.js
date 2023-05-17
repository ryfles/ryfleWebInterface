import './style.css';
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.set(0, 0, 8);
camera.lookAt(0,0,0)

//renderer
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//wireframetorus
const wireframegeometry = new THREE.TorusGeometry(10, 3, 25, 110);
const wireframe = new THREE.WireframeGeometry(wireframegeometry);
const wireframeline = new THREE.LineSegments(wireframe);
wireframeline.material.opacity = 0.3;
wireframeline.material.transparent = true;
wireframeline.position.set(-3 , 0, 0);
wireframeline.scale.x = .15;
wireframeline.scale.y = .15;
wireframeline.scale.z = .15;
scene.add(wireframeline);

//torus
const torusgeometry = new THREE.TorusGeometry(10, 3, 25, 110);
const torusmaterial = new THREE.MeshStandardMaterial({color: 0x333333});
const torus = new THREE.Mesh(torusgeometry, torusmaterial);
torus.position.set(3, 0, 0);
torus.scale.x = 0.15;
torus.scale.y = 0.15;
torus.scale.z = 0.15;
scene.add(torus);

//light settings
const pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(0, 10, 0);
const ambientlight = new THREE.AmbientLight(0xffffff);
scene.add(pointlight, ambientlight);

//helper settings
const lightHelper = new THREE.PointLightHelper(pointlight);
const gridHelper = new THREE.GridHelper(20, 20);
scene.add(lightHelper, gridHelper);

//orbit controls
const controls = new OrbitControls(camera, renderer.domElement)

//stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);

}

Array(400).fill().forEach(addStar);

//update loop
function animate() {
  requestAnimationFrame(animate);

  //wireframetorus animation
  wireframeline.rotation.x += 0.011;
  wireframeline.rotation.y += 0.007;
  
  
  //torus animation
  torus.rotation.x -= 0.013;
  torus.rotation.y += 0.02;

  controls.update();

  renderer.render(scene, camera);
}

//webgl checker
if(WebGL.isWebGLAvailable()) {
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);
}

