/*
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
*/

var camera, scene, renderer, time, carro1;

//Contains all the objects in the scene, to easily coordinate setup and update methods
var gameObjects = [];



function OnResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	if (window.innerHeight > 0 && window.innerWidth > 0) {
		camera.aspect = renderer.getSize().width / renderer.getSize().height;
		camera.updateProjectionMatrix();		
	}
}

function CreateScene() {
	scene = new THREE.Scene();
}

function CreateCamera() {
	camera = new THREE.PerspectiveCamera(/*FOV*/75, /*Aspect Ratio*/window.innerWidth / window.innerHeight, /*Near*/0.1, /*Far*/1000);
	camera.position.z = 3;
}

function CreateRenderer() {
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
}

function Render() {
	renderer.render(scene, camera);
}

function BuildObjects() {
	//var cubo1 = new Cubo();

	var tirePostions = [[0,0,0],[0.3,0,0],[0.6,0,0],[0.9,0,0],[1.2,0,0]];

	var trackLine =  new Track([],tirePostions,[],[]);

	//gameObjects.push(trackLine);
	carro1 = new Carro();

	//gameObjects.push(cubo1);
	gameObjects.push(carro1);

}

function StartObjects() {
	var i;
	for (i=0; i < gameObjects.length; i++) {
		//Notifies each object to start setup
		gameObjects[i].Start();
	}
}

function Update() {
	var i;
	for (i=0; i < gameObjects.length; i++) {
		//Calls Update on each object, and passes the DeltaTime
		gameObjects[i].Update(time.getDelta());
	}
}

function onKeyDown(e) {

	switch (e.keyCode)
	{
		// W,w
		case 87:
		case 119:
			carro1.OnAccelerate();
			break;

		//S, s
		case 83:
		case 115:
			carro1.OnBrake();
			break;

		// A, a
		case 65:
		case 97:
			carro1.OnLeft();
			break;

		// D, d
		case 68:
		case 100:
			carro1.OnRight();
			break;
	}
}

function onKeyUp(e) {
	switch (e.keyCode)
	{
		// W,w
		case 87:
		case 119:
			carro1.OnUnaccelerate();
			break;

		//S, s
		case 83:
		case 115:
			carro1.OnUnbrake();
			break;

		// A, a
		case 65:
		case 97:
			//carro1.OnUnleft();
			scene.traverse(function(node) {
				if(node instanceof THREE.Mesh){
					node.material.wireframe = !node.material.wireframe;
				}
			});
			break;

		// D, d
		case 68:
		case 100:
			carro1.OnUnright();
			break;
	}
}

function GameLoop() {
	requestAnimationFrame(GameLoop);

	Update();
	Render();
}

function Init() {

	CreateScene();
	CreateCamera();
	CreateRenderer();

	//Builds a clock to track DeltaTime
	time = new THREE.Clock();

	//Populates the scene with all the objects
	BuildObjects();
	//Notifies all objets that the scene has started
	StartObjects();

	//Resize window on demand
	window.addEventListener( "resize", OnResize);
	//Receive input from player

	window.addEventListener( "keydown", onKeyDown, false);
	window.addEventListener( "keyup", onKeyUp, false);

	//Start game loop
	GameLoop();
}

Init();
