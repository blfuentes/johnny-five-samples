const {Board, Led} = require("johnny-five");
const board = new Board();

board.on("ready", () => {
    console.log("Ready!");
    const led = new Led(13);
    led.blink(2000);
});