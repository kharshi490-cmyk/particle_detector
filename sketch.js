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

function choosecolor(scannerX, scannerWidth, fieldX, fieldWidth) {
    if (scannerX + scannerWidth >= fieldX && scannerX <= fieldX + fieldWidth) {
        return r.RED;
    }
    if (scannerX + scannerWidth < fieldX || scannerX > fieldX + fieldWidth) {
        return r.WHITE;
    }
}

function changeDirection(x, scannerWidth, end, direction, start) {
    if (x + scannerWidth === end || x === start) {
        direction = -direction;
    }
    return direction;
}

function moveScanner(direction, x, speed) {
    x += direction * speed;
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
    direction1 = changeDirection(scanner1_X, scannerWidth, windowWidth / 2, direction1, 0);
    direction2 = changeDirection(scanner2_X, scannerWidth, windowWidth, direction2, windowWidth / 2);
    direction3 = changeDirection(horizontalY, horizontal_height, windowHeight, direction3, 0);

    scanner1_X = moveScanner(direction1, scanner1_X, scanner1_speed);
    scanner2_X = moveScanner(direction2, scanner2_X, scanner2_speed);
    horizontalY = moveScanner(direction3, horizontalY, horizontal_speed);

    scanner1_color = colorForMoreFields(scanner1_X, scannerWidth, field1_X, field1_Width, field2_X, field2_Width);
    scanner2_color = colorForMoreFields(scanner2_X, scannerWidth, field1_X, field1_Width, field2_X, field2_Width);
    horizontal_color = colorForMoreFields(horizontalY, horizontal_height, horizontal_fieldY, horizontal_fieldHeight, 0, 0);
}

let direction1 = -1;
let scanner1_X = 0;
const scannerWidth = 30;
// const scanner1_speed = 1;
const scanner1_speed = 2;
let scanner1_color = r.WHITE;

let direction2 = -1;
let scanner2_X = windowWidth / 2;
// const scanner2_speed = 2;
const scanner2_speed = 3;
let scanner2_color = r.WHITE;

const field1_X = 150;
// const field1_X = 100;
// const field1_X = 350;
const field1_Width = 40;

const field2_X = 400;
// const field2_X = 200;
// const field2_X = 450
const field2_Width = 30;

let direction3 = -1;
const horizontal_fieldY = 300;
const horizontal_fieldHeight = 50;
let horizontalY = 0;
const horizontal_height = 50;
// const horizontal_speed = 2;
const horizontal_speed = 1;
let horizontal_color = r.WHITE;

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawRectangle(field1_X, 0, field1_Width, windowHeight, r.BLUE);
    r.DrawRectangle(field2_X, 0, field2_Width, windowHeight, r.BLUE);
    r.DrawRectangle(0, horizontal_fieldY, windowWidth, horizontal_fieldHeight, r.BLUE);
    r.DrawRectangle(scanner1_X, 0, scannerWidth, windowHeight, scanner1_color);
    r.DrawRectangle(scanner2_X, 0, scannerWidth, windowHeight, scanner2_color);
    r.DrawRectangle(0, horizontalY, windowWidth, horizontal_height, horizontal_color);

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