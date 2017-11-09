
function buildUnitSquare(topLeftCorner,sideLenght,color,shininess){


	var geometry = new THREE.Geometry();

	geometry.vertices.push(topLeftCorner);
	geometry.vertices.push(new THREE.Vector3(topLeftCorner.x,topLeftCorner.y-sideLenght,topLeftCorner.z));
	geometry.vertices.push(new THREE.Vector3(topLeftCorner.x + sideLenght ,topLeftCorner.y-sideLenght,topLeftCorner.z));

	var face = new THREE.Face3(0,1,2);
	geometry.faces.push( face );

	geometry.vertices.push(topLeftCorner);
	geometry.vertices.push(new THREE.Vector3(topLeftCorner.x + sideLenght ,topLeftCorner.y-sideLenght,topLeftCorner.z));
	geometry.vertices.push(new THREE.Vector3(topLeftCorner.x,topLeftCorner.y-sideLenght,topLeftCorner.z));

	face = new THREE.Face3(3,4,5);
	geometry.faces.push( face );


	geometry.vertices.push(new THREE.Vector3(topLeftCorner.x + sideLenght,topLeftCorner.y,topLeftCorner.z));
	geometry.vertices.push(topLeftCorner);
	geometry.vertices.push(new THREE.Vector3(topLeftCorner.x + sideLenght,topLeftCorner.y - sideLenght ,topLeftCorner.z));

	face = new THREE.Face3(6,7,8);
	geometry.faces.push( face );

	geometry.vertices.push(new THREE.Vector3(topLeftCorner.x + sideLenght,topLeftCorner.y,topLeftCorner.z));
	geometry.vertices.push(new THREE.Vector3(topLeftCorner.x + sideLenght,topLeftCorner.y - sideLenght ,topLeftCorner.z));
	geometry.vertices.push(topLeftCorner);

	face = new THREE.Face3(9,10,11);
	geometry.faces.push( face );

	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	return new THREE.Mesh( geometry,new THREE.MeshPhongMaterial( {color: color, wireframe: true,shininess: shininess,}));;
}

function buildUnitCube(topLeftCorner,sideLenght,color,shininess){

	var cube = new THREE.Object3D();

	frontFace = buildUnitSquare(topLeftCorner,sideLenght,color,shininess);
	cube.add(frontFace);

	backFace = buildUnitSquare(topLeftCorner,sideLenght,color,shininess);
	backFace.position.z -= sideLenght;
	cube.add(backFace);

	leftSideFace = buildUnitSquare(topLeftCorner,sideLenght,color,shininess);
	leftSideFace.rotation.y += (Math.PI/2);
	cube.add(leftSideFace);

	rightSideFace = buildUnitSquare(topLeftCorner,sideLenght,color,shininess);
	rightSideFace.rotation.y += (Math.PI/2);
	rightSideFace.position.x += sideLenght;
	cube.add(rightSideFace);

	topFace = buildUnitSquare(topLeftCorner,sideLenght,color,shininess);
	topFace.rotation.x += (Math.PI/2);
	cube.add(topFace);

	bottomFace = buildUnitSquare(topLeftCorner,sideLenght,color,shininess);
	bottomFace.rotation.x += (Math.PI/2);
	bottomFace.position.y -= sideLenght;
	cube.add(bottomFace);

	return cube;

}
//lenght of big object should be N*UnitCubeLenght
function buildBigPoligon(lenght,height,depth,sideLenght,color,shininess){

	var poligon = new THREE.Object3D();
	var currentPoint = new THREE.Vector3(0,0,0);

	var currentLenght = 0;
	var currentHeight = 0;
	var currentDepth = 0;


	while (currentLenght < lenght){
		currentHeight = 0;
		while(currentHeight < height){
			currentDepth = 0;
			while(currentDepth < depth){
				cube = buildUnitCube(currentPoint,sideLenght,color,shininess);
				
				cube.position.z -= currentDepth;
				cube.position.x += currentLenght;
				cube.position.y -= currentHeight;
				poligon.add(cube);
				currentDepth += sideLenght;
			}
			currentHeight += sideLenght;
		}
		currentLenght += sideLenght
	}
	return poligon;
}

function buildPyramid(lenght,height,minSquareLenght,color,shininess,degree){

	var poligon = new THREE.Object3D();
	var currentPoint = new THREE.Vector3(0,0,0);

	var currentHeight = 0;
	var currentLenght = 0;
	var currentDepth = 0;

	var currentLevel = 0;

	while(currentHeight < height){
		currentLenght = (degree*currentLevel*minSquareLenght);
		while(currentLenght < lenght - (degree*currentLevel*minSquareLenght)){
			currentDepth = (degree*currentLevel*minSquareLenght);
			while(currentDepth < lenght - (degree*currentLevel*minSquareLenght)){

				cube = buildUnitCube(currentPoint,minSquareLenght,color,shininess);
				cube.position.z += currentDepth;
				cube.position.x += currentLenght;
				cube.position.y += currentHeight;
				poligon.add(cube);
				currentDepth += minSquareLenght;

			}
			currentLenght += minSquareLenght;
		}
		currentHeight += minSquareLenght;
		currentLevel += 1;
	}
	return poligon;
}

function build(){

	var thing = buildPyramid(100,100,10,0xFFFFFF,30,1);
	var thing2 = buildPyramid(200,200,10,0xFFFFFF,30,1);

	scene.add(thing);
	scene.add(thing2);

}