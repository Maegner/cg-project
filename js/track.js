class Track
{
	//recieves int with number of tires and an array of vectors with the tirePostitions
	constructor(positions){ 
		this.tirePositions = positions;
		this.material;
		this.track;
	}

	addTire(x,y,z){
		'use strict'

		var geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
		var tire = new THREE.Mesh(geometry,this.material);
		tire.position.set(x,y,z);

		this.track.add(tire);
	}

	createTrack(){
		console.log("in");
		console.log(this.tirePositions.length);
		
		var nmber = 0;
		while(nmber < this.tirePositions.length){
			
			console.log(this.tirePositions[nmber][0] + " "+this.tirePositions[nmber][1] + " " + this.tirePositions[nmber][2]);

			this.addTire(this.tirePositions[nmber][0],this.tirePositions[nmber][1],this.tirePositions[nmber][2]);
			nmber++;
		}
	}

	Start(){
		this.track = new THREE.Object3D();
		this.material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, wireframe: true} );

		this.defaultTrackGenerate();

		this.createTrack();

		scene.add(this.track);
	}

	Update(){

	}

	defaultTrackGenerate(){
		var z = -4;

		var result = [];
		while(z<4){

			var y = -2;

			while(y < 2){
				if((z > 3.9 || y > 1.9)){
					result.push([z,y,0]);
					result.push([-z,-y,0]);
				}
				
				y+=0.1;
			}
			z+=0.1;
		}

		this.tirePositions = result;
	}
}