class Orange
{
	constructor(x, y, z) {
		this.location = new THREE.Vector3(x, y, z);
	}

	Start() {
		var geometry = new THREE.SphereGeometry(50,32,32);
		var material = new THREE.MeshBasicMaterial({color: 0xFFA500, wireframe: true});
		var orange = new THREE.Mesh(geometry,material);
		orange.position.set(this.location.x, this.location.y, this.location.z);
		scene.add(orange);
	}

	Update(delta) {

	}
}