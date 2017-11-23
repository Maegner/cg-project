class GameOver{

    constructor(){
    	this.gameOverOriginal;
    }

    createGameOver(){
    		var texture = new THREE.TextureLoader().load( "js/textures/gameover.png" );
		var geometry = new THREE.BoxGeometry(600, 200, 1/*, 20, 50*/);
		var phongMaterials = [
			new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide,transparent: true, opacity: 0, wireframe:false } ), //Right
			new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide,transparent: true, opacity: 0, wireframe:false } ), //Left
			new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide,transparent: true, opacity: 0, wireframe:false } ), //Top
			new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide,transparent: true, opacity: 0, wireframe:false } ), //Bottom
			new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide,transparent: true, wireframe:false } ), //Front
			new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide,transparent: true, opacity: 0, wireframe:false } )  //Back
		];
		gameOver = new THREE.Mesh(geometry, phongMaterials);
		gameOver.visible = false;
		this.gameOverOriginal = gameOver;
		}
