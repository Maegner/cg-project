class Track
{
	//recieves int with number of tires and an array of vectors with the tirePostitions
	constructor(outLine,trackPath,butterPositions,orangePositions){ 

		this.tirePositions = trackPath;
		this.material;
		this.track;
		this.outLine = outLine;
	}

	// -----------------------------------TRACK PATH CREATION START---------------------------------------------------
	
	addTire(x,y,z){
		'use strict'

		var geometry = new THREE.TorusGeometry( 0.1, 0.01, 13, 50 );
		var tire = new THREE.Mesh(geometry,this.material);
		tire.position.set(x,y,z);

		this.track.add(tire);
	}

	createTrack(){
		
		var nmber = 0;
		while(nmber < this.tirePositions.length){

			this.addTire(this.tirePositions[nmber][0],this.tirePositions[nmber][1],this.tirePositions[nmber][2]);
			nmber++;
		}
	}

	// -----------------------------------TRACK PATH CREATION END---------------------------------------------------


	// -----------------------------------TRACK OUTLINE CREATION START----------------------------------------------
	addOutlineCube(x,y,z){
		'use strict'

		var geometry = new THREE.BoxGeometry(0.1,0.1,0.1);
		var cube = new THREE.Mesh(geometry,this.material);
		cube.position.set(x,y,z);

		this.track.add(cube)
	}

	createOutline(){
		var n = 0;

		while(n < this.outLine.length){
			this.addOutlineCube(this.outLine[n][0],this.outLine[n][1],this.outLine[n][2]);
			n++;
		}
	}

	// -----------------------------------TRACK OUTLINE CREATION END----------------------------------------------

	Start(){
		this.track = new THREE.Object3D();
		this.material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, wireframe: true} );

		this.defaultTrackGenerate();

		//this.tirePositions = [[0,0,0]];

		this.createOutline();

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

		this.outLine = result;
	}
}