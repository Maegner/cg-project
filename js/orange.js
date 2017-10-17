class Orange
{
	constructor(x, y, z) {
		this.location = new THREE.Vector3(x, y, z);
		this.orange;
		this.velocity = new THREE.Vector3(0,0,0);

		this.maxBounds = new THREE.Vector3(1000, 1000, 1000);
		this.minBounds = new THREE.Vector3(-1000, -1000, -1000);

		this.speedCounter = 0;
		this.speedScale = 10;
		this.radius = 30;

		this.speedMin = 50;
		this.speedMax = 150;
		this.speed = Math.floor(Math.random() * (this.speedMax - this.speedMin + 1)) + this.speedMin;
		this.turningMin = 0.2;
		this.turningMax = 2;
		this.turning = Math.floor(Math.random() * (this.turningMax - this.turningMin + 1)) + this.turningMin;

		this.outOfBounds = false;
		this.respawnCounter = 0;
		this.respawnTimeMin = 2;
		this.respawnTimeMax = 5;
		this.respawnTime = Math.random() * (this.respawnTimeMax - this.respawnTimeMin + 1) + this.respawnTimeMin;
	}

	Start() {
		var geometry = new THREE.SphereGeometry(this.radius,8,6);
		var material = new THREE.MeshBasicMaterial({color: 0xFFA500, wireframe: true});
		this.orange = new THREE.Mesh(geometry,material);
		this.orange.position.x = this.location.x;
		this.orange.position.y = this.location.y;
		this.orange.position.z = this.location.z;
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
	}

	Update(delta) {

		if (!this.outOfBounds) {
			var forward = this.orange.getWorldDirection();
			this.orange.position.x += (this.speed + this.speedCounter*this.speedScale) * delta*1000 * forward.x;
			this.orange.position.y += (this.speed + this.speedCounter*this.speedScale) * delta*1000 * forward.y;

			this.speedCounter += delta;

			this.orange.rotateY(this.turning * delta*1000);

			//If orange is out of bounds, hide it and start "respawn" countdown
			if (this.CheckIfOutsideTrack()) {
				this.outOfBounds = true;
				//this.orange.visible = false;
			}
		}
		else {
			this.respawnCounter += delta;
			//alert(this.respawnCounter.toString() + "  " + this.respawnTime.toString());
			if (this.respawnCounter > 1) {
				alert("Now");
			}
			if (this.respawnCounter >= this.respawnTime) {
				alert(this.respawnTime);
				this.respawnCounter = 0;
				this.orange.position.x = this.location.x;
				this.orange.position.y = this.location.y;
				this.orange.position.z = this.location.z;
				this.outOfBounds = false;
				//this.orange.visible = true;
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

}