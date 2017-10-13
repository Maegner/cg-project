class Orange
{
	constructor(x, y, z) {
		this.location = new THREE.Vector3(x, y, z);
		this.orange;
		this.velocity = new THREE.Vector3(0,0,0);

		this.speedMax = 150;
		this.speedMin = 50;
		this.speed = Math.floor(Math.random() * (this.speedMax - this.speedMin + 1)) + this.speedMin;;
		this.turning = 1;
	}

	Start() {
		var geometry = new THREE.SphereGeometry(50,10,10);
		var material = new THREE.MeshBasicMaterial({color: 0xFFA500, wireframe: true});
		this.orange = new THREE.Mesh(geometry,material);
		this.orange.position.x = this.location.x;
		this.orange.position.y = this.location.y;
		this.orange.position.z = this.location.z;
		this.orange.rotation.y = Math.PI/2;
		scene.add(this.orange);
	}

	Update(delta) {
		var forward = this.orange.getWorldDirection();
		this.orange.position.x += this.speed * delta*1000 * forward.x;
		this.orange.position.y += this.speed * delta*1000 * forward.y;

		this.orange.rotateX(this.turning * delta*1000);
	}

}