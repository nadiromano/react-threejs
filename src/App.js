import React, { Suspense } from 'react';
import './App.scss';

import Header from './components/header';
import { Canvas } from 'react-three-fiber';

import { useGLTFLoader, OrbitControls, Html } from 'drei';

const Car = () => {
  const gltf = useGLTFLoader('/scene.gltf', true);

  return <primitive object={gltf.scene} dispose={null} />;
};

const HtmlContent = () => {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[30, -5, 0]} scale={[12, 12, 12]}>
        <Woman />
      </mesh>
      <mesh position={[35, 18 - 0]}>
        <Html fullscreen>
          <div className="container">
            <h1 className="name">Nome</h1>
          </div>
        </Html>
      </mesh>
    </group>
  );
};
const Woman = () => {
  const gltf = useGLTFLoader('/woman.gltf', true);
  return <primitive object={gltf.scene} dispose={null} />;
};
const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />)
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <spotLight intensity={1} position={[1000, 0, 0]} />
    </>
  );
};

export default function App() {
  return (
    <>
      <Header />
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [70, 25, 120], fov: 30 }}
      >
        <OrbitControls />
        <Lights />
        <Suspense fallback={null}>
          <group position={[-15, -13, 0]}>
            <mesh scale={[2, 2, 2]}>
              <Car />
            </mesh>
            <HtmlContent />
          </group>
        </Suspense>
      </Canvas>
    </>
  );
}
