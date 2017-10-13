class Track
{
	//recieves int with number of tires and an array of vectors with the tirePostitions
	constructor(trackPath){ 

		this.tirePositions = trackPath;
		this.material;
		this.track;

	}

	//--------------------------------------------------TABLETOP CREATION START---------------------------------------

	addTabletop(){
		var geometry = new THREE.BoxGeometry(1050,550,2);
		var material = new THREE.MeshBasicMaterial({color: 0x808080, wireframe:true })
		var tabletop = new THREE.Mesh(geometry,material);
		tabletop.position.set(0,0,-1);

		this.track.add(tabletop)
	}

	//--------------------------------------------------TABLETOP CREATION END---------------------------------------

	// -----------------------------------TRACK PATH CREATION START---------------------------------------------------
	
	addTire(x,y,z){
		'use strict'

		var geometry = new THREE.TorusGeometry( 5, 0.5, 8, 50 );
		var tire = new THREE.Mesh(geometry,this.material);
		tire.position.set(x,y,z);

		this.track.add(tire);
	}


	createTrack(){
		
		var nmber = 0;
		this.addTabletop();
		
		while(nmber < this.tirePositions.length){ //adding the tires
			this.addTire(this.tirePositions[nmber][0],this.tirePositions[nmber][1],this.tirePositions[nmber][2]);
			nmber++;
		}
	}

	// -----------------------------------TRACK PATH CREATION END---------------------------------------------------


	Start(){
		this.track = new THREE.Object3D();
		this.material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, wireframe: true} );

		this.createTrack();

		scene.add(this.track);
	}

	Update(){

	}
}