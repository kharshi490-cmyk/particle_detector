function isScannerOutOfBounds(x, width, start, end) {
    return width > end || x < start;
}

function changeVelocity(x, width, end, velocity, start) {
    const start1 = x + width;
    return isScannerOutOfBounds(x, start1, start, end) ? -velocity : velocity;
}

function moveScanner(x, velocity) {
    x += velocity;
    return x;
}

module.exports = {
    isScannerOutOfBounds,
    changeVelocity,
    moveScanner
};