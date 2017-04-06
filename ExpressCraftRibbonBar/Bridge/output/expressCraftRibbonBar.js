/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 15.7.0
 */
Bridge.assembly("ExpressCraftRibbonBar", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraftRibbonBar.App", {
        statics: {
            r: null,
            config: {
                init: function () {
                    this.r = new System.Random.ctor();
                }
            },
            createRandomRibbonPage: function (caption) {
                var rp = new ExpressCraft.RibbonPage(caption);

                var Groups = ExpressCraftRibbonBar.App.r.next$2(1, 5);

                for (var i = 0; i < Groups; i = (i + 1) | 0) {
                    var Group = new ExpressCraft.RibbonGroup.ctor(i.toString());

                    var buttons = ExpressCraftRibbonBar.App.r.next$2(5, 10);
                    for (var x = 0; x < buttons; x = (x + 1) | 0) {
                        var ribbonButt = new ExpressCraft.RibbonButton(System.String.concat(i.toString(), "_", x.toString()), ExpressCraftRibbonBar.App.r.next$2(1, 3) === 1);
                        ribbonButt.beginGroup = ExpressCraftRibbonBar.App.r.next$2(1, 2) === 1;

                        ribbonButt.onItemClick = $asm.$.ExpressCraftRibbonBar.App.f1;
                        Group.getButtons().add(ribbonButt);
                    }

                    rp.addRibbonGroups([Group]);
                }

                return rp;
            }
        },
        $main: function () {
            ExpressCraft.Form.setup();
            ExpressCraft.Application.setApplicationDefinition(ExpressCraft.ApplicationDefitnion.ExpressCraftConsole);
            var ribbonForm = new ExpressCraftRibbonBar.App.RibbonForm();
            ribbonForm.setText("ExpressCraft RibbonBar Test");
            ribbonForm.ribbonControl.addRibbonPages([ExpressCraftRibbonBar.App.createRandomRibbonPage("Page 01"), ExpressCraftRibbonBar.App.createRandomRibbonPage("Page 02"), ExpressCraftRibbonBar.App.createRandomRibbonPage("Page 03")]);
            ribbonForm.setWindowState(ExpressCraft.WindowState.Maximized);

            ExpressCraft.Application.run(ribbonForm);
        }
    });

    Bridge.ns("ExpressCraftRibbonBar.App", $asm.$);

    Bridge.apply($asm.$.ExpressCraftRibbonBar.App, {
        f1: function (ev) {
            new ExpressCraft.MessageBoxForm.ctor(ev.getCaption(), ExpressCraft.MessageBoxLayout.Information).showDialog();
        }
    });

    Bridge.define("ExpressCraftRibbonBar.App.RibbonForm", {
        inherits: [ExpressCraft.Form],
        ribbonControl: null,
        ctor: function () {
            this.$initialize();
            ExpressCraft.Form.ctor.call(this);
            this.ribbonControl = new ExpressCraft.RibbonControl();
        },
        onShowing: function () {
            ExpressCraft.Form.prototype.onShowing.call(this);

            this.getBody().appendChild(ExpressCraft.Control.op_Implicit(this.ribbonControl));
        }
    });
});
