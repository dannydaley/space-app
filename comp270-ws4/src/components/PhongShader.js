// info on Phong shader https://en.wikipedia.org/wiki/Phong_reflection_model
//help from https://codesandbox.io/embed/react-three-fiber-custom-geometry-with-fragment-shader-material-vxswf
import React from 'react';
import { useMemo } from 'react';
import * as THREE from 'three';

const PhongShader = (props) => {

    //OpenGL fragment shader code
    const fragmentShader = `
    varying vec3 Normal;
    varying vec3 Position;
  
    uniform vec3 Ka;  // ambient reflection ratio
    uniform vec3 Kd;  // incoming light diffuse reflection ratio
    uniform vec3 Ks;    // Specular (shiny) term of incmong light reflection ratio
    uniform vec4 LightPosition; 
    uniform vec3 LightIntensity;
    uniform float Shininess;
  
    vec3 phong() {
      vec3 n = normalize(Normal); //normal at this point on surface
      vec3 s = normalize(vec3(LightPosition) - Position);
      vec3 v = normalize(vec3(-Position)); //direction pointing towards the viewer
      vec3 r = reflect(-s, n); //direction of a perfect reflection
  
      //
      vec3 ambient = Ka;
      vec3 diffuse = Kd * max(dot(s, n), 0.0);
      vec3 specular = Ks * pow(max(dot(r, v), 0.0), Shininess);
  
      return LightIntensity * (ambient + diffuse + specular);
    }
    void main() {
      
      vec3 color = vec3(${props.color});
      gl_FragColor = vec4(color * phong(), 1.0);
  }`
  
  const vertexShader = `
    varying vec3 Normal;
    varying vec3 Position;
  
    void main() {
      Normal = normalize(normalMatrix * normal);
      Position = vec3(modelViewMatrix * vec4(position, 1.0));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
    const data = useMemo(
    () => ({
      
      uniforms: {
        Ka: { value: new THREE.Vector3(1, 1, 1) },
        Kd: { value: new THREE.Vector3(1, 1, 1) },
        Ks: { value: new THREE.Vector3(1, 1, 1) },
        LightIntensity: { value: new THREE.Vector4(0.3, 0.3, 0.3, 1.0) },
        LightPosition: { value: new THREE.Vector4(0, 0, 2000.9, 1.0) },
        Shininess: { value: props.shininess }
      }
      ,
      fragmentShader
      ,
      vertexShader
    }),
    []
  )
  return (
    <shaderMaterial attach="material" {...data}  wireframe={props.wireframe} color={props.color} />
  )
}

export default PhongShader;