/*
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
*/

var camera, scene, renderer, time, carro1 ,frustumSize;

//Contains all the objects in the scene, to easily coordinate setup and update methods
var gameObjects = [];



function OnResize() {

		var aspect = window.innerWidth / window.innerHeight;

		camera.left = -frustumSize * aspect/2;
		camera.right = frustumSize * aspect/2;
		camera.top = frustumSize/2;
		camera.bottom = -frustumSize/2;

		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight);
}

function CreateScene() {
	scene = new THREE.Scene();
}

function CreateCamera() {
	frustumSize = window.innerHeight;
	var aspect = window.innerWidth/window.innerHeight
	camera = new THREE.OrthographicCamera(/*LeftPane*/-frustumSize*aspect/2, /*RightPane*/frustumSize*aspect/2,/*TopPane*/frustumSize/2,/*BottomPane*/-frustumSize/2 ,/*Near*/0.1, /*Far*/1000);
	camera.position.z = 250;
	camera.zoom = 1.25;
	camera.updateProjectionMatrix();
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
	carro1 = new Carro();
	gameObjects.push(carro1);

	var tirePostions = TRACK_2;
	var trackLine =  new Track([],tirePostions,[],[[250,-200,50],[-420,0,50],[0,0,50]]);

	gameObjects.push(trackLine);

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
		// Up
		case 38:
			carro1.OnAccelerate();
			break;

		//Down
		case 40:
			carro1.OnBrake();
			break;

		// Left
		case 37:
			carro1.OnLeft();
			break;

		// Right
		case 39:
			carro1.OnRight();
			break;

		// A, a
		case 65:
		case 97:
			scene.traverse(function(node) {
				if(node instanceof THREE.Mesh){
					node.material.wireframe = !node.material.wireframe;
				}
			});
			break;
		//p
		case 112:
		case 80:
			camera = new THREE.PerspectiveCamera(80, aspect, 0.1, 1000);
			camera.position.z = 250;
			camera.position.x = 400;
			camera.rotation.z = Math.PI/2;
			camera.rotation.y = Math.PI/5;
			camera.updateProjectionMatrix();
			break;
	}
}

function onKeyUp(e) {
	switch (e.keyCode)
	{
		// Up
		case 38:
			carro1.OnUnaccelerate();
			break;

		//Down
		case 40:
			carro1.OnUnbrake();
			break;

		//Left
		case 37:
			carro1.OnUnleft();
			break;

		// Right
		case 39:
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

	window.addEventListener( "keydown", onKeyDown);
	window.addEventListener( "keyup", onKeyUp);

	//Start game loop
	GameLoop();
}

Init();
