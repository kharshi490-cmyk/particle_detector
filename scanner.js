const r = require("raylib");
function isScannerOutOfBounds(scanner) {
    return scanner.x + scanner.width > scanner.end || scanner.x < scanner.start;
}

function changeVelocity(scanner) {
    scanner.velocity = isScannerOutOfBounds(scanner) ? -(scanner.velocity) : scanner.velocity;
    return scanner;
}

function moveScanner(scanner) {
    scanner.x += scanner.velocity;
    return scanner;
}

function overlaps(scanner, field) {
    return (scanner.x + scanner.width >= field.x && scanner.x <= field.x + field.width);
}

function chooseColor(scanner, field1, field2) {
    return overlaps(scanner, field1) ||
        overlaps(scanner, field2) ? r.RED : r.WHITE;
}

function updateScanner(scanner, f1, f2) {
    changeVelocity(scanner);
    moveScanner(scanner);
    scanner.color = chooseColor(scanner, f1, f2);
}

function createScanner(x, y, width, height, start, end, velocity, color) {
    return {
        x,
        y,
        width,
        height,
        start,
        end,
        velocity,
        color,
    }
}

function drawRange(scanner) {
    r.DrawRectangle(scanner.x, scanner.y, scanner.width, scanner.height, scanner.color);
}

module.exports = {
    createScanner,
    drawRange,
    updateScanner,
};