import './css/style.styl'
import * as THREE from 'three'
import donnutPlanet from './js/donnutPlanet'
import OrbitControls from './js/OrbitControls'
import FlyControls from './js/FlyControls'
require('three-fly-controls')(THREE);

// Get all the planets from the HTML in a array
const allPlanets = [...document.querySelectorAll('.planet')]

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Sizes
 */

const sizes = {}
sizes.width = window.innerWidth 
sizes.height = window.innerHeight

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 0
scene.add(camera)


const donnut = new donnutPlanet({
    textureLoader: textureLoader,
    node: allPlanets
})
scene.add(donnut.container)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
directionalLight.position.set(20,3,10);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 )
scene.add(ambientLight)

const sunLight = new THREE.DirectionalLight(0xffffff, 0.4)
sunLight.position.x = 1
sunLight.position.y = 1
sunLight.position.z = 1
sunLight.castShadow = true
sunLight.shadow.camera.top = 1.20
sunLight.shadow.camera.right = 1.20
sunLight.shadow.camera.bottom = - 1.20
sunLight.shadow.camera.left = - 1.20
scene.add(sunLight)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

// Controls 

const controls = new THREE.OrbitControls(camera);
controls.autoRotate = true
controls.autoRotateSpeed = 0.6

const flycontrols = new THREE.FlyControls(camera);

camera.position.set( 0, 0, 900 );
controls.update();
flycontrols.update()

function updateControls() {

	requestAnimationFrame( updateControls );

    controls.update();
    flycontrols.update()

	renderer.render( scene, camera );

}
updateControls()

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)
    camera.lookAt(new THREE.Vector3())
    renderer.render(scene, camera)
}
loop()


// // Hot
// if(module.hot)
// {
//     module.hot.accept()

//     module.hot.dispose(() =>
//     {
//         console.log('dispose')
//     })
// }

