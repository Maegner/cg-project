/*
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
*/

var camera, scene, renderer, time, carro1, track1, frustumSize;

//Contains all the objects in the scene, to easily coordinate setup and update methods
var gameObjects = [];


function CreateScene() {
	scene = new THREE.Scene();
}

function CreateCamera() {
	frustumSize = track1.getTrackSize();
	//frustumSize = new THREE.Vector3(1000, 500, 2);
	var aspect = window.innerWidth / window.innerHeight
	camera = new THREE.OrthographicCamera(/*LeftPane*/-frustumSize.x/2, /*RightPane*/frustumSize.x/2,/*TopPane*/frustumSize.x * (1/aspect)/2,/*BottomPane*/-frustumSize.x * (1/aspect)/2 ,/*Near*/0.1, /*Far*/1000);
	camera.position.z = 250;
	camera.updateProjectionMatrix();
}

function OnResize() {

		var aspect = window.innerWidth / window.innerHeight;

		var hor = Math.min(-frustumSize.x /2, -frustumSize.y * aspect /2);
		var ver = Math.min(-frustumSize.x * (1/aspect) /2, -frustumSize.y /2);

		camera.left = hor;
		camera.right = Math.abs(hor);
		camera.top = Math.abs(ver);
		camera.bottom = ver;

		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight);
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
	track1 =  new Track(tirePostions);
	gameObjects.push(track1);
	
	var orangePositions = [[250,-200,50],
						   [-450,0,50],
						   [0,0,50]
						   ];
	var butterPositions = [[-250,-100,5],
						   [440,-240,5],
						   [0,240,5],
						   [300,90,5],
						   [90,-100,5]
							];
	var i;
	for (i=0; i < orangePositions.length; i++) {
		var newOrange = new Orange(orangePositions[i][0], orangePositions[i][1], orangePositions[i][2]);
		gameObjects.push(newOrange);
	}
	for (i=0; i < butterPositions.length; i++) {
		var newButter = new Butter(butterPositions[i][0], butterPositions[i][1], butterPositions[i][2]);
		gameObjects.push(newButter);
	}

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
	var delta = time.getDelta();
	for (i=0; i < gameObjects.length; i++) {
		//Calls Update on each object, and passes the DeltaTime
		gameObjects[i].Update(delta);
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
	Update();
	Render();

	requestAnimationFrame(GameLoop);
}

function Init() {

	CreateScene();

	//Builds a clock to track DeltaTime
	time = new THREE.Clock();

	//Populates the scene with all the objects
	BuildObjects();
	//Notifies all objets that the scene has started
	StartObjects();
	
	CreateCamera();
	CreateRenderer();

	//Resize window on demand
	window.addEventListener( "resize", OnResize);

	//Receive input from player
	window.addEventListener( "keydown", onKeyDown);
	window.addEventListener( "keyup", onKeyUp);

	//Start game loop
	GameLoop();
}

Init();
