class Cheerio{

    constructor(x,y,z){

        this.centerX = x;
        this.centerY = y;
        this.centerZ = z;

        this.velocityX = 0;
        this.velocityY = 0;

        this.acelerationX = 0.1;
        this.acelerationY = 0.1;

        this.cheerioObject;
        
        this.colisionSphere = new Sphere( new THREE.Vector2(x,y),5.5);
    }

    createCheerio(){

        var material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, wireframe: true} );
        var geometry = new THREE.TorusGeometry( 5, 0.5, 8, 10);

		var cheerio = new THREE.Mesh(geometry,material);
        cheerio.position.set(this.centerX,this.centerY,this.centerZ);

        this.cheerioObject = cheerio;

        return cheerio;
    }


    calcVelocityX(delta){
        if(this.velocityX < 0){
            
            this.velocityX += this.acelerationX * delta;

            if(this.velocityX >= 0){
                this.velocityX = 0
            }
        }
        if(this.velocityX > 0){
            
            this.velocityX -= this.acelerationX * delta;

            if(this.velocityX <= 0){
                this.velocityX = 0
            }
        }
    }

    calcVelocityY(delta){
        if(this.velocityY < 0){
            
            this.velocityY += this.acelerationY * delta;

            if(this.velocityY >= 0){
                this.velocityY = 0
            }
        }
        if(this.velocityY > 0){
            
            this.velocityY -= this.acelerationY * delta;

            if(this.velocityY <= 0){
                this.velocityY = 0
            }
        }
    }

    move(delta){

        this.calcVelocityX(delta);
        this.calcVelocityY(delta);

        //UPDATE colision Sphere
        this.colisionSphere.center.x += this.velocityX;
        this.colisionSphere.center.y += this.velocityY;

        var i=0;
		while(i< track1.cheerios.length){
			if(track1.cheerios[i].colisionSphere.isColidingWithSphere(this.colisionSphere) && (this.colisionSphere.center.x != track1.cheerios[i].colisionSphere.center.x)){
				track1.cheerios[i].velocityX = this.velocityX;
                track1.cheerios[i].velocityY = this.velocityY;

                this.colisionSphere.center.x -= this.velocityX;
                this.colisionSphere.center.y -= this.velocityY;

                this.velocityX = this.velocityX * 0.2;
                this.velocityY = this.velocityY  * 0.2;

                console.log( this.colisionSphere.center.x == track1.cheerios[i].colisionSphere.center.x);


                this.colisionSphere.center.x += this.velocityX;
                this.colisionSphere.center.y += this.velocityY;
                
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