/*
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
*/

var camera, scene, renderer, time;

//Contains all the objects in the scene, to easily coordinate setup and update methods
var gameObjects = [];



var OnResize = function()
{
	renderer.setSize(window.innerWidth, window.innerHeight);
	if (window.innerHeight > 0 && window.innerWidth > 0) {
		camera.aspect = renderer.getSize().width / renderer.getSize().height;
		camera.updateProjectionMatrix();		
	}
}

var CreateScene = function()
{
	scene = new THREE.Scene();
}

var CreateCamera = function()
{
	camera = new THREE.PerspectiveCamera(/*FOV*/75, /*Aspect Ratio*/window.innerWidth / window.innerHeight, /*Near*/0.1, /*Far*/1000);
	camera.position.z = 3;
}

var CreateRenderer = function()
{
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
}

var Render = function()
{
	renderer.render(scene, camera);
}

var BuildObjects = function()
{
	var cubo1 = new Cubo();
	gameObjects.push(cubo1);
}

var StartObjects = function()
{
	var i;
	for (i=0; i < gameObjects.length; i++) {
		//Notifies each object to start setup
		gameObjects[i].Start();
	}
}

var Update = function()
{
	var i;
	for (i=0; i < gameObjects.length; i++) {
		//Calls Update on each object, and passes the DeltaTime
		gameObjects[i].Update(time.getDelta());
	}
}

var OnKeyDown = function()
{
	switch (e.keycode)
	{
		// W,w
		case 87:
		case 119:
			//Fazer cenas
			break;
	}
}

var GameLoop = function()
{
	requestAnimationFrame(GameLoop);

	Update();
	Render();
}

var Init = function() {

	CreateScene();
	CreateCamera();
	CreateRenderer();

	//Builds a clock to track DeltaTime
	time = new THREE.Clock();

	//Populates the scene with all the objects
	BuildObjects();
	//Notifies all objets to start 
	StartObjects();

	//Resize window on demand
	window.addEventListener( "resize", OnResize);
	//Receive input from player
	window.addEventListener( "keydown", OnKeyDown);

	//Start game loop
	GameLoop();
}

Init();
