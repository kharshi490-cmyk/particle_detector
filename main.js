const sketch = require("./sketch");

function loop(world) {
    while (sketch.running()) {
        sketch.update(world);
        sketch.draw(world);
    }
}

function main() {
    const window = {
        width: 600,
        height: 600,
    }
    // const windowWidth = 600;
    // const windowHeight = 600;
    const world = sketch.setup(window);
    loop(world);
    sketch.teardown();
}

main();