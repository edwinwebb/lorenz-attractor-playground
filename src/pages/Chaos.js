
import { Text } from "@react-three/drei";
import { Box, useFlexSize } from '@react-three/flex'
import { Plane, TransformControls, Sphere } from '@react-three/drei'
import { useRef, useMemo  } from 'react';
import { useFrame, useUpdate } from 'react-three-fiber';
import { Vector3 } from 'three'


const baseData = {
    start: 10,
    end: 200,
    increment: 0.001,
    rho: 28,
    sigma: 10,
    beta: 8/3,
    x: 0.0001,
    y: 0.0001,
    z: 0.0001
}

const a1 =  {
    ...baseData
}

const a2 =  {
    ...baseData,
    z: 0.0001
}

function BallWithTrail(props) {
    const { 
        color = 'red',
        points = [[0,0,0]],
        speed = 10
    } = props;
    const lineBufferRef = useUpdate(
        (geometry) => {
            geometry.setFromPoints(points.map((p) => new Vector3(p[0], p[1], p[2])))
        },
        [points]
    );
    const ballMeshRef = useRef();

    useFrame( (a)=>{
        const time = Math.floor((a.clock.oldTime / speed) % points.length) ;
        const nextTime = time + 2 > points.length ? 0 : time + 1;
        const [x, y, z] = points[nextTime]
        
        lineBufferRef.current && lineBufferRef.current.setDrawRange(0, nextTime)
        ballMeshRef.current.position.x = x;
        ballMeshRef.current.position.y = y;
        ballMeshRef.current.position.z = z;
    } );

    return(<group {...props}>
        <line>
            <bufferGeometry attach="geometry" ref={lineBufferRef} />
            <lineBasicMaterial attach="material" color={color} transparent opacity={0.2} linewidth={1} />
        </line>
        <mesh position={points[0]} ref={ ballMeshRef }>
            <sphereGeometry args={[0.5,16,16]} />
            <meshBasicMaterial color={ color } transparent opacity={0.8} />
        </mesh>
    </group>)
}

function LorenzBall(props) {
    const { 
        time,
        color = 'red',
        increment,
        rho,
        sigma,
        beta,
        length
    } = props;
    const points = useMemo(() => (lorenzPoints({...props})), [rho, sigma, beta, increment, length]);

    return (<BallWithTrail points={ points } color={ color } />)
}

function lorenzPoints(data) {
    const {
        increment = 0.01,
        rho = 28,
        sigma = 10,
        beta =  8/3,
        length = 1200,
        start = [0.01, 0.01, 0.01]
    } = data;
    const POINTCAP = 10000;
    const arrayLength = Math.min(POINTCAP, length);

    const points = new Array(arrayLength).fill([0,0,0]).reduce( (acc, val, i) => {
        const [x,y,z] = acc[i];
        acc.push([
            x + increment * (sigma * (y-x)),
            y + increment * (x * (rho-z) - y),
            z + increment * (x * y - beta * z)
        ]);
        return acc;
    },[start]);

    return points
}

/* <Text {...textStyle}>ρ:{rho} 𝛔:{sigma} β:{beta} </Text> */
function LorenzDataCard(props) {
    const { 
        rho = 28,
        sigma = 10,
        beta = '8/3',
        start = [0.01,0.01,0.01],
        color = 'pink',
        title = 'Marker 00'
    } = props;
    const [x,y,z] = start;
    const textStyle = {
        color: 0x020202,
        fontSize: .18,
        textAlign: 'right',
        lineHeight: 1.2,
        font:"https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff",
        width: 5,
        anchorX: 'left',
        anchorY: 'top'
    }
    
    return(<group>
        <Plane args={[4,1]} ><meshBasicMaterial color={'white'} /></Plane>
        <Sphere args={[.16,16,16]} position={[-1.5,0]} scale={[1,1,0.25]}>
            <meshBasicMaterial attach="material" color={color} />
        </Sphere>
        <group position={[-1,0.15,0.01]}>
            <Text {...textStyle} fontSize={.24} position={[0,.25,0]}>{title}</Text>
            <Text {...textStyle}>p:{rho} a:{sigma} b:{beta} </Text>
            <Text {...textStyle} position={[0,-.24,0]}>x:{x} y:{y} z:{z}</Text>
        </group>
    </group>)
}

export default function Chaos() {
    return(<Box width="100%" height="100%" dir="column">
        <Box width="100%" height="50%" grow={1}>
            <Box width="100%" height="100%" centerAnchor>
                <TransformControls mode={'rotate'} size={0.05}>
                    <group scale={[0.15,0.15,0.15]} position={[-1,-4.5,0]} rotation={[Math.PI/2, Math.PI*.95,Math.PI*.7]} rotationbak={[0,Math.PI / 4,Math.PI / 2]}>
                        <LorenzBall length={2500} increment={0.01} color={'red'} />
                        <LorenzBall length={2500} increment={0.01} color={'pink'} start={[0.011,0.01,0.01]} />
                        <LorenzBall length={2500} increment={0.01} color={'orange'} start={[0.012,0.01,0.01]} />
                    </group>
                </TransformControls>
            </Box>
        </Box>
        <Box width="100%" height={2} dir="row" justify="center" mt={0.25}>
            <Box width={3} height={1} centerAnchor><LorenzDataCard title={'X is 0.01'} color={'red'} start={[0.01,0.01,0.01]}  /></Box>
            <Box width={3} height={1} centerAnchor><LorenzDataCard title={'X is 0.012'} color={'pink'}  start={[0.012,0.01,0.01]}  /></Box>
            <Box width={3} height={1} centerAnchor><LorenzDataCard title={'X is 0.013'} color={'orange'} start={[0.013,0.01,0.01]}/></Box>
        </Box>
    </Box>)
}