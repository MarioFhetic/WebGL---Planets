import * as THREE from 'three'

// PRIMARY TEXTURE

import sunTexture from '../images/textures/planet/globe/sunnew2.jpg'
import earthTexture from '../images/textures/planet/globe/diffuse.jpg'
import cloudsAlphaSource from '../images/textures/planet/clouds/alpha.jpg'
import moonTexturetwo from '../images/textures/planet/globe/8k_mercury.jpg'
import marsTexture from '../images/textures/planet/globe/8k_mars.jpg'
import textureSaturne from '../images/textures/planet/globe/8k_saturn.jpg'
import texturePluton from '../images/textures/planet/globe/texturepluton.jpg'
import ringOfSaturne from '../images/textures/planet/globe/ringofsaturne.png'


// SECONDARY TEXTURE

import bumpMap from '../images/textures/planet/globe/bumpmap.jpg'
import bumptexture3 from '../images/textures/planet/globe/bumptexture3.jpg'
import bumptexture5 from '../images/textures/planet/globe/bumptexture5.jpg'
import bumptexture7 from '../images/textures/planet/globe/bumptexture7.jpg'
import specMap from '../images/textures/planet/globe/specular.jpg'

// OBJECT 3D

import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'

import astronauteSource from '../images/model3/model.obj'
import textureAstronauteSource from '../images/model3/materials.mtl'



export default class donnutPlanet
{
    constructor(_options)
    {
        this.container = new THREE.Object3D()

        this.textureLoader = _options.textureLoader
        this.planets = _options.node // Our planets from the HTML
        this.currentPlanet 


        this.setStars()
        this.setSun()
        this.setEarth()
        this.setClouds()
        this.setMars()
        this.setSaturne()
        this.setMoon()
        this.setPluton()

        this.setAnimation()
        this.event()    
        
        this.setAstronaute()


        this.container.remove(this.sun.mesh, this.earth.mesh, this.saturne.mesh, this.pluton.mesh, this.clouds.mesh, this.moon.mesh, this.mars.mesh, this.ringOfSaturne.mesh)
        // I must first remove all my planets for my function event to work
    }

    setStars()
    {
       this.stars = {}
       this.stars.geometry = new THREE.SphereGeometry(1000, 100, 50);
       this.stars.material = new THREE.PointCloudMaterial({
        size: 0.5,
        transparency: true, 
        opacity: 0.7
       })

       for (let i = 0; i < 40000; i++) { 

        let starsVector = new THREE.Vector3();
        starsVector.x = Math.random() * 2000 - 1000;
        starsVector.y = Math.random() * 2000 - 1000;
        starsVector.z = Math.random() * 2000 - 1000;

        this.stars.geometry.vertices.push(starsVector);

        }

        this.stars.mesh = new THREE.PointCloud(this.stars.geometry, this.stars.material)
        this.stars.mesh.position.z = 300
        this.container.add(this.stars.mesh)
    }

    setSun()
    {
        this.sun = {}
        this.sun.geometry = new THREE.SphereBufferGeometry( 400, 32, 32 );
        this.sun.material = new THREE.MeshStandardMaterial({
            map: this.textureLoader.load(sunTexture),
            roughness: this.textureLoader.load(bumptexture7)
        })  
        this.sun.mesh = new THREE.Mesh(this.sun.geometry, this.sun.material)
        this.sun.mesh.position.z = 0
        this.sun.mesh.position.x = 0
        this.container.add(this.sun.mesh)
    }

    setEarth()
    {
        this.earth = {}
        this.earth.geometry = new THREE.SphereBufferGeometry( 400, 32, 32 );
        this.earth.material = new THREE.MeshStandardMaterial({
            map: this.textureLoader.load(earthTexture),
            metalnessMap: this.textureLoader.load(bumpMap),
            roughnessMap: this.textureLoader.load(specMap)
        })  
        this.earth.mesh = new THREE.Mesh(this.earth.geometry, this.earth.material)
        this.earth.mesh.position.z = 0
        this.earth.mesh.position.x = 0
        this.container.add(this.earth.mesh)
    }


    setClouds() 
    {
        this.clouds = {}
        this.clouds.geometry = new THREE.SphereBufferGeometry(401, 45, 45)
        this.clouds.material = new THREE.MeshStandardMaterial({
            alphaMap: this.textureLoader.load(cloudsAlphaSource),
            transparent: true,
            opacity: 0.7
        })
        this.clouds.mesh = new THREE.Mesh(this.clouds.geometry, this.clouds.material)
        this.clouds.mesh.position.z = 0
        this.clouds.mesh.position.x = 0
        this.container.add(this.clouds.mesh)
    }

    setMars()
    {
        this.mars = {}
        this.mars.geometry = new THREE.SphereBufferGeometry( 400, 32, 32 );
        this.mars.material = new THREE.MeshStandardMaterial({
            map: this.textureLoader.load(marsTexture),
            roughness: this.textureLoader.load(bumptexture3),
            roughness: this.textureLoader.load(bumpMap)
        })  
        this.mars.mesh = new THREE.Mesh(this.mars.geometry, this.mars.material)
        this.mars.mesh.position.z = 0
        // this.mars.mesh.position.x = 50
        this.mars.mesh.rotation.x = 0
        this.container.add(this.mars.mesh)
    }

