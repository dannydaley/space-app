import React from 'react';
import SpinningSphere from './SpinningSphere';
import Ring from './Ring';

// returns the 'ring planet' as a whole by grouping the ring and spinning sphere components.

const RingPlanet = (props) => {
    return (
        <>
        <Ring position={props.position} wireframe={props.wireframe} ringColor={props.ringColor} shininess={props.ringShininess}/>
        <SpinningSphere position={props.position} color={props.planetColor} shininess={props.planetShininess} wireframe={props.wireframe} width={props.width} height={props.height} lightposition={props.lightposition}/>
        </>
    )
}

export default RingPlanet