import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Base Code

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 3
scene.add(camera)

// Object
const rectangleGeometry = new THREE.BoxGeometry(1, 2, 3)
const rectangleMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000, 
    wireframe: true
})
const rectangleMesh = new THREE.Mesh(rectangleGeometry, rectangleMaterial)
scene.add(rectangleMesh)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Fullscreen event listener
window.addEventListener('dblclick', () => {
    const fullScreenElement = document.fullscreenElement

    if (!fullScreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        }
        
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.exitFullscreen) {
            document.exitFullscreen()
        }
    }
})

// Resize event listener
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    // Time
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    rectangleMesh.rotation.x = elapsedTime * Math.PI * 0.5
    rectangleMesh.rotation.y = elapsedTime * Math.PI * 0.5
    rectangleMesh.rotation.z = elapsedTime * Math.PI * 0.5

    rectangleMesh.position.y = Math.sin(elapsedTime * Math.PI * 0.3)
    rectangleMesh.position.x = Math.cos(elapsedTime * Math.PI * 0.1)
    

    // Render
    renderer.render(scene, camera)

    // Animation
    window.requestAnimationFrame(tick)
}

tick()