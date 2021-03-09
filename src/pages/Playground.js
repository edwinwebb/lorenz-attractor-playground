import { Html } from '@react-three/drei';
import { useState } from 'react';
import { TransformControls } from '@react-three/drei';
import { Box } from '@react-three/flex';
import { useRef, useMemo  } from 'react';
import { useFrame, useUpdate } from 'react-three-fiber';
import { Vector3 } from 'three';
import { lorenzPoints } from '../lorenz'


function BallWithTrail(props) {
    const { 
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
        
        ballMeshRef.current.position.x = x;
        ballMeshRef.current.position.y = y;
        ballMeshRef.current.position.z = z;
    } );

    return(<group {...props}>
        <line>
            <bufferGeometry attach="geometry" ref={lineBufferRef} />
            <lineBasicMaterial attach="material" color={'white'} transparent opacity={0.2} linewidth={1} />
        </line>
        <mesh position={points[0]} ref={ ballMeshRef }>
            <sphereGeometry args={[0.5,16,16]} />
            <meshBasicMaterial color={ 'red' } transparent opacity={0.8} />
        </mesh>
    </group>)
}

function LorenzBall(props) {
    const { 
        color = 'red',
        rho,
        sigma,
        beta,
        x,
        y,
        z
    } = props;
    const points = useMemo(() => (lorenzPoints({rho, sigma, beta, start: [x,y,z]})), [rho, sigma, beta, x, y, z]);

    return (<BallWithTrail points={ points } color={ color } />)
}

export default function Playground() {
    const [data, updateData] = useState({
        start: 100,
        end: 200,
        increment: 0.001,
        rho: 28,
        sigma: 10,
        beta: 8/3,
        x: 0.01,
        y: 0.01,
        z: 0.01
    });
    return (<Box width="100%" height="auto" minHeight="100%" wrap="wrap" flexDirection="row">
        <Box width="500px" height="100%">
        <Html>
            <div className="playground">
                <label>rho</label>
                <input type="number" step="1" min="0" max="100" value={data.rho}  onChange={ (e)=>{ updateData({...data, rho: parseFloat(e.target.value)})} }/>
                <hr />
                <label>sigma</label>
                <input type="number" step="1" min="0" max="30" value={data.sigma}  onChange={ (e)=>{ updateData({...data, sigma: parseFloat(e.target.value)})} }/>
                <hr />
                <label>beta</label>
                <input type="number" step="0.1" min="0" max="5" value={data.beta}  onChange={ (e)=>{ updateData({...data, beta: parseFloat(e.target.value)})} }/>
                <hr />
                <label>x</label>
                <input type="number" step="0.1" min="-5" max="5" value={data.x}  onChange={ (e)=>{ updateData({...data, x: parseFloat(e.target.value)})} }/>
                <hr />
                <label>y</label>
                <input type="number" step="0.1" min="-5" max="5" value={data.y}  onChange={ (e)=>{ updateData({...data, y: parseFloat(e.target.value)})} }/>
                <hr />
                <label>z</label>
                <input type="number" step="0.1" min="-5" max="5" value={data.z}  onChange={ (e)=>{ updateData({...data, z: parseFloat(e.target.value)})} }/>
            </div>
        </Html>
        </Box>
        <Box width="50%" height="100%" flexGrow={1} centerAnchor>
            <TransformControls mode={'rotate'} size={0.05}>
                <group scale={[0.15,0.15,0.15]} position={[-1,-4.5,0]} rotation={[Math.PI/2, Math.PI*.95,Math.PI*.7]} rotationbak={[0,Math.PI / 4,Math.PI / 2]}>
                    <LorenzBall length={5000} increment={0.01} rho={data.rho} sigma={data.sigma} beta={data.beta} x={data.x} y={data.y} z={data.z} color={'red'} />
                </group>
            </TransformControls>
        </Box>
    </Box>
    
    )
}