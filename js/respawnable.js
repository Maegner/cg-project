class Respawnable {
    constructor() {
        //Used to check whether the orange went out of bounds
		this.maxBounds = new THREE.Vector3(1000, 1000, 1000);
        this.minBounds = new THREE.Vector3(-1000, -1000, -1000);

        this.outOfBounds = false;
        this.comparable;
        this.objectSize = 0;
    }

    Start() {
        //Fetch track bounds
		var tempBounds = track1.getTrackSize();
		var tempPos = track1.getTrackPosition();
		this.maxBounds.x = tempBounds.x/2 + tempPos.x ;
		this.minBounds.x = -tempBounds.x/2 + tempPos.x;
		this.maxBounds.y = tempBounds.y/2 + tempPos.y;
		this.minBounds.y = -tempBounds.y/2 + tempPos.y;
    }

    CheckIfOutsideTrack() {
		var outside = true;
		if (this.comparable.position.x < this.maxBounds.x - this.objectSize && this.comparable.position.x > this.minBounds.x + this.objectSize && 
			this.comparable.position.y < this.maxBounds.y - this.objectSize && this.comparable.position.y > this.minBounds.y + this.objectSize) {
			outside = false;
		}
		return outside;
    }

    Update(delta) {
        //If object is out of bounds
        if (this.CheckIfOutsideTrack()) {
            this.Respawn();
        }
    }
    
    Respawn() {
        
    }
}