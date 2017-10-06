class Track
{
	//recieves int with number of tires and an array of vectors with the tirePostitions
	constructor(outLine,trackPath,butterPositions,orangePositions){ 

		this.tirePositions = trackPath;
		this.orangePositions = orangePositions;
		this.butterPositions = butterPositions;
		this.material;
		this.track;
		this.outLine = outLine;

	}

	//--------------------------------------------------TABLETOP CREATION START---------------------------------------

	addTabletop(){
		var geometry = new THREE.BoxGeometry(window.innerWidth,window.innerHeight,2);
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


		nmber = 0;

		while(nmber < this.orangePositions.length){//adding the oranges
			this.addOrange(this.orangePositions[nmber][0],this.orangePositions[nmber][1],this.orangePositions[nmber][2]);
			nmber++;
		}

		nmber = 0;

		while(nmber < this.butterPositions.length){//adding the butter
			this.addButter(this.butterPositions[nmber][0],this.butterPositions[nmber][1],this.butterPositions[nmber][2]);
			nmber++;
		}
	}

	// -----------------------------------TRACK PATH CREATION END---------------------------------------------------

	//------------------------------------ORANGE CREATION AND POSITIONING START--------------------------------------

	addOrange(x,y,z){
		var geometry = new THREE.SphereGeometry(50,32,32);
		var material = new THREE.MeshBasicMaterial({color: 0xFFA500, wireframe: true});
		var orage = new THREE.Mesh(geometry,material);
		orage.position.set(x,y,z);

		this.track.add(orage);
	}

	//----------------------------------ORANGE CREATION AND POSITIONING END-----------------------------------------


	//----------------------------------BUTTER CREATION AND POSITIONING START---------------------------------------

	addButter(x,y,z){
		var CompleteButter = new THREE.Object3D();

		var plateGeometry = new THREE.BoxGeometry(120,50,3);
		var plateMaterial = new THREE.MeshBasicMaterial({color:0xFFFFFF,wireframe: true});
		var plate = new THREE.Mesh(plateGeometry,plateMaterial);
		plate.position.set(0,0,0);

		var butterGeometry = new THREE.BoxGeometry(100,30,20);
		var butterMaterial = new THREE.MeshBasicMaterial({color:0xFFA500,wireframe:true});
		var butter = new THREE.Mesh(butterGeometry,butterGeometry);
		butter.position.set(0,0,5);

		CompleteButter.add(plate);
		CompleteButter.add(butter);
		CompleteButter.position.set(x,y,z);

		this.track.add(CompleteButter);
	}

	//---------------------------------BUTTER CREATION AND POSITIONING END----------------------------------------------

	Start(){
		this.track = new THREE.Object3D();
		this.material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, wireframe: true} );

		this.createTrack();
		this.addButter();

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