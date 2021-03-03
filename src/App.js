import React, {useRef, useEffect, Suspense} from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { Flex, Box, useFlexSize} from '@react-three/flex'
import lerp from 'lerp';
import Intro from './pages/Intro';
import About from './pages/About';
import Chaos from './pages/Chaos';
import Attractor from './pages/Attractor';
import Playground from './pages/Playground';
import Title from './pages/Title';
import CenterText from './CenterText';

const state = {
    top: 0
}

function Content() {
    const pagesGroup = useRef();
    const { viewport, size } = useThree();
    useFrame(() => {
        const fromTop = state.top / (window.innerHeight * 5);
        const y = viewport.height * 5 * fromTop;
        pagesGroup.current.position.y = lerp(pagesGroup.current.position.y, y, 0.1)
    })
    
    return(<group ref={pagesGroup}>
        <Flex dir="column" position={[-viewport.width / 2, viewport.height / 2, 0]} size={[viewport.width, viewport.height, 0]}>
            
            {/* <Box width="100%" height="auto" minHeight="100%" justify="center" align="center">
                <Title />
            </Box> */}
            
            <Box width="100%" height="auto" minHeight="100%" justify="center" align="center">
                <CenterText text="THE BUTTERFLY EFFECT" fontSize={ 1 } />
            </Box>
            <Box width="100%" height="auto" minHeight="100%" centerAnchor>
                <Intro />
            </Box>
            
            <Chaos />
            <Box width="100%" height="auto" minHeight="100%" justify="center" align="center">
                <CenterText 
                    text="Apparently insignificant variations of an inital condition in a system may produce unexpected consequences of immense proportions" 
                    fontSize={ 1 } 
                />
            </Box>
            <Box width="100%" height="auto" minHeight="100%" justify="center" align="center">
                <CenterText text="Chaos - systems whose apparently random states of disorder and irregularities are actually governed by underlying patterns that are highly sensitive to initial conditions" fontSize={ 1 } />
            </Box>
            <Box width="100%" height="auto" minHeight="100%" justify="center" align="center">
                <Attractor />
            </Box>
            <Box width="100%" height="auto" minHeight="100%" justify="center" align="center">
                <CenterText 
                        text="The man behind the quotes" 
                        fontSize={ 1 } 
                        margin={ 1 }
                    />
            </Box>
            <Box width="100%" height="auto" minHeight="100%" justify="center" align="center">
                <About />
            </Box>
            <Box width="100%" height="auto" minHeight="100%" justify="center" align="center">
                <CenterText 
                        text="View Source" 
                        fontSize={ 1 } 
                        margin={ 1 }
                    />
            </Box>
        </Flex>
    </group>)
}

export default function App() {
    useEffect(()=>{
        window.addEventListener('scroll', (e)=>{
            state.top = e.target.documentElement.scrollTop
        })
    })
    
    return(<div className="maindiv" style={{height: "900vh"}}>
        <Canvas camera={{position:[0,0,10], near: 1, far: 100, fov:80}} className="maincanvas">
            <color attach="background" args={[0x888888]} />
            <spotLight />
            <Suspense fallback={null}>
                <Content />
            </Suspense>
        </Canvas>
    </div>)
}



// const title = "Strange Attactor";
// const body1 = "The chaotic system is locally unstable yet globally stable: once some sequences have entered the attractor, nearby points diverge from one another but never depart from the attractor."
// const carJungQuote = 'in all chaos there is a cosmos, in all disorder and secret order'
