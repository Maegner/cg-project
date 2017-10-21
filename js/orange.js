class Orange
{
	constructor() {
		this.locX = 0;
		this.locY = 0;
		this.orange = new THREE.Object3D();
		this.velocity = new THREE.Vector3(0,0,0);
		this.forwardVector = new THREE.Vector3(0, 0, 0);
		this.radius = 30;
		this.height = 50;

		this.colisionSphere = new Sphere(new THREE.Vector2(0,0),30);

		//Used to check whether the orange went out of bounds
		this.maxBounds = new THREE.Vector3(1000, 1000, 1000);
		this.minBounds = new THREE.Vector3(-1000, -1000, -1000);

		this.speedCounter = 0;
		//Dictates how fast the orange's speed scales over time
		this.speedScale = 0.5;

		//Interval of speed
		this.speedMin = 2;
		this.speedMax = 10;
		
		this.respawnCounter = 0;
		//Interval of time to respawn
		this.respawnTimeMin = 2;
		this.respawnTimeMax = 5;

		this.outOfBounds = false;
	}

	Start() {
		var geometry = new THREE.SphereGeometry(this.radius,8,6);
		var material = new THREE.MeshBasicMaterial({color: 0xFFA500, wireframe: true});
		var sphere = new THREE.Mesh(geometry,material);
		this.orange.add(sphere);
		var geometry2 = new THREE.BoxGeometry(4, 4, 12);
		var material2 = new THREE.MeshBasicMaterial({color: 0x00FF00, wireframe: true});
		var tip = new THREE.Mesh(geometry2,material2);
		tip.position.z = 30;
		this.orange.add(tip);
		scene.add(this.orange);

		this.orange.visible = true;

		//Fetch track bounds
		var tempBounds = track1.getTrackSize();
		var tempPos = track1.getTrackPosition();
		this.maxBounds.x = tempBounds.x/2 + tempPos.x ;
		this.minBounds.x = -tempBounds.x/2 + tempPos.x;
		this.maxBounds.y = tempBounds.y/2 + tempPos.y;
		this.minBounds.y = -tempBounds.y/2 + tempPos.y;

		this.UpdateMovementValues();
	}

	Update(delta) {

		//If orange isn't out of bounds, update its movement
		if (!this.outOfBounds) {

			var xMov = (this.speed + this.speedCounter * this.speedScale) * delta * 10 * this.forwardVector.x;
			var yMov = (this.speed + this.speedCounter * this.speedScale) * delta * 10 * this.forwardVector.y;
			
			this.colisionSphere.center.x += xMov;
			this.colisionSphere.center.y += yMov;

			this.orange.position.x += xMov;
			this.orange.position.y += yMov;

			if(this.colisionSphere.isColidingWithSphere(carro1.colisionSphere)){
				carro1.colisionSphere.center = new THREE.Vector2(-350,150);
				carro1.car.position.x = -350;
				carro1.car.position.y = 150;
			}

			var rollDistance = Math.sqrt(Math.pow(Math.abs(yMov),2) + Math.pow(Math.abs(xMov),2));
			//console.log("X:" + xMov.toString() + " Y:" + yMov.toString());
			this.orange.rotateX(rollDistance/this.radius);

			this.speedCounter += delta;

			//If orange is out of bounds, hide it and start "respawn" countdown
			if (this.CheckIfOutsideTrack()) {
				this.outOfBounds = true;
				this.orange.visible = false;
			}
		}
		else {
			//If orange is out of bounds, wait for respawn time, then reset the orange
			this.respawnCounter += delta;
			if (this.respawnCounter >= this.respawnTime) {
				this.UpdateMovementValues();
				
				this.outOfBounds = false;
				this.orange.visible = true;
			}
		}
	}

	CheckIfOutsideTrack() {
		var outside = true;
		if (this.orange.position.x < this.maxBounds.x - this.radius && this.orange.position.x > this.minBounds.x + this.radius && 
			this.orange.position.y < this.maxBounds.y - this.radius && this.orange.position.y > this.minBounds.y + this.radius) {
			outside = false;
		}
		return outside;
	}

	//RESET ORANGE
	UpdateMovementValues() {
		//Generate speed, and respawn time
		this.speed = Math.random() * (this.speedMax - this.speedMin) + this.speedMin;
		this.respawnTime = Math.random() * (this.respawnTimeMax - this.respawnTimeMin) + this.respawnTimeMin;
		this.respawnCounter = 0;
		//Generate location and rotation
		this.orange.position.x = 0;
		this.orange.position.y = 0;

		this.colisionSphere.center.x = 0;
		this.colisionSphere.center.y = 0;

		this.orange.position.z = this.height;
		this.orange.rotation.x = Math.PI/2;
		this.orange.rotation.y = Math.random() * (Math.PI*2);
		this.orange.rotation.z = 0;
		this.forwardVector = this.orange.getWorldDirection();
	}
}