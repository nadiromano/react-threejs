import React, { Component } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class ThreeScene extends Component {
  componentDidMount() {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;
    camera.position.x = 0;

    const light = new THREE.AmbientLight(0xffffff, 2, 200);

    const light2 = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light, light2);

    light.position.set(0, 0, 0);
    scene.add(light);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cube = cube;

    const loader = new GLTFLoader();
    loader.load(
      './scene.gltf',
      function (gltf) {
        gltf.scene.scale.set();
        gltf.scene.position.set(0, 0, 0);
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    loader.load(
      './woman.gltf',
      function (gltf) {
        gltf.scene.position.set(0, 0, 0);
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    this.mount.appendChild(renderer.domElement);
    renderer.render(scene, camera);
  }

  render() {
    return (
      <div
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default ThreeScene;
