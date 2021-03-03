

// Load GLB with Animation
// Apply Material but change color
// have butteryfly look at lorenz points 
// have butterfly follow lorenz point
// have butterfly jiggle more
import * as THREE from 'three'
import React, { Suspense, useRef, useEffect} from 'react';
import { Box } from '@react-three/flex';
import { useLoader, useGraph, useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Plane } from '@react-three/drei';
import lerp from 'lerp';

function ButterflyPrimitive() {
    const gltf = useLoader(GLTFLoader, "/butteryfly.glb");
    const prim = useRef();
    const mixer = useRef()
    const {
        increment = 0.002,
        rho = 28,
        sigma = 10,
        beta =  8/3,
        length = 1200,
        start = [0.01, 0.01, 0.01]
    } = {};
    let [x, y ,z] = [increment, increment, increment];

    useEffect(() => {
        if (gltf) {
          mixer.current = new THREE.AnimationMixer(gltf.scene)
          console.log(mixer.current)
          //console.log(gltf)
          //  action.play()
        }
      }, [gltf])

    useFrame(({ clock })=> {
        x = x + increment * (sigma * (y-x))
        y = y + increment * (x * (rho-z) - y)
        z = z + increment * (x * y - beta * z)
        prim.current.position.x = lerp(prim.current.position.x, x, 0.001)
        prim.current.position.y = lerp(prim.current.position.y, y, 0.001)
        prim.current.position.z = lerp(prim.current.position.z, z, 0.001)
        prim.current.lookAt(x,y,z);

        //mixer.current.update(clock.getDelta())
    });
    return (<primitive object={gltf.scene} ref={ prim } position={[0.01, 0.01, 0.01]}>
        <meshBasicMaterial attach="material" color="#ff0000" />
    </primitive>)
}

function Butterfly() {
    return(<Suspense fallback={<Plane args={[1,1]} />}>
        <ButterflyPrimitive />
    </Suspense>)
}

export default function Title() {

    return(<Box width="100%" height="100%" centerAnchor>
        <group scale={[0.2,0.2,0.2]}>
            <Butterfly />
        </group>
    </Box>);
}



