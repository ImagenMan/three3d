import { Controller } from "@hotwired/stimulus";
import * as THREE from "three";

// Connects to data-controller="threejs"
export default class extends Controller {
  connect() {
    console.log("hello stimulus", this.element);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGL1Renderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement)

    this.geometry = new THREE.BoxGeometry();
    this.material = new THREE.MeshStandardMaterial({ 
      color: 0x00ff00, 
      wireframe: false,
     });

     this.originCube = this.creatCube(0, 0, 0);
     this.offsetCube = this.creatCube(2,2,-4);

     this.pointLight = new THREE.PointLight(0xffffff);
     this.pointLight.position.set(3, 3, -5);

     this.lightHelper = new THREE.PointLightHelper(this.pointLight);
     this.scene.add(this.lightHelper);

     this.scene.add(this.originCube);
     this.scene.add(this.offsetCube);
     this.scene.add(this.pointLight);

     const backgroundTexture = new THREE.TextureLoader().load(
      "/assets/webb_space_pic2.png"
     );
     this.scene.background = backgroundTexture;


     this.camera.position.z = 5;
     this.animate();
    }

    animate() {
      requestAnimationFrame(this.animate.bind(this));

      this.originCube.rotation.x += 0.01;
      this.originCube.rotation.y += 0.01;

      this.offsetCube.rotation.x -= 0.005;
      this.offsetCube.rotation.y -= 0.005;

      this.renderer.render(this.scene, this.camera);
    }

  creatCube(x, y, z) {
    const cube = new THREE.Mesh(this.geometry, this.material);
    cube.position.set(x, y, z);
    
    return cube;
  }
}
