class Carro
{
	constructor() 	{
		//Manel
		this.geometry;
		this.material;
		this.cube;
		this.speed = 1;

		//Goncalo
		this.acceleration = 1;
	}

	Start() 	{
		this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
		this.material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, wireframe: true} );
		this.cube = new THREE.Mesh(this.geometry, this.material);
		scene.add(this.cube);
	}

	Update(delta) 	{

	}
}