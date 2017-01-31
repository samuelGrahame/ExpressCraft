/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 15.6.0
 */
Bridge.assembly("ExpressCraftDesign", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraftDesign.App", {
        $main: function () {
            ExpressCraft.Form.setup();

            var studio = new ExpressCraftDesign.StudioForm();
            studio.show();

        }
    });

    Bridge.define("ExpressCraftDesign.StudioForm", {
        inherits: [ExpressCraft.Form],
        ribbonControl: null,
        panel1: null,
        ctor: function () {
            this.$initialize();
            ExpressCraft.Form.ctor.call(this);
            this.ribbonControl = new ExpressCraft.RibbonControl(ExpressCraft.RibbonControl.RibbonType.Compact);

            this.panel1 = new ExpressCraft.Control.ctor();

            ExpressCraft.Helper.setBounds$1(this.panel1, 0, 154, "100%", "calc(100% - 154px)");

            ExpressCraft.Helper.appendChildren$1(this.getBody(), [this.ribbonControl, this.panel1]);
        }
    });
});
