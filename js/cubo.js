class Cubo
{
	constructor() 	{
		//Declarar variáveis aqui (porque é assim que o JS funciona...)
		this.geometry;
		this.material;
		this.cube;
		this.speed = 1;
	}

	Start() 	{
		this.geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
		this.material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, wireframe: true} );
		this.cube = new THREE.Mesh(this.geometry, this.material);
		scene.add(this.cube);
	}

	moveTo(x,y,z){

		this.cube.translateX(x);
		this.cube.translateY(y);
		this.cube.translateZ(z);
	
	}

	Update(delta) 	{
		
	}
}