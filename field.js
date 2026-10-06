const r = require("raylib");
function createField(x, y, width, height) {
    return {
        x,
        y,
        width,
        height,
    };
}

function drawFields(world) {
    drawField(world.f1);
    drawField(world.f2);
    drawField(world.h_f1);
}

function drawField(f) {
    r.DrawRectangle(f.x, f.y, f.width, f.height, r.BLUE);
}

module.exports = {
    createField,
    drawFields,
}