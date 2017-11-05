var rotWorldMatrix;

 var facingCamera = true;

// Rotate an object around an arbitrary axis in world space       
function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);        // pre-multiply
    object.matrix = rotWorldMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);
}

function createTriangle(geometry,topPoint,rightPoint,leftPoint,currentIndex) {

	if (facingCamera){//Regra da mao direita a comecar em cima
		geometry.vertices.push(topPoint);
		geometry.vertices.push(leftPoint);
		geometry.vertices.push(rightPoint);
	}
	else{
		geometry.vertices.push(topPoint);
		geometry.vertices.push(rightPoint);
		geometry.vertices.push(leftPoint);		
	}
	
	
	var color = new THREE.Color( 0x000000 );
	
	var face = new THREE.Face3( currentIndex, currentIndex+1,currentIndex+2, color);

	geometry.faces.push( face );

	geometry.computeFaceNormals();
	geometry.computeVertexNormals();
}

//startPoint e o ponto mais a esquerda da linha
function buildTriangleLine(geometry,triangleHeight,triangleBaseLenght,triangleNumber,startPoint,startIndex){

	var startOfNext = null
	var currentIndex = startIndex;


	for (i= 0; i< triangleNumber; i++){
		
		var leftPoint = startPoint;
		var rightPoint = new THREE.Vector3(leftPoint.x +triangleBaseLenght, leftPoint.y,leftPoint.z);
		var topPoint = new THREE.Vector3(leftPoint.x + (triangleBaseLenght/2),leftPoint.y + triangleHeight,leftPoint.z);
		
		if(startOfNext == null){
			startOfNext = topPoint;
		}

		startPoint = rightPoint;
		createTriangle(geometry,topPoint,rightPoint,leftPoint,currentIndex);
		currentIndex+=3;

	}
	return startOfNext;
}

function buildFace(geometry,triangleNumber,startPoint){
	var material = new THREE.MeshStandardMaterial( { color : 0x000000 } );
	var nextIndex = 0
	for(i = triangleNumber; i>0; i--){
		startPoint = buildTriangleLine(geometry,0.10,0.10,i,startPoint,nextIndex);
		nextIndex += 3*i;
	}
	return new THREE.Mesh( geometry, material );
}

function buildGroup(hex,yMov,xMov,zRot,zPos){

	var geometry = new THREE.Geometry();
	var startPoint = new THREE.Vector3( -0.25, -0.25, zPos);
	var object = buildFace(geometry,5,startPoint);

	object.position.y += yMov;
	object.position.x += xMov;
	object.rotation.z += zRot;
	hex.add(object);
}


function buildPlane(hex,zPos,facing){

	facingCamera = facing;

	buildGroup(hex,0,0.25,Math.PI,zPos); //face lado baixo-Direito

	buildGroup(hex,0,0,0,zPos); //Face de baixo-Center

	buildGroup(hex,0,-0.25,Math.PI,zPos); //face baixo-esquerdo

	buildGroup(hex,0.5,0,Math.PI,zPos); //face cima-Centro

	buildGroup(hex,0.5,0.25,0,zPos); //face cima-direita

	buildGroup(hex,0.5,-0.25,0,zPos); //face cima-esquerda
}

function buildHex(hex){
	
	buildPlane(hex,0,true);
	buildPlane(hex,0,false);

	buildPlane(hex,-0.10,true);
	buildPlane(hex,-0.10,false);

	
}

function build() {
				//create a triangular geometry
				var hex = new THREE.Object3D();
				buildHex(hex);
				console.log(hex.position);

				console.log(hex.position);
				hex.rotation.z += (Math.PI);
				scene.add(hex);

 }