    setSaturne()
    {
        let radius = 300

        this.saturne = {}
        this.saturne.geometry = new THREE.SphereGeometry(radius, 32, 32)
        this.saturne.material = new THREE.MeshStandardMaterial({
            map: this.textureLoader.load(textureSaturne),
            roughness: this.textureLoader.load(bumptexture3),
            roughness: this.textureLoader.load(bumpMap)
        })

        this.saturne.mesh = new THREE.Mesh(this.saturne.geometry, this.saturne.material)
        this.saturne.mesh.position.z = - 10
        this.container.add(this.saturne.mesh)


        
        this.ringOfSaturne = {}
        this.ringOfSaturne.geometry = new THREE.RingGeometry(1.2 * radius, 2 * radius, 2* 32, radius, 0, Math.PI * 2)
        this.ringOfSaturne.material = new THREE.MeshStandardMaterial({
            map: this.textureLoader.load(ringOfSaturne),
            roughnessMap: this.textureLoader.load(bumpMap),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.9
        })

        this.ringOfSaturne.mesh = new THREE.Mesh(this.ringOfSaturne.geometry, this.ringOfSaturne.material)
        this.ringOfSaturne.mesh.rotation.x = 30
        this.ringOfSaturne.mesh.position.z = - 10
        this.container.add(this.ringOfSaturne.mesh)

    }

    setMoon()
    {
        this.moon = {}
        this.moon.geometry = new THREE.SphereBufferGeometry( 400, 32, 32 );
        this.moon.material = new THREE.MeshStandardMaterial({
            map: this.textureLoader.load(moonTexturetwo),
            normalMap: this.textureLoader.load(bumptexture7)
        })  
        this.moon.mesh = new THREE.Mesh(this.moon.geometry, this.moon.material)
        this.moon.mesh.position.z = 0
        this.moon.mesh.position.x = 0

        this.container.add(this.moon.mesh)
    }


    setPluton(){
        this.pluton = {}
        this.pluton.geometry = new THREE.SphereBufferGeometry( 400, 32, 32 );
        this.pluton.material = new THREE.MeshStandardMaterial({
            map: this.textureLoader.load(texturePluton),
            normalMap: this.textureLoader.load(bumptexture5)
        })  
        this.pluton.mesh = new THREE.Mesh(this.pluton.geometry, this.pluton.material)
        this.pluton.mesh.position.z = 0
        // this.moon.mesh.position.x = 50
        this.container.add(this.pluton.mesh)
    }

    event()
    {
        for (let i = 0; i < this.planets.length; i++)
        {
            this.planets[i].addEventListener('click', () => {
                const nextPlanet = this.planets[i].classList[1]

                if (this.currentPlanet === undefined) {
                    this.setPlanet(nextPlanet)
                }
                else if (this.currentPlanet === nextPlanet) {
                    this.removeCurrentPlanet()
                }
                else {
                    this.removeCurrentPlanet()
                    this.setPlanet(nextPlanet)
                }
            })
        }
    }

    setPlanet (_nextPlanet) {
        this.currentPlanet = _nextPlanet
        console.log('La planète saffiche', this.currentPlanet)

        this.container.add(this[this.currentPlanet].mesh)

        switch(this.currentPlanet)
        {
            case 'earth':
                this.container.add(this.clouds.mesh)

                break

            case 'saturne':
                this.container.add(this.ringOfSaturne.mesh)
                break                        
        }
    }

    removeCurrentPlanet () {
        this.container.remove(this[this.currentPlanet].mesh)
        switch(this.currentPlanet)
        {
            case 'earth':
                this.container.remove(this.clouds.mesh)

                break

            case 'saturne':
                this.container.remove(this.ringOfSaturne.mesh)
                break                        
        }
        this.currentPlanet = undefined
    }

    setAstronaute()
    {
        this.astronaute = {}

        this.astronaute.mtlLoader = new MTLLoader();
        this.astronaute.objLoader = new OBJLoader();
 
        this.astronaute.mtlLoader.load(textureAstronauteSource, (materials) => {
            materials.preload()
            this.astronaute.objLoader.setMaterials(materials)
            this.astronaute.objLoader.load(astronauteSource, (object) => {
                this.object = object
                this.object.position.y = 100
                this.object.position.x = - 500
                this.object.scale.set( 20, 20, 20 )

                this.container.add(object)
            })
        })    
    }

    setAnimation()
    {
        const loop = () =>
        {
            window.requestAnimationFrame(loop)
            {
                // SUN
                this.sun.mesh.rotation.x += 0.001
                this.sun.mesh.rotation.y += 0.001

                // EARTH
                this.earth.mesh.rotation.y += 0.001
                this.clouds.mesh.rotation.y += 0.0008

                // MARS
                this.mars.mesh.rotation.x += 0.001

                // SATURNE
                this.saturne.mesh.rotation.x += 0.001

                // MOON
                this.moon.mesh.rotation.x += 0.001

                // PLUTON
                this.pluton.mesh.rotation.x += 0.001
            }
        }
        loop()
    }
}



 

