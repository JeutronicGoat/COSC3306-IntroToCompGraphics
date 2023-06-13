//Jacob Culp
//initialize the scene and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 20000);          
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//Camera Settings
camera.position.set(0,2,10);
//Loading Tree Textures Outside Loop For Performance
const trunkTex = new THREE.TextureLoader().load('https://sandbox-uploads.imgix.net/u/1615158868-d7e03c82dab596f9bf8353517398ae7e?w=600');
const trunkMat = new THREE.MeshBasicMaterial({map: trunkTex});
var pineTex = new THREE.TextureLoader().load('https://sandbox-uploads.imgix.net/u/1615158537-e413492a5af0562989940a97f3c2729a?w=600');
var leafMat = new THREE.MeshBasicMaterial({map: pineTex});
//Creates Fog
scene.fog = new THREE.Fog("grey",1,100);

//renders everything
render();

createLighting();
createTerrain();
createSkydome();
placeTrees();


function createTerrain(){

    var terrain = new THREE.PlaneGeometry(1000,1000,32,32);
    terrain.lookAt(new THREE.Vector3(0,1,0));
    terrain.verticesNeedUpdate = true;

    //Texture
    var texture = new THREE.TextureLoader().load('https://sandbox-uploads.imgix.net/u/1615150830-949b28da74f7c272cdc101131be09858?w=600');
    var terrainMaterial = new THREE.MeshLambertMaterial({map: texture});

    var ground = new THREE.Mesh(terrain,terrainMaterial);
    ground.reciveShadow = true;

    ground.geometry.computeVertexNormals();
    scene.add(ground);
}

function createTree(x,z){
    //Trunk
    var tree = new THREE.Group();
    var trunk = new THREE.CylinderGeometry( .5, .5, 5, 32 );
    var trunkMesh = new THREE.Mesh(trunk, trunkMat);
    trunkMesh.position.set(x,1,z);
    tree.add(trunkMesh);
    //Mid Leaf
    var leaf1 = new THREE.ConeGeometry(1,3,40);
    var leaf1Mesh = new THREE.Mesh(leaf1, leafMat);
    leaf1Mesh.position.set(x,2.5,z);
    tree.add(leaf1Mesh);
    //Top Leaf
    var leaf2 = new THREE.ConeGeometry(1,3,40);
    var leaf2Mesh = new THREE.Mesh(leaf2, leafMat);
    leaf2Mesh.position.set(x,3.5,z);
    tree.add(leaf2Mesh);

    //Tree Scale (Random from 1 to 3) x & z are the same size to prevent "flat" trees
    var treeRad = (1 + (Math.random() * (3 - 1 + 1)));
    tree.scale.set(treeRad,(1 + (Math.random() * (3 - 1 + 1))),treeRad);
    //Tree Rotation (Doesn't Work Properly)
    //tree.rotation.x = (-.2 + (Math.random() * (.2 - -.2)));
    //tree.rotation.z = (-.2 + (Math.random() * (.2 - -.2)));

    scene.add(tree);
}

function placeTrees(){
    //Places Trees (Random from -50 to 50)
    for(i=0; i<300; i++){
        var x = (Math.random() * (101) -50);
        var z = (Math.random() * (101) -50);
        createTree(x,z);
    }
}

function createLighting(){
    var ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
        
    var dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);
}

function createSkydome(){
    
    var geometry = new THREE.SphereGeometry(1000, 60, 40);
    var texture = new THREE.TextureLoader().load('https://sandbox-uploads.imgix.net/u/1615145567-11aa47693a412bca9668cf964dbee68f?w=600');
    var material = new THREE.MeshBasicMaterial({map: texture});
    material.side = THREE.BackSide; 
    var skydome = new THREE.Mesh(geometry, material);
    scene.add(skydome);

    //render();
}

function render() {
    requestAnimationFrame(render); //this is needed for rendering the texture.

    var timer = - new Date().getTime() * 0.0005; 
    //camera.position.z = 30 * Math.sin(timer);
    //camera.position.y = 50 * Math.cos(timer);
    //camera.position.x = 30 * Math.cos(timer);
    //camera.rotation.x = 2.5 * Math.sin(timer);
    camera.rotation.y = 2 * Math.sin(timer);

    renderer.render(scene, camera);
}