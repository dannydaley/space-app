//help from this guide on ripple effect https://www.youtube.com/watch?v=wRmeFtRkF-8&ab_channel=AlvanCalebArulandu
import React, { useRef } from "react";
import whitedot from "./images/whitedot.png";
import { useLoader, useFrame } from "@react-three/fiber";
import { useMemo, useCallback } from "react";
import * as THREE from "three";

let dotSize = 2;
let dotSizeAttenuation = false;
let dotTransparent = true;
let dotAlphaTest = 1;
let dotOpacity = 1;

const Points = (props) => {
    let count = 250; // amount of points along 1 axis of the grid
    let seperation = 2; //distance between points
    let t = 0; //phase shift;
    let f = 0.0005; //frequency
    let a = 10; //amplitude
    let timeSpeed = useRef(document.getElementById("waveSpeedSlider").value); // DEPRECATED AND REPLACED BY SLIDER AND STATE IN APP JS
    let positionSteps = 1;
    let positionIncrements = 3;

    //graph for sin wave animation on points
    const graph = useCallback(
        (x, z) => {
            return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
        },
        [t, f, a]
    );

    //set up texture (dot image)
    const imageTexture = useLoader(THREE.TextureLoader, whitedot);
    // set up reference
    const bufferRef = useRef();
    //nested loop for dot positions
    let positions = useMemo(() => {
        //initialize empty dot array
        let positions = [];
        //outer loop x axis increment
        for (let xi = 0; xi < count; xi++) {
            //inner loop z axis increment
            for (let zi = 0; zi < count; zi++) {
                // set x , z
                let x = seperation * (xi - count / 2);
                let z = seperation * (zi - count / 2);
                // x , z ranges = (-count min, +count max)
                // set y to memo graph for sin animation
                let y = graph(x, z);
                // apply positions to axes
                positions.push(x, y, z);
            }
        }
        return new Float32Array(positions);
    }, [count, seperation, graph]); //dependencies from useMemo
    //animation
    useFrame(() => {
        t -= props.waveSpeed;
        // t -= timeSpeed.current;
        // get positions from bufferRef
        const positions = bufferRef.current.array;
        //positionIncrement variable start point
        let i = 0;
        // nested for loop to iterate throuigh position / 2 to pass into the graph to animate
        for (let xi = 0; xi < count; xi++) {
            for (let zi = 0; zi < count; zi++) {
                let x = seperation * (xi - count / 2);
                let z = seperation * (zi - count / 2);

                //pass to animation graph
                positions[i + positionSteps] = graph(x, z);

                //increment i
                i += positionIncrements;
            }
        }
        bufferRef.current.needsUpdate = true;
    });

    return (
        <points>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attachObject={["attributes", "position"]}
                    ref={bufferRef}
                    array={positions}
                    count={positions.length / 3}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                attach="material"
                meshStandardMaterial={imageTexture}
                map={imageTexture}
                color={0x03a062}
                size={dotSize}
                sizeAttenuation={dotSizeAttenuation}
                transparent={dotTransparent}
                alphaTest={dotAlphaTest}
                opacity={dotOpacity}
            />
        </points>
    );
};

export default Points;
