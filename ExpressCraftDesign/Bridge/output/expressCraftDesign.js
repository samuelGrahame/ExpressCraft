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

    Bridge.define("ExpressCraftDesign.NewFileDialog", {
        inherits: [ExpressCraft.DialogForm],
        ctor: function () {
            this.$initialize();
            ExpressCraft.DialogForm.ctor.call(this);
            ExpressCraft.Helper.setSize$1(this, 550, 300);

            this._buttonCollection = Bridge.fn.bind(this, $asm.$.ExpressCraftDesign.NewFileDialog.f1)(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());

            ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(0), "calc(100% - 85px)", "calc(100% - 35px)");
            ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(1), "calc(100% - 170px)", "calc(100% - 35px)");
        }
    });

    Bridge.ns("ExpressCraftDesign.NewFileDialog", $asm.$);

    Bridge.apply($asm.$.ExpressCraftDesign.NewFileDialog, {
        f1: function (_o1) {
            _o1.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Cancel), {
                setText: "Cancel"
            } ));
            _o1.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.OK), {
                setText: "Add"
            } ));
            return _o1;
        }
    });

    Bridge.define("ExpressCraftDesign.SourceTabControlPage", {
        inherits: [ExpressCraft.TabControlPage],
        config: {
            properties: {
                Filename: null
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.TabControlPage.ctor.call(this);

        },
        render: function () {
            ExpressCraft.TabControlPage.prototype.render.call(this);
        }
    });

    Bridge.define("ExpressCraftDesign.StudioForm", {
        inherits: [ExpressCraft.Form],
        ribbonControl: null,
        tabControl1: null,
        ctor: function () {
            this.$initialize();
            ExpressCraft.Form.ctor.call(this);
            this.ribbonControl = new ExpressCraft.RibbonControl(ExpressCraft.RibbonControl.RibbonType.Compact);

            var ribbonPage = new ExpressCraft.RibbonPage("Actions");
            ribbonPage.addRibbonGroups([new ExpressCraft.RibbonGroup.$ctor1("Project", [Bridge.merge(new ExpressCraft.RibbonButton("New Form"), {
                onItemClick: Bridge.fn.bind(this, $asm.$.ExpressCraftDesign.StudioForm.f1)
            } )])]);


            this.ribbonControl.addRibbonPages([ribbonPage]);

            this.tabControl1 = new ExpressCraft.TabControl();
            ExpressCraft.Helper.setBounds$1(this.tabControl1, 0, 154, "100%", "calc(100% - 154px)");

            ExpressCraft.Helper.appendChildren$1(this.getBody(), [this.ribbonControl, this.tabControl1]);

            this.setWindowState(ExpressCraft.WindowState.Maximized);
        }
    });

    Bridge.ns("ExpressCraftDesign.StudioForm", $asm.$);

    Bridge.apply($asm.$.ExpressCraftDesign.StudioForm, {
        f1: function (rb) {
            this.tabControl1.addPages([Bridge.merge(new ExpressCraft.TabControlPage(), {
                setCaption: ""
            } )]);
        }
    });
});
