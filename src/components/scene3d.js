import React from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class Scene extends React.Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const loader = new GLTFLoader();
    const light = new THREE.PointLight(0xffffff, 2, 200);
    light.position.set(4.5, 10, 4.5);
    const controls = new OrbitControls(camera, renderer.domElement);

    scene.add(light);

    loader.load(
      './scene.gltf',
      function (gltf) {
        gltf.scene.scale.set(0.02, 0.02, 0.02);
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
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.position.set(0.3, -0.04, 0);
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
    camera.position.y = 0.13;
    camera.position.z = 0.5;
    camera.position.x = 0.3;
    // scene.add(cube);
    // renderer.setClearColor('#ffffff');

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.controls = controls;

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    this.controls.update();
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default Scene;
