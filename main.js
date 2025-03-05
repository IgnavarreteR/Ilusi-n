import * as THREE from 'three';
			import { PeppersGhostEffect } from 'three/addons/effects/PeppersGhostEffect.js';
            import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

			    let container;

			    let camera, scene, renderer, effect;
            //Contenedor
				container = document.createElement( 'div' );

				document.body.appendChild( container )
            //Renderizado

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setAnimationLoop( animate );
				container.appendChild( renderer.domElement );

            //Crear Efecto de PaperGhost
				effect = new PeppersGhostEffect( renderer );
				effect.setSize( window.innerWidth, window.innerHeight );
				effect.cameraDistance = 15;

				window.addEventListener( 'resize', onWindowResize );

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 150000 );

				scene = new THREE.Scene();

				const hemiLight = new THREE.HemisphereLight( 0xEAEAAF, 0xEBD5B0, 2 );
				hemiLight.color.setHSL( 10, 10, 10 );
				hemiLight.position.set( 0, 0, 0 );
				scene.add( hemiLight );

const geometry = new THREE.BoxGeometry(5,5,5);
const cmaterial = new THREE.MeshBasicMaterial(0x7700ff);
const cube = new THREE.Mesh(geometry,cmaterial);
scene.add(cube);       

const fbxLoader = new FBXLoader()
fbxLoader.load(

    'aqui colocan su.fbx',
    (object) => {
        object.scale.set(1000, 1000, 1000);
        object.position.set(0,0,0);
        scene.add(object);

    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error);
    }

)

			//Ajustes de Pantalla

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				effect.setSize( window.innerWidth, window.innerHeight );

			}

            // Animaciones
			function animate() {

cube.rotation.y += 0.1;
cube.rotation.x += 0.1;
			effect.render( scene, camera );

			}