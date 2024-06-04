import * as THREE from 'three';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer({
		antialias: true,
		canvas,
		alpha: true,
	  });
	renderer.setSize(704, 352);
	const fov = 75;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 50;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set(0, 3, 10);
	  
	const controls = new OrbitControls( camera, canvas );
	controls.target.set( 0, 3, 0 );
	controls.update();
	
	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 'black' );
	

	class ColorGUIHelper {
		constructor(object, prop) {
		  this.object = object;
		  this.prop = prop;
		}
		get value() {
		  return `#${this.object[this.prop].getHexString()}`;
		}
		set value(hexString) {
		  this.object[this.prop].set(hexString);
		}
	  }

	class MinMaxGUIHelper {
		constructor(obj, minProp, maxProp, minDif) {
		  this.obj = obj;
		  this.minProp = minProp;
		  this.maxProp = maxProp;
		  this.minDif = minDif;
		}
		get min() {
		  return this.obj[this.minProp];
		}
		set min(v) {
		  this.obj[this.minProp] = v;
		  this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);
		}
		get max() {
		  return this.obj[this.maxProp];
		}
		set max(v) {
		  this.obj[this.maxProp] = v;
		  this.min = this.min;  // this will call the min setter
		}
	  }

	  function updateCamera() {

		camera.updateProjectionMatrix();

	}

	
	

	

	
	{

		const planeSize = 50;

		const loader = new THREE.TextureLoader();
		const texture = loader.load( './asgn5A/cubemap/floor.webp' );
		
		const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
		const planeMat = new THREE.MeshPhongMaterial( {
			map: texture,
			side: THREE.DoubleSide,
		} );
		const mesh = new THREE.Mesh( planeGeo, planeMat );
		mesh.rotation.x = Math.PI * - .5;
		scene.add( mesh );

	}

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );

	function makeInstance( geometry, url, x, y, z ) {
		
		const loader = new THREE.TextureLoader();
		if (url === 'custom'){
			const materials = [
				new THREE.MeshBasicMaterial({map: loadColorTexture('./asgn5A/Code/red.jpg')}),
				new THREE.MeshBasicMaterial({map: loadColorTexture('./asgn5A/Code/redamongus.webp')}),
				new THREE.MeshBasicMaterial({map: loadColorTexture('./asgn5A/Code/cyan.jpg')}),
				new THREE.MeshBasicMaterial({map: loadColorTexture('./asgn5A/Code/yellow.jpg')}),
				new THREE.MeshBasicMaterial({map: loadColorTexture('./asgn5A/Code/light blue.jpg')}),
				new THREE.MeshBasicMaterial({map: loadColorTexture('./asgn5A/Code/orange.jpg')}),
			
			  ];
			  const cube = new THREE.Mesh(geometry, materials);
 
			function loadColorTexture( path ) {
				const texture = loader.load( path );
				texture.colorSpace = THREE.SRGBColorSpace;
				return texture;
			}
			scene.add( cube );
			cube.position.x = x;
			cube.position.y = y;
			cube.position.z = z;

			return cube;
		}
		else if(url ==='table'){
			const texture = loader.load(  './asgn5A/Code/table.jpg' );
			texture.colorSpace = THREE.SRGBColorSpace;
			const material = new THREE.MeshPhongMaterial( { map: texture } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );
			cube.position.x = x;
			cube.position.y = y;
			cube.position.z = z;
		}
		else if (url === 'tv'){ {
			
				const materials = [
					new THREE.MeshBasicMaterial({map: loadColorTexture('./asgn5A/Code/tvSides.jpg')}),
					new THREE.MeshBasicMaterial({map: loadColorTexture('./asgn5A/Code/tvSides.jpg')}),
					new THREE.MeshBasicMaterial({map: loadColorTexture('./asgn5A/Code/tvSides.jpg')}),
					new THREE.MeshBasicMaterial({map: loadColorTexture('./asgn5A/Code/tvSides.jpg')}),
					new THREE.MeshBasicMaterial({map: loadColorTexture('./asgn5A/Code/tvSides.jpg')}),
					new THREE.MeshBasicMaterial({map: loadColorTexture('./asgn5A/Code/tvScreen.png')}),
				
				  ];
				  const cube = new THREE.Mesh(geometry, materials);
	 
				function loadColorTexture( path ) {
				const texture = loader.load( path );
				  texture.colorSpace = THREE.SRGBColorSpace;
				  return texture;
				}
				scene.add( cube );
				cube.position.x = x;
				cube.position.y = y;
				cube.position.z = z;
	
			return cube;
		
			}
		}
		else{
			const texture = loader.load( url );
			texture.colorSpace = THREE.SRGBColorSpace;
			const material = new THREE.MeshPhongMaterial( { map: texture } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );
			cube.position.x = x;
			cube.position.y = y;
			cube.position.z = z;

		return cube;
		}
	}
	
	//ALL THE SHAPES 
	//------------------------------------------------

	const radius = .5;  

