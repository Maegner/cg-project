var rotWorldMatrix;

 var facingCamera = true;



/*Esta funcao constroi as laterais do hexagono, simplesmente liga os pontos das duas faces criando 2 triangulos que juntos
fazem a lateral que e um rectagulo*/ 
function buildRightBorder(geometry,currentIndex){
	if (facingCamera){/*Serve para construir face que pode ser vista de fora*/
		geometry.vertices.push(new THREE.Vector3(0,0.25,0));//PONTO A
		geometry.vertices.push(new THREE.Vector3(0.25,-0.25,0));// PONTO B
		geometry.vertices.push(new THREE.Vector3(0,0.25,-0.10));// PONTO C

		var color = new THREE.Color( 0x0000000 );
		var face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);//Constroi um triangulo
		currentIndex += 3;                                                           // com os ultimos 3 vertices pushed
		geometry.faces.push(face);

		geometry.vertices.push(new THREE.Vector3(0.25,-0.25,0));
		geometry.vertices.push(new THREE.Vector3(0.25,-0.25,-0.10));
		geometry.vertices.push(new THREE.Vector3(0,0.25,-0.10));

		face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);//Constroi um triangulo
		currentIndex += 3;                                                      // com os ultimos 3 vertices pushed
		geometry.faces.push(face);

	}

	else{/*Serve para construir face que pode ser vista de dentro*/
		geometry.vertices.push(new THREE.Vector3(0,0.25,0));
		geometry.vertices.push(new THREE.Vector3(0,0.25,-0.10)); //A DIFERENCA ESTA NA ORDEM
		geometry.vertices.push(new THREE.Vector3(0.25,-0.25,0)); // DESTAS DUAS LINHAS QUE ESTAO TROCADAS

		var color = new THREE.Color( 0x000000 );
		var face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face);

		geometry.vertices.push(new THREE.Vector3(0.25,-0.25,0));
		geometry.vertices.push(new THREE.Vector3(0,0.25,-0.10));
		geometry.vertices.push(new THREE.Vector3(0.25,-0.25,-0.10));

		face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face);

	}
}


/*Esta funcao constroi as laterais do hexagono, simplesmente liga os pontos das duas faces criando 2 triangulos que juntos
fazem a lateral que e um rectagulo*/ 
function buildLeftBorder(geometry,currentIndex){
	if(facingCamera){/*Serve para construir face que pode ser vista de fora*/

		geometry.vertices.push(new THREE.Vector3(0,0.25,0));//PONTO A
		geometry.vertices.push(new THREE.Vector3(0,0.25,-0.10));// PONTO B
		geometry.vertices.push(new THREE.Vector3(-0.25,-0.25,0));// PONTO C
		
		var color = new THREE.Color( 0x000000 );
		var face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face)

		geometry.vertices.push(new THREE.Vector3(-0.25,-0.25,0));
		geometry.vertices.push(new THREE.Vector3(0,0.25,-0.10));
		geometry.vertices.push(new THREE.Vector3(-0.25,-0.25,-0.10));
		face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face)

	}
	else{/*Serve para construir face que pode ser vista de dentro*/
		geometry.vertices.push(new THREE.Vector3(0,0.25,0));//PONTO A
		geometry.vertices.push(new THREE.Vector3(-0.25,-0.25,0));// PONTO C  A DIFERENCA ESTA NA ORDEM
		geometry.vertices.push(new THREE.Vector3(0,0.25,-0.10));// PONTO B   DESTAS DUAS LINHAS QUE ESTAO TROCADAS
			
		var color = new THREE.Color( 0x000000 );
		var face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face)

		geometry.vertices.push(new THREE.Vector3(-0.25,-0.25,0));
		geometry.vertices.push(new THREE.Vector3(-0.25,-0.25,-0.10));
		geometry.vertices.push(new THREE.Vector3(0,0.25,-0.10));
		face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face)


	}
}


