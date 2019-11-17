var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.2, 1000);
camera.position.z = 30;
camera.position.y = 50;
camera.position.x = 10;


var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});

var stackAmount = 3;

// radius
var r = 3;

// positions
var meshPosY = [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]

var meshPosX = [r * Math.cos(0),
r * Math.cos(Math.PI / 4),
r * Math.cos(Math.PI / 2),
r * Math.cos(3 * Math.PI / 4),
r * Math.cos(Math.PI),
r * Math.cos(5 * Math.PI / 4),
r * Math.cos(3 * Math.PI / 2),
r * Math.cos(7 * Math.PI / 4)]

var meshPosZ = [r * Math.sin(0),
r * Math.sin(Math.PI / 4),
r * Math.sin(Math.PI / 2),
r * Math.sin(3 * Math.PI / 4),
r * Math.sin(Math.PI),
r * Math.sin(5 * Math.PI / 4),
r * Math.sin(3 * Math.PI / 2),
r * Math.sin(7 * Math.PI / 4)]

function cubeStack(P) {
    for (let x = 0; x < meshPosY.length; x++) {
        for (let i = 0; i < meshPosX.length; i++) {

            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshDistanceMaterial({ color: 0x9C7400 });
            var mesh = new THREE.Mesh(geometry, material);

            mesh.name = "cube" + P;
            mesh.position.x = meshPosX[i];
            mesh.position.z = meshPosZ[i];
            mesh.position.y = meshPosY[x];

            scene.add(mesh);

        }
    }
}


for (let a = 0; a < stackAmount; a++) {
    cubeStack(a);
    scene.traverse(function (child) {
        if (child.name === "cube0") {
            child.position.x += 2;
            child.position.z += 2;
            child.material = new THREE.MeshPhongMaterial({ color: 0x9C7400 });
        }
        if (child.name === "cube1") {
            child.position.x += 0;
            child.position.z += 0;
            child.material = new THREE.MeshBasicMaterial({ color: 0x9C7400 });
        }
        if (child.name === "cube2") {
            child.position.x -= 6;
            child.position.z -= 6;        }
    });
    
}


var SPEED = 0.01;

function rotateCubeTest() {
    scene.traverse(function (child) {
        if (child.name === "cube0") {
            child.rotation.y -= SPEED;
        }
        if (child.name === "cube1") {
            child.rotation.y -= SPEED * 2;
        }
        if (child.name === "cube2") {
            child.rotation.y -= SPEED;
        }
    });
}




var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(-10, 10, 25);
scene.add(light);

controls = new THREE.OrbitControls(camera, renderer.domElement);

var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    rotateCubeTest();
}

render();