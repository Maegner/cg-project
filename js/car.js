class Carro
{
	constructor() {
		//Manel
		this.geometry;
		this.speed = 1;

		/*Goncalo*/
		this.material = new THREE.MeshBasicMaterial( {color: 0x00FF00, wireframe: true} );

		this.velocity = new THREE.Vector3(0,0,0);

		this.speed = 15000;
		this.maxVelocity = 20;
		this.acceleration = 1.6;
		//Translates player's throttle input (1 = accelerate, -1 = brake)
		this.throttle = 0;
		//Makes the car slow to a halt
		this.speedDrag = 0.6;

		this.steeringSensitivity = 1000;
		this.maxSteering = 0.05;
		//Translates player's turn input (1 = right, -1 = left)
		this.turn = 0;
		//Makes the car turn to the center
		this.turnDrag = 0.6;

		//Tracks the key's pressed state
		this.throttlePressed = false;
		this.brakePressed = false;
		this.leftPressed = false;
		this.rightPressed = false;

		//Debug Text
		this.VelXText;
		this.VelZText;
		this.throttleText;
		this.turnText;
		this.clampedVel;
	}

	Start() {

		this.CreateScreenText();

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

		//ACCELERATION
		var thrust = (this.throttle * this.speed) * delta;
		var speedSign = Math.sign(this.velocity.x);
		var throttleSign = Math.sign(this.throttle);

		//Check if car hasn't hit full speed, if it did, don't update X velocity
		if (Math.abs(this.velocity.x) < this.maxVelocity || (throttleSign != speedSign)) {

			if (Math.abs(this.throttle) == 1) {
				this.velocity.x += thrust*this.acceleration;
			}
			//Apply smoother deacceleration when dragging
			else {
				this.velocity.x += thrust*(this.acceleration / 2);
			}
		}
		//When velocity is nearly 0, and the car isn't at full throttle, halt the car
		if (this.velocity.x != 0 && Math.abs(this.throttle) != 1 && Math.abs(this.velocity.x) < 0.05) {
			this.velocity.x = 0;
			this.throttle = 0;
		}

		//TURNING
		var vel = this.velocity.x;
		var clampVel = THREE.Math.clamp(vel, -1, 1);
		var turning = (this.turn * this.steeringSensitivity) * delta/* * clampVel*/;
		var steerSign = Math.sign(this.velocity.z);
		var turnSign = Math.sign(this.turn);

		//Check if car hasn't hit full steering, if it did, don't update Z velocity
		if (Math.abs(this.velocity.z) < this.maxSteering || (turnSign != steerSign)) {
			this.velocity.z += turning;
			//Multiplied by clamped velocity, to smooth turning when speed changes direction
			//this.velocity.z *= clampVel;
		}
		//When turning is nearly 0, and the player isn't turning, center the steering of the car
		if (this.velocity.z != 0 && Math.abs(this.turn) != 1 && Math.abs(this.velocity.z) < 0.005) {
			this.velocity.z = 0;
			this.turn = 0;
		}

		this.ApplyVelocity();

		//Update text
		this.VelXText.innerHTML = this.velocity.x;
		this.VelZText.innerHTML = this.velocity.z;
		this.throttleText.innerHTML = this.throttle;
		this.turnText.innerHTML = this.turn;
		this.clampedVel.innerHTML = clampVel;

		//this.car.rotation.y += 0.005;
		//this.car.rotation.x += 0.005;
		//this.car.rotation.z += 0.005;
	}

	ApplyVelocity() {
		//this.car.position.x += this.velocity.x;
		//this.car.rotation.z += this.velocity.z;

	}

	CreateScreenText() {
		this.VelXText = document.createElement('div');
		this.VelXText.style.position = 'absolute';
		this.VelXText.style.width = 100;
		this.VelXText.style.height = 100;
		this.VelXText.style.backgroundColor = "white";
		this.VelXText.innerHTML = "hi there!";
		this.VelXText.style.top = 50 + 'px';
		this.VelXText.style.left = 100 + 'px';
		document.body.appendChild(this.VelXText);
		this.VelZText = document.createElement('div');
		this.VelZText.style.position = 'absolute';
		this.VelZText.style.width = 100;
		this.VelZText.style.height = 100;
		this.VelZText.style.backgroundColor = "white";
		this.VelZText.innerHTML = "hi there!";
		this.VelZText.style.top = 70 + 'px';
		this.VelZText.style.left = 100 + 'px';
		document.body.appendChild(this.VelZText);
		this.throttleText = document.createElement('div');
		this.throttleText.style.position = 'absolute';
		this.throttleText.style.width = 100;
		this.throttleText.style.height = 100;
		this.throttleText.style.backgroundColor = "white";
		this.throttleText.innerHTML = "hi there!";
		this.throttleText.style.top = 90 + 'px';
		this.throttleText.style.left = 100 + 'px';
		document.body.appendChild(this.throttleText);
		this.turnText = document.createElement('div');
		this.turnText.style.position = 'absolute';
		this.turnText.style.width = 100;
		this.turnText.style.height = 100;
		this.turnText.style.backgroundColor = "white";
		this.turnText.innerHTML = "hi there!";
		this.turnText.style.top = 110 + 'px';
		this.turnText.style.left = 100 + 'px';
		document.body.appendChild(this.turnText);
		this.clampedVel = document.createElement('div');
		this.clampedVel.style.position = 'absolute';
		this.clampedVel.style.width = 100;
		this.clampedVel.style.height = 100;
		this.clampedVel.style.backgroundColor = "white";
		this.clampedVel.innerHTML = "hi there!";
		this.clampedVel.style.top = 130 + 'px';
		this.clampedVel.style.left = 100 + 'px';
		document.body.appendChild(this.clampedVel);
	}

	OnAccelerate() {
		if (!this.throttlePressed) {
			this.throttlePressed = true;

			this.throttle = Math.abs(this.throttle) != this.speedDrag ? this.throttle + 1 : 1;

			//If the car's x speed is not 0 and the player is applying no thrust, apply drag
			if (this.velocity.length != 0 && this.throttle == 0) {
				this.throttle += (this.speedDrag) * Math.sign(-this.velocity.x);
			}
		}
	}

	OnUnaccelerate() {
		this.throttlePressed = false;
		this.throttle -= 1;

		//If the car's speed is not 0 and the player is applying no thrust, apply drag
		if (this.velocity.length != 0 && this.throttle == 0) {
			this.throttle -= (this.speedDrag) * Math.sign(this.velocity.x);
		}

		//Make sure thrust doesn't have and absolute value greater than 1
		this.throttle = this.throttle < -1 ? -1 : this.throttle;

		//Make sure the player uses full throttle if still braking
		this.throttle = this.brakePressed && this.throttle != -1 ? -1 : this.throttle;
	}

	OnBrake() {
		if (!this.brakePressed) {
			this.brakePressed = true;

			this.throttle = Math.abs(this.throttle) != this.speedDrag ? this.throttle - 1 : -1;

			//If the car's x speed is not 0 and the player is applying no thrust, apply drag
			if (this.velocity.length != 0 && this.throttle == 0) {
				this.throttle += (this.speedDrag) * Math.sign(-this.velocity.x);
			}
		}
	}

	OnUnbrake() {
		this.brakePressed = false;
		this.throttle += 1;
		//If the car's x speed is not 0 and the player is applying no thrust, apply drag
		if (this.velocity.length != 0 && this.throttle == 0) {
			this.throttle += (this.speedDrag) * Math.sign(-this.velocity.x);
		}

		//Make sure thrust doesn't have and absolute value greater than 1
		this.throttle = this.throttle > 1 ? 1 : this.throttle;

		//Make sure the player uses full throttle if still accelerating
		this.throttle = this.brakePressed && this.throttle != 1 ? 1 : this.throttle;
	}

	OnLeft() {
		if (!this.leftPressed) {
			this.leftPressed = true;

			this.turn = Math.abs(this.turn) != this.turnDrag ? this.turn - 1 : -1;

			//If the car's x speed is not 0 and the player is applying no thrust, apply drag
			if (this.velocity.length != 0 && this.turn == 0) {
				this.turn += (this.turnDrag) * Math.sign(-this.velocity.z);
			}
		}
	}

	OnUnleft() {
		this.leftPressed = false;

		this.turn += 1;

		//If the car's speed is not 0 and the player is applying no thrust, apply drag
		if (this.velocity.length != 0 && this.turn == 0) {
			this.turn -= (this.turnDrag) * Math.sign(this.velocity.z);
		}

		//Make sure thrust doesn't have and absolute value greater than 1
		this.turn = this.turn < -1 ? -1 : this.turn;

		//Make sure the player uses turns right fully
		this.turn = this.rightPressed && this.turn != 1 ? 1 : this.turn;
	}

	OnRight() {
		if (!this.rightPressed) {
			this.rightPressed = true;

			this.turn = Math.abs(this.turn) != this.turnDrag ? this.turn + 1 : 1;

			//If the car's x speed is not 0 and the player is applying no thrust, apply drag
			if (this.velocity.length != 0 && this.turn == 0) {
				this.turn += (this.turnDrag) * Math.sign(-this.velocity.z);
			}
		}
	}

	OnUnright() {
		this.rightPressed = false;

		this.turn -= 1;

		//If the car's speed is not 0 and the player is applying no thrust, apply drag
		if (this.velocity.length != 0 && this.turn == 0) {
			this.turn -= (this.turnDrag) * Math.sign(this.velocity.z);
		}

		//Make sure thrust doesn't have and absolute value greater than 1
		this.turn = this.turn < -1 ? -1 : this.turn;

		//Make sure the player uses turns left fully
		this.turn = this.leftPressed && this.turn != -1 ? -1 : this.turn;
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