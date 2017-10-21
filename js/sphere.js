class Sphere{

    constructor(center,radius){
        this.center = center;
        this.radius = radius;
    }

    updatePosition(newPosition){
        this.center = newPosition;
    }

    isColidingWithSphere(otherSphere){
        
        var distance = this.center.distanceTo(otherSphere.center);

        if(this.radius + otherSphere.radius >= distance ) return true
        else return false

    }

}