class Camera
{
	constructor() {

	}

	OrthographicCamera() {
		frustumSize = track1.getTrackSize();
		var aspect = window.innerWidth / window.innerHeight
		camera = new THREE.OrthographicCamera(/*LeftPane*/-frustumSize.x/2, /*RightPane*/frustumSize.x/2,/*TopPane*/frustumSize.x * (1/aspect)/2,/*BottomPane*/-frustumSize.x * (1/aspect)/2 ,/*Near*/0.1, /*Far*/1000);
		camera.position.z = 250;
		camera.updateProjectionMatrix();
	}

	PerspectiveCameraSouth() {
		//frustumSize = track1.getTrackSize();
		//var aspect = window.innerWidth / window.innerHeight;
		//camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
		//camera.updateProjectionMatrix();
		var aspect = window.innerWidth / window.innerHeight;
		camera = new THREE.PerspectiveCamera(80, aspect, 0.1, 1500);
		camera.position.z = 500;
		camera.position.x = 500;
		camera.rotation.z = Math.PI/2;
		camera.rotation.y = Math.PI/5;
		//camera.lookAt(carro1.position);
		camera.updateProjectionMatrix();
	}

	PerspectiveCameraCenter() {
		var aspect = window.innerWidth / window.innerHeight;
		camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 2000);
		camera.position.z = 100;
		camera.position.y = -200;
		camera.lookAt(scene.position);
		camera.position.set(0,-1000,600);
		camera.updateProjectionMatrix();
	}

	PerspectiveCameraCar(){
		//camera = new THREE.PerspectiveCamera(45, 10, 0, 12);
		//camera.updateProjectionMatrix();
		var aspect = window.innerWidth / window.innerHeight;
		camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 2000);
		camera.position.set(10, 5, 30);
		camera.position.x =-500;
		camera.position.y =150;
		camera.rotation.y = -Math.PI/2;
		camera.rotation.z = -Math.PI/2;
		camera.updateProjectionMatrix();
	}
}