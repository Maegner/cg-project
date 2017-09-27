class Car {
	constructor() {
		//Manel
		this.geometry;
		this.speed = 1;
		this.material = new THREE.MeshBasicMaterial( {color: 0x00FF00, wireframe: true} );
		this.car;
		//Goncalo
		this.acceleration = 1;
	}

	Start() {
		this.car = new THREE.Object3D();
		this.CreateMiddlePart(0.5,0.5,0.5);
		this.CreateFrontPart(0.5,0.5,1.5);
		this.CreateWheel(0.1,-0.2,-5);
		this.CreateRoof(0.5,0.75,0.5);
		this.CreateWheelSupport(0.75,0.5,0.5);
		scene.add(this.car);
	}

	Update(delta) {
		this.car.rotation.y += 0.005;
		this.car.rotation.x += 0.005;
		this.car.rotation.z += 0.005;
	}

	CreateMiddlePart(x,y,z){
		var cubo = new THREE.BoxGeometry( 0.5, 0.5, 1.5);
		//cubo.x = (Math.PI/180);
		var mesh = new THREE.Mesh(cubo, this.material);
		mesh.position.set(x,y,z);
		this.car.add(mesh);
	}
	CreateFrontPart(x,y,z){
		var bico = new THREE.CylinderGeometry(0,0.5,0.5,4,false); 
		var mesh = new THREE.Mesh(bico, this.material);
		mesh.position.set(x,y,z);
		bico.rotateX(Math.PI / 2);
		this.car.add(mesh);
	}
	CreateWheel(x,y,z){
		var wheel = new THREE.TorusGeometry( 0.5, 0.5, 0.5, 10 );
		var mesh = new THREE.Mesh(wheel, this.material);
		mesh.position.set(x,y,z);
		this.car.add(mesh);
	}
	CreateRoof(x,y,z){
		var ball = new THREE.SphereGeometry( 0.25, 40, 10,0, Math.PI);
		var mesh = new THREE.Mesh( ball, this.material );
		mesh.position.set(x,y,z);
		ball.rotateX(3 * Math.PI / 2);
		this.car.add(mesh);
	}
	CreateWheelSupport(x,y,z){
		var triangle = new THREE.Geometry();
		var v1 = new THREE.Vector3(0,0,0);
		var v2 = new THREE.Vector3(0.2,0,0);
		var v3 = new THREE.Vector3(0.2,0.2,0);

		triangle.vertices.push(v1);
		triangle.vertices.push(v2);
		triangle.vertices.push(v3);

		triangle.faces.push( new THREE.Face3( 0, 1, 2 ) );
		triangle.computeFaceNormals();
		triangle.rotateZ(3 * Math.PI / 4);
		triangle.rotateX(Math.PI);
		var mesh = new THREE.Mesh( triangle, this.material );
		mesh.position.set(x,y,z);
		this.car.add(mesh);
	}

}