class AABB
{
    // minPosition and maxPosition are THREE.Vector3(x,y,z) objects
    constructor(minPosition,maxPosition) {
        this.minPosition = minPosition;
        this.maxPosition = maxPosition;
    }

    //Verifies if there is a colision between 2 AABB ojects
    //there is a colision if the following conditions are true:
    IscolidingWithAABB(otherBox){
       if(this.maxPosition.x > otherBox.minPosition.x &&
       this.minPosition.x < otherBox.maxPosition.x &&
       this.maxPosition.y > otherBox.minPosition.y &&
       this.minPosition.y < otherBox.maxPosition.y &&
       this.maxPosition.z > otherBox.minPosition.z &&
       this.minPosition.z < otherBox.maxPosition.z) return true

       else return false
    }

    IscolidingWithSphere(otherSphere){
        if(this.maxPosition.x > otherBox.center.x - otherBox.radius &&
        this.minPosition.x < otherBox.center.x + otherBox.radius &&
        this.maxPosition.y > otherBox.center.y - otherBox.radius &&
        this.minPosition.y < otherBox.center.y + otherBox.radius &&
        this.maxPosition.z > otherBox.center.z - otherBox.radius&&
        this.minPosition.z < otherBox.center.z + otherBox.radius) return true
 
        else return false
     }

    updatePosition(minPosition,maxPosition){
        this.minPosition = minPosition;
        this.maxPosition = maxPosition;
    }
    

}