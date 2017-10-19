class Cheerio{

    constructor(x,y,z){

        this.centerX = x;
        this.centerY = y;
        this.centerZ = z;

        this.cheerioObject;
        
        this.colisionSphere = new Sphere( new THREE.Vector3(x,y,z),5);
    }

    createCheerio(){

        var material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, wireframe: true} );
        var geometry = new THREE.TorusGeometry( 5, 0.5, 8, 10);

		var cheerio = new THREE.Mesh(geometry,material);
        cheerio.position.set(this.centerX,this.centerY,this.centerZ);

        this.cheerioObject = cheerio;

        return cheerio;
    }
}