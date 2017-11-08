class Orange extends Respawnable
{
	constructor() {
		super();
		this.locX = 0;
		this.locY = 0;
		this.orange = new THREE.Object3D();
		this.comparable = this.orange;
		this.velocity = new THREE.Vector3(0,0,0);
		this.forwardVector = new THREE.Vector3(0, 0, 0);
		this.radius = 30;
		this.height = 28;
		this.objectSize = this.radius;		

		this.colisionSphere = new Sphere(new THREE.Vector2(0,0),30);

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
	}

	Start() {
		var geometry = new THREE.SphereGeometry(this.radius,8,6);
		var material = new THREE.MeshPhongMaterial({color: 0xFFA500, wireframe: true});
		var sphere = new THREE.Mesh(geometry,material);
		sphere.castShadow = true;
		this.orange.add(sphere);
		var geometry2 = new THREE.BoxGeometry(4, 4, 12);
		var material2 = new THREE.MeshPhongMaterial({color: 0x00FF00, wireframe: true});
		var tip = new THREE.Mesh(geometry2,material2);
		tip.castShadow = true;
		tip.position.z = 30;
		this.orange.add(tip);
		this.orange.position.z = this.height;
		
		scene.add(this.orange);

		super.Start();

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
				carro1.Respawn();
			}

			var rollDistance = Math.sqrt(Math.pow(Math.abs(yMov),2) + Math.pow(Math.abs(xMov),2));
			this.orange.rotateX(rollDistance/this.radius);

			this.speedCounter += delta;

			super.Update(delta);
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

	Respawn() {
		this.outOfBounds = true;
		this.orange.visible = false;
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

		this.orange.rotation.x = Math.PI/2;
		this.orange.rotation.y = Math.random() * (Math.PI*2);
		this.orange.rotation.z = 0;
		this.forwardVector = this.orange.getWorldDirection();
	}
}