class Carro
{
	constructor() {
		//Manel
		this.geometry;
		this.material;
		this.cube;
		this.speed = 1;

		/*Goncalo*/


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
	}

	Update(delta) {

		var throttle = (this.thrust * this.acceleration) * delta;
		var velocitySign = Math.sign(this.velocity.x);
		var throttleSign = Math.sign(throttle);	
		//Check if car hasn't hit full speed, if it did, don't update velocity
		if (velocitySign == 0 || (this.velocity.x < (this.maxSpeed * velocitySign) || velocitySign == throttleSign)) {
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
}