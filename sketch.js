const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

const windowWidth = 600;
const windowHeight = 600;

function setup() {
    r.InitWindow(windowWidth, windowHeight, "particle_detector");
    r.SetTargetFPS(100);
}

function choosecolor(scannerX, scannerWidth, x, width) {
    if (scannerX + scannerWidth >= x && scannerX <= x + width) {
        return r.RED;
    } else {
        return r.WHITE;
    }
}

function changeDirection(x, scannerWidth, windowWidth, direction, start) {
    if (windowWidth === x + scannerWidth || x === start) {
        direction = -direction
    }
    return direction;
}

function moveScanner(direction, x, speed) {
    x += speed * direction;
    return x;
}

function colorForMoreFields(scannerX, scannerWidth, field1_X, field1_Width, field2_X, field2_Width) {
    let color = choosecolor(scannerX, scannerWidth, field1_X, field1_Width);
    if (color !== r.RED) {
        color = choosecolor(scannerX, scannerWidth, field2_X, field2_Width);
    }
    return color;
}

function update() {
    direction1 = changeDirection(scannerX, scannerWidth, windowWidth / 2, direction1, 0);
    direction2 = changeDirection(scanner2_X, scannerWidth, windowWidth, direction2, windowWidth / 2);

    scannerX = moveScanner(direction1, scannerX, scannerSpeed);
    scanner2_X = moveScanner(direction2, scanner2_X, scanner2_speed);

    color1 = colorForMoreFields(scannerX, scannerWidth, field1_X, field1_Width, field2_X, field2_Width);
    color2 = colorForMoreFields(scanner2_X, scannerWidth, field1_X, field1_Width, field2_X, field2_Width);
}

let direction1 = -1;
let scannerX = 0;
const scannerWidth = 30;
const scannerSpeed = 1;

let color1 = r.WHITE;
let color2 = r.WHITE;
const field1_X = 150;
// const field1_X = 100;
// const field1_X = 350;
const field1_Width = 40;

const field2_X = 400;
// const field2_X = 200;
// const field2_X = 450
const field2_Width = 30;

let direction2 = -1;
let scanner2_X = windowWidth / 2;
const scanner2_speed = 2;

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawRectangle(field1_X, 0, field1_Width, windowHeight, r.BLUE);
    r.DrawRectangle(field2_X, 0, field2_Width, windowHeight, r.BLUE);
    r.DrawRectangle(scannerX, 0, scannerWidth, windowHeight, color1);
    r.DrawRectangle(scanner2_X, 0, scannerWidth, windowHeight, color2);

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