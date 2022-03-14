import React from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  CSS3DObject,
  CSS3DRenderer,
} from 'three/examples/jsm/renderers/CSS3DRenderer';

let string =
  '<div>' +
  '<h1>This is an H1 Element.</h1>' +
  '<span class="large">Hello Three.js cookbook</span>' +
  '<textarea> And this is a textarea</textarea>' +
  '</div>';

class Scene extends React.Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.createCSS3DObject = this.createCSS3DObject.bind(this);
  }

  componentDidMount() {
    const scene = new THREE.Scene();
    const scene2 = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const renderer2 = new CSS3DRenderer();
    renderer2.setSize(window.innerWidth, window.innerHeight);

    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;

    const loader = new GLTFLoader();
    const light = new THREE.PointLight(0xffffff, 2, 200);
    light.position.set(4.5, 10, 4.5);
    const controls = new OrbitControls(camera, renderer.domElement);

    scene.add(light);

    const cssElement = this.createCSS3DObject(string);
    cssElement.position.set(100, 100, 100 + 50);
    scene2.add(cssElement);

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
    this.scene2 = scene2;
    this.camera = camera;
    this.renderer = renderer;
    this.renderer2 = renderer2;
    this.cssElement = cssElement;
    this.controls = controls;

    this.mount.appendChild(this.renderer.domElement);
    this.mount.appendChild(this.renderer2.domElement);
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

  createCSS3DObject(s) {
    // convert the string to dome elements
    var wrapper = document.createElement('div');
    wrapper.innerHTML = s;
    var div = wrapper.firstChild;

    // set some values on the div to style it, standard CSS
    div.style.width = '375px';
    div.style.height = '375px';
    div.style.opacity = 1;
    div.style['will-change'] = 'all';
    div.style.transition = 'top 0.2s linear';
    div.style.background = new THREE.Color(Math.random() * 0xffffff).getStyle();

    // create a CSS3Dobject and return it.
    var object = new CSS3DObject(div);
    return object;
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
    this.renderer2.render(this.scene2, this.camera);
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
