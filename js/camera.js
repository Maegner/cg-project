class Camera
{
	constructor() {
	}

	OrthographicCamera() {
		frustumSize = track1.getTrackSize();
		//frustumSize = new THREE.Vector3(1000, 500, 2);
		var aspect = window.innerWidth / window.innerHeight
		camera = new THREE.OrthographicCamera(/*LeftPane*/-frustumSize.x/2, /*RightPane*/frustumSize.x/2,/*TopPane*/frustumSize.x * (1/aspect)/2,/*BottomPane*/-frustumSize.x * (1/aspect)/2 ,/*Near*/0.1, /*Far*/1000);
		camera.position.z = 250;
		camera.updateProjectionMatrix();
	}

	PerspectiveCamera() {
		camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
		camera.updateProjectionMatrix();
	}

	PerspectiveCameraCar(){
		camera = new THREE.PerspectiveCamera(45, 10, 0, 12);
		camera.updateProjectionMatrix();
	}

	Update(delta) {
		
	}
}