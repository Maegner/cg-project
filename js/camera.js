class Camera
{
	constructor() {

	}

	OrthographicCamera() {
		cameraStatus = 1;
		frustumSize = track1.getTrackSize();
		var aspect = window.innerWidth / window.innerHeight
		camera = new THREE.OrthographicCamera(/*LeftPane*/-frustumSize.x/2, /*RightPane*/frustumSize.x/2,/*TopPane*/frustumSize.x * (1/aspect)/2,/*BottomPane*/-frustumSize.x * (1/aspect)/2 ,/*Near*/0.1, /*Far*/1000);
		camera.position.z = 250;
		camera.recieveShadow = true;
		camera.castShadow = true;
		camera.updateProjectionMatrix();
		this.OrthographicCameraGameOver();
	}

	OrthographicCameraGameOver(){
		gameOver.scale.set(1, 1, 1);
		gameOver.position.set(camera.position.x, camera.position.y, camera.position.z-5);
		gameOver.rotation.x = 0;
		gameOver.rotation.y = 0;
		gameOver.rotation.z = 0;
	}

	PerspectiveCameraSouth() {
		cameraStatus = 4;
		var aspect = window.innerWidth / window.innerHeight;
		camera = new THREE.PerspectiveCamera(80, aspect, 0.1, 1500);
		camera.position.z = 500;
		camera.position.x = 500;
		camera.rotation.z = Math.PI/2;
		camera.rotation.y = Math.PI/5;
		camera.recieveShadow = true;
		camera.castShadow = true;
		camera.updateProjectionMatrix();
	}



	PerspectiveCameraCenter() {
		cameraStatus = 2;
		var aspect = window.innerWidth / window.innerHeight;
		camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 2000);
		camera.position.z = 0;
		camera.position.y = -600;
		camera.position.z = 600;
		camera.recieveShadow = true;
		camera.castShadow = true;
		camera.lookAt(scene.position);
		camera.updateProjectionMatrix();
		this.PerspectiveCameraCenterGameOver();
	}

	PerspectiveCameraCenterGameOver(){

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

	PerspectiveCameraCar(){
		cameraStatus = 3;
		var aspect = window.innerWidth / window.innerHeight;
		camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 2000);

		camera.position.set(10, 5, 30);
		camera.position.x =-500;
		camera.position.y =150;
		camera.rotation.y = 0;
		camera.rotation.z = 0;
		gameOver.rotation.x = 0;
		gameOver.rotation.y = 0;
		gameOver.rotation.z = 0;

		camera.updateProjectionMatrix();
		carro1.SetupCamera();
		this.PerspectiveCameraCarGameOver();
	}

	PerspectiveCameraCarGameOver(){
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

	GameOver(){
		if(cameraStatus == 1){
			this.OrthographicCameraGameOver();
		} else if(cameraStatus == 2){
			this.PerspectiveCameraCenterGameOver();
		} else if(cameraStatus == 3){
			this.PerspectiveCameraCarGameOver();
		}
	}

}