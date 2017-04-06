Bridge.assembly("ExpressCraft", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraft.forms.ThemeForm", {
        inherits: [ExpressCraft.DialogForm],
        statics: {
            _themeVisible: false,
            themeForm: null,
            showThemeForm: function () {
                if (!ExpressCraft.forms.ThemeForm._themeVisible) {
                    ExpressCraft.forms.ThemeForm.themeForm = new ExpressCraft.forms.ThemeForm();
                    ExpressCraft.forms.ThemeForm.themeForm.show(null, true);

                    ExpressCraft.forms.ThemeForm._themeVisible = true;
                }
            }
        },
        currentTheme: null,
        prevTheme: null,
        ctor: function () {
            this.$initialize();
            ExpressCraft.DialogForm.ctor.call(this);
            this.prevTheme = ExpressCraft.Settings.getActiveTheme();
            this.currentTheme = Bridge.merge(Bridge.createInstance(ExpressCraft.Theme), JSON.parse(JSON.stringify(this.prevTheme)));

            ExpressCraft.Settings.setActiveTheme(this.currentTheme);

            this._buttonCollection = Bridge.fn.bind(this, $asm.$.ExpressCraft.forms.ThemeForm.f3)(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());

            ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(0), "calc(100% - 85px)", "calc(100% - 35px)");
            ExpressCraft.Helper.setLocation$1(this._buttonCollection.getItem(1), "calc(100% - 170px)", "calc(100% - 35px)");

            ExpressCraft.Helper.appendChildrenTabIndex(this.buttonSection, this._buttonCollection.toArray());

            var length = this.currentTheme.colors.length;
            var y = 20;
            var x = 20;

            var Panel = ExpressCraft.Control.div();
            Panel.style.overflowY = "auto";
            ExpressCraft.Helper.setBounds$1(Panel, 0, 0, "100%", "calc(100% - 60px)");

            this.getBody().style.backgroundColor = ExpressCraft.Color.op_Implicit$1(ExpressCraft.Color.getWhite().$clone());

            for (var i = 0; i < length; i = (i + 1) | 0) {
                Panel.appendChild(ExpressCraft.Control.op_Implicit(ExpressCraft.Helper.setBounds(Bridge.merge(new ExpressCraft.ColorInput(), {
                    onTextChanged: Bridge.fn.bind(this, $asm.$.ExpressCraft.forms.ThemeForm.f4)
                } ).setAttribute("i", i), x, y, 95, 20)));

                x = (x + 100) | 0;

                if (i % 2 === 0) {
                    y = (y + 30) | 0;
                    x = 20;
                }
            }

            this.getBody().appendChild(Panel);

            this.setSize(new ExpressCraft.Vector2.$ctor1(300, 300));

            this.allowMoveChange = true;
            this.allowSizeChange = false;

            this.setShowClose(false);
            this.setShowMaximize(false);
            this.setShowMinimize(false);
        }
    });

    Bridge.ns("ExpressCraft.forms.ThemeForm", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.forms.ThemeForm, {
        f1: function (ev) {
            ExpressCraft.Settings.setActiveTheme(this.prevTheme);
            this.close();
        },
        f2: function (ev) {
            ExpressCraft.Settings.applyActiveTheme();
            this.close();
        },
        f3: function (_o2) {
            _o2.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Cancel), {
                setText: "Cancel",
                itemClick: Bridge.fn.bind(this, $asm.$.ExpressCraft.forms.ThemeForm.f1)
            } ));
            _o2.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.OK), {
                setText: "OK",
                itemClick: Bridge.fn.bind(this, $asm.$.ExpressCraft.forms.ThemeForm.f2)
            } ));
            return _o2;
        },
        f4: function (tx) {
            var index = tx.getAttributei("i");
            this.currentTheme.colors[index] = tx.getText();

            ExpressCraft.Settings.applyActiveTheme();
        }
    });
});
