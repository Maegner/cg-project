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
       this.minPosition.y < otherBox.maxPosition.y) return true

       else return false
    }

    IscolidingWithSphere(otherSphere){
        if(this.maxPosition.x > otherSphere.center.x - otherSphere.radius &&
        this.minPosition.x < otherSphere.center.x + otherSphere.radius &&
        this.maxPosition.y > otherSphere.center.y - otherSphere.radius &&
        this.minPosition.y < otherSphere.center.y + otherSphere.radius) return true
 
        else return false
     }

    updatePosition(minPosition,maxPosition){
        this.minPosition = minPosition;
        this.maxPosition = maxPosition;
    }
    

}