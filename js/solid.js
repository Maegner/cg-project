class SolidFactory {
	constructor() {

	}
	getSolid(s){
		if(s == "cube"){

		} else if(s == "triangle"){

		}
	}

/*
	getCube(x,y,z){
		var cubo = new THREE.BoxGeometry( 0.5, 0.5, 1.5);
		//cubo.x = (Math.PI/180);
		var mesh = new THREE.Mesh(cubo, this.material);
		mesh.position.set(x,y,z);
		this.car.add(mesh);
	}
	getCylinder(mesh){
		var bico = new THREE.CylinderGeometry(0,0.35,0.5,4,5,0); 
		var mesh = new THREE.Mesh(bico, this.material);
		mesh.position.set(x,y,z);
		bico.rotateX(Math.PI / 2); // toda para a base da piramide ficar na mesma face que 1 das bases do paralelipipedo
		bico.rotateZ(Math.PI / 4); // roda para o bico ficar na mesma direcao que o paralelipipedo
		this.car.add(mesh);
	}
	getTorus(x,y,z){
		var wheel = new THREE.TorusGeometry( 0.5, 0.5, 0.5, 5 );
		var mesh = new THREE.Mesh(wheel, this.material);
		mesh.position.set(x,y,z);
		this.car.add(mesh);
	}
	getSphere(x,y,z){
		var ball = new THREE.SphereGeometry( 0.25, 5, 5,0, Math.PI);
		var mesh = new THREE.Mesh( ball, this.material );
		mesh.position.set(x,y,z);
		ball.rotateX(3 * Math.PI / 2);
		this.car.add(mesh);
	}
	getTriangle(x,y,z){
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
	}*/
}