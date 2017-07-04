/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.0.0-beta4
 */
Bridge.assembly("ExpressCraftDesign", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraftDesign.App", {
        main: function Main () {
            ExpressCraft.Settings.AllowCloseWithoutQuestion = true;

            ExpressCraft.AceCodeEditor.Setup();

            ExpressCraft.Application.SetApplicationDefinition(ExpressCraft.ApplicationDefitnion.ExpressCraftConsole);

            ExpressCraftDesign.App.studio = new ExpressCraftDesign.StudioForm();

            ExpressCraft.Application.Run(ExpressCraftDesign.App.studio);
        },
        statics: {
            fields: {
                studio: null
            }
        }
    });

    Bridge.define("ExpressCraftDesign.ControlHolder", {
        statics: {
            methods: {
                GetNewName: function (namel, fdtcp) {
                    var listOfAllControls = fdtcp.formHolder.GetListOfAllChildren();
                    var ListOfNames = new (System.Collections.Generic.List$1(System.String))();

                    var x;
                    for (x = 0; x < listOfAllControls.Count; x = (x + 1) | 0) {
                        ListOfNames.add(listOfAllControls.getItem(x).Control.Name);
                    }

                    var newName = "";
                    x = 1;

                    while (ListOfNames.contains(((newName = System.String.concat(namel, Bridge.identity(x, (x = (x + 1) | 0))))))) {
                    }

                    return newName;


                }
            }
        },
        fields: {
            Control: null,
            Children: null,
            Parent: null
        },
        ctors: {
            init: function () {
                this.Children = new (System.Collections.Generic.List$1(ExpressCraftDesign.ControlHolder))();
            },
            ctor: function (control, parent) {
                this.$initialize();
                this.Control = control;

                if (Bridge.is(this.Control, ExpressCraft.Form)) {
                    this.AttachDrop(Bridge.cast(this.Control, ExpressCraft.Form).Body, this);
                } else if (Bridge.is(this.Control, ExpressCraft.TabControlPage)) {
                    var tb = Bridge.cast(parent.Control, ExpressCraft.TabControl);
                    tb.AddPages([Bridge.cast(control, ExpressCraft.TabControlPage)]);

                    this.AttachDrop(Bridge.cast(this.Control, ExpressCraft.TabControlPage).Content, this);
                } else if (Bridge.is(this.Control, ExpressCraft.RibbonPage)) {
                    var tb1 = Bridge.cast(parent.Control, ExpressCraft.RibbonControl);
                    tb1.AddRibbonPages([Bridge.cast(control, ExpressCraft.RibbonPage)]);

                    this.AttachDrop(Bridge.cast(this.Control, ExpressCraft.RibbonPage).Content, this);
                } else if (Bridge.is(this.Control, ExpressCraft.RibbonGroup)) {
                    var tb2 = Bridge.cast(parent.Control, ExpressCraft.RibbonPage);
                    tb2.AddRibbonGroups([Bridge.cast(control, ExpressCraft.RibbonGroup)]);

                    this.AttachDrop(Bridge.cast(this.Control, ExpressCraft.RibbonGroup).Content, this);
                } else if (Bridge.is(this.Control, ExpressCraft.RibbonButton)) {
                    var tb3 = Bridge.cast(parent.Control, ExpressCraft.RibbonGroup);
                    tb3.riList = null;
                    tb3.Buttons.add(Bridge.cast(control, ExpressCraft.RibbonButton));
                } else {
                    if (Bridge.is(this.Control, ExpressCraft.TabControl) || Bridge.is(control, ExpressCraft.RibbonControl)) {
                        this.AttachDrop(this.Control.Content, this);
                    }

                    if (Bridge.is(parent.Control, ExpressCraft.Form)) {
                        Bridge.cast(parent.Control, ExpressCraft.Form).Body.AppendChild(ExpressCraft.Control.op_Implicit(control));
                    } else {
                        ExpressCraft.Helper.AppendChild(parent.Control, control);
                    }

                }

                this.Parent = parent;
            }
        },
        methods: {
            GetListOfAllChildren: function () {
                var lch = new (System.Collections.Generic.List$1(ExpressCraftDesign.ControlHolder))();

                lch.add(this);

                if (this.Children.Count > 0) {
                    for (var i = 0; i < this.Children.Count; i = (i + 1) | 0) {
                        lch.addRange(this.Children.getItem(i).GetListOfAllChildren());
                    }
                }
                return lch;
            },
            GenerateDeclareDesigner: function (builder) {
                if (Bridge.is(this.Control, ExpressCraft.Form) && this.Parent == null) {
                    // Base
                } else {
                    builder.v.appendLine(System.String.concat("\t\tpublic ", Bridge.Reflection.getTypeName(Bridge.getType(this.Control)), " ", this.Control.Name, ";"));
                }
                if (this.Children != null && this.Children.Count > 0) {
                    for (var i = 0; i < this.Children.Count; i = (i + 1) | 0) {
                        this.Children.getItem(i).GenerateDeclareDesigner(builder);
                    }
                }
            },
            AddSetValue: function (name, value, builder, ExternalString) {
                if (ExternalString === void 0) { ExternalString = false; }
                if (ExternalString) {
                    builder.v.appendLine(System.String.concat("\t\t\t", this.Control.Name, ".", name, " = ", (Bridge.as(value, System.String)), ";"));
                } else {
                    if (value != null) {
                        if (Bridge.is(value, System.String)) {
                            builder.v.appendLine(System.String.concat(System.String.concat("\t\t\t", this.Control.Name, ".", name, " = \"", value), "\";"));
                        } else if (ExpressCraft.Helper.IsNumber(value)) {
                            builder.v.appendLine(System.String.concat("\t\t\t", this.Control.Name, ".", name, " = ", (Bridge.as(value, System.String)), ";"));
                        }
                    }
                }
            },
            GetBoundDesignValue: function (value) {
                if (!ExpressCraft.Helper.IsNumber(value)) {
                    if (System.String.endsWith(value.toString(), "px")) {
                        return System.Double.format(parseFloat(value.toString()));
                    }
                }
                return ExpressCraft.Helper.IsNumber(value) ? value.toString() : System.String.concat("\"", value, "\"");
            },
            GenerateIniDesigner: function (builder) {
                if (!(Bridge.is(this.Control, ExpressCraft.Form) && this.Parent == null)) {
                    builder.v.appendLine(System.String.concat("// ", this.Control.Name));

                    builder.v.appendLine(System.String.concat("\t\t\t", this.Control.Name, " = new ", Bridge.Reflection.getTypeName(Bridge.getType(this.Control)), "();"));
                }
                this.AddSetValue("Name", this.Control.Name, builder);
                var vec = this.Control.Bounds.$clone();

                if (vec.X != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.ToHtmlValue(vec.X)) && vec.Y != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.ToHtmlValue(vec.Y))) {
                    if (vec.Z != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.ToHtmlValue(vec.Z)) && vec.M != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.ToHtmlValue(vec.M))) {
                        // Bounds					
                        this.AddSetValue("Bounds", System.String.concat("new Vector4(", this.GetBoundDesignValue(this.Control.Left), ", ", this.GetBoundDesignValue(this.Control.Top), ", ", this.GetBoundDesignValue(this.Control.Width), ", ", this.GetBoundDesignValue(this.Control.Height), ")"), builder, true);
                    } else {
                        // Only Location
                        this.AddSetValue("Location", System.String.concat("new Vector2(", this.GetBoundDesignValue(this.Control.Left), ", ", this.GetBoundDesignValue(this.Control.Top), ")"), builder, true);
                    }
                } else if (vec.Z != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.ToHtmlValue(vec.Z)) && vec.M != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.ToHtmlValue(vec.M))) {
                    // Only Size
                    this.AddSetValue("Size", System.String.concat("new Vector2(", this.GetBoundDesignValue(this.Control.Width), ", ", this.GetBoundDesignValue(this.Control.Height), ")"), builder, true);
                } else {
                    if (vec.X != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.ToHtmlValue(vec.X))) {
                        this.AddSetValue("Left", this.GetBoundDesignValue(this.Control.Left), builder, true);
                    }
                    if (vec.Y != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.ToHtmlValue(vec.Y))) {
                        this.AddSetValue("Top", this.GetBoundDesignValue(this.Control.Top), builder, true);
                    }
                    if (vec.Z != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.ToHtmlValue(vec.Z))) {
                        this.AddSetValue("Width", this.GetBoundDesignValue(this.Control.Width), builder, true);
                    }
                    if (vec.M != null && !System.String.isNullOrWhiteSpace(ExpressCraft.Helper.ToHtmlValue(vec.M))) {
                        this.AddSetValue("Height", this.GetBoundDesignValue(this.Control.Height), builder, true);
                    }
                }

                if (this.Children != null && this.Children.Count > 0) {
                    for (var i = 0; i < this.Children.Count; i = (i + 1) | 0) {
                        this.Children.getItem(i).GenerateIniDesigner(builder);
                    }
                }
            },
            AttachDrop: function (element, holder) {
                element.ondragover = $asm.$.ExpressCraftDesign.ControlHolder.f1;
                element.ondrop = function (ev) {
                    var $t;
                    ev.StopImmediatePropagation();
                    var x = ev.layerX;
                    var y = ev.layerY;
                    var offlineDataRow = Bridge.merge(Bridge.createInstance(ExpressCraft.DataRow), JSON.parse(ev.dataTransfer.getData("gridviewRowDrag")));

                    if (offlineDataRow.batchData.length === 1) {
                        var ControlName = Bridge.cast(offlineDataRow.getItem(0), System.String);
                        var ch = null;
                        var fdtcp = Bridge.cast(ExpressCraftDesign.App.studio.tabControl1.TabPages.getItem(ExpressCraftDesign.App.studio.tabControl1.SelectedIndex), ExpressCraftDesign.FormDesignerTabControlPage);
                        //dt.AddRow("SimpleButton");
                        //dt.AddRow("Control");
                        //dt.AddRow("RibbonControl");
                        //dt.AddRow("TabControl");
                        //dt.AddRow("TextInput");
                        //dt.AddRow("GridView");
                        if (Bridge.referenceEquals(ControlName, "SimpleButton")) {
                            var simb = ($t = new ExpressCraft.SimpleButton(), $t.Location = new ExpressCraft.Vector2.$ctor1(x, y), $t.Name = ExpressCraftDesign.ControlHolder.GetNewName("simpleButton", fdtcp), $t);
                            simb.Text = simb.Name;
                            ch = new ExpressCraftDesign.ControlHolder(simb, holder);

                            holder.Children.add(ch);

                            fdtcp.GenerateSourceCode();
                        } else if (Bridge.referenceEquals(ControlName, "TabControl")) {
                            var tabc = ($t = new ExpressCraft.TabControl(), $t.Location = new ExpressCraft.Vector2.$ctor1(x, y), $t.Size = new ExpressCraft.Vector2.$ctor1(200, 200), $t.Name = ExpressCraftDesign.ControlHolder.GetNewName("tabControl", fdtcp), $t);

                            ch = new ExpressCraftDesign.ControlHolder(tabc, holder);

                            holder.Children.add(ch);

                            var tabp1 = ($t = new ExpressCraft.TabControlPage(), $t.Name = ExpressCraftDesign.ControlHolder.GetNewName("tabPage", fdtcp), $t);
                            var ch1 = new ExpressCraftDesign.ControlHolder(tabp1, ch);
                            tabp1.Caption = tabp1.Name;

                            ch.Children.add(ch1);

                            var tabp2 = ($t = new ExpressCraft.TabControlPage(), $t.Name = ExpressCraftDesign.ControlHolder.GetNewName("tabPage", fdtcp), $t);
                            var ch2 = new ExpressCraftDesign.ControlHolder(tabp2, ch);
                            tabp2.Caption = tabp2.Name;

                            ch.Children.add(ch2);

                            tabc.ResizeTabHeaders();

                            fdtcp.GenerateSourceCode();
                        } else if (Bridge.referenceEquals(ControlName, "TabControlPage") && Bridge.is(holder.Control, ExpressCraft.TabControl)) {
                            var tabc1 = ($t = new ExpressCraft.TabControlPage(), $t.Name = ExpressCraftDesign.ControlHolder.GetNewName("tabPage", fdtcp), $t);
                            tabc1.Caption = tabc1.Name;
                            ch = new ExpressCraftDesign.ControlHolder(tabc1, holder);

                            holder.Children.add(ch);

                            fdtcp.GenerateSourceCode();
                        } else if (Bridge.referenceEquals(ControlName, "RibbonControl") && Bridge.is(holder.Control, ExpressCraft.Form)) {
                            var ribbc = ($t = new ExpressCraft.RibbonControl(ExpressCraft.RibbonControl.RibbonType.Compact), $t.Name = ExpressCraftDesign.ControlHolder.GetNewName("ribbonControl", fdtcp), $t);

                            ch = new ExpressCraftDesign.ControlHolder(ribbc, holder);

                            holder.Children.add(ch);

                            var ribp = new ExpressCraft.RibbonPage(ExpressCraftDesign.ControlHolder.GetNewName("ribbonPage", fdtcp));
                            ribp.Name = ribp.Caption;

                            var ch21 = new ExpressCraftDesign.ControlHolder(ribp, ch);

                            ch.Children.add(ch21);

                            var ribpg = new ExpressCraft.RibbonGroup.ctor(ExpressCraftDesign.ControlHolder.GetNewName("ribbonGroup", fdtcp));
                            ribpg.Name = ribpg.Caption;

                            var ch3 = new ExpressCraftDesign.ControlHolder(ribpg, ch21);

                            ch21.Children.add(ch3);

                            ribbc.Render();

                            fdtcp.GenerateSourceCode();
                        } else if (Bridge.referenceEquals(ControlName, "RibbonControlPage") && Bridge.is(holder.Control, ExpressCraft.RibbonControl)) {
                            var ribbc1 = new ExpressCraft.RibbonPage(ExpressCraftDesign.ControlHolder.GetNewName("ribbonPage", fdtcp));
                            ribbc1.Name = ribbc1.Caption;

                            ch = new ExpressCraftDesign.ControlHolder(ribbc1, holder);

                            holder.Children.add(ch);

                            Bridge.cast(holder.Control, ExpressCraft.RibbonControl).Render();

                            fdtcp.GenerateSourceCode();
                        } else if (Bridge.referenceEquals(ControlName, "RibbonPageGroup") && Bridge.is(holder.Control, ExpressCraft.RibbonPage)) {
                            var ribbc2 = new ExpressCraft.RibbonGroup.ctor(ExpressCraftDesign.ControlHolder.GetNewName("ribbonGroup", fdtcp));
                            ribbc2.Name = ribbc2.Caption;

                            ch = new ExpressCraftDesign.ControlHolder(ribbc2, holder);

                            holder.Children.add(ch);

                            Bridge.cast(holder.Parent.Control, ExpressCraft.RibbonControl).Render();

                            fdtcp.GenerateSourceCode();
                        } else if (Bridge.referenceEquals(ControlName, "RibbonGroupButton") && Bridge.is(holder.Control, ExpressCraft.RibbonGroup)) {
                            var ribbc3 = new ExpressCraft.RibbonButton(ExpressCraftDesign.ControlHolder.GetNewName("ribbonButton", fdtcp));
                            ribbc3.Name = ribbc3.Caption;

                            ch = new ExpressCraftDesign.ControlHolder(ribbc3, holder);

                            holder.Children.add(ch);

                            Bridge.cast(holder.Parent.Parent.Control, ExpressCraft.RibbonControl).Render();

                            fdtcp.GenerateSourceCode();
                        } else if (Bridge.referenceEquals(ControlName, "GridView")) {
                            var ribbc4 = ($t = new ExpressCraft.GridView(false, false), $t.Name = ExpressCraftDesign.ControlHolder.GetNewName("gridView", fdtcp), $t.Location = new ExpressCraft.Vector2.$ctor1(x, y), $t.Size = new ExpressCraft.Vector2.$ctor1(200, 200), $t);

                            ch = new ExpressCraftDesign.ControlHolder(ribbc4, holder);

                            holder.Children.add(ch);

                            fdtcp.GenerateSourceCode();
                        } else if (Bridge.referenceEquals(ControlName, "Control")) {
                            var ribbc5 = ($t = new ExpressCraft.Control.$ctor1(), $t.Name = ExpressCraftDesign.ControlHolder.GetNewName("control", fdtcp), $t.Location = new ExpressCraft.Vector2.$ctor1(x, y), $t.Size = new ExpressCraft.Vector2.$ctor1(200, 200), $t);

                            ch = new ExpressCraftDesign.ControlHolder(ribbc5, holder);

                            holder.Children.add(ch);

                            fdtcp.GenerateSourceCode();
                        } else if (Bridge.referenceEquals(ControlName, "TextInput")) {
                            var ribbc6 = ($t = new ExpressCraft.TextInput(), $t.Name = ExpressCraftDesign.ControlHolder.GetNewName("textInput", fdtcp), $t.Location = new ExpressCraft.Vector2.$ctor1(x, y), $t);

                            ch = new ExpressCraftDesign.ControlHolder(ribbc6, holder);

                            holder.Children.add(ch);

                            fdtcp.GenerateSourceCode();
                        } else if (Bridge.referenceEquals(ControlName, "SplitControlContainer")) {
                            var ribbc7 = ($t = new ExpressCraft.SplitControlContainer(), $t.Name = ExpressCraftDesign.ControlHolder.GetNewName("splitControlContainer", fdtcp), $t.Location = new ExpressCraft.Vector2.$ctor1(x, y), $t.Size = new ExpressCraft.Vector2.$ctor1(200, 200), $t);
                            ribbc7.SplitterPosition = 100;

                            ch = new ExpressCraftDesign.ControlHolder(ribbc7, holder);

                            holder.Children.add(ch);

                            fdtcp.GenerateSourceCode();
                        }

                        //dt.AddRow("RibbonControlPage");
                        //dt.AddRow("RibbonPageGroup");
                        //dt.AddRow("RibbonGroupButton");
                    }

                    //gridviewRowDrag
                };
                //int x = Script.Write<int>("ev.layerX");
                //var SelectedIndex = Script.Write<int>("parseInt(ev.dataTransfer.getData(\"gridviewColumnDrag\"));");
            }
        }
    });

    Bridge.ns("ExpressCraftDesign.ControlHolder", $asm.$);

    Bridge.apply($asm.$.ExpressCraftDesign.ControlHolder, {
        f1: function (ev) {
            ev.PreventDefault();
            //gridviewRowDrag
        }
    });

    Bridge.define("ExpressCraftDesign.FormDesignerTabControlPage", {
        inherits: [ExpressCraft.TabControlPage],
        fields: {
            splitControlContainer1: null,
            aceCodeEditor: null,
            formHolder: null,
            designerContainer: null,
            splitControlContainer2: null
        },
        props: {
            ClassName: null
        },
        ctors: {
            ctor: function (className) {
                this.$initialize();
                ExpressCraft.TabControlPage.ctor.call(this);
                var $t;
                this.ClassName = className;
                this.Caption = System.String.concat(this.ClassName, ".Form");

                this.splitControlContainer2 = new ExpressCraft.SplitControlContainer();
                ExpressCraft.Helper.SetBoundsFull(this.splitControlContainer2);

                this.splitControlContainer1 = new ExpressCraft.SplitControlContainer();
                ExpressCraft.Helper.SetBoundsFull(this.splitControlContainer1);

                this.aceCodeEditor = new ExpressCraft.AceCodeEditor(ExpressCraft.AceModeTypes.csharp, ExpressCraft.AceThemeTypes.twilight);
                ExpressCraft.Helper.AppendChild(this.splitControlContainer1.Panel1, (this.aceCodeEditor = ($t = new ExpressCraft.AceCodeEditor(ExpressCraft.AceModeTypes.csharp, ExpressCraft.AceThemeTypes.twilight), $t.Bounds = new ExpressCraft.Vector4.$ctor1(0, 0, "100%", "100%"), $t)));

                this.aceCodeEditor.ReadOnly = true;
                this.formHolder = new ExpressCraftDesign.ControlHolder(($t = new ExpressCraft.Form(), $t.Name = className, $t.Size = new ExpressCraft.Vector2.$ctor1(640, 480), $t.Text = this.ClassName, $t), null);
                var frm = this.formHolder.Control;
                frm.InDesign = true;

                this.designerContainer = ExpressCraft.Control.Div();
                ExpressCraft.Helper.SetBounds$1(this.designerContainer, 15, 15, "calc(100% - 30px)", "calc(100% - 30px)");

                this.designerContainer.AppendChild(ExpressCraft.Control.op_Implicit(this.formHolder.Control));

                frm.Content.Style.Visibility = "inherit";

                this.splitControlContainer1.Panel2.Content.Style.Overflow = "auto";

                this.splitControlContainer1.Panel2.Content.AppendChild(this.designerContainer);

                this.splitControlContainer1.Panel2.Content.Style.BackgroundColor = ExpressCraft.Color.op_Implicit$1(ExpressCraft.Color.White.$clone());

                this.splitControlContainer1.SplitterPosition = 572;

                this.splitControlContainer2.SplitterPosition = 176;
                this.splitControlContainer2.FixedSplitterPostion = ExpressCraft.FixedSplitterPosition.Panel2;
                ExpressCraft.Helper.AppendChild(this.splitControlContainer2.Panel1, this.splitControlContainer1);

                ExpressCraftDesign.App.studio.LinkchildrenToForm([this.splitControlContainer1, this.splitControlContainer2]);

                ExpressCraft.Helper.AppendChild(this, this.splitControlContainer2);

                this.GenerateSourceCode();

                this.aceCodeEditor.ClearSelection();
        }
    },
    methods: {
        GenerateSourceCode: function () {
            var builder = { v : new System.Text.StringBuilder() };

            builder.v.appendLine("using ExpressCraft;\r\n");

            builder.v.appendLine("namespace ExpressDemo");
            builder.v.appendLine("{");


            builder.v.appendLine(System.String.concat("\tpublic class ", this.ClassName));
            builder.v.appendLine("\t{");

            this.formHolder.GenerateDeclareDesigner(builder);

            builder.v.appendLine();

            builder.v.appendLine(System.String.concat("\t\tpublic ", this.ClassName, "()"));

            builder.v.appendLine("\t\t{");

            this.formHolder.GenerateIniDesigner(builder);

            builder.v.appendLine("\t\t}");

            builder.v.appendLine();


            builder.v.appendLine("\t}");

            builder.v.appendLine("}");

            this.aceCodeEditor.Source = builder.v.toString();
            //	public class 
        },
        AddControl: function (Parent, Control) {
            Parent.Children.add(Control);

            this.GenerateSourceCode();
        },
        RemoveControl: function (Control) {
            if (Control.Parent == null) {
                return;
            }

            Control.Parent.Children.remove(Control);

            this.GenerateSourceCode();
        },
        Render: function () {
            ExpressCraft.TabControlPage.prototype.Render.call(this);
        }
    }
    });

    Bridge.define("ExpressCraftDesign.NewFileDialog", {
        inherits: [ExpressCraft.DialogForm],
        fields: {
            Value: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                ExpressCraft.DialogForm.ctor.call(this);
                var $t;
                this.Text = "Add New Item";

                this._buttonCollection = Bridge.fn.bind(this, $asm.$.ExpressCraftDesign.NewFileDialog.f1)(new (System.Collections.Generic.List$1(ExpressCraft.SimpleDialogButton))());

                this.Value = ($t = new ExpressCraft.TextInput(), $t.Location = new ExpressCraft.Vector2.$ctor1(50, 50), $t.Size = new ExpressCraft.Vector2.$ctor1("calc(100% - 100px)", 23), $t);

                this.Value.OnTextChanged = Bridge.fn.bind(this, $asm.$.ExpressCraftDesign.NewFileDialog.f2);

                this.Value.OnKeyUp = Bridge.fn.bind(this, $asm.$.ExpressCraftDesign.NewFileDialog.f3);

                this.Body.AppendChild(ExpressCraft.Control.op_Implicit(this.Value));
                ExpressCraft.Helper.AppendChildrenTabIndex(this.ButtonSection, this._buttonCollection.toArray());

                this.Size = new ExpressCraft.Vector2.$ctor1(300, 200);
        }
    },
    methods: {
        OnShowed: function () {
            ExpressCraft.DialogForm.prototype.OnShowed.call(this);

            this.Value.Content.Focus();
        }
    }
    });

    Bridge.ns("ExpressCraftDesign.NewFileDialog", $asm.$);

    Bridge.apply($asm.$.ExpressCraftDesign.NewFileDialog, {
        f1: function (_o1) {
            var $t;
            _o1.add(($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.Cancel), $t.Text = "Cancel", $t.Location = new ExpressCraft.Vector2.$ctor1("calc(100% - 85px)", "calc(100% - 35px)"), $t));
            _o1.add(($t = new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.OK), $t.Text = "Add", $t.Location = new ExpressCraft.Vector2.$ctor1("calc(100% - 170px)", "calc(100% - 35px)"), $t.Enabled = false, $t));
            return _o1;
        },
        f2: function (inp) {
            this._buttonCollection.getItem(1).Enabled = this.Value.Text.length > 0;
        },
        f3: function (inp, key) {
            if (key.KeyCode === 13) {
                this._buttonCollection.getItem(1).Content.Click();
            }
        }
    });

    Bridge.define("ExpressCraftDesign.StudioForm", {
        inherits: [ExpressCraft.Form],
        fields: {
            ribbonControl1: null,
            tabControl1: null,
            splitControlContainer1: null,
            gridView1: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                ExpressCraft.Form.ctor.call(this);
                var $t;
                this.ribbonControl1 = new ExpressCraft.RibbonControl(ExpressCraft.RibbonControl.RibbonType.Compact);

                var ribbonPage = new ExpressCraft.RibbonPage("Actions");
                ribbonPage.AddRibbonGroups([new ExpressCraft.RibbonGroup.$ctor1("Project", [($t = new ExpressCraft.RibbonButton("New Form"), $t.OnItemClick = Bridge.fn.bind(this, $asm.$.ExpressCraftDesign.StudioForm.f1), $t)])]);

                this.ribbonControl1.AddRibbonPages([ribbonPage]);

                this.splitControlContainer1 = new ExpressCraft.SplitControlContainer();

                this.splitControlContainer1.SplitterPosition = 176;
                ExpressCraft.Helper.SetBounds(this.splitControlContainer1, 0, 128, "100%", "calc(100% - 128px)");

                this.tabControl1 = new ExpressCraft.TabControl();
                this.tabControl1.ShowClosedButton = true;
                ExpressCraft.Helper.SetBoundsFull(this.tabControl1);

                ExpressCraft.Helper.AppendChild(this.splitControlContainer1.Panel2, this.tabControl1);

                this.gridView1 = new ExpressCraft.GridView(true, true);
                ExpressCraft.Helper.SetBoundsFull(this.gridView1);
                this.gridView1.DataSource = this.GetToolBoxItems();
                this.gridView1.ColumnHeadersVisible = false;
                this.gridView1.AllowRowDrag = true;

                var colName = this.gridView1.GetColumn(0);
                colName.AllowEdit = false;
                colName.ReadOnly = true;

                this.gridView1.SortColumn$1(colName);

                ExpressCraft.Helper.AppendChild(this.splitControlContainer1.Panel1, this.gridView1);

                this.LinkchildrenToForm([this.gridView1, this.splitControlContainer1]);
                ExpressCraft.Helper.AppendChildren$2(this.Body, [this.ribbonControl1, this.splitControlContainer1]);

                this.SetWindowState(ExpressCraft.WindowState.Maximized);
        }
    },
    methods: {
        GetToolBoxItems: function () {
            var dt = new ExpressCraft.DataTable();

            dt.AddColumn("Name", ExpressCraft.DataType.String);

            dt.BeginDataUpdate();

            dt.AddRow$1(["SimpleButton"]);
            dt.AddRow$1(["Control"]);
            dt.AddRow$1(["RibbonControl"]);
            dt.AddRow$1(["RibbonControlPage"]);
            dt.AddRow$1(["RibbonPageGroup"]);
            dt.AddRow$1(["RibbonGroupButton"]);

            dt.AddRow$1(["TabControl"]);
            dt.AddRow$1(["TabControlPage"]);

            dt.AddRow$1(["TextInput"]);

            dt.AddRow$1(["GridView"]);
            dt.AddRow$1(["SplitControlContainer"]);

            dt.EndDataUpdate();

            return dt;
        }
    }
    });

    Bridge.ns("ExpressCraftDesign.StudioForm", $asm.$);

    Bridge.apply($asm.$.ExpressCraftDesign.StudioForm, {
        f1: function (rb) {
            var nfd = new ExpressCraftDesign.NewFileDialog();
            nfd.ShowDialog([new ExpressCraft.DialogResult(ExpressCraft.DialogResultEnum.OK, Bridge.fn.bind(this, function () {
                var stcp = new ExpressCraftDesign.FormDesignerTabControlPage(ExpressCraft.Helper.HtmlEscape$1(nfd.Value.Text));
                this.LinkchildToForm(stcp.splitControlContainer1);
                this.tabControl1.AddPages([stcp]);
                this.tabControl1.SelectedIndex = (this.tabControl1.TabPages.Count - 1) | 0;
            }))]);
        }
    });
});
