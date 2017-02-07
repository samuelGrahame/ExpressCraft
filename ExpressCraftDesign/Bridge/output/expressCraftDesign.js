/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 15.7.0
 */
Bridge.assembly("ExpressCraftDesign", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraftDesign.App", {
        $main: function () {
            ExpressCraft.Settings.allowCloseWithoutQuestion = true;

            ExpressCraft.Form.setup();
            ExpressCraft.AceCodeEditor.setup();

            var studio = new ExpressCraftDesign.StudioForm();
            studio.show();

        }
    });

    Bridge.define("ExpressCraftDesign.ControlHolder", {
        control: null,
        children: null,
        parent: null,
        config: {
            init: function () {
                this.children = new (System.Collections.Generic.List$1(ExpressCraftDesign.ControlHolder))();
            }
        },
        ctor: function (control, parent) {
            this.$initialize();
            this.control = control;

            if (Bridge.is(this.control, ExpressCraft.Form)) {
                this.attachDrop(Bridge.cast(this.control, ExpressCraft.Form).getBody(), this);
            }

            this.parent = parent;
        },
        generateDeclareDesigner: function (builder) {
            if (Bridge.is(this.control, ExpressCraft.Form) && this.parent == null) {
                // Base
            } else {
                builder.v.appendLine(System.String.concat("\t\tpublic ", Bridge.Reflection.getTypeName(Bridge.getType(this.control)), " ", this.control.getName(), ";"));
            }
            if (this.children != null && this.children.getCount() > 0) {
                for (var i = 0; i < this.children.getCount(); i = (i + 1) | 0) {
                    this.children.getItem(i).generateDeclareDesigner(builder);
                }
            }
        },
        addSetValue: function (name, value, builder, ExternalString) {
            if (ExternalString === void 0) { ExternalString = false; }
            if (ExternalString) {
                builder.v.appendLine(System.String.concat("\t\t\t", this.control.getName(), ".", name, " = ", (Bridge.as(value, String)), ";"));
            } else {
                if (value != null) {
                    if (Bridge.is(value, String)) {
                        builder.v.appendLine(System.String.concat(System.String.concat("\t\t\t", this.control.getName(), ".", name, " = \"", value), "\";"));
                    } else if (ExpressCraft.Helper.isNumber(value)) {
                        builder.v.appendLine(System.String.concat("\t\t\t", this.control.getName(), ".", name, " = ", (Bridge.as(value, String)), ";"));
                    }
                }
            }
        },
        getBoundDesignValue: function (value) {
            if (!ExpressCraft.Helper.isNumber(value)) {
                if (System.String.endsWith(value.toString(), "px")) {
                    return System.Double.format(parseFloat(value.toString()), 'G');
                }
            }
            return ExpressCraft.Helper.isNumber(value) ? value.toString() : System.String.concat("\"", value, "\"");
        },
        generateIniDesigner: function (builder) {
            if (!(Bridge.is(this.control, ExpressCraft.Form) && this.parent == null)) {
                builder.v.appendLine(System.String.concat("\t\t\t", this.control.getName(), " = new ", Bridge.Reflection.getTypeName(Bridge.getType(this.control)), "();"));
            }
            this.addSetValue("Name", this.control.getName(), builder);
            var vec = this.control.getBounds().$clone();

            if (vec.x != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.toHtmlValue(vec.x)) && vec.y != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.toHtmlValue(vec.y))) {
                if (vec.z != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.toHtmlValue(vec.z)) && vec.m != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.toHtmlValue(vec.m))) {
                    // Bounds					
                    this.addSetValue("Bounds", System.String.concat("new Vector4(", this.getBoundDesignValue(this.control.getLeft()), ", ", this.getBoundDesignValue(this.control.getTop()), ", ", this.getBoundDesignValue(this.control.getWidth()), ", ", this.getBoundDesignValue(this.control.getHeight()), ")"), builder, true);
                } else {
                    // Only Location
                    this.addSetValue("Location", System.String.concat("new Vector2(", this.getBoundDesignValue(this.control.getLeft()), ", ", this.getBoundDesignValue(this.control.getTop()), ")"), builder, true);
                }
            } else if (vec.z != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.toHtmlValue(vec.z)) && vec.m != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.toHtmlValue(vec.m))) {
                // Only Size
                this.addSetValue("Size", System.String.concat("new Vector2(", this.getBoundDesignValue(this.control.getWidth()), ", ", this.getBoundDesignValue(this.control.getHeight()), ")"), builder, true);
            } else {
                if (vec.x != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.toHtmlValue(vec.x))) {
                    this.addSetValue("Left", this.getBoundDesignValue(this.control.getLeft()), builder, true);
                }
                if (vec.y != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.toHtmlValue(vec.y))) {
                    this.addSetValue("Top", this.getBoundDesignValue(this.control.getTop()), builder, true);
                }
                if (vec.z != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.toHtmlValue(vec.z))) {
                    this.addSetValue("Width", this.getBoundDesignValue(this.control.getWidth()), builder, true);
                }
                if (vec.m != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.toHtmlValue(vec.m))) {
                    this.addSetValue("Height", this.getBoundDesignValue(this.control.getHeight()), builder, true);
                }
            }

            if (this.children != null && this.children.getCount() > 0) {
                for (var i = 0; i < this.children.getCount(); i = (i + 1) | 0) {
                    this.children.getItem(i).generateIniDesigner(builder);
                }
            }
        },
        attachDrop: function (element, holder) {

        }
    });

    Bridge.define("ExpressCraftDesign.FormDesignerTabControlPage", {
        inherits: [ExpressCraft.TabControlPage],
        splitControlContainer1: null,
        aceCodeEditor: null,
        formHolder: null,
        designerContainer: null,
        config: {
            properties: {
                ClassName: null
            }
        },
        ctor: function (className) {
            this.$initialize();
            ExpressCraft.TabControlPage.ctor.call(this);
            this.setClassName(className);
            this.setCaption(System.String.concat(this.getClassName(), ".Form"));
            this.splitControlContainer1 = new ExpressCraft.SplitControlContainer();
            ExpressCraft.Helper.setBoundsFull$1(this.splitControlContainer1);

            this.aceCodeEditor = new ExpressCraft.AceCodeEditor(ExpressCraft.AceModeTypes.csharp, ExpressCraft.AceThemeTypes.twilight);
            ExpressCraft.Helper.appendChild(this.splitControlContainer1.panel1, (this.aceCodeEditor = Bridge.merge(new ExpressCraft.AceCodeEditor(ExpressCraft.AceModeTypes.csharp, ExpressCraft.AceThemeTypes.twilight), {
                setBounds: new ExpressCraft.Vector4.$ctor1(0, 0, "100%", "100%")
            } )));

            this.aceCodeEditor.setReadOnly(true);
            this.formHolder = new ExpressCraftDesign.ControlHolder(Bridge.merge(new ExpressCraft.Form(), {
                setName: className,
                setSize: new ExpressCraft.Vector2.$ctor1(640, 480),
                setText: this.getClassName()
            } ), null);
            var frm = this.formHolder.control;
            frm.inDesign = true;

            this.designerContainer = ExpressCraft.Control.div();
            ExpressCraft.Helper.setBounds(this.designerContainer, 15, 15, "calc(100% - 30px)", "calc(100% - 30px)");

            this.designerContainer.appendChild(ExpressCraft.Control.op_Implicit(this.formHolder.control));

            frm.content.style.visibility = "inherit";

            this.splitControlContainer1.panel2.content.style.overflow = "auto";

            this.splitControlContainer1.panel2.content.appendChild(this.designerContainer);

            this.splitControlContainer1.panel2.content.style.backgroundColor = ExpressCraft.Color.op_Implicit$1(ExpressCraft.Color.getWhite().$clone());

            this.splitControlContainer1.setSplitterPosition(572);

            ExpressCraft.Helper.appendChild(this, this.splitControlContainer1);

            this.generateSourceCode();

            this.aceCodeEditor.clearSelection();
        },
        generateSourceCode: function () {
            var builder = { v : new System.Text.StringBuilder() };

            builder.v.appendLine("using ExpressCraft;\r\n");

            builder.v.appendLine("namespace ExpressDemo");
            builder.v.appendLine("{");


            builder.v.appendLine(System.String.concat("\tpublic class ", this.getClassName()));
            builder.v.appendLine("\t{");

            this.formHolder.generateDeclareDesigner(builder);

            builder.v.appendLine();

            builder.v.appendLine(System.String.concat("\t\tpublic ", this.getClassName(), "()"));

            builder.v.appendLine("\t\t{");

            this.formHolder.generateIniDesigner(builder);

            builder.v.appendLine("\t\t}");

            builder.v.appendLine();


            builder.v.appendLine("\t}");

            builder.v.appendLine("}");

            this.aceCodeEditor.setSource(builder.v.toString());
            //	public class 
        },
        addControl: function (Parent, Control) {
            Parent.children.add(Control);

            this.generateSourceCode();
        },
        removeControl: function (Control) {
            if (Control.parent == null) {
                return;
            }

            Control.parent.children.remove(Control);

            this.generateSourceCode();
        },
        render: function () {
            ExpressCraft.TabControlPage.prototype.render.call(this);
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

    Bridge.define("ExpressCraftDesign.StudioForm", {
        inherits: [ExpressCraft.Form],
        ribbonControl1: null,
        tabControl1: null,
        splitControlContainer1: null,
        gridView1: null,
        ctor: function () {
            this.$initialize();
            ExpressCraft.Form.ctor.call(this);
            this.ribbonControl1 = new ExpressCraft.RibbonControl(ExpressCraft.RibbonControl.RibbonType.Compact);

            var ribbonPage = new ExpressCraft.RibbonPage("Actions");
            ribbonPage.addRibbonGroups([new ExpressCraft.RibbonGroup.$ctor1("Project", [Bridge.merge(new ExpressCraft.RibbonButton("New Form"), {
                onItemClick: Bridge.fn.bind(this, $asm.$.ExpressCraftDesign.StudioForm.f1)
            } )])]);

            this.ribbonControl1.addRibbonPages([ribbonPage]);

            this.splitControlContainer1 = new ExpressCraft.SplitControlContainer();

            this.splitControlContainer1.setSplitterPosition(176);
            ExpressCraft.Helper.setBounds$1(this.splitControlContainer1, 0, 128, "100%", "calc(100% - 128px)");

            this.tabControl1 = new ExpressCraft.TabControl();

            ExpressCraft.Helper.setBoundsFull$1(this.tabControl1);
            this.tabControl1.content.style.borderTopStyle = "solid";
            this.tabControl1.content.style.borderTopColor = "#C3C3C3";
            this.tabControl1.content.style.borderTopWidth = "thin";

            ExpressCraft.Helper.appendChild(this.splitControlContainer1.panel2, this.tabControl1);

            this.gridView1 = new ExpressCraft.GridView(false, true);

            ExpressCraft.Helper.setBoundsFull$1(this.gridView1);

            ExpressCraft.Helper.appendChild(this.splitControlContainer1.panel1, this.gridView1);

            ExpressCraft.Helper.appendChildren$1(this.getBody(), [this.ribbonControl1, this.splitControlContainer1]);

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
                    var stcp = new ExpressCraftDesign.FormDesignerTabControlPage(ExpressCraft.Helper.htmlEscape$1(nfd.value.getText()));
                    this.linkchildToForm(stcp.splitControlContainer1);
                    this.tabControl1.addPages([stcp]);
                    this.tabControl1.setSelectedIndex((this.tabControl1.getTabPages().getCount() - 1) | 0);
                }))]);
            }
        }
    });
});
