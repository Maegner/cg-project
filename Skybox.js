class Skybox
{
	constructor() 	{
		//Declarar variáveis aqui (porque é assim que o JS funciona...)
		this.geometry;
		this.skyboxMaterials;
		this.material;
		this.skybox;
	}

	Start() 	{
		this.geometry = new THREE.BoxGeometry( 500, 500, 500 );
		this.skyboxMaterials = 
		[	
			new THREE.MeshBasicMaterial( {map: new THREE.TGALoader().load("Texturas/envmap_violentdays/violentdays_ft.tga"), side: THREE.DoubleSide} ),
			new THREE.MeshBasicMaterial( {map: new THREE.TGALoader().load("Texturas/envmap_violentdays/violentdays_bk.tga"), side: THREE.DoubleSide} ),
			new THREE.MeshBasicMaterial( {map: new THREE.TGALoader().load("Texturas/envmap_violentdays/violentdays_up.tga"), side: THREE.DoubleSide} ),
			new THREE.MeshBasicMaterial( {map: new THREE.TGALoader().load("Texturas/envmap_violentdays/violentdays_dn.tga"), side: THREE.DoubleSide} ),
			new THREE.MeshBasicMaterial( {map: new THREE.TGALoader().load("Texturas/envmap_violentdays/violentdays_rt.tga"), side: THREE.DoubleSide} ),
			new THREE.MeshBasicMaterial( {map: new THREE.TGALoader().load("Texturas/envmap_violentdays/violentdays_lf.tga"), side: THREE.DoubleSide} )
		];
		this.material = new THREE.MeshFaceMaterial(this.skyboxMaterials);
		this.skybox = new THREE.Mesh(this.geometry, this.material);
		scene.add(this.skybox);
	}

	Update(delta) 	{
		this.skybox.rotation.y += 500 * delta;
		this.skybox.rotation.z += 10 * delta;
	}
}