const r = require("raylib");
const s = require("./scanner.js");
const f = require("./field.js");
const h = require("./horizontalScanner.js");

function running() {
    return !r.WindowShouldClose();
}

function setup(window) {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(window.width, window.height, "particle_detector");
    r.SetTargetFPS(100);

    const world = {};
    world.s1 = s.createScanner(0, 0, 30, window.height, 0, window.width / 2, 2, r.WHITE);
    world.s2 = s.createScanner(window.width / 2, 0, 50, window.height, window.width / 2, window.width, 1, r.WHITE);
    world.s3 = s.createScanner(0, 0, window.width, 50, 0, window.height, 2, r.WHITE);

    world.f1 = f.createField(150, 0, 40, window.height);
    world.f2 = f.createField(400, 0, 30, window.height);
    world.h_f1 = f.createField(0, 300, window.width, 50);

    return world;
}

function update(world) {
    s.updateScanner(world.s1, world.f1, world.f2);
    s.updateScanner(world.s2, world.f1, world.f2);
    h.updateHorizontalScanner(world.s3, world.h_f1);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    f.drawFields(world);
    drawScanners(world);

    r.EndDrawing();
}


function drawScanners(world) {
    s.drawRange(world.s1);
    s.drawRange(world.s2);
    s.drawRange(world.s3);
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