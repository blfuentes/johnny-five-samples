var five = require("johnny-five");
var temporal = require("temporal");
var board = new five.Board();

board.on("ready", function () {
    var events = [];
    var strobe = new five.Pin(13);
    //var led = new five.Led(13);

    this.repl.inject({
        // Allow limited on/off control access to the
        // Led instance from the REPL.
        on: function () {
            console.log("turning on!");
            strobe["high"]();
        },
        off: function () {
            console.log("turning off!");
            strobe["low"]();
        }
    });

    // temporal.loop(1000, function (loop) {
    //     strobe[loop.called % 2 === 0 ? "high" : "low"]();
    // });


    // Pin emits "high" and "low" events, whether it's
    // input or output.
    ["high", "low"].forEach(function (state) {
        strobe.on(state, function () {
            if (events.indexOf(state) === -1) {
                console.log("Event emitted for:", state, "on", this.addr);
                events.push(state);
            }
        });
    });

    var analog = new five.Pin("A0");

    // Query the analog pin for its current state.
    analog.query(function (state) {
        console.log(`Analog state: ${state}`);
    });
});
