/*
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
*/

var camera, scene, renderer, time, carro1, track1, frustumSize, butters;
var dummyCar;
var skyLight;
var trackLights = [];
var skyLightIntensity = 1;
var trackLightIntensity = 0.5;
var usePhong = true;
var useBasic = false;
var isPaused = false;
var orangeNum = 4;
var cameraStatus = -1;
var inWireframe = true;
var gameOver;
var cameraObject = new Camera();


var views = [
	{
		left: 0.02,
		top: 0.03,
		width: 0.04,
		height: 0.04,
		background: new THREE.Color(1,1,1),
		eye: [ 0, 0, 1070 ],
		fov: 60
	},
	{
		left: 0.08,
		top: 0.03,
		width: 0.04,
		height: 0.04,
		background: new THREE.Color(1,1,1),
		eye: [ 0, 0, 1070 ],
		fov: 60
	},
	{
		left: 0.14,
		top: 0.03,
		width: 0.04,
		height: 0.04,
		background: new THREE.Color(1,1,1),
		eye: [ 0, 0, 1070 ],
		fov: 60
	},
	{
		left: 0.20,
		top: 0.03,
		width: 0.04,
		height: 0.04,
		background: new THREE.Color(1,1,1),
		eye: [ 0, 0, 1070 ],
		fov: 60
	},
	{
		left: 0.26,
		top: 0.03,
		width: 0.04,
		height: 0.04,
		background: new THREE.Color(1,1,1),
		eye: [ 0, 0, 1070 ],
		fov: 60
	},
];

var cameras = [];

//Contains all the objects in the scene, to easily coordinate setup and update methods
var gameObjects = [];


function CreateScene() {
	scene = new THREE.Scene();
}

function CreateCamera() {
	new Camera().OrthographicCamera();
	//new Camera().PerspectiveCameraCar();
}

function OnResize() {
		if(cameraStatus > 1){
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight);
		} else { 
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
}

function CreateRenderer() {
	renderer = new THREE.WebGLRenderer({ antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
}

function Render() {

	UpdateMainCamera(window);

	for ( var i = 0; i < carro1.lives; i++ ) {
		
		var view = views[i];
		var extraCamera = cameras[i];
		
		var left   = Math.floor( window.innerWidth  * view.left );
		var top    = Math.floor( window.innerHeight * view.top );
		var width  = Math.floor( window.innerWidth  * view.width );
		var height = Math.floor( window.innerHeight * view.height );
		
		renderer.setViewport( left, top, width, height );
		renderer.setScissor( left, top, width, height );
		renderer.setScissorTest( true );
		renderer.setClearColor( view.background );
		
		extraCamera.aspect = width / height;
		extraCamera.updateProjectionMatrix();
		
		renderer.render( scene, extraCamera );
	}
}

function UpdateMainCamera(window) {
	var mainLeft   = Math.floor( window.innerWidth  * 0 );
	var mainTop    = Math.floor( window.innerHeight * 0 );
	var mainWidth  = Math.floor( window.innerWidth  * 1 );
	var mainHeight = Math.floor( window.innerHeight * 1 );
	
	renderer.setViewport( mainLeft, mainTop, mainWidth, mainHeight );
	renderer.setScissor( mainLeft, mainTop, mainWidth, mainHeight );
	renderer.setScissorTest( true );
	renderer.setClearColor( new THREE.Color(0,0,0) );

	camera.aspect = mainWidth / mainHeight;
	camera.updateProjectionMatrix();

	renderer.render( scene, camera );
}

function BuildObjects() {
	//var tirePostions = TRACK_2;
	var tirePostions = TRACK_TEST
	track1 =  new Track(tirePostions);
	gameObjects.push(track1);
	
	
	var texture = new THREE.TextureLoader().load( "js/textures/gameover.png" );
	var geometry = new THREE.BoxGeometry(600, 200, 1/*, 20, 50*/);
	var phongMaterials = [
		new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide,transparent: true, opacity: 0, wireframe:false } ), //Right
		new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide,transparent: true, opacity: 0, wireframe:false } ), //Left
		new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide,transparent: true, opacity: 0, wireframe:false } ), //Top
		new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide,transparent: true, opacity: 0, wireframe:false } ), //Bottom
		new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide,transparent: true, wireframe:false } ), //Front
		new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide,transparent: true, opacity: 0, wireframe:false } )  //Back
	];
	gameOver = new THREE.Mesh(geometry, phongMaterials);
	gameOver.name = "gameover";
	gameOver.visible = false;
	scene.add(gameOver);


	carro1 = new CarroOld();
	gameObjects.push(carro1);

	dummyCar = new CarroOld(true);
	dummyCar.Start();
	dummyCar.SetPosition(new THREE.Vector3(0, 0, 1040));
	dummyCar.car.rotation.z = Math.PI;
	
	var butterPositions = [[-200,-80,15],
							[440,-240,15],
							[0,240,15],
							[300,90,15],
							[90,-80,15]];
	
	var i;
	for (i=0; i < orangeNum; i++) {
		gameObjects.push(new Orange());
	}
	butters = [];
	for (i=0; i < butterPositions.length; i++) {
		butter = new Butter(butterPositions[i][0], butterPositions[i][1], butterPositions[i][2]);
		butters.push(butter);
		gameObjects.push(butter);
	}

	//Global light
	skyLight = new THREE.DirectionalLight(0xffffff, skyLightIntensity);
	skyLight.position.set(0, 50, 50);
	skyLight.castShadow = true;
	scene.add(skyLight);

	var trackLightPositions = [
		[0, 550/4, 40],
		[0, -550/4, 40],
		[1050/4, 550/4, 40],
		[1050/4, -550/4, 40],
		[-1050/4, 550/4, 40],
		[-1050/4, -550/4, 40],
		[0, 0, 1070]
	]

	//Track lights
	for (i=0; i < trackLightPositions.length; i++) {
		trackLight = new THREE.PointLight(0xffffff, trackLightIntensity, 250);
		trackLight.position.set(trackLightPositions[i][0], trackLightPositions[i][1], trackLightPositions[i][2]);
		trackLight.castShadow = true;
		scene.add(trackLight);
		trackLights.push(trackLight);
	}

	//Extra viewports
	for (i = 0; i < views.length; i++) {
		var view = views[i];
		cameras.push(new THREE.PerspectiveCamera( view.fov, window.innerWidth / window.innerHeight, 1, 10000 ));
		cameras[i].position.fromArray( view.eye );
		cameras[i].rotation.y = Math.PI;
		cameras[i].rotation.z = Math.PI;
	}
}

