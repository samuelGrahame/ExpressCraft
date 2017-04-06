Bridge.assembly("ExpressCraft", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraft.controls.ColorInput", {
        inherits: [ExpressCraft.TextInput],
        ctor: function () {
            this.$initialize();
            ExpressCraft.TextInput.ctor.call(this, "color");

        }
    });
});
