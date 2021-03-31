import { Text } from "@react-three/drei"
import { Line, Plane } from "@react-three/drei"
import { Box, useFlexSize } from '@react-three/flex'
import lorenz from '../lorenz';
import { useState, useRef } from 'react';
import { useFrame } from "react-three-fiber";
import lerp from 'lerp'

// DONE: Does the flap of a butterfly’s wings in Brazil set off a tornado in Texas?
// DONE: Fancy ρ=28, σ = 10, β = 8/3
// TODO: mouse offset paralax
// DONE: all center align
// TODO: use global lorenz DRY

function lorenzPoints(data) {
    const {
        start,
        end,
        increment,
        rho,
        sigma,
        beta
    } = data;
    let {
        x,
        y,
        z
    } = {...data}
    const points = [];
    const pointCap = 1200;
    
    for(let i = start; i < Math.min(pointCap, end); i+=increment) {
        x = x + increment * (sigma * (y-x));
        y = y + increment * (x * (rho-z) - y);
        z = z + increment * (x * y - beta * z);
        points.push([x,y,z].map( v => v * 0.3))
    }
    return points
}

const Wings = (props) => {
    const {data, color = 'black'} =  props;
    const points = lorenzPoints(data);

    return(
        <Line lineWidth={0.3} points={points.slice(4000)} color={ color } {...props} />
    )
}

export default function Intro() {
    const textFormat = {
        color: 0x000000,
        fontSize: 0.8,
        textAlign: 'center',
        letterspacing: -0.05,
        font:"https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
    }
    const data = {
        start: 100,
        end: 200,
        increment: 0.001,
        rho: 28,
        sigma: 10,
        beta: 8/3,
        x: 0.0001,
        y: 0.0001,
        z: 0.0001
    }
    const rotationGroup = useRef();

    const mouseMove = (e) => {
        const {
            x = 0,
            y = 0
        } = e.intersections[0].point;

        rotationGroup.current.rotation.y = ((x / 15) * -Math.PI) / 32;
        rotationGroup.current.rotation.x = ((y / 15) * -Math.PI) / 32;
    }

     //0x5e5312
    return(
        <Box width="100%" height="100%">
            <Inner mouseMove={mouseMove} />
            <Box width={15} height={15}>
                <mesh>
                    <planeBufferGeometry attach="geometry" args={[15,15]} />
                    <meshBasicMaterial color={'white'} transparent={true} opacity={0} />
                </mesh>
                <group ref={rotationGroup}><Wings position={[-1.5,-6,-3]} data={data} color={0xEEEEEE} rotation={[Math.PI/2, Math.PI*.95,Math.PI*.7]}/></group>
                <Text {...textFormat} maxWidth={10} children={"Does the flap of a butterfly’s wings in Brazil set off a tornado in Texas?".toUpperCase()} />
            </Box>
        </Box>
    )
}

function Inner(props) {
    const [width, height] = useFlexSize()
    const { color = 'blue', mouseMove = ()=>{} } = props;

    return <Plane args={[width, height]} onPointerMove={mouseMove}><meshBasicMaterial color={color} transparent opacity={0} /></Plane>
  }
