export function lorenzObj(data) {
    let {
        sigma = 28,
        rho = 10,
        beta = 8/3,
        increment = 0.001,
        x = 1,
        y = 1,
        z = 1
    } = {data}
    return [
        x + increment * (sigma * (y-x)),
        y + increment * (x * (rho-z) - y),
        z + increment * (x * y - beta * z)
    ]
}
 
export function nextLorenzPoint(position = [1,1,1], data) {
    const {
        sigma = 28,
        rho = 10,
        beta = 8/3,
        increment = 0.001
    } = data
    const [x,y,z] = position;

    return [
        x + increment * (sigma * (y-x)),
        y + increment * (x * (rho-z) - y),
        z + increment * (x * y - beta * z)
    ]
}

export function lorenzPoints(data) {
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