//O mesmo que nas anteriores mas para a face de baixo do triangulo
function buildBottomBorders(geometry,currentIndex){


	if(facingCamera){
		
		geometry.vertices.push(new THREE.Vector3(-0.25,-0.25,0));
		geometry.vertices.push(new THREE.Vector3(-0.25,-0.25,-0.10));
		geometry.vertices.push(new THREE.Vector3(0.25,-0.25,-0.10));
		

		var color = new THREE.Color( 0x000000 );
		var face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face);

		geometry.vertices.push(new THREE.Vector3(0.25,-0.25,0));
		geometry.vertices.push(new THREE.Vector3(-0.25,-0.25,0));
		geometry.vertices.push(new THREE.Vector3(0.25,-0.25,-0.10));

		face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face);
	}
	else{
		geometry.vertices.push(new THREE.Vector3(-0.25,-0.25,0));
		geometry.vertices.push(new THREE.Vector3(0.25,-0.25,-0.10));
		geometry.vertices.push(new THREE.Vector3(-0.25,-0.25,-0.10));
		
		var color = new THREE.Color( 0x000000 );
		var face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face);

		
		geometry.vertices.push(new THREE.Vector3(0.25,-0.25,0));
		geometry.vertices.push(new THREE.Vector3(0.25,-0.25,-0.10));
		geometry.vertices.push(new THREE.Vector3(-0.25,-0.25,0));

		face = new THREE.Face3(currentIndex,currentIndex+1,currentIndex+2,color);
		currentIndex += 3;
		geometry.faces.push(face);
	}

}

//Cria triangulo usando os pontos dados, a ordem dos pontos depende da direcao para qual queremos a normal da face
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

//Constroi simplesmente uma linha de n triagulos seguidos uns aos outros para depois constituir os grandes triangulos do hexagono
//Tipo dentes de serra
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


//Cria linha de triangulos invertida para preencher as lacunas das linhas de triangulos()
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

//Controi um dos grandes 6 triangulos do hexagono tipo fatia de pizza
function buildFace(geometry,triangleNumber,startPoint){
	var material = new THREE.MeshStandardMaterial( { color : 0x000000 ,wireframe: true } );
	var nextIndex = 0
	for(i = triangleNumber; i>0; i--){
		startPoint = buildTriangleLine(geometry,0.10,0.10,i,startPoint,nextIndex);
		nextIndex += 3*i;
	}

	startPoint = new THREE.Vector3( -40, -30,startPoint.z);
	triangleNumber--;
	for(i = triangleNumber; i>0; i--){
		startPoint = buildInvertedTriangleLine(geometry,0.10,0.10,i,startPoint,nextIndex);
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

//Poe cada fatia no sitio certo e com a rotacao certa pois todas as fatias sao criadas no (0,0,0)
function buildGroup(hex,yMov,xMov,zRot,zPos){

	var geometry = new THREE.Geometry();
	var startPoint = new THREE.Vector3( -0.25, -0.25, zPos);
	var object = buildFace(geometry,5,startPoint);

	object.position.y += yMov;
	object.position.x += xMov;
	object.rotation.z += zRot;
	hex.add(object);
}


//Cria todas as fatias e agrupa-as no mesmo objecto
function buildPlane(hex,zPos,facing){

	facingCamera = facing;

	buildGroup(hex,0,0.25,Math.PI,zPos); //face lado baixo-Direito

	buildGroup(hex,0,0,0,zPos); //Face de baixo-Center

	buildGroup(hex,0,-0.25,Math.PI,zPos); //face baixo-esquerdo

	buildGroup(hex,0.5,0,Math.PI,zPos); //face cima-Centro

	buildGroup(hex,0.5,0.25,0,zPos); //face cima-direita

	buildGroup(hex,0.5,-0.25,0,zPos); //face cima-esquerda
}

//Funcao que poe tudo junto de modo a que seja tudo visivel independentemente de onde se olha para o hexagono
//dai ter uma funcao para z = 0 com o facing true e outra com facing a false pois tem a normal a apontar para outro lado
function buildHex(hex){
	
	buildPlane(hex,0,true);
	buildPlane(hex,0,false);

	buildPlane(hex,-0.10,true);
	buildPlane(hex,-0.10,false);

}
