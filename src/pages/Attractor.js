import { TransformControls } from '@react-three/drei';
import { useFrame } from 'react-three-fiber';
import { useRef, useMemo } from 'react';
import { nextLorenzPoint } from "../lorenz";
import { Box } from '@react-three/flex';

// TODO
// have animation loop
// have cards at the top?

// Colored grid of balls
function BallGrid(props) {
    const EDGE = 'yellow';
    const CENTER = 'red';

    const length = 8;
    const spacing = 5;

    const balls = useMemo(() => new Array(length * length * length).fill(0).map((v,i)=>{
        const x = i % length;
        const y = Math.floor(i / length) % length;
        const z = Math.floor(i / length / length) % length;
        const color = (x === 0 || x === length - 1) || (y === 0 || y === length-1) || (z === 0 || z === length -1) ? EDGE : CENTER;

        return <LorenzBall 
            key={i}
            color={color}
            x={x * spacing - length * spacing / 2}
            y={y * spacing - length * spacing / 2}
            z={z * spacing - length * spacing / 2}
            increment={ 0.0005 }
            sigma={10}
            rho={28}
            beta={8/3}
        />
    }), [length, spacing])


    return(<group scale={[0.15, 0.15, 0.15]}>
        { balls }
    </group>)
}

// single ball 
function LorenzBall(props) {
    const {
        sigma,
        rho,
        beta,
        increment,
        color = 'red',
        x = 0,
        y = 0,
        z = 0
    } = props;
    const ballMeshRef = useRef();

    useFrame( ()=>{
        if (!ballMeshRef.current) return
        const [x,y,z] = nextLorenzPoint([
            ballMeshRef.current.position.x,
            ballMeshRef.current.position.y,
            ballMeshRef.current.position.z,
        ],{
            sigma,
            rho,
            beta,
            increment
        });
        ballMeshRef.current.position.x = x;
        ballMeshRef.current.position.y = y;
        ballMeshRef.current.position.z = z;
    } );
    
    return(<mesh ref={ ballMeshRef } position={[x + increment, y + increment, z + increment]}>
        <sphereGeometry args={[0.25,16,16]} />
        <meshBasicMaterial color={ color }  />
    </mesh>)
}


export default function Attractor() {
return(<Box width="100%" height="100%" centerAnchor>
    <TransformControls mode={'rotate'} size={0.1}>
        <BallGrid />
        </TransformControls>
    </Box>)
}