import { Controller } from "@hotwired/stimulus"
import * THREE from "three";

// Connects to data-controller="threejs"
export default class extends Controller {
  connect() {
    console.log("hello stimulus", this.element);

    this.scene = new THREE.Scene();
  }
}
