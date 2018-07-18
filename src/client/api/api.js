export const checkPoint = (x, y) => {
    return (Math.abs(x) === 2 && Math.abs(y) === 1) || (Math.abs(x) === 1 && Math.abs(y) === 2);
};
