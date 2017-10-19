class AABB
{
    // minPosition and maxPosition are THREE.Vector3(x,y,z) objects
    constructor(minPosition,maxPosition) {
        this.minPosition = minPosition;
        this.maxPosition = maxPosition;
    }

    //Verifies if there is a colision between 2 AABB ojects
    //there is a colision if the following conditions are true:
    Iscoliding(otherBox){
       if(this.maxPosition.x > otherBox.minPosition.x &&
       this.minPosition.x < otherBox.maxPosition.x &&
       this.maxPosition.y > otherBox.minPosition.y &&
       this.minPosition.y < otherBox.maxPosition.y &&
       this.maxPosition.z > otherBox.minPosition.z &&
       this.minPosition.z < otherBox.maxPosition.z) return true
    }

    updatePosition(minPosition,maxPosition){
        this.minPosition = minPosition;
        this.maxPosition = maxPosition;
    }
    

}