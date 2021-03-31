
import { Text } from "@react-three/drei"
import { Box } from '@react-three/flex'
import { useLoader } from 'react-three-fiber';
import * as THREE from 'three'

const title = "Edward Norton Lorenz"
const portrait = "lorenz-attractor-playground/Edward_lorenz.jpg"
const body1 = "Edward Norton Lorenz (May 23, 1917 – April 16, 2008) was an American mathematician and meteorologist who established the theoretical basis of weather and climate predictability, as well as the basis for computer-aided atmospheric physics and meteorology. He is best known as the founder of modern chaos theory, a branch of mathematics focusing on the behavior of dynamical systems that are highly sensitive to initial conditions."
const body2 = "In chaos theory, the butterfly effect is the sensitive dependence on initial conditions in which a small change in one state of a deterministic nonlinear system can result in large differences in a later state."
const textFormat = {
    color: 0xFFFFFF,
    fontSize: .4,
    textAlign: 'justify',
    font:"https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff",
    maxWidth: 9.6,
    anchorX: 'left',
    anchorY: 'top'
}

function Image() {
    const texture = useLoader(THREE.TextureLoader, portrait)

    return (
        <mesh>
            <planeBufferGeometry attach="geometry" args={[1.98,2.87]} />
            <meshBasicMaterial attach="material" map={texture} />
        </mesh>
    )
}

export default function Intro() {
    return(
        <Box width={12} height={9} wrap="wrap" dir="row">
            <Box width={12} height={3}>
                <Box height={0.6} mt={0.1} ml={0.2}><Text {...textFormat} maxWidth={11.6} color={0x010101} children={body2} /></Box>
            </Box>
            <Box width={2} height={3} align="flex-start" centerAnchor>
                <Image />
            </Box>
            <Box width={10} height={5} grow={1} dir="column">
                <Box height={0.6} mt={0.1} ml={0.2}><Text {...textFormat} children={title.toUpperCase()} /></Box>
                <Box grow={1} ml={0.2}><Text {...textFormat} fontSize={0.25} children={body1} /></Box>  
            </Box>
        </Box>     
    )
}

