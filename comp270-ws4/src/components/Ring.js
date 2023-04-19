import React, { useRef } from 'react';
import PhongShader from './PhongShader';
import { useFrame } from '@react-three/fiber';

// sphere geometry variables
let radius = 1.4;
let widthSegments = 30;
let heightSegments = 5;
let phiStart = 3;
let phiLength = 7;
let thetaStart = 1.5;
let thetaLength = 0.2;

// mesh rotatation increments
let roatationXincrement = 0.0051;
let roatationYincrement = 0.0;
let rotationZincrement = 0.0001;

// returns the ring used to build the ring planet with variables coming in from the call location

function Ring(props) {
  const mesh = useRef(null);
  useFrame(()=>(mesh.current.rotation.y = mesh.current.rotation.y += roatationXincrement, mesh.current.rotation.x += roatationYincrement, mesh.current.rotation.z -= rotationZincrement))
    return ( 
      <mesh  position={props.position} ref={mesh}>
        <sphereBufferGeometry args={[radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength]} />
          <meshStandardMaterial /> 
        <PhongShader color={props.ringColor} shininess={props.shininess} wireframe={props.wireframe} />
      </mesh>     
    )
}

export default Ring;