const tubeRadius = .25;  

const radialSegments = 8;  

const tubularSegments = 24;  

const torusgeometry = new THREE.TorusGeometry(
	radius, tubeRadius,
	radialSegments, tubularSegments );
	
	/*
	const donuts= [
		makeInstance (torusgeometry, '', -3,3,-1),
	];*/

	const wallGeometry = new THREE.BoxGeometry(8, 8, .4);
	const wallGeometry2 = new THREE.BoxGeometry(.4, 8, 8);

	const posterGeometry = new THREE.BoxGeometry(.3, 2, 1.3);
	const posterGeometry2 = new THREE.BoxGeometry(1.3, 2, .3);


	const tableGeometry = new THREE.BoxGeometry(2, 3, 3);
	const partyHatGeometry = new THREE.ConeGeometry( .5, 1, 10 ); 

	const tvGeometry = new THREE.BoxGeometry(.5, .5, .5);
	const tvGeometryBIG = new THREE.BoxGeometry(.8, .8, .8);
	const phoneGeometry =new THREE.BoxGeometry(.5, .3, .8 );
	//const phoneGeometry =new THREE.CylinderGeometry(.5, .5, 1, 5 );
	const rectgeometry = new THREE.BoxGeometry( 8, 1.5, 2 );
	const stageGeometry = new THREE.BoxGeometry( 21, .5, 5 );
	const animatroniclegs = new THREE.CylinderGeometry(.3, .3, 2, 10 );
	const animatronicBody = new THREE.CylinderGeometry(1, 1, 2, 10 );
	const animatronicStomach = new THREE.CylinderGeometry(.8, .8, 2, 10 );
	const chicaBib = new THREE.CylinderGeometry(.7, .7, 1, 10 );


	const animatronicHead = new THREE.CylinderGeometry(.7, .7, 1.2, 10 );
	const hatBrim = new THREE.CylinderGeometry(.8, .8, .1, 10 );
	const hatTop = new THREE.CylinderGeometry(.6, .6, .7, 10 );
	const bowLeft = new THREE.ConeGeometry(.5, .5, 3 );
	const bowMiddle = new THREE.BoxGeometry(.2, .2, .5);
	const animatronicMouth = new THREE.CylinderGeometry(.4, .4, .3, 10 );
	const chicaHair = new THREE.BoxGeometry(.2, .5,.2);
	//chicaHair.rotation.x +=5;
	const bonnieEar = new THREE.BoxGeometry( .4,4, .4 );
	
	let zOffset = 16;
	let xOffset = 5;
	let deskZOffset = -20;

	const securityRoom = [
		makeInstance( wallGeometry, './asgn5A/cubemap/walls.png', 0, 3, -25 ),
		makeInstance( wallGeometry, './asgn5A/cubemap/walls.png', 0, 3, -17 ),

		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', -4, 3, -21 ),
		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', 4, 3, -21 ),
	]

	const hallways = [
		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', 4, 3, -13 ),
		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', -4, 3, -13 ),

		makeInstance( wallGeometry, './asgn5A/cubemap/walls.png', 6, 3, -25 ),
		makeInstance( wallGeometry, './asgn5A/cubemap/walls.png', -6, 3, -25 ),

		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', 9, 3, -21 ),
		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', -9, 3, -21 ),
		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', 9, 3, -13 ),
		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', -9, 3, -13 ),
	]
	const stageWalls = [
		makeInstance( wallGeometry, './asgn5A/cubemap/walls.png', -7, 3, 25 ),
		makeInstance( wallGeometry, './asgn5A/cubemap/walls.png', 7, 3, 25 ),
		makeInstance( wallGeometry, './asgn5A/cubemap/walls.png', 0, 3, 25 ),

		makeInstance( wallGeometry, './asgn5A/cubemap/walls.png', -14, 3, 19 ),
		makeInstance( wallGeometry, './asgn5A/cubemap/walls.png', 14, 3, 19 ),

		makeInstance( wallGeometry, './asgn5A/cubemap/walls.png', -0, 3, -9 ),
		makeInstance( wallGeometry, './asgn5A/cubemap/walls.png', -13, 3, -9 ),
		makeInstance( wallGeometry, './asgn5A/cubemap/walls.png', 13, 3, -9 ),

		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', 17, 3, -5 ),
		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', 17, 3, 2 ),
		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', 17, 3, 9 ),
		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', 17, 3, 15 ),
		
		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', -17, 3, -5 ),
		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', -17, 3, 2 ),
		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', -17, 3, 9 ),
		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', -17, 3, 15 ),

		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', -11, 3, 23 ),
		makeInstance( wallGeometry2, './asgn5A/cubemap/walls.png', 11, 3, 23 ),

		makeInstance( stageGeometry, './asgn5A/Code/wood.jpg', 0, .2, 22),

	]

	const posters = [
		makeInstance(posterGeometry, './asgn5A/Code/poster1.png', -16.8,4,0),
		makeInstance(posterGeometry, './asgn5A/Code/poster2.png', -16.8,5,1),
		makeInstance(posterGeometry, './asgn5A/Code/poster3.png', -16.8,4.3,-2),
		makeInstance(posterGeometry, './asgn5A/Code/poster4.png', -16.8,4.1,5),
		makeInstance(posterGeometry, './asgn5A/Code/poster5.png', -16.8,4.8,10),
		makeInstance(posterGeometry, './asgn5A/Code/poster6.png', -16.8,4.3,8.7),

		makeInstance(posterGeometry, './asgn5A/Code/poster7.png', 16.8,5,-4),
		makeInstance(posterGeometry, './asgn5A/Code/poster8.png', 16.8,5,4.3),
		makeInstance(posterGeometry, './asgn5A/Code/poster9.png', 16.8,4.7,-1.2),
		makeInstance(posterGeometry, './asgn5A/Code/poster10.png', 16.8,4.1,13),
		makeInstance(posterGeometry, './asgn5A/Code/poster11.png', 16.8,4.4,10),
		makeInstance(posterGeometry, './asgn5A/Code/poster2.png', 16.8,4,8.12),

		makeInstance(posterGeometry2, './asgn5A/Code/poster7.png', 0,4,-8.8),
		makeInstance(posterGeometry2, './asgn5A/Code/poster3.png', -2,3.6,-8.8),
		makeInstance(posterGeometry2, './asgn5A/Code/poster6.png', 1.2,3.8,-8.8),




	]
	//make table row 
	function makeTables(xOffTable, zOffTable){
		makeInstance( partyHatGeometry, './asgn5A/Code/orange.jpg', 0 + xOffTable, 2.3, 13+zOffTable);
		xOffTable += 10;

		makeInstance( partyHatGeometry, './asgn5A/Code/yellow.jpg', 0 + xOffTable, 2.3, 13+zOffTable);
		xOffTable += 10;

		makeInstance( partyHatGeometry, './asgn5A/Code/cyan.jpg', 0 + xOffTable, 2.3, 13+zOffTable);
		xOffTable = -10;
		for(let i = 0; i < 3; i++){
			
			makeInstance( tableGeometry, 'table', 0 +xOffTable,.4,13+zOffTable);
			makeInstance( tableGeometry, 'table', -2 +xOffTable,.4,13 + zOffTable);
			makeInstance( tableGeometry, 'table', 2 + xOffTable,.4,13 + zOffTable);

			xOffTable += 10;
		}
	}

	
	makeTables(-10, 0);

	makeTables(-10, -7);
	const restOfTables = [
		makeInstance( tableGeometry, 'table', 0 ,.4, -1),
		makeInstance( tableGeometry, 'table', -2 ,.4,-1),
		makeInstance( tableGeometry, 'table', 2 ,.4, -1),

		makeInstance( tableGeometry, 'table', -10 ,.4, -3),
		makeInstance( tableGeometry, 'table', -10 ,.4, 0),
		makeInstance( tableGeometry, 'table', -10 ,.4, -3),

		makeInstance( tableGeometry, 'table', 10 ,.4, -3),
		makeInstance( tableGeometry, 'table', 10 ,.4, 0),
		makeInstance( tableGeometry, 'table', 10 ,.4, -3)
	]

	const randomPartyHats = [
		makeInstance( partyHatGeometry, './asgn5A/Code/orange.jpg', -.8, 2.3, -1.2),
		makeInstance( partyHatGeometry, './asgn5A/Code/wood.jpg', -8, 2.3, 13),
		makeInstance( partyHatGeometry, './asgn5A/Code/light blue.jpg', 9, 2.3, 12),
		makeInstance( partyHatGeometry, './asgn5A/Code/chica.jpeg', 12, 2.3, 6.8),
		makeInstance( partyHatGeometry, './asgn5A/Code/bonnielight.jpg', 8, 2.3, 6.8),
		makeInstance( partyHatGeometry, './asgn5A/Code/red.jpg', 2, 2.3, 5.4),
		makeInstance( partyHatGeometry, './asgn5A/Code/light blue.jpg', -1, 2.3, 5),
		makeInstance( partyHatGeometry, './asgn5A/Code/bonnie.jpg', -9, 2.3, 5.8),

		makeInstance( partyHatGeometry, './asgn5A/Code/bonnie.jpg', 9.5, 2.3, 0),
		makeInstance( partyHatGeometry, './asgn5A/Code/red.jpg', 9.8, 2.3, -1),

		makeInstance( partyHatGeometry, './asgn5A/Code/cyan.jpg', -9.8, 2.3, -1.2),






	]
	
	const prisms = [
		makeInstance ( rectgeometry, './asgn5A/Code/wood.jpg', 0, 1, 2+ deskZOffset ),
		makeInstance( tvGeometry, 'tv', 1, 1.7, 2 + deskZOffset),
		makeInstance( tvGeometryBIG, 'tv', -1, 1.8, 2+ deskZOffset),
		makeInstance( tvGeometry, 'tv', -.9, 2.4, 2+ deskZOffset),
		makeInstance(phoneGeometry, './asgn5A/Code/phone.jpg', .3, 1.5, 2+ deskZOffset),

	];

	const freddyFazbear =[
		makeInstance(animatroniclegs, './asgn5A/Code/fazbear.jpg', -.5, 1, 5 + zOffset ),
		makeInstance(animatroniclegs, './asgn5A/Code/fazbear.jpg', .5, 1, 5 + zOffset ),
		makeInstance(animatronicBody, './asgn5A/Code/fazbear.jpg', 0, 3, 5+ zOffset ),
		makeInstance(animatroniclegs, './asgn5A/Code/fazbear.jpg', -1.2, 3.1, 5 + zOffset ),
		makeInstance(animatroniclegs, './asgn5A/Code/fazbear.jpg', 1.2, 3.1, 5 + zOffset ),
		makeInstance(animatronicHead, './asgn5A/Code/fazbear.jpg', 0, 4.5, 5 + zOffset ),
		makeInstance(animatronicStomach, './asgn5A/Code/fazbearlight.jpg',  0, 3, 4.5+ zOffset ),
		makeInstance(animatronicMouth, './asgn5A/Code/fazbearlight.jpg',  0, 4.5, 4.5+ zOffset ),
		makeInstance(bowMiddle, '',0, 4.7, 4.4+ zOffset ),
		makeInstance(hatBrim, '', 0, 5.2, 5 + zOffset ),
		makeInstance(hatTop, '', 0, 5.6, 5 + zOffset ),
		makeInstance(bowLeft, '', .4, 4.3, 4.4 + zOffset ),
		makeInstance(bowLeft, '', -.4, 4.3, 4.4 + zOffset ),
		makeInstance(bowMiddle, '',0, 4.2, 4.4+ zOffset ),

	]


	const bonnie =[
		makeInstance(animatroniclegs, './asgn5A/Code/bonnie.jpg', -.5 + xOffset, 1, 5 + zOffset ),
		makeInstance(animatroniclegs, './asgn5A/Code/bonnie.jpg', .5 + xOffset, 1, 5 + zOffset ),
		makeInstance(animatronicBody, './asgn5A/Code/bonnie.jpg', 0+ xOffset, 3, 5+ zOffset ),
		makeInstance(animatroniclegs, './asgn5A/Code/bonnie.jpg', -1.2+ xOffset, 3.1, 5 + zOffset ),
		makeInstance(animatroniclegs, './asgn5A/Code/bonnie.jpg', 1.2+ xOffset, 3.1, 5 + zOffset ),
		makeInstance(animatronicHead, './asgn5A/Code/bonnie.jpg', 0+ xOffset, 4.5, 5 + zOffset ),
		makeInstance(animatronicStomach, './asgn5A/Code/bonnielight.jpg',  0+ xOffset, 3, 4.5+ zOffset ),
		makeInstance(animatronicMouth, './asgn5A/Code/bonnielight.jpg',  0+ xOffset, 4.5, 4.5+ zOffset ),
		makeInstance(bowMiddle, '',0+ xOffset, 4.7, 4.4+ zOffset ),
		makeInstance(bowLeft, './asgn5A/Code/red.jpg', .4+ xOffset, 4.3, 4.4 + zOffset ),
		makeInstance(bowLeft, './asgn5A/Code/red.jpg', -.4+ xOffset, 4.3, 4.4 + zOffset ),
		makeInstance(bowMiddle, './asgn5A/Code/red.jpg',0+ xOffset, 4.2, 4.4+ zOffset ),
		makeInstance(bonnieEar, './asgn5A/Code/bonnie.jpg',  .3+ xOffset, 4, 5 + zOffset),
		makeInstance(bonnieEar, './asgn5A/Code/bonnie.jpg',  -.3+ xOffset, 4, 5 + zOffset),

	]

	xOffset = -xOffset;
	const chica =[
		makeInstance(animatroniclegs, './asgn5A/Code/chica.jpeg', -.5 + xOffset, 1, 5 + zOffset ),
		makeInstance(animatroniclegs, './asgn5A/Code/chica.jpeg', .5 + xOffset, 1, 5 + zOffset ),
		makeInstance(animatronicBody, './asgn5A/Code/chica.jpeg', 0+ xOffset, 3, 5+ zOffset ),
		makeInstance(animatroniclegs, './asgn5A/Code/chica.jpeg', -1.2+ xOffset, 3.1, 5 + zOffset ),
		makeInstance(animatroniclegs, './asgn5A/Code/chica.jpeg', 1.2+ xOffset, 3.1, 5 + zOffset ),
		makeInstance(animatronicHead, './asgn5A/Code/chica.jpeg', 0+ xOffset, 4.5, 5 + zOffset ),
		makeInstance(animatronicStomach, './asgn5A/Code/chicaLight.jpg',  0+ xOffset, 3, 4.5+ zOffset ),
		makeInstance(animatronicMouth, './asgn5A/Code/orange.jpg',  0+ xOffset, 4.5, 4.5+ zOffset ),
		makeInstance(chicaHair, './asgn5A/Code/chica.jpeg',  .1+ xOffset, 5.2, 5+ zOffset ),
		makeInstance(chicaHair, './asgn5A/Code/chica.jpeg',  -.1+ xOffset, 5.1, 5+ zOffset ),
		makeInstance(chicaBib, 'table',  0+ xOffset, 3.5, 4.3+ zOffset ),



	]
	/*const cubes = [
		makeInstance( geometry, './asgn5A/Code/dirt texture.jpg', 4 , 2, -5 ),
		makeInstance( geometry, './asgn5A/Code/wood.jpg', - 4, 5, -3 ),
		makeInstance( geometry, 'custom', 2, 3, 0 ),
		
	];*/
	let root = undefined;
	{
		const mtlLoader = new MTLLoader();
		mtlLoader.load('./asgn5A/horseobj/horse.mtl', (mtl) => {
		  mtl.preload();
		  const objLoader = new OBJLoader();
		  objLoader.setMaterials(mtl);
		  objLoader.load('./asgn5A/horseobj/horse.obj', function(object){
			root = object;
		  	scene.add(root);
			root.translateZ(-5);
		  });
		});
	  }

	  function makeXYZGUI(gui, vector3, name, onChangeFn) {
		const folder = gui.addFolder(name);
		folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
		folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
		folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
		folder.open();
	  }

	  {
		const color = 0xFFFFFF;
		const skyColor = 0xCC5500;  // light blue
		const groundColor = 0xB97A20;  // brownish orange
		const intensityDIR = 1;
		const intensityAMB = .94
		const intensityPNT = 120;
		const light = new THREE.HemisphereLight(skyColor, groundColor, intensityAMB);
		const lightd = new THREE.DirectionalLight( color, intensityDIR );
		const lightp = new THREE.PointLight(color, intensityPNT);
		const helper = new THREE.PointLightHelper(lightd);
		scene.add(helper);

		lightd.position.set(-.4, 10, -7.76);
		lightd.target.position.set(-1, 0, 0);
		lightp.position.set(0, 3.2, 0);

		scene.add(lightd.target);
		scene.add(lightd);
		scene.add(light);
		scene.add(lightp);


		function updateLight() {
			helper.update();
		  }

		const gui = new GUI();
		gui.add( camera, 'fov', 1, 180 ).onChange( updateCamera );
		const minMaxGUIHelper = new MinMaxGUIHelper( camera, 'near', 'far', 0.1 );
		gui.add( minMaxGUIHelper, 'min', 0.1, 50, 0.1 ).name( 'near' ).onChange( updateCamera );
		gui.add( minMaxGUIHelper, 'max', 0.1, 50, 0.1 ).name( 'far' ).onChange( updateCamera );
		gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('skyColor');
		gui.addColor(new ColorGUIHelper(light, 'groundColor'), 'value').name('groundColor');
		gui.add(light, 'intensity', 0, 2, 0.01);

		gui.add(lightp, 'intensity', 0, 2, 0.01);
		gui.add(lightp, 'distance', 0, 40).onChange(updateLight);

		makeXYZGUI(gui, lightp.position, 'position', updateLight);
	}


	{
		const loader = new THREE.CubeTextureLoader();
		const texture = loader.load([
		  './asgn5A/cubemap/walls.png', //posx
		  './asgn5A/cubemap/walls.png', //negx
		  './asgn5A/cubemap/sky.webp', //posy
		  './asgn5A/cubemap/floor.webp', //negy
		  './asgn5A/cubemap/walls.png', //posz
		  './asgn5A/cubemap/walls.png', //negz
		]);
		scene.background = texture;
	  }

	  function resizeRendererToDisplaySize( renderer ) {

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}

	function render( time ) {

		time *= 0.001; // convert time to seconds
		if ( resizeRendererToDisplaySize( renderer ) ) {

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();

		}
		/*
		donuts.forEach( ( donut, ndx ) => {

			const speed = .5 + ndx * 2;
			const rot = time * speed;
			donut.rotation.x = rot;
			donut.rotation.y = rot;
		});
		cubes.forEach( ( cube, ndx ) => {

			const speed = 1 + ndx * .00001;
			const rot = time * speed;
			cube.rotation.x = rot;
			cube.rotation.y = rot;

		} );*/
		
	

		renderer.render( scene, camera );

		requestAnimationFrame( render );
		

	}

	requestAnimationFrame( render );

	
}

main();
