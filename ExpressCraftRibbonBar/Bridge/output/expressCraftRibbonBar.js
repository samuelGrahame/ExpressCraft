/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.0.0-beta4
 */
Bridge.assembly("ExpressCraftRibbonBar", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraftRibbonBar.App", {
        main: function Main () {
            ExpressCraft.Form.Setup();
            ExpressCraft.Application.SetApplicationDefinition(ExpressCraft.ApplicationDefitnion.ExpressCraftConsole);
            var ribbonForm = new ExpressCraftRibbonBar.App.RibbonForm();
            ribbonForm.Text = "ExpressCraft RibbonBar Test";
            ribbonForm.RibbonControl.AddRibbonPages([ExpressCraftRibbonBar.App.CreateRandomRibbonPage("Page 01"), ExpressCraftRibbonBar.App.CreateRandomRibbonPage("Page 02"), ExpressCraftRibbonBar.App.CreateRandomRibbonPage("Page 03")]);
            ribbonForm.SetWindowState(ExpressCraft.WindowState.Maximized);

            ExpressCraft.Application.Run(ribbonForm);
        },
        statics: {
            fields: {
                r: null
            },
            ctors: {
                init: function () {
                    this.r = new System.Random.ctor();
                }
            },
            methods: {
                CreateRandomRibbonPage: function (caption) {
                    var rp = new ExpressCraft.RibbonPage(caption);

                    var Groups = ExpressCraftRibbonBar.App.r.next$2(1, 5);

                    for (var i = 0; i < Groups; i = (i + 1) | 0) {
                        var Group = new ExpressCraft.RibbonGroup.ctor(i.toString());

                        var buttons = ExpressCraftRibbonBar.App.r.next$2(5, 10);
                        for (var x = 0; x < buttons; x = (x + 1) | 0) {
                            var ribbonButt = new ExpressCraft.RibbonButton(System.String.concat(i.toString(), "_", x.toString()), ExpressCraftRibbonBar.App.r.next$2(1, 3) === 1);
                            ribbonButt.BeginGroup = ExpressCraftRibbonBar.App.r.next$2(1, 2) === 1;

                            ribbonButt.OnItemClick = $asm.$.ExpressCraftRibbonBar.App.f1;
                            Group.Buttons.add(ribbonButt);
                        }

                        rp.AddRibbonGroups([Group]);
                    }

                    return rp;
                }
            }
        }
    });

    Bridge.ns("ExpressCraftRibbonBar.App", $asm.$);

    Bridge.apply($asm.$.ExpressCraftRibbonBar.App, {
        f1: function (ev) {
            new ExpressCraft.MessageBoxForm.ctor(ev.Caption, ExpressCraft.MessageBoxLayout.Information).ShowDialog();
        }
    });

    Bridge.define("ExpressCraftRibbonBar.App.RibbonForm", {
        inherits: [ExpressCraft.Form],
        fields: {
            RibbonControl: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                ExpressCraft.Form.ctor.call(this);
                this.RibbonControl = new ExpressCraft.RibbonControl();
            }
        },
        methods: {
            OnShowing: function () {
                ExpressCraft.Form.prototype.OnShowing.call(this);

                this.Body.AppendChild(ExpressCraft.Control.op_Implicit(this.RibbonControl));
            }
        }
    });
});
