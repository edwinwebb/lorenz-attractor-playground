import { Text } from "@react-three/drei";
import { Box, useFlexSize } from '@react-three/flex';

export default function CenterText(props) {
    const {
        text = 'Center Text Default',
        color = 0x000000,
        fontSize = .2,
        lineHeight = 1,
        letterSpacing = 0,
        widthMod = 0.9
    } = props;
    const textFormat = {
        fontSize,
        lineHeight,
        color,
        letterSpacing,
        
    font:"https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff",
        textAlign : 'center',
        anchorX :  'center',
        anchorY : 'bottom'
    }

    const [width] = useFlexSize()
    const calcedMaxWidth = width * widthMod; // Math.min(1080, width * widthMod);
    
    return(<Box width="100%" height="100%" centerAnchor>
        <Text 
            {...textFormat}
            children={text}
            maxWidth={calcedMaxWidth}
        />
    </Box>)
}

