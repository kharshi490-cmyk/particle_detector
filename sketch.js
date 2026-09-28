const r = require("raylib");
const s = require("./scanner.js")
const s1 = require("./scanner1.js");
const s2 = require("./scanner2.js");
const s3 = require("./scanner3.js");

function running() {
    return !r.WindowShouldClose();
}

function setup(windowWidth, windowHeight) {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(windowWidth, windowHeight, "particle_detector");
    r.SetTargetFPS(100);
    s2.x = r.GetScreenWidth() / 2;
}

function isBetween(end, start, a) {
    return start <= a && a <= end;
}

function overlaps(start1, width1, start2, width2) {
    const end1 = start1 + width1;
    const end2 = start2 + width2;
    return isBetween(end2, start2, start1) || isBetween(end2, start2, end1);
}

function chooseColor(scannerX, scannerWidth, field1_X, field1_Width, field2_X, field2_Width) {
    return overlaps(scannerX, scannerWidth, field1_X, field1_Width) ||
        overlaps(scannerX, scannerWidth, field2_X, field2_Width) ? r.RED : r.WHITE;
}

function update() {
    s1.velocity = s.changeVelocity(s1.x, s1.width, r.GetScreenWidth() / 2, s1.velocity, 0);
    s1.x = s.moveScanner(s1.velocity, s1.x);
    s1.color = chooseColor(s1.x, s1.width, field1_x, field1_width, field2_x, field2_width);

    s2.velocity = s.changeVelocity(s2.x, s2.width, r.GetScreenWidth(), s2.velocity, r.GetScreenWidth() / 2);
    s2.x = s.moveScanner(s2.velocity, s2.x);
    s2.color = chooseColor(s2.x, s2.width, field1_x, field1_width, field2_x, field2_width);

    s3.velocity = s.changeVelocity(s3.y, s3.height, r.GetScreenHeight(), s3.velocity, 0);
    s3.y = s.moveScanner(s3.velocity, s3.y);
    s3.color = chooseColor(s3.y, s3.height, horizontal_fieldY, horizontal_fieldHeight, 0, 0);
}

const field1_x = 150;
const field1_width = 40;

const field2_x = 400;
const field2_width = 30;

const horizontal_fieldY = 300;
const horizontal_fieldHeight = 50;

// let s3.velocity = 2;
// let s3.y = 0;
// const s3.height = 50;
// let s3.color = r.WHITE;

function drawField(x, y, width, height) {
    r.DrawRectangle(x, y, width, height, r.BLUE);
}

function drawRange(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawField(field1_x, 0, field1_width, r.GetScreenHeight());
    drawField(field2_x, 0, field2_width, r.GetScreenHeight());
    drawField(0, horizontal_fieldY, r.GetScreenWidth(), horizontal_fieldHeight);
    drawRange(s1.x, 0, s1.width, r.GetScreenHeight(), s1.color);
    drawRange(s2.x, 0, s2.width, r.GetScreenHeight(), s2.color);
    drawRange(0, s3.y, r.GetScreenWidth(), s3.height, s3.color);

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