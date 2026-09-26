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

function choosecolor(scannerX, scannerWidth, x, width) {
    if (scannerX + scannerWidth >= x && scannerX <= x + width) {
        color = r.RED;
    } else {
        color = r.WHITE;
    }
}

function update() {
    if (windowWidth === scannerX + scannerWidth || scannerX === 0) {
        direction = -direction
    }
    scannerX += direction;

    choosecolor(scannerX, scannerWidth, field1_X, field1_Width);
    if (color !== r.RED) {
        choosecolor(scannerX, scannerWidth, field2_X, field2_Width);
    }
}

let direction = -1;
let scannerX = 0;
const scannerWidth = 30;

let color = r.WHITE;
const field1_X = 150;
const field1_Width = 100;

const field2_X = 350;
const field2_Width = 20;

// function drawRectangle (x, y, width, height, color) {
//     r.DrawRectangle(x, y, width, height, color);
// }

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawRectangle(field1_X, 0, field1_Width, windowHeight, r.BLUE);
    r.DrawRectangle(field2_X, 0, field2_Width, windowHeight, r.BLUE);
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