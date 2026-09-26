const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

const windowWidth = 500;
const windowHeight = 500;
function setup() {
    r.InitWindow(windowWidth, windowHeight, "particle_detector");
    r.SetTargetFPS(100);
}

function update() {
    if (windowWidth === scannerX + scannerWidth || scannerX === 0) {
        direction = -direction
    }
    scannerX += direction;

    if (scannerX + scannerWidth >= fieldX && scannerX <= fieldX + fieldWidth) {
        color = r.RED;
    } else {
        color = r.WHITE;
    }
}

let direction = -1;
let scannerX = 0;
const scannerWidth = 30;

let color = r.WHITE;
const fieldX = 150;
const fieldWidth = 100;

// function drawRectangle (x, y, width, height, color) {
//     r.DrawRectangle(x, y, width, height, color);
// }

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawRectangle(fieldX, 0, fieldWidth, windowHeight, r.BLUE);
    r.DrawRectangle(scannerX, 0, scannerWidth, windowHeight, color);
    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};