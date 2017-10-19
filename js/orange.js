class Orange
{
	constructor(x, y, z) {
		this.locX = 0;
		this.locY = 0;
		this.orange;
		this.velocity = new THREE.Vector3(0,0,0);

		this.maxBounds = new THREE.Vector3(1000, 1000, 1000);
		this.minBounds = new THREE.Vector3(-1000, -1000, -1000);

		this.speedCounter = 0;
		this.speedScale = 0.5;
		this.radius = 30;
		this.height = 50;

		this.speedMin = 2;
		this.speedMax = 10;
		this.turningMin = 0.2;
		this.turningMax = 2;

		this.outOfBounds = false;
		this.respawnCounter = 0;
		this.respawnTimeMin = 2;
		this.respawnTimeMax = 5;
	}

	Start() {
		var geometry = new THREE.SphereGeometry(this.radius,8,6);
		var material = new THREE.MeshBasicMaterial({color: 0xFFA500, wireframe: true});
		this.orange = new THREE.Mesh(geometry,material);
		this.orange.rotation.y = Math.PI/2;
		this.orange.rotation.x = Math.PI/2;
		scene.add(this.orange);

		//Fetch track bounds
		var tempBounds = track1.getTrackSize();
		var tempPos = track1.getTrackPosition();
		this.maxBounds.x = tempBounds.x/2 + tempPos.x;
		this.minBounds.x = -tempBounds.x/2 + tempPos.x;
		this.maxBounds.y = tempBounds.y/2 + tempPos.y;
		this.minBounds.y = -tempBounds.y/2 + tempPos.y;

		this.UpdateMovementValues();
	}

	Update(delta) {

		//If orange isn't out of bounds, update its movement
		if (!this.outOfBounds) {
			var forward = this.orange.getWorldDirection();
			this.orange.position.x += (this.speed + this.speedCounter * this.speedScale) * delta * 10 *  forward.x;
			this.orange.position.y += (this.speed + this.speedCounter * this.speedScale) * delta * 10 * forward.y;

			this.speedCounter += delta;

			this.orange.rotateY(this.turning * delta);

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
				//alert("Respawn");
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

	UpdateMovementValues() {
		//Generate speed, turning and respawn time
		this.speed = Math.random() * (this.speedMax - this.speedMin) + this.speedMin;
		this.turning = Math.random() * (this.turningMax - this.turningMin) + this.turningMin;
		this.respawnTime = Math.random() * (this.respawnTimeMax - this.respawnTimeMin) + this.respawnTimeMin;
		this.respawnCounter = 0;
		//Generate location and rotation
		this.orange.position.x = Math.random() * (this.maxBounds.x - this.minBounds.x) + this.minBounds.x;
		this.orange.position.y = Math.random() * (this.maxBounds.y - this.minBounds.y) + this.minBounds.y;
		this.orange.position.z = this.height;
		this.orange.rotation.y = Math.random() * (Math.PI*2);
	}
}