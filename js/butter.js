class Butter
{
	constructor(x, y, z) {
		this.location = new THREE.Vector3(x, y, z);
	}

	Start() {
		var CompleteButter = new THREE.Object3D();
		var plateGeometry = new THREE.BoxGeometry(120,50,3);
		var plateMaterial = new THREE.MeshBasicMaterial({color:0xFFFFFF,wireframe: true});
		var plate = new THREE.Mesh(plateGeometry,plateMaterial);
		plate.position.set(this.location.x, this.location.y, this.location.z);

		CompleteButter.add(plate);

		scene.add(plate);
	}

	Update(delta) {
		
	}
}