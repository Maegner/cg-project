class Butter
{
	constructor(x, y, z) {
		this.location = new THREE.Vector3(x, y, z);
		this.colidingAABB;
	}

	Start() {
		var CompleteButter = new THREE.Object3D();
		var plateGeometry = new THREE.BoxGeometry(120,50,30);
		var plateMaterial = new THREE.MeshBasicMaterial({color:0xFFFFFF,wireframe: true});
		var plate = new THREE.Mesh(plateGeometry,plateMaterial);
		plate.position.set(this.location.x, this.location.y, this.location.z);
		
		var minPosition = new THREE.Vector2(this.location.x - 60,this.location.y - 25);
		var maxPosition = new THREE.Vector2(this.location.x + 60,this.location.y + 25);
		this.colidingAABB = new AABB(minPosition,maxPosition);

		CompleteButter.add(plate);

		scene.add(plate);
	}

	Update(delta) {
	}
}