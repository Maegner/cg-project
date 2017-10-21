class Cheerio{

    constructor(x,y,z){

        this.centerX = x;
        this.centerY = y;
        this.centerZ = z;

        this.velocityX = 0;
        this.velocityY = 0;

        this.acelerationX = 5;
        this.acelerationY = 5;

        this.cheerioObject;
        
        this.colisionSphere = new Sphere( new THREE.Vector2(x,y),5);
    }

    createCheerio(){

        var material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, wireframe: true} );
        var geometry = new THREE.TorusGeometry( 5, 0.5, 8, 10);

		var cheerio = new THREE.Mesh(geometry,material);
        cheerio.position.set(this.centerX,this.centerY,this.centerZ);

        this.cheerioObject = cheerio;

        return cheerio;
    }

    move(delta){

        //UPDATE colision Sphere
        this.colisionSphere.center.x += this.velocityX;
        this.colisionSphere.center.y += this.velocityY;

        var i=0;
		while(i< track1.cheerios.length){
			if(track1.cheerios[i].colisionSphere.isColidingWithSphere(this.colisionSphere)){
				track1.cheerios[i].velocityX = this.velocityX;
				track1.cheerios[i].velocityY = this.velocityY;
			}	
			i++;
		}

        //UPDATE cheerio Position
        this.cheerioObject.position.x += this.velocityX;
        this.cheerioObject.position.y += this.velocityY;

    }

    Update(delta){
        this.move(delta);
    }
}