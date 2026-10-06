const r = require("raylib");
function isScannerOutOfBounds(scanner) {
    return scanner.y + scanner.height > scanner.end || scanner.y < scanner.start;
}

function changeVelocity(scanner) {
    scanner.velocity = isScannerOutOfBounds(scanner) ? -(scanner.velocity) : scanner.velocity;
    return scanner;
}

function moveScanner(scanner) {
    scanner.y += scanner.velocity;
    return scanner;
}

function overlaps(scanner, field) {
    return (scanner.y + scanner.height >= field.y && scanner.y <= field.y + field.height);
}

function chooseColor(scanner, field1, field2) {
    return overlaps(scanner, field1) ||
        overlaps(scanner, field2) ? r.RED : r.WHITE;
}
function updateHorizontalScanner(scanner, h_f1) {
    changeVelocity(scanner);
    moveScanner(scanner);
    scanner.color = chooseColor(scanner, h_f1, { y: 0, width: 0 });
}

module.exports = {
    isScannerOutOfBounds,
    updateHorizontalScanner,
};