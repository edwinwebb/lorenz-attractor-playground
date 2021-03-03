function Ball(props) {
    const ball = useRef();
    const {
        start,
        end,
        increment,
        rho,
        sigma,
        beta
    } = props.data;
    const {
        color = 'red'
    } = props;
    useFrame(()=> {
        let {
            x,
            y,
            z
        } = {...ball.current.position}
        ball.current.position.x += increment * (sigma * (y-x));
        ball.current.position.y += increment * (x * (rho-z) - y);
        ball.current.position.z += increment * (x * y - beta * z);
    })
    return(
        <mesh ref={ball} position={[props.data.x, props.data.y, props.data.z]}>
            <sphereGeometry args={[0.3,16,16]} />
            <meshBasicMaterial color={ color } />
        </mesh>
    )
}