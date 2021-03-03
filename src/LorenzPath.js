import {Line} from '@react-three/drei';

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
    const pointCap = 10000;
    
    for(let i = start; i < Math.min(pointCap, end); i+=increment) {
        x = x + increment * (sigma * (y-x));
        y = y + increment * (x * (rho-z) - y);
        z = z + increment * (x * y - beta * z);
        points.push([x,y,z])
    }
    return points
}

export default function LorenzPath(props) {
    const {data, color = 'black'} =  props;
    const points = lorenzPoints(data);

    return(
        <Line lineWidth={1} points={points} color={ color } {...props} />
    )
}