function StartObjects() {
	var i;
	for (i=0; i < gameObjects.length; i++) {
		//Notifies each object to start setup
		gameObjects[i].Start();
	}
}

function RestartGame(){
	gameOver.visible = false;
	isPaused = false;
	for (i=0; i < gameObjects.length; i++) {
		//Calls reset
		gameObjects[i].reset();
		console.log("exiting");
	}
}

function Update() {
	if (isPaused) return;
	var i;
	var delta = time.getDelta();
	for (i=0; i < gameObjects.length; i++) {
		//Calls Update on each object, and passes the DeltaTime
		gameObjects[i].Update(delta);
	}
	skyLight.needsUpdate = true;
}

function GameOver() {
	if(cameraStatus == 1){
		this.OrthographicCameraGameOver();
	} else if(cameraStatus == 2){
		this.PerspectiveCameraCenterGameOver();
	} else if(cameraStatus == 3){
		this.PerspectiveCameraCarGameOver();
	}
}

function OrthographicCameraGameOver(){
	gameOver.scale.set(1.57, 1.57, 1);
	gameOver.position.set(camera.position.x, camera.position.y, camera.position.z-5);
	gameOver.rotation.x = 0;
	gameOver.rotation.y = 0;
	gameOver.rotation.z = 0;
}

function PerspectiveCameraCenterGameOver() {
	gameOver.scale.set(1, 1, 1);
	gameOver.rotation.x = camera.rotation.x;
	gameOver.rotation.y = gameOver.rotation.z = 0;
	var forward = camera.getWorldDirection();
	var temp = -500;
	forward.x *= temp;
	forward.y *= temp;
	forward.z *= temp;
	var newPos = new THREE.Vector3(camera.position.x - forward.x, camera.position.y - forward.y, camera.position.z - forward.z);
	gameOver.position.set(newPos.x, newPos.y, newPos.z);
}

