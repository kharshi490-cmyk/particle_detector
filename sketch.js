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
    if (windowWidth === x + width || x === 0) {
        direction = -direction
    }
    x += direction;
}

let direction = -1;
let x = 0;
const y = 0;
const width = 30;

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawRectangle(x, y, width, windowHeight, r.WHITE);
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