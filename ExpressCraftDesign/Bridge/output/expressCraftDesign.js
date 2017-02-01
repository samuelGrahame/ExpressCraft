/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 15.7.0
 */
Bridge.assembly("ExpressCraftDesign", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraftDesign.App", {
        $main: function () {
            ExpressCraft.Form.setup();
            ExpressCraft.AceCodeEditor.setup();

            var studio = new ExpressCraftDesign.StudioForm();
            studio.show();

        }
    });

    Bridge.define("ExpressCraftDesign.NewFileDialog", {
        inherits: [ExpressCraft.DialogForm],
        value: null,
        ctor: function () {
            this.$initialize();
            ExpressCraft.DialogForm.ctor.call(this);
            this.setText("Add New Item");

            this._buttonCollection = Bridge.fn.bind(this, $asm.$.ExpressCraftDesign.NewFileDialog.f1)(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());

            this.value = Bridge.merge(new ExpressCraft.TextInput(), {
                setLocation: new ExpressCraft.Vector2.$ctor1(50, 50),
                setSize: new ExpressCraft.Vector2.$ctor1("calc(100% - 100px)", 23)
            } );

            this.value.onTextChanged = Bridge.fn.bind(this, $asm.$.ExpressCraftDesign.NewFileDialog.f2);

            this.value.onKeyUp = Bridge.fn.bind(this, $asm.$.ExpressCraftDesign.NewFileDialog.f3);

            this.getBody().appendChild(ExpressCraft.Control.op_Implicit(this.value));
            ExpressCraft.Helper.appendChildrenTabIndex(this.buttonSection, this._buttonCollection.toArray());

            this.setSize(new ExpressCraft.Vector2.$ctor1(300, 200));
        },
        onShowed: function () {
            ExpressCraft.DialogForm.prototype.onShowed.call(this);

            this.value.content.focus();
        }
    });

    Bridge.ns("ExpressCraftDesign.NewFileDialog", $asm.$);

    Bridge.apply($asm.$.ExpressCraftDesign.NewFileDialog, {
        f1: function (_o1) {
            _o1.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Cancel), {
                setText: "Cancel",
                setLocation: new ExpressCraft.Vector2.$ctor1("calc(100% - 85px)", "calc(100% - 35px)")
            } ));
            _o1.add(Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.OK), {
                setText: "Add",
                setLocation: new ExpressCraft.Vector2.$ctor1("calc(100% - 170px)", "calc(100% - 35px)"),
                setEnabled: false
            } ));
            return _o1;
        },
        f2: function (inp) {
            this._buttonCollection.getItem(1).setEnabled(this.value.getText().length > 0);
        },
        f3: function (inp, key) {
            if (key.keyCode === 13) {
                this._buttonCollection.getItem(1).content.click();
            }
        }
    });

    Bridge.define("ExpressCraftDesign.SourceTabControlPage", {
        inherits: [ExpressCraft.TabControlPage],
        splitControlContainer1: null,
        codeEdtor: null,
        config: {
            properties: {
                Filename: null
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.TabControlPage.ctor.call(this);
            this.splitControlContainer1 = new ExpressCraft.SplitControlContainer();
            ExpressCraft.Helper.setBoundsFull$1(this.splitControlContainer1);

            ExpressCraft.Helper.appendChild(this.splitControlContainer1.panel1, ((this.codeEdtor = Bridge.merge(new ExpressCraft.AceCodeEditor(ExpressCraft.AceModeTypes.xml), {
                setBounds: new ExpressCraft.Vector4.$ctor1(0, 0, "100%", "100%")
            } ))));

            this.splitControlContainer1.setSplitterPosition(500);

            ExpressCraft.Helper.appendChild(this, this.splitControlContainer1);
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
            } ), Bridge.merge(new ExpressCraft.RibbonButton("View Designer"), {
                onItemClick: Bridge.fn.bind(this, $asm.$.ExpressCraftDesign.StudioForm.f2)
            } )])]);

            this.ribbonControl.addRibbonPages([ribbonPage]);

            this.tabControl1 = new ExpressCraft.TabControl();
            ExpressCraft.Helper.setBounds$1(this.tabControl1, 0, 128, "100%", "calc(100% - 128px)");
            this.tabControl1.content.style.borderTopStyle = "solid";
            this.tabControl1.content.style.borderTopColor = "#C3C3C3";
            this.tabControl1.content.style.borderTopWidth = "thin";


            ExpressCraft.Helper.appendChildren$1(this.getBody(), [this.ribbonControl, this.tabControl1]);

            this.setWindowState(ExpressCraft.WindowState.Maximized);
        }
    });

    Bridge.ns("ExpressCraftDesign.StudioForm", $asm.$);

    Bridge.apply($asm.$.ExpressCraftDesign.StudioForm, {
        f1: function (rb) {
            var msg = ExpressCraft.AceCodeEditor.ready();
            if (!Bridge.referenceEquals(msg, "")) {
                new ExpressCraft.MessageBoxForm.$ctor1(msg, ExpressCraft.MessageBoxLayout.Exclamation, ExpressCraft.MessageBoxButtons.Ok).showDialog();
            } else {
                var nfd = new ExpressCraftDesign.NewFileDialog();
                nfd.showDialog([new ExpressCraft.DialogResult(ExpressCraft.DialogResultEnum.OK, Bridge.fn.bind(this, function () {
                    var stcp = Bridge.merge(new ExpressCraftDesign.SourceTabControlPage(), {
                        setFilename: ExpressCraft.Helper.htmlEscape$1(nfd.value.getText()),
                        setCaption: ExpressCraft.Helper.htmlEscape$1((System.String.concat(nfd.value.getText(), ".xml")))
                    } );
                    this.linkchildToForm(stcp.splitControlContainer1);
                    this.tabControl1.addPages([stcp]);
                    this.tabControl1.setSelectedIndex((this.tabControl1.getTabPages().getCount() - 1) | 0);
                }))]);
            }
        },
        f2: function (rb) {
            if (this.tabControl1.getSelectedIndex() !== -1) {
                // get data;
                var tabpage = this.tabControl1.getTabPages().getItem(this.tabControl1.getSelectedIndex());
                var code = tabpage.codeEdtor.getSource();

                ExpressCraft.Form.createFormFromXML(code).showDialog();
            } else {
                new ExpressCraft.MessageBoxForm.ctor("Please create a new form before trying to view the designer.", ExpressCraft.MessageBoxLayout.Information).showDialog();
            }
        }
    });
});