function PerspectiveCameraCarGameOver(){
	gameOver.rotation.x = 0;
	gameOver.rotation.y = 0;
	gameOver.rotation.z = 0;

	gameOver.scale.set(-0.1, 0.1, 0.1);
	gameOver.rotation.x = Math.PI/2;
	gameOver.rotation.y = Math.PI/2 + camera.rotation.z;
	var temp = -50;
	var forward = camera.getWorldDirection();
	forward.x *= temp;
	forward.y *= temp;
	forward.z *= temp;
	var newPos = new THREE.Vector3(camera.position.x - forward.x, camera.position.y - forward.y, camera.position.z - forward.z);
	gameOver.position.set(newPos.x, newPos.y, newPos.z);
}

function onKeyDown(e) {

	switch (e.keyCode)
	{
		// 1
		case 49:
			new Camera().OrthographicCamera();
			if (gameOver.visible) {
				GameOver();
			}
			break;
		// 2
		case 50:
			new Camera().PerspectiveCameraCenter();
			if (gameOver.visible) {
				GameOver();
			}
			break;
		// 3
		case 51:
			new Camera().PerspectiveCameraCar();
			if (gameOver.visible) {
				GameOver();
			}
			break;
		// 4
		case 52:
			new Camera().PerspectiveCameraSouth();
			if (gameOver.visible) {
				GameOver();
			}
			break;

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
			inWireframe = !inWireframe;
			scene.traverse(function(node) {
				if(node instanceof THREE.Mesh && node.name != "gameover"){
					if (node.material.length > 1) {
						var i;
						for (i = 0; i < node.material.length; ++i) {
							node.material[i].wireframe = !node.material[i].wireframe;
						}
					}
					else {
						node.material.wireframe = !node.material.wireframe;
					}
				}
			});
			break;

		// Spacebar
		case 32:
			carro1.ActivateRearView();
			break;

		// N,n
		case 78:
		case 110:
			skyLight.intensity = skyLight.intensity == 0 ? skyLightIntensity : 0;
			break;
		
		// R,r
		case 82:
		case 114:
			if (carro1.lives < 1) {
				RestartGame();
			}
			break;

		case 72:
		case 104:
			carro1.toggleLight();
			break;

		// C,c
		case 67:
		case 99:
			var i;
			for (i = 0; i < trackLights.length; i++) {
				trackLights[i].intensity = trackLights[i].intensity == 0 ? trackLightIntensity : 0;
			}
			break;

		// L,l
		case 76:
		case 108:
			useBasic = !useBasic;
			scene.traverse(function(node) {
				if(node instanceof THREE.Mesh && node.name != "gameover"){
					var col = node.material.color;
					var wire = node.material.wireframe;
					var materials;
					if (useBasic) {
						if (node.material.length > 1) {
							materials = [
								new THREE.MeshBasicMaterial( {map: node.material[0].map, side: THREE.DoubleSide, wireframe: node.material[0].wireframe } ), //Right
								new THREE.MeshBasicMaterial( {map: node.material[1].map, side: THREE.DoubleSide, wireframe: node.material[1].wireframe } ), //Left
								new THREE.MeshBasicMaterial( {map: node.material[2].map, side: THREE.DoubleSide, wireframe: node.material[2].wireframe } ), //Top
								new THREE.MeshBasicMaterial( {map: node.material[3].map, side: THREE.DoubleSide, wireframe: node.material[3].wireframe } ), //Bottom
								new THREE.MeshBasicMaterial( {map: node.material[4].map, side: THREE.DoubleSide, wireframe: node.material[4].wireframe } ), //Front
								new THREE.MeshBasicMaterial( {map: node.material[5].map, side: THREE.DoubleSide, wireframe: node.material[5].wireframe } )  //Back
							];
							node.material = materials;
						}
						else {
							node.material = new THREE.MeshBasicMaterial({color: col, wireframe:wire});
						}
					}
					else {
						if (node.material.length > 0) {
							if (usePhong) {
								materials = [
									new THREE.MeshPhongMaterial( {map: node.material[0].map, side: THREE.DoubleSide, wireframe: node.material[0].wireframe } ), //Right
									new THREE.MeshPhongMaterial( {map: node.material[1].map, side: THREE.DoubleSide, wireframe: node.material[1].wireframe } ), //Left
									new THREE.MeshPhongMaterial( {map: node.material[2].map, side: THREE.DoubleSide, wireframe: node.material[2].wireframe } ), //Top
									new THREE.MeshPhongMaterial( {map: node.material[3].map, side: THREE.DoubleSide, wireframe: node.material[3].wireframe } ), //Bottom
									new THREE.MeshPhongMaterial( {map: node.material[4].map, side: THREE.DoubleSide, wireframe: node.material[4].wireframe } ), //Front
									new THREE.MeshPhongMaterial( {map: node.material[5].map, side: THREE.DoubleSide, wireframe: node.material[5].wireframe } )  //Back
								];
							}
							else {
								materials = [
									new THREE.MeshLambertMaterial( {map: node.material[0].map, side: THREE.DoubleSide, wireframe: node.material[0].wireframe } ), //Right
									new THREE.MeshLambertMaterial( {map: node.material[1].map, side: THREE.DoubleSide, wireframe: node.material[1].wireframe } ), //Left
									new THREE.MeshLambertMaterial( {map: node.material[2].map, side: THREE.DoubleSide, wireframe: node.material[2].wireframe } ), //Top
									new THREE.MeshLambertMaterial( {map: node.material[3].map, side: THREE.DoubleSide, wireframe: node.material[3].wireframe } ), //Bottom
									new THREE.MeshLambertMaterial( {map: node.material[4].map, side: THREE.DoubleSide, wireframe: node.material[4].wireframe } ), //Front
									new THREE.MeshLambertMaterial( {map: node.material[5].map, side: THREE.DoubleSide, wireframe: node.material[5].wireframe } )  //Back
								];
							}
							node.material = materials;
						}
						else {
							node.material = usePhong ? new THREE.MeshPhongMaterial({color: col, wireframe: wire}) : new THREE.MeshLambertMaterial({color: col, wireframe: wire});
						}
					}
				}
			});
			
		// G,g
		case 71:
		case 103:
			if (!useBasic) {
				usePhong = !usePhong;
				scene.traverse(function(node) {
					if(node instanceof THREE.Mesh && node.name != "gameover"){
						var col = node.material.color;
						var wire = node.material.wireframe;
						if (node.material.length > 0) {
							if (usePhong) {
								materials = [
									new THREE.MeshPhongMaterial( {map: node.material[0].map, side: THREE.DoubleSide, wireframe: node.material[0].wireframe } ), //Right
									new THREE.MeshPhongMaterial( {map: node.material[1].map, side: THREE.DoubleSide, wireframe: node.material[1].wireframe } ), //Left
									new THREE.MeshPhongMaterial( {map: node.material[2].map, side: THREE.DoubleSide, wireframe: node.material[2].wireframe } ), //Top
									new THREE.MeshPhongMaterial( {map: node.material[3].map, side: THREE.DoubleSide, wireframe: node.material[3].wireframe } ), //Bottom
									new THREE.MeshPhongMaterial( {map: node.material[4].map, side: THREE.DoubleSide, wireframe: node.material[4].wireframe } ), //Front
									new THREE.MeshPhongMaterial( {map: node.material[5].map, side: THREE.DoubleSide, wireframe: node.material[5].wireframe } )  //Back
								];
							}
							else {
								materials = [
									new THREE.MeshLambertMaterial( {map: node.material[0].map, side: THREE.DoubleSide, wireframe: node.material[0].wireframe } ), //Right
									new THREE.MeshLambertMaterial( {map: node.material[1].map, side: THREE.DoubleSide, wireframe: node.material[1].wireframe } ), //Left
									new THREE.MeshLambertMaterial( {map: node.material[2].map, side: THREE.DoubleSide, wireframe: node.material[2].wireframe } ), //Top
									new THREE.MeshLambertMaterial( {map: node.material[3].map, side: THREE.DoubleSide, wireframe: node.material[3].wireframe } ), //Bottom
									new THREE.MeshLambertMaterial( {map: node.material[4].map, side: THREE.DoubleSide, wireframe: node.material[4].wireframe } ), //Front
									new THREE.MeshLambertMaterial( {map: node.material[5].map, side: THREE.DoubleSide, wireframe: node.material[5].wireframe } )  //Back
								];
							}
							node.material = materials;
						}
						else {
							node.material = usePhong ? new THREE.MeshPhongMaterial({color: col, wireframe: wire}) : new THREE.MeshLambertMaterial({color: col, wireframe: wire});
						}
					}
				});
			}
			break;

		// S,s
		case 83:
		case 115:
			isPaused = !isPaused;
			if (isPaused) {
				time.stop();
			}
			else {
				time.start();
			}
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

		// Spacebar
		case 32:
			carro1.DeactivateRearView();
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
