 var rotWorldMatrix;

 var facingCamera = true;


function buildRightBorder(geometry,currentIndex){
	if (facingCamera){
		geometry.vertices.push(new THREE.Vector3(0,50,0));
		geometry.vertices.push(new THREE.Vector3(50,-50,0));
		geometry.vertices.push(new THREE.Vector3(0,50,-20));

		var color = new THREE.Color( 0x000000 );
		var face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face);

		geometry.vertices.push(new THREE.Vector3(50,-50,0));
		geometry.vertices.push(new THREE.Vector3(50,-50,-20));
		geometry.vertices.push(new THREE.Vector3(0,50,-20));

		face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face);

	}

	else{
		geometry.vertices.push(new THREE.Vector3(0,50,0));
		geometry.vertices.push(new THREE.Vector3(0,50,-20));
		geometry.vertices.push(new THREE.Vector3(50,-50,0));

		var color = new THREE.Color( 0x000000 );
		var face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face);

		geometry.vertices.push(new THREE.Vector3(50,-50,0));
		geometry.vertices.push(new THREE.Vector3(0,50,-20));
		geometry.vertices.push(new THREE.Vector3(50,-50,-20));

		face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face);

	}
}

function buildLeftBorder(geometry,currentIndex){
	if(facingCamera){

		geometry.vertices.push(new THREE.Vector3(0,50,0));
		geometry.vertices.push(new THREE.Vector3(0,50,-20));
		geometry.vertices.push(new THREE.Vector3(-50,-50,0));
		
		var color = new THREE.Color( 0x000000 );
		var face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face)

		geometry.vertices.push(new THREE.Vector3(-50,-50,0));
		geometry.vertices.push(new THREE.Vector3(0,50,-20));
		geometry.vertices.push(new THREE.Vector3(-50,-50,-20));
		face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face)

	}
	else{
		geometry.vertices.push(new THREE.Vector3(0,50,0));
		geometry.vertices.push(new THREE.Vector3(-50,-50,0));
		geometry.vertices.push(new THREE.Vector3(0,50,-20));
			
		var color = new THREE.Color( 0x000000 );
		var face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face)

		geometry.vertices.push(new THREE.Vector3(-50,-50,0));
		geometry.vertices.push(new THREE.Vector3(-50,-50,-20));
		geometry.vertices.push(new THREE.Vector3(0,50,-20));
		face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face)


	}
}

function buildBottomBorders(geometry,currentIndex){


	if(facingCamera){
		
		geometry.vertices.push(new THREE.Vector3(-50,-50,0));
		geometry.vertices.push(new THREE.Vector3(-50,-50,-20));
		geometry.vertices.push(new THREE.Vector3(50,-50,-20));
		

		var color = new THREE.Color( 0x000000 );
		var face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face);

		geometry.vertices.push(new THREE.Vector3(50,-50,0));
		geometry.vertices.push(new THREE.Vector3(-50,-50,0));
		geometry.vertices.push(new THREE.Vector3(50,-50,-20));

		face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face);
	}
	else{
		geometry.vertices.push(new THREE.Vector3(-50,-50,0));
		geometry.vertices.push(new THREE.Vector3(50,-50,-20));
		geometry.vertices.push(new THREE.Vector3(-50,-50,-20));
		
		var color = new THREE.Color( 0x000000 );
		var face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face);

		
		geometry.vertices.push(new THREE.Vector3(50,-50,0));
		geometry.vertices.push(new THREE.Vector3(50,-50,-20));
		geometry.vertices.push(new THREE.Vector3(-50,-50,0));

		face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face);
	}

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

	var startOfNext = null;
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

//startPoint e o ponto mais a esquerda da linha
function buildInvertedTriangleLine(geometry,triangleHeight,triangleBaseLenght,triangleNumber,startPoint,startIndex){

	var startOfNext = null;
	var currentIndex = startIndex;


	for (i= 0; i< triangleNumber; i++){
		
		var leftPoint = startPoint;
		var rightPoint = new THREE.Vector3(leftPoint.x + (triangleBaseLenght/2),leftPoint.y - triangleHeight,leftPoint.z);
		var topPoint = new THREE.Vector3(leftPoint.x +triangleBaseLenght, leftPoint.y,leftPoint.z);

		if(startOfNext == null){
			startOfNext = new THREE.Vector3(topPoint.x-(triangleBaseLenght/2),topPoint.y + triangleHeight,topPoint.z);
		}

		startPoint = topPoint;
		createTriangle(geometry,topPoint,rightPoint,leftPoint,currentIndex);
		currentIndex+=3;

	}
	return startOfNext;
}

function buildFace(geometry,triangleNumber,startPoint){
	var material = new THREE.MeshStandardMaterial( { color : 0x000000 } );
	var nextIndex = 0
	for(i = triangleNumber; i>0; i--){
		startPoint = buildTriangleLine(geometry,20,20,i,startPoint,nextIndex);
		nextIndex += 3*i;
	}

	startPoint = new THREE.Vector3( -40, -30,startPoint.z);
	triangleNumber--;
	for(i = triangleNumber; i>0; i--){
		startPoint = buildInvertedTriangleLine(geometry,20,20,i,startPoint,nextIndex);
		nextIndex += 3*i;
	}
	
	buildBottomBorders(geometry,nextIndex);
	nextIndex += 6;
	buildRightBorder(geometry,nextIndex);
	nextIndex += 6;
	buildLeftBorder(geometry,nextIndex);
	nextIndex += 6;
	return new THREE.Mesh( geometry, material );
}

//adicionando todas a slices do hexagono 
function buildGroup(hex,yMov,xMov,zRot,zPos){

	var geometry = new THREE.Geometry();
	var startPoint = new THREE.Vector3( -50, -50, zPos);
	var object = buildFace(geometry,5,startPoint);

	object.position.y += yMov;
	object.position.x += xMov;
	object.rotation.z += zRot;
	hex.add(object);
}


function buildPlane(hex,zPos,facing){

	facingCamera = facing;

	buildGroup(hex,0,50,Math.PI,zPos); //face lado baixo-Direito

	buildGroup(hex,0,0,0,zPos); //Face de baixo-Center

	buildGroup(hex,0,-50,Math.PI,zPos); //face baixo-esquerdo

	buildGroup(hex,100,0,Math.PI,zPos); //face cima-Centro

	buildGroup(hex,100,50,0,zPos); //face cima-direita

	buildGroup(hex,100,-50,0,zPos); //face cima-esquerda
}

//Funcao que poe tudo junto
function buildHex(hex){
	
	buildPlane(hex,0,true);
	buildPlane(hex,0,false);

	buildPlane(hex,-20,true);
	buildPlane(hex,-20,false);

}

//Apenas para display
function buildHexagon() {
				//create a triangular geometry
				var hex = new THREE.Object3D();
				buildHex(hex);
				console.log(hex.position);

				console.log(hex.position);
				hex.rotation.z += (Math.PI);
				scene.add(hex);

 }