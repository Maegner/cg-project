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
		//Pixels per unit
		this.wrappingFactor = 10;
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
		var texture = new THREE.TextureLoader().load( "js/textures/mesa.jpg" );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		var repeatX = this.trackSizeX / (1024/this.wrappingFactor);
		var repeatY = this.trackSizeY / (1024/this.wrappingFactor);
		console.log(repeatX);
		console.log(repeatY);
		texture.repeat.set( repeatX, repeatY);
		
		var geometry = new THREE.BoxGeometry(this.trackSizeX, this.trackSizeY, 2, 20, 20);
		var phongMaterials = [
			new THREE.MeshPhongMaterial( {map: texture, side: THREE.DoubleSide, wireframe:true } ), //Right
			new THREE.MeshPhongMaterial( {map: texture, side: THREE.DoubleSide, wireframe:true } ), //Left
			new THREE.MeshPhongMaterial( {map: texture, side: THREE.DoubleSide, wireframe:true } ), //Top
			new THREE.MeshPhongMaterial( {map: texture, side: THREE.DoubleSide, wireframe:true } ), //Bottom
			new THREE.MeshPhongMaterial( {map: texture, side: THREE.DoubleSide, wireframe:true } ), //Front
			new THREE.MeshPhongMaterial( {map: texture, side: THREE.DoubleSide, wireframe:true } )  //Back
		];
		this.tabletop = new THREE.Mesh(geometry, phongMaterials);
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