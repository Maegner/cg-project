class GameOver{

    constructor(){
    	this.gameOverOriginal;
    }

    createGameOver(){
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
		gameOver.visible = false;
		this.gameOverOriginal = gameOver;
		}

		checkGameOver(){
				if(gameOver != null && gameOver.visible){
					gameOver = this.gameOverOriginal
					if(cameraStatus == 1){
							gameOver.scale.set(1, 1, 1);
							gameOver.position.set(camera.position.x, camera.position.y, camera.position.z-5);
					} else if(cameraStatus == 2){
								gameOver.rotation.x = camera.rotation.x;
								var forward = camera.getWorldDirection();
								var temp = -500;
								forward.x *= temp;
								forward.y *= temp;
								forward.z *= temp;
								var newPos = new THREE.Vector3(camera.position.x - forward.x, camera.position.y - forward.y, camera.position.z - forward.z);
								gameOver.position.set(newPos.x, newPos.y, newPos.z);

					} else if(cameraStatus == 3){
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
			}
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