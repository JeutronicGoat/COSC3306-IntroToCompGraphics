//initialize the scene and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Camera Settings
camera.position.x= 0;  //default value anyway
camera.position.y= 0;  //default value anyway
camera.position.z = 100;
camera.lookAt(scene.position);

//creating the graphic
stars(10000);
//Alien type 1
alien1(-50, 10);
alien1(-35, 10);
alien1(-20, 10);
alien1(-5, 10);
alien1(10, 10);
//Alien type 2
alien2(-50, 20);
alien2(-35, 20);
alien2(-20, 20);
alien2(-5, 20);
alien2(10, 20);
//Alien type 3
alien3(-50, 30);
alien3(-35, 30);
alien3(-20, 30);
alien3(-5, 30);
alien3(10, 30);
//The special Moving Alien
let ultraAlienShipMesh;  //Initialize here so animate can call it
var count = 0;          //determines when the ships change direction
ultraAlien(-60, 50);
animate(); 
//Player and barriers
let playerMesh;
player(0, -55);
animatePlayer();
barrier(-50, -40);
barrier(-30, -40);
barrier(-10, -40);
barrier(10, -40);
//Displays Score, HighScore and Lives
score(); 
lives(-130, -70); //displaying lives
lives(-120, -70); //displaying lives

renderer.render(scene,camera); //renders everything

//allows the player to move
function animatePlayer(){
    window.addEventListener('keydown', (e) =>{
        switch(e.key){
            case 'ArrowLeft': playerMesh.position.x--; break;
            case 'ArrowRight': playerMesh.position.x++; break;
        }
    });
    renderer.render(scene,camera);
}

//animates the special ship to move
function animate(){
    requestAnimationFrame(animate);

    //after every 80 cycles it will change direction
    if(count == 80){
        count = -79;
    }
    else if(count > 0){
        ultraAlienShipMesh.position.x = ultraAlienShipMesh.position.x+1;
    }
    else if(count <= 0){
        ultraAlienShipMesh.position.x = ultraAlienShipMesh.position.x-1;
    }
    count++;

    renderer.render(scene, camera);
}

//Creates the Special Moving Alien
function ultraAlien(x, y){
    const ultraAlienShip = new THREE.Shape();

    ultraAlienShip.moveTo(x, y);
    ultraAlienShip.lineTo(x, y);
    ultraAlienShip.lineTo(x+4, y+2);
    ultraAlienShip.lineTo(x+10, y+2);
    ultraAlienShip.lineTo(x+14, y);
    ultraAlienShip.lineTo(x+14, y-2);
    ultraAlienShip.lineTo(x+13, y-3);
    ultraAlienShip.lineTo(x+13, y-5);
    ultraAlienShip.lineTo(x+11, y-5);
    ultraAlienShip.lineTo(x+11, y-3);
    ultraAlienShip.lineTo(x+9, y-3);
    ultraAlienShip.lineTo(x+9, y-6);
    ultraAlienShip.lineTo(x+5, y-6);
    ultraAlienShip.lineTo(x+5, y-3);
    ultraAlienShip.lineTo(x+3, y-3);
    ultraAlienShip.lineTo(x+3, y-5);
    ultraAlienShip.lineTo(x+1, y-5);
    ultraAlienShip.lineTo(x+1, y-3);
    ultraAlienShip.lineTo(x, y-2);

    const geometry = new THREE.ShapeGeometry(ultraAlienShip);
    const material = new THREE.MeshBasicMaterial({ color: "red"});
    ultraAlienShipMesh = new THREE.Mesh(geometry,material);
    scene.add(ultraAlienShipMesh);
}
//Creates the prong shaped aliens
function alien1(x, y){
    const alienShip = new THREE.Shape();

    alienShip.moveTo(x, y);
    alienShip.lineTo(x, y);
    alienShip.lineTo(x+5, y);
    alienShip.lineTo(x+7, y-4);
    alienShip.lineTo(x+5, y-6);
    alienShip.lineTo(x+4, y-3);
    alienShip.lineTo(x+1, y-3);
    alienShip.lineTo(x, y-6);
    alienShip.lineTo(x-2, y-4);

    const geometry = new THREE.ShapeGeometry(alienShip);
    const material = new THREE.MeshBasicMaterial({ color: "blue"});
    const mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);
}

//Creates the star shaped aliens
function alien2(x, y){
    const alienShip = new THREE.Shape();

    alienShip.moveTo(x, y);
    alienShip.lineTo(x, y);
    alienShip.lineTo(x+3, y-2);
    alienShip.lineTo(x+4, y-2);
    alienShip.lineTo(x+7, y);
    alienShip.lineTo(x+5, y-4);
    alienShip.lineTo(x+6, y-6);
    alienShip.lineTo(x+4, y-5);
    alienShip.lineTo(x+3, y-5);
    alienShip.lineTo(x+1, y-6);
    alienShip.lineTo(x+2, y-4);

    const geometry = new THREE.ShapeGeometry(alienShip);
    const material = new THREE.MeshBasicMaterial({ color: "cyan"});
    const mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);
}

//Creates the diamond shaped aliens
function alien3(x, y){
    const alienShip = new THREE.Shape();

    alienShip.moveTo(x, y-4);
    alienShip.lineTo(x, y-4);
    alienShip.lineTo(x+3, y);
    alienShip.lineTo(x+6, y-4);
    alienShip.lineTo(x+4, y-6);
    alienShip.lineTo(x+2, y-6);

    const geometry = new THREE.ShapeGeometry(alienShip);
    const material = new THREE.MeshBasicMaterial({ color: "magenta"});
    const mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);
}

//Creates the barriers
function barrier(x, y){
    const shield = new THREE.Shape();

    shield.moveTo(x, y);
    shield.lineTo(x, y);
    shield.lineTo(x+2, y+2);
    shield.lineTo(x+8, y+2);
    shield.lineTo(x+10, y);
    shield.lineTo(x+10, y-5);
    shield.lineTo(x+8, y-5);
    shield.lineTo(x+7, y-3);
    shield.lineTo(x+3, y-3);
    shield.lineTo(x+2, y-5);
    shield.lineTo(x, y-5);
    
    const geometry = new THREE.ShapeGeometry(shield);
    const material = new THREE.MeshBasicMaterial({ color: "green"});
    const mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);
}

//Displays the score and other HUD features ex. Lives
function score(){
    var livesText = document.createElement('div');
    livesText.style.position = 'absolute';
    livesText.style.width = 100;
    livesText.style.height = 100;
    livesText.style.color = "white";        //colour of text
    livesText.innerHTML = "Lives: 2";       //what text says
    livesText.style.top = 890 + 'px';       //position of text
    livesText.style.left = 10 + 'px';       //position of text
    livesText.style.fontSize = 40 + 'px';   //size of text
    document.body.appendChild(livesText);

    var scoreText = document.createElement('div');
    scoreText.style.position = 'absolute';
    scoreText.style.width = 100;
    scoreText.style.height = 100;
    scoreText.style.color = "white";
    scoreText.innerHTML = "Score: 245";
    scoreText.style.top = 0 + 'px';
    scoreText.style.left = 10 + 'px';
    scoreText.style.fontSize = 40 + 'px';
    document.body.appendChild(scoreText);

    var highScoreText = document.createElement('div');
    highScoreText.style.position = 'absolute';
    highScoreText.style.width = 100;
    highScoreText.style.height = 100;
    highScoreText.style.color = "white";
    highScoreText.innerHTML = "High Score: 865";
    highScoreText.style.top = 0 + 'px';
    highScoreText.style.left = 250 + 'px';
    highScoreText.style.fontSize = 40 + 'px';
    document.body.appendChild(highScoreText);
}

//Creates the player and the lives symbols
function player(x, y){
    const playerShip = new THREE.Shape();

    playerShip.moveTo(x, y);
    playerShip.lineTo(x, y);
    playerShip.lineTo(x+3, y);
    playerShip.lineTo(x+3, y+2);
    playerShip.lineTo(x+5, y+2);
    playerShip.lineTo(x+5, y);
    playerShip.lineTo(x+8, y);
    playerShip.lineTo(x+8, y-5);
    playerShip.lineTo(x, y-5);
    
    const geometry = new THREE.ShapeGeometry(playerShip);
    const material = new THREE.MeshBasicMaterial({ color: "green"});
    playerMesh = new THREE.Mesh(geometry,material);
    scene.add(playerMesh);
}

function lives(x, y){
    const playerShip = new THREE.Shape();

    playerShip.moveTo(x, y);
    playerShip.lineTo(x, y);
    playerShip.lineTo(x+3, y);
    playerShip.lineTo(x+3, y+2);
    playerShip.lineTo(x+5, y+2);
    playerShip.lineTo(x+5, y);
    playerShip.lineTo(x+8, y);
    playerShip.lineTo(x+8, y-5);
    playerShip.lineTo(x, y-5);
    
    const geometry = new THREE.ShapeGeometry(playerShip);
    const material = new THREE.MeshBasicMaterial({ color: "green"});
    const mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);
}

//Generates an amount of stars passed randomly within the screen
function stars(x){
    for(i=0; i < x; i++){
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(0.2, 0, 0));
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        const material = new THREE.LineBasicMaterial({color: 'white'});
        var line = new THREE.Line(geometry, material);
        line.position.x = (Math.random() * (window.innerWidth) - window.innerWidth/2);      //random position in the screen
        line.position.y = (Math.random() * (window.innerHeight) - window.innerHeight/2);    //random position in the screen
        scene.add(line);
    }   
}