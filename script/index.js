
const links = document.querySelectorAll("#index section > a");

const randomizeMatrix = function () {

	const position = new THREE.Vector3();
	const rotation = new THREE.Euler();
	const quaternion = new THREE.Quaternion();
	const scale = new THREE.Vector3();

	return function ( matrix ) {

		position.x = Math.random() * 40 - 20;
		position.y = Math.random() * 40 - 20;
		position.z = Math.random() * 40 - 20;

		rotation.x = Math.random() * 2 * Math.PI;
		rotation.y = Math.random() * 2 * Math.PI;
		rotation.z = Math.random() * 2 * Math.PI;

		quaternion.setFromEuler( rotation );

		scale.x = scale.y = scale.z = Math.random() * 1;

		matrix.compose( position, quaternion, scale );

	};

}();

const intro = document.getElementById("firstintro");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.id = "tcanvas";
renderer.domElement.alt = "Background, consisting of scattered cubes.";
intro.appendChild(renderer.domElement);

const alight = new THREE.AmbientLight( 0x404040 );
scene.add( alight );

const hlight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( hlight );

const geometry = new THREE.BoxGeometry( 1, 1 );
const material = new THREE.MeshPhongMaterial( { color: 0x40513B } );
const mesh = new THREE.InstancedMesh( geometry, material, 2000 );
mesh.frustumCulled = false;

const matrix = new THREE.Matrix4();

for ( let i = 0; i < 2000; i ++ ) {

	randomizeMatrix( matrix );
	mesh.setMatrixAt(i, matrix);
	
}

scene.add(mesh);

var animationdisabled = false;

function animate() {

	if (animationdisabled) {
		return;
	}
	
	requestAnimationFrame( animate );

	camera.rotation.x += 0.00003;
	camera.rotation.y += 0.00006;
	camera.rotation.z += 0.00004;

	renderer.render(scene, camera);
	
}

window.addEventListener("resize", function() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	
}, false);

function disableIndexAnimation() {

	animationdisabled = true;
	
}

function enableIndexAnimation() {

	animationdisabled = false;
	animate();
	
}

animate();

function disableIndexLinks() {
	for (let i = 0; i < links.length; i++) {
		links[i].setAttribute("tabindex", "-1");
	}
}

function enableIndexLinks() {
	for (let i = 0; i < links.length; i++) {
		links[i].setAttribute("tabindex", "0");
	}
}
