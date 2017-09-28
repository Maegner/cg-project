class Carro
{
	constructor() {
		//Manel
		this.geometry;
		this.speed = 1;

		/*Goncalo*/
		this.material = new THREE.MeshBasicMaterial( {color: 0x00FF00, wireframe: true} );

		this.velocity = new THREE.Vector3(0,0,0);
		this.maxSpeed = 0.2;
		this.acceleration = 100;
		//Translates player's input
		this.thrust = 0;
		//Makes the car slow to a halt
		this.drag = 0.6;
		this.VelXText;
		this.ThrustText;
	}

	Start() {

		this.VelXText = document.createElement('div');
		this.VelXText.style.position = 'absolute';
		this.VelXText.style.width = 100;
		this.VelXText.style.height = 100;
		this.VelXText.style.backgroundColor = "white";
		this.VelXText.innerHTML = "hi there!";
		this.VelXText.style.top = 50 + 'px';
		this.VelXText.style.left = 100 + 'px';
		document.body.appendChild(this.VelXText);

		this.ThrustText = document.createElement('div');
		this.ThrustText.style.position = 'absolute';
		this.ThrustText.style.width = 100;
		this.ThrustText.style.height = 100;
		this.ThrustText.style.backgroundColor = "white";
		this.ThrustText.innerHTML = "hi there!";
		this.ThrustText.style.top = 70 + 'px';
		this.ThrustText.style.left = 100 + 'px';
		document.body.appendChild(this.ThrustText);

		this.car = new THREE.Object3D();
		this.CreateMiddlePart(0.5,0.5,0.5);
		this.CreateFrontPart(0.5,0.5,1.5);
		this.CreateWheel(0.1,-0.2,-5);
		this.CreateRoof(0.5,0.75,0.5);
		this.CreateWheelSupport(0.75,0.5,0.5);
		var eixo = new THREE.AxisHelper(3);
		eixo.rotation.y = -.5;
		eixo.rotation.x = .5;
		scene.add(eixo);
		scene.add(this.car);
	}

	Update(delta) {

		var throttle = (this.thrust * this.acceleration) * delta;
		var velocitySign = Math.sign(this.velocity.x);
		var throttleSign = Math.sign(throttle);	
		//Check if car hasn't hit full speed, if it did, don't update velocity
		if (velocitySign == 0 || (Math.abs(this.velocity.x) < this.maxSpeed || velocitySign == throttleSign)) {
			this.velocity.x += throttle;
		}

		//When velocity is nearly 0, halt the car
		if (this.thrust == 0 && Math.abs(this.velocity.x) < 0.00005) {
			this.velocity = new THREE.Vector3(0,0,0);
			this.thrust = 0;
		}
		this.ApplyVelocity();

		//Update text
		this.VelXText.innerHTML = this.velocity.x;
		this.ThrustText.innerHTML = this.thrust;

		this.car.rotation.y += 0.005;
		this.car.rotation.x += 0.005;
		this.car.rotation.z += 0.005;
	}

	ApplyVelocity() {
		//car.position += this.velocity;
	}

	OnThrust() {
		if (this.thrust < 1) {
			if (Math.abs(this.thrust) != this.drag) {
				this.thrust += 1;
			}
			else {
				this.thrust = 1;
			}
		}
	}

	OnUnthrust() {
		this.thrust -= 1;

		//If the car's speed is not 0 and the player is applying no thrust, apply drag
		if (this.velocity.length != 0 && this.thrust == 0) {
			this.thrust -= (this.drag) * Math.sign(this.velocity.x);
		}
	}

	OnBrake() {
		if (this.thrust > -1) {
			if (Math.abs(this.thrust) != this.drag) {
				this.thrust -= 1;
			}
			else {
				this.thrust = -1;
			}
		}
	}

	OnUnbrake() {
		this.thrust += 1;
		//If the car's x speed is not 0 and the player is applying no thrust, apply drag
		if (this.velocity.length != 0 && this.thrust == 0) {

			this.thrust += (this.drag) * Math.sign(-this.velocity.x);
		}
	}

	CreateMiddlePart(x,y,z){
		var cubo = new THREE.BoxGeometry( 0.5, 0.5, 1.5);
		//cubo.x = (Math.PI/180);
		var mesh = new THREE.Mesh(cubo, this.material);
		mesh.position.set(x,y,z);
		this.car.add(mesh);
	}
	CreateFrontPart(x,y,z){
		var bico = new THREE.CylinderGeometry(0,0.35,0.5,4,5,0); 
		var mesh = new THREE.Mesh(bico, this.material);
		mesh.position.set(x,y,z);
		bico.rotateX(Math.PI / 2); // toda para a base da piramide ficar na mesma face que 1 das bases do paralelipipedo
		bico.rotateZ(Math.PI / 4); // roda para o bico ficar na mesma direcao que o paralelipipedo
		this.car.add(mesh);
	}
	CreateWheel(x,y,z){
		var wheel = new THREE.TorusGeometry( 0.5, 0.5, 0.5, 5 );
		var mesh = new THREE.Mesh(wheel, this.material);
		mesh.position.set(x,y,z);
		this.car.add(mesh);
	}
	CreateRoof(x,y,z){
		var ball = new THREE.SphereGeometry( 0.25, 5, 5,0, Math.PI);
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

		triangle.rotateX(-Math.PI / 2);
		triangle.rotateZ(3 * Math.PI / 4);
		triangle.rotateY(3 * Math.PI / 2);
		var mesh = new THREE.Mesh( triangle, this.material );
		mesh.position.set(x,y,z);
		this.car.add(mesh);
	}
}