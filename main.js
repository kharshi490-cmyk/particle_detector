const sketch = require("./sketch");

function loop() {
    while (sketch.running()) {
        sketch.update();
        sketch.draw();
    }
}

function main() {
    const windowWidth = 600;
    const windowHeight = 600;
    sketch.setup(windowWidth, windowHeight);
    loop();
    sketch.teardown();
}

main();