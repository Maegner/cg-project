class Track
{
	//recieves int with number of tires and an array of vectors with the tirePostitions
	constructor(trackPath){ 

		this.cheerios = [];
		this.tirePositions = trackPath;
		this.material;
		this.track;
		this.trackSizeX = 1050;
		this.trackSizeY = 550;
		this.tabletop;
	}

	getTrackSize() {
		return new THREE.Vector3(this.trackSizeX,this.trackSizeY, 0);
	}

	getTrackPosition() {
		return this.tabletop.position;
	}

	//--------------------------------------------------TABLETOP CREATION START---------------------------------------

	addTabletop(){
		var geometry = new THREE.BoxGeometry(this.trackSizeX,this.trackSizeY,2);
		var material = new THREE.MeshPhongMaterial({color: 0x0000FF, wireframe:true })
		this.tabletop = new THREE.Mesh(geometry,material);
		this.tabletop.position.set(0,0,-1);
		this.tabletop.receiveShadow = true;
		this.track.add(this.tabletop)
		skyLight.target = this.tabletop;		
	}

	//--------------------------------------------------TABLETOP CREATION END---------------------------------------

	// -----------------------------------TRACK PATH CREATION START---------------------------------------------------

	createTrack(){

		var nmber = 0;
		this.addTabletop();
		
		while(nmber < this.tirePositions.length){ //adding the cheerios
			var newCheerio = new Cheerio(this.tirePositions[nmber][0],this.tirePositions[nmber][1],this.tirePositions[nmber][2]);
			
			this.cheerios.push(newCheerio);

			this.track.add(newCheerio.createCheerio())
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

	Update(delta){
		var i = 0;
		while (i < this.cheerios.length){
			this.cheerios[i].Update(delta);
			i++;
		}
	}
}