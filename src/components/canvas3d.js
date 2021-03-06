import React, { Suspense } from 'react';
import '../App.scss';

import { Canvas } from 'react-three-fiber';

import { useGLTFLoader, OrbitControls, Html } from 'drei';
import { selecUser } from '../state/userSlice';
import { useSelector } from 'react-redux';

const Car = () => {
  const gltf = useGLTFLoader('/scene.gltf', true);

  return <primitive object={gltf.scene} dispose={null} />;
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

export default function Canvas3d() {
  const user = useSelector(selecUser);
  console.log(user);

  return (
    <>
      <img className='icon3d' src="https://img.icons8.com/ios-glyphs/30/ffffff/3d-rotate.png" />
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
            <group position={[0, 0, 0]}>
              <mesh position={[30, -5, 0]} scale={[12, 12, 12]}>
                <Woman />
              </mesh>
              <mesh position={[35, 18 - 0]}>
                <Html fullscreen>
                  <div className="container">
                    <h1 className="name">{user}</h1>
                  </div>
                </Html>
              </mesh>
            </group>
          </group>
        </Suspense>
      </Canvas>
    </>
  );
}
