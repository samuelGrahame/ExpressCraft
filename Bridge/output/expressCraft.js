/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2016
 * @compiler Bridge.NET 15.6.0
 */
Bridge.assembly("ExpressCraft", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraft.App", {
        statics: {
            untiTestLiveAdd: function () {
                var dt = new ExpressCraft.DataTable();

                dt.addColumn("Index", ExpressCraft.DataType.Integer);
                dt.addColumn("A", ExpressCraft.DataType.Integer);
                dt.addColumn("B", ExpressCraft.DataType.Integer);
                dt.addColumn("C", ExpressCraft.DataType.Integer);

                var sw = System.Diagnostics.Stopwatch.startNew();
                var r = new System.Random.ctor();

                for (var i = 0; i < 100000; i = (i + 1) | 0) {
                    dt.addRow$1([i, r.next(), r.next(), r.next()]);
                }

                sw.stop();

                //Global.Alert("took: " + sw.ElapsedMilliseconds + "ms to set data/add for 1000000 row(s)");			
                return dt;
            },
            unitTestBatchAdd: function () {
                var dt = new ExpressCraft.DataTable();

                dt.addColumn("CNTR", ExpressCraft.DataType.Long);
                dt.addColumn("Name", ExpressCraft.DataType.String);
                dt.addColumn("Date", ExpressCraft.DataType.DateTime);

                dt.beginNewRow(1000000);

                var sw = System.Diagnostics.Stopwatch.startNew();

                for (var i = System.Int64(0); i.lt(System.Int64(1000000)); i = i.inc()) {
                    var dr = dt.newRow();

                    dr.setItem(0, i);
                    dr.setItem(1, "this is a new test");
                    dr.setItem(2, new Date());
                }

                sw.stop();

                Bridge.global.alert("took: " + sw.milliseconds() + "ms to set data for 1000000 row(s)");

                sw = System.Diagnostics.Stopwatch.startNew();

                dt.acceptNewRows();

                sw.stop();

                Bridge.global.alert("took: " + sw.milliseconds() + "ms to add 1000000 row(s)");
            }
        },
        $main: function () {
            ExpressCraft.Settings.setup();

            //UntiTestLiveAdd();
            //UnitTestBatchAdd();
        }
    });

    Bridge.define("ExpressCraft.Application", {
        statics: {
            close: function () {
                window.close();
                window.location.reload();
            },
            run: function (Mainform) {
                Mainform.showStartNewLevel();
            }
        }
    });

    Bridge.define("ExpressCraft.CellApparence", {
        isBold: false,
        alignment: "left",
        forecolor: null,
        ctor: function () {
            this.$initialize();

        },
        $ctor1: function (isBold) {
            this.$initialize();
            this.isBold = isBold;
        },
        $ctor2: function (isBold, alignment) {
            this.$initialize();
            this.isBold = isBold;
            this.alignment = alignment;
        },
        $ctor3: function (isBold, alignment, forecolor) {
            this.$initialize();
            this.isBold = isBold;
            this.alignment = alignment;
            this.forecolor = forecolor;
        }
    });

    Bridge.define("ExpressCraft.Control", {
        statics: {
            ControlClass: "control",
            canvas: null,
            getControlClass: function (AddSpace) {
                if (AddSpace === void 0) { AddSpace = true; }
                return AddSpace ? " control" : ExpressCraft.Control.ControlClass;
            },
            getImageString: function (source) {
                return System.String.format("url('data:image/png;base64,{0}') no-repeat", source);
            },
            getImageStringURI: function (source, useResourceURL) {
                if (useResourceURL === void 0) { useResourceURL = true; }
                //"./Images/"
                return System.String.format("url('{0}{1}') no-repeat", useResourceURL ? ExpressCraft.Settings.resourceURL : "", source);
            },
            createDiv: function () {
                return Bridge.merge(document.createElement('div'), {
                    className: ExpressCraft.Control.getControlClass(false)
                } );
            },
            createDiv$1: function (classname) {
                return Bridge.merge(document.createElement('div'), {
                    className: System.String.concat(classname, ExpressCraft.Control.getControlClass(true))
                } );
            },
            createSpan: function () {
                return Bridge.merge(document.createElement('span'), {
                    className: ExpressCraft.Control.getControlClass(false)
                } );
            },
            createSpan$1: function (classname) {
                return Bridge.merge(document.createElement('span'), {
                    className: System.String.concat(classname, ExpressCraft.Control.getControlClass(true))
                } );
            },
            createLabel$1: function (Caption, X, Y, IsBold, IsTiny) {
                if (IsBold === void 0) { IsBold = false; }
                if (IsTiny === void 0) { IsTiny = false; }
                var lbl = Bridge.merge(document.createElement('span'), {
                    className: ExpressCraft.Control.getControlClass(false)
                } );

                lbl.innerHTML = Caption;
                ExpressCraft.Helper.setLocation$2(lbl, X, Y);
                if (IsBold) {
                    lbl.style.fontWeight = "bold";
                }
                if (IsTiny) {
                    lbl.style.fontSize = "6.75pt";
                }

                return lbl;
            },
            createLabel$4: function (Caption, X, Y, width, height, IsBold, IsTiny, classr, Alignment, Forecolor) {
                if (IsBold === void 0) { IsBold = false; }
                if (IsTiny === void 0) { IsTiny = false; }
                if (classr === void 0) { classr = ""; }
                if (Alignment === void 0) { Alignment = 3; }
                if (Forecolor === void 0) { Forecolor = null; }
                var lbl = Bridge.merge(document.createElement('span'), {
                    className: System.String.concat(classr, ExpressCraft.Control.getControlClass(!System.String.isNullOrWhiteSpace(classr)))
                } );

                lbl.innerHTML = Caption;
                ExpressCraft.Helper.setBounds$2(lbl, X, Y, width, height);
                if (Alignment !== "left") {
                    lbl.style.textAlign = Alignment;
                }

                if (IsBold) {
                    lbl.style.fontWeight = "bold";
                }
                if (IsTiny) {
                    lbl.style.fontSize = "6.75pt";
                }
                if (Forecolor != null) {
                    lbl.style.color = Forecolor;
                }

                return lbl;
            },
            createLabel$2: function (Caption, X, Y, width, IsBold, IsTiny, classr, Alignment, Forecolor) {
                if (IsBold === void 0) { IsBold = false; }
                if (IsTiny === void 0) { IsTiny = false; }
                if (classr === void 0) { classr = ""; }
                if (Alignment === void 0) { Alignment = 3; }
                if (Forecolor === void 0) { Forecolor = null; }
                var lbl = Bridge.merge(document.createElement('span'), {
                    className: System.String.concat(classr, ExpressCraft.Control.getControlClass(!System.String.isNullOrWhiteSpace(classr)))
                } );

                lbl.innerHTML = Caption;
                ExpressCraft.Helper.setLocation$2(lbl, X, Y);
                lbl.style.width = ExpressCraft.Helper.toPx$2(width);
                if (Alignment !== "left") {
                    //direction: rtl;
                    if (Alignment === "right") {
                        lbl.style.direction = "rtl";
                    } else {
                        lbl.style.textAlign = Alignment;
                    }
                }

                if (IsBold) {
                    lbl.style.fontWeight = "bold";
                }
                if (IsTiny) {
                    lbl.style.fontSize = "6.75pt";
                }
                if (Forecolor != null) {
                    lbl.style.color = Forecolor;
                }

                return lbl;
            },
            createLabel$3: function (Caption, X, Y, width, height, IsBold, IsTiny, classr) {
                if (IsBold === void 0) { IsBold = false; }
                if (IsTiny === void 0) { IsTiny = false; }
                if (classr === void 0) { classr = ""; }
                var lbl = Bridge.merge(document.createElement('span'), {
                    className: System.String.concat(classr, ExpressCraft.Control.getControlClass(!System.String.isNullOrWhiteSpace(classr)))
                } );

                lbl.innerHTML = Caption;
                ExpressCraft.Helper.setBounds$2(lbl, X, Y, width, height);
                if (IsBold) {
                    lbl.style.fontWeight = "bold";
                }
                if (IsTiny) {
                    lbl.style.fontSize = "6.75pt";
                }

                return lbl;
            },
            createLabel: function (Caption, X, Y, IsBold, IsTiny) {
                if (IsBold === void 0) { IsBold = false; }
                if (IsTiny === void 0) { IsTiny = false; }
                return ExpressCraft.Control.createLabel$1(Caption, X, Y, IsBold, IsTiny);
            },
            createComboBox: function (classname, comboType) {
                var combo = Bridge.merge(document.createElement('select'), {
                    className: System.String.concat(classname, ExpressCraft.Control.getControlClass(true))
                } );
                if (comboType === ExpressCraft.ComboBoxTypes.Default) {

                }
                return combo;
            },
            createButton: function (classname, buttonType) {
                return Bridge.merge(document.createElement('button'), {
                    className: System.String.concat(classname, ExpressCraft.Control.getControlClass(true)),
                    type: buttonType
                } );
            },
            createInput: function (classname, inputType) {
                return Bridge.merge(document.createElement('input'), {
                    className: System.String.concat(classname, ExpressCraft.Control.getControlClass(true)),
                    type: inputType
                } );
            },
            op_Implicit: function (control) {
                if (ExpressCraft.Settings.renderControlsOnAdd && control.getHasRendered() === false) {
                    control.render();
                }
                return control.content;
            }
        },
        content: null,
        onResize: null,
        onLoaded: null,
        config: {
            properties: {
                Name: null,
                HasRendered: false
            }
        },
        ctor: function () {
            this.$initialize();
            this.content = ExpressCraft.Control.createDiv();
        },
        $ctor1: function (classname) {
            this.$initialize();
            this.content = ExpressCraft.Control.createDiv$1(classname);
        },
        $ctor2: function (classname, buttonType) {
            this.$initialize();
            this.content = ExpressCraft.Control.createButton(classname, buttonType);
        },
        $ctor4: function (classname, comboType) {
            this.$initialize();
            this.content = ExpressCraft.Control.createComboBox(classname, comboType);
        },
        $ctor3: function (classname, inputType) {
            this.$initialize();
            this.content = ExpressCraft.Control.createInput(classname, inputType);
        },
        render: function () {
            this.setHasRendered(true);
        },
        getTextMetrics: function (text, font) {
            if (ExpressCraft.Control.canvas == null) {
                ExpressCraft.Control.canvas = document.createElement('canvas');
            }
            var context = ExpressCraft.Control.canvas.getContext("2d");
            context.font = font;
            return context.measureText(text);
        },
        getTextWidth: function (text, font) {
            var metrics = this.getTextMetrics(text, font);
            return metrics.width;
        },
        changeState: function (state, stateFlag) {
            if (stateFlag === void 0) { stateFlag = "disabled"; }
            if (state) {
                this.content.classList.remove(stateFlag);
            } else {
                this.content.classList.add(stateFlag);
            }
        }
    });

    Bridge.define("ExpressCraft.ComboBoxTypes", {
        $kind: "enum",
        statics: {
            Default: 0
        }
    });

    Bridge.define("ExpressCraft.DataColumn", {
        fieldName: null,
        dataType: 0,
        getDisplayValue$1: function (rowIndex, formatString) {
            switch (this.dataType) {
                default: 
                case ExpressCraft.DataType.Object: 
                    return System.String.format(formatString, (Bridge.cast(this, ExpressCraft.DataColumnObject).cells.getItem(rowIndex)));
                case ExpressCraft.DataType.DateTime: 
                    return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnDateTime).cells.getItem(rowIndex));
                case ExpressCraft.DataType.String: 
                    return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnString).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Integer: 
                    return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnInteger).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Long: 
                    return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnLong).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Float: 
                    return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnFloat).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Double: 
                    return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnDouble).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Decimal: 
                    return System.String.format(formatString, Bridge.cast(this, ExpressCraft.DataColumnDecimal).cells.getItem(rowIndex));
            }
        },
        getDisplayValue: function (rowIndex) {
            switch (this.dataType) {
                default: 
                case ExpressCraft.DataType.Object: 
                    return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnObject).cells.getItem(rowIndex));
                case ExpressCraft.DataType.DateTime: 
                    return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnDateTime).cells.getItem(rowIndex));
                case ExpressCraft.DataType.String: 
                    return Bridge.cast(this, ExpressCraft.DataColumnString).cells.getItem(rowIndex);
                case ExpressCraft.DataType.Integer: 
                    return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnInteger).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Long: 
                    return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnLong).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Float: 
                    return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnFloat).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Double: 
                    return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnDouble).cells.getItem(rowIndex));
                case ExpressCraft.DataType.Decimal: 
                    return System.Convert.toString(Bridge.cast(this, ExpressCraft.DataColumnDecimal).cells.getItem(rowIndex));
            }
        }
    });

    Bridge.define("ExpressCraft.DataItem", {
        text: null,
        value: null,
        $ctor1: function (text, value) {
            this.$initialize();
            this.text = text;
            this.value = value;
        },
        ctor: function (text) {
            this.$initialize();
            this.text = text;
            this.value = text;
        }
    });

    Bridge.define("ExpressCraft.DataRow", {
        parentTable: null,
        rowIndex: 0,
        batchData: null,
        ctor: function (parentTable, rowIndex) {
            if (rowIndex === void 0) { rowIndex = -1; }

            this.$initialize();
            this.parentTable = parentTable;
            this.rowIndex = rowIndex;
            if (rowIndex === -1) {
                this.batchData = System.Array.init(parentTable.getColumnCount(), null);
            }
        },
        getItem: function (columnIndex) {
            if (this.rowIndex === -1) {
                return this.batchData[columnIndex];
            }
            var col = this.parentTable.columns.getItem(columnIndex);
            return col.cells.items[this.rowIndex];
        },
        setItem: function (columnIndex, value) {
            if (this.rowIndex === -1) {
                this.batchData[columnIndex] = value;
                return;
            }
            var col = this.parentTable.columns.getItem(columnIndex);
            col.cells.items[this.rowIndex] = value;
        }
    });

    Bridge.define("ExpressCraft.DataTable", {
        columns: null,
        rowSizeChanged: null,
        _ColCount: 0,
        _RowCount: 0,
        newRows: null,
        config: {
            init: function () {
                this.columns = new (System.Collections.Generic.List$1(ExpressCraft.DataColumn))();
                this.newRows = new (System.Collections.Generic.List$1(ExpressCraft.DataRow))();
            }
        },
        getColumnCount: function () {
            return this._ColCount;
        },
        getRowCount: function () {
            return this._RowCount;
        },
        getItem: function (rowIndex) {
            return new ExpressCraft.DataRow(this, rowIndex);
        },
        addColumn: function (fieldName, type) {
            if (type === void 0) { type = 0; }
            switch (type) {
                default: 
                case ExpressCraft.DataType.Object: 
                    this.columns.add(Bridge.merge(new ExpressCraft.DataColumnObject(), {
                        fieldName: fieldName
                    } ));
                    break;
                case ExpressCraft.DataType.DateTime: 
                    this.columns.add(Bridge.merge(new ExpressCraft.DataColumnDateTime(), {
                        fieldName: fieldName
                    } ));
                    break;
                case ExpressCraft.DataType.String: 
                    this.columns.add(Bridge.merge(new ExpressCraft.DataColumnString(), {
                        fieldName: fieldName
                    } ));
                    break;
                case ExpressCraft.DataType.Integer: 
                    this.columns.add(Bridge.merge(new ExpressCraft.DataColumnInteger(), {
                        fieldName: fieldName
                    } ));
                    break;
                case ExpressCraft.DataType.Long: 
                    this.columns.add(Bridge.merge(new ExpressCraft.DataColumnLong(), {
                        fieldName: fieldName
                    } ));
                    break;
                case ExpressCraft.DataType.Float: 
                    this.columns.add(Bridge.merge(new ExpressCraft.DataColumnFloat(), {
                        fieldName: fieldName
                    } ));
                    break;
                case ExpressCraft.DataType.Double: 
                    this.columns.add(Bridge.merge(new ExpressCraft.DataColumnDouble(), {
                        fieldName: fieldName
                    } ));
                    break;
                case ExpressCraft.DataType.Decimal: 
                    this.columns.add(Bridge.merge(new ExpressCraft.DataColumnDecimal(), {
                        fieldName: fieldName
                    } ));
                    break;
            }
            this._ColCount = this.columns.getCount();
        },
        beginNewRow: function (EstimatedNewRows) {
            this.newRows = new (System.Collections.Generic.List$1(ExpressCraft.DataRow))(EstimatedNewRows);
        },
        addRow: function () {
            var dr = new ExpressCraft.DataRow(this, Bridge.identity(this._RowCount, (this._RowCount = (this._RowCount + 1) | 0)));
            var colLength = this.columns.getCount();
            for (var x = 0; x < colLength; x = (x + 1) | 0) {
                var col = this.columns.getItem(x);
                col.cells.add(null);
                //Columns[x].Cells.Add(null);
            }
            if (!Bridge.staticEquals(this.rowSizeChanged, null)) {
                this.rowSizeChanged(this.getRowCount());
            }
            return dr;
        },
        addRow$1: function (row) {
            if (row === void 0) { row = []; }
            if (row.length === this.getColumnCount()) {
                this._RowCount = (this._RowCount + 1) | 0;
                var colLength = this.columns.getCount();
                for (var x = 0; x < colLength; x = (x + 1) | 0) {
                    var col = this.columns.getItem(x);
                    col.cells.add(row[x]);
                    //Columns[x].Cells.Add(row[x]);
                }
                if (!Bridge.staticEquals(this.rowSizeChanged, null)) {
                    this.rowSizeChanged(this.getRowCount());
                }
            }
        },
        newRow: function () {
            var dr = new ExpressCraft.DataRow(this);

            this.newRows.add(dr);

            return dr;
        },
        acceptNewRows: function () {
            if (this.newRows == null || this.newRows.getCount() === 0) {
                return;
            }
            var colLength = this.columns.getCount();
            var rowLength = this.newRows.getCount();
            var colN1 = (colLength - 1) | 0;

            for (var x = 0; x < colLength; x = (x + 1) | 0) {
                var col = this.columns.getItem(x);
                var DataCells = System.Array.init(rowLength, null);

                if (x === 0) {
                    for (var y = 0; y < rowLength; y = (y + 1) | 0) {
                        this.newRows.getItem(y).rowIndex = Bridge.identity(this._RowCount, (this._RowCount = (this._RowCount + 1) | 0));
                        DataCells[y] = this.newRows.getItem(y).batchData[x];
                    }
                } else if (x === colN1) {
                    for (var y1 = 0; y1 < rowLength; y1 = (y1 + 1) | 0) {
                        DataCells[y1] = this.newRows.getItem(y1).batchData[x];
                        this.newRows.getItem(y1).batchData = null;
                    }
                } else {
                    for (var y2 = 0; y2 < rowLength; y2 = (y2 + 1) | 0) {
                        DataCells[y2] = this.newRows.getItem(y2).batchData[x];
                    }
                }
                col.cells.addRange(DataCells);

            }
            this.newRows.clear();

            if (!Bridge.staticEquals(this.rowSizeChanged, null)) {
                this.rowSizeChanged(this.getRowCount());
            }
        },
        rejectNewRows: function () {
            this.newRows.clear();
        }
    });

    Bridge.define("ExpressCraft.DataType", {
        $kind: "enum",
        statics: {
            Object: 0,
            DateTime: 1,
            String: 2,
            Integer: 3,
            Long: 4,
            Float: 5,
            Double: 6,
            Decimal: 7
        }
    });

    Bridge.define("ExpressCraft.DialogResult", {
        resultEnum: 0,
        callBack: null,
        ctor: function (resultEnum, callBack) {
            this.$initialize();
            this.resultEnum = resultEnum;
            this.callBack = callBack;
        },
        invokeIfResult: function (resultEnum) {
            if (resultEnum === this.resultEnum && !Bridge.staticEquals(this.callBack, null)) {
                this.callBack();
            }
        }
    });

    Bridge.define("ExpressCraft.DialogResultEnum", {
        $kind: "enum",
        statics: {
            None: 0,
            OK: 1,
            Cancel: 2,
            Abort: 3,
            Retry: 4,
            Ignore: 5,
            Yes: 6,
            No: 7
        }
    });

    Bridge.define("ExpressCraft.Form.FormButtonType", {
        $kind: "enum",
        statics: {
            Close: 0,
            Maximize: 1,
            Minimize: 2,
            Restore: 3,
            Help: 4
        }
    });

    Bridge.define("ExpressCraft.Form.FormStartPosition", {
        $kind: "enum",
        statics: {
            Manual: 0,
            Center: 1,
            WindowsDefaultLocation: 2
        }
    });

    Bridge.define("ExpressCraft.Form.MouseMoveAction", {
        $kind: "enum",
        statics: {
            None: 0,
            Move: 1,
            TopLeftResize: 2,
            LeftResize: 3,
            BottomLeftResize: 4,
            BottomResize: 5,
            BottomRightResize: 6,
            RightResize: 7,
            TopResize: 8,
            TopRightResize: 9
        }
    });

    Bridge.define("ExpressCraft.Form.WindowState", {
        $kind: "enum",
        statics: {
            Normal: 0,
            Minimized: 1,
            Maximized: 2
        }
    });

    Bridge.define("ExpressCraft.FormCollection", {
        formOwner: null,
        visibleForms: null,
        config: {
            init: function () {
                this.visibleForms = new (System.Collections.Generic.List$1(ExpressCraft.Form))();
            }
        },
        ctor: function (formOwner) {
            this.$initialize();
            this.formOwner = formOwner;
        }
    });

    Bridge.define("ExpressCraft.GridViewColumn", {
        column: null,
        view: null,
        caption: null,
        visible: false,
        cachedX: 0,
        formatString: "",
        headingApparence: null,
        bodyApparence: null,
        sortedMode: 0,
        _width: 0,
        config: {
            init: function () {
                this.headingApparence = new ExpressCraft.CellApparence.ctor();
                this.bodyApparence = new ExpressCraft.CellApparence.ctor();
            }
        },
        ctor: function (view, width) {
            if (width === void 0) { width = 100; }

            this.$initialize();
            this.view = view;
            this.setWidth(width);
        },
        getWidth: function () {
            return this._width;
        },
        setWidth: function (value) {
            if (value < 100) {
                value = 100;
            }
            if (this._width !== value) {
                this._width = value;
                this.view.renderGrid();
            }
        },
        getDisplayValueByDataRowHandle: function (RowHandle) {
            if (System.String.isNullOrWhiteSpace(this.formatString)) {
                return this.column.getDisplayValue(RowHandle);
            } else {
                return this.column.getDisplayValue$1(RowHandle, this.formatString);
            }
        },
        getDisplayValue: function (RowHandle) {
            if (this.view.visibleRowHandles != null) {
                RowHandle = this.view.visibleRowHandles.getItem(RowHandle);
            }

            if (System.String.isNullOrWhiteSpace(this.formatString)) {
                return this.column.getDisplayValue(RowHandle);
            } else {
                return this.column.getDisplayValue$1(RowHandle, this.formatString);
            }
        }
    });

    Bridge.define("ExpressCraft.HardSoftList$1", function (T) { return {
        hardList: null,
        softList: null,
        hardHardList: null,
        limit: 0,
        hardLength: 0,
        defaultValue: Bridge.getDefaultValue(T),
        config: {
            init: function () {
                this.hardList = new (System.Collections.Generic.List$1(ExpressCraft.IndexValue$1(T)))();
                this.softList = new (System.Collections.Generic.List$1(System.Int32))();
                this.hardHardList = new (System.Collections.Generic.List$1(T))();
            }
        },
        ctor: function (defaultValue, limit) {
            if (limit === void 0) { limit = 10000; }

            this.$initialize();
            this.defaultValue = defaultValue;
            this.limit = limit;
        },
        getIndexValueByHardListIndex: function (index) {
            return this.hardList.getItem(index);
        },
        clearAll: function () {
            this.hardHardList = new (System.Collections.Generic.List$1(T))();
            this.hardList = new (System.Collections.Generic.List$1(ExpressCraft.IndexValue$1(T)))();
            this.softList = new (System.Collections.Generic.List$1(System.Int32))();
            this.hardLength = 0;
        },
        clearAllSetHardRange: function (value, Indexs) {
            if (Indexs === void 0) { Indexs = []; }
            this.hardLength = 0;
            if (Indexs == null || Indexs.length === 0) {
                this.clearAll();
            } else {
                if (Indexs.length > this.limit) {
                    this.hardLength = Indexs.length;
                    this.hardList = new (System.Collections.Generic.List$1(ExpressCraft.IndexValue$1(T)))();
                    this.softList = new (System.Collections.Generic.List$1(System.Int32))();

                    var max = 0;
                    for (var i = 0; i < this.hardLength; i = (i + 1) | 0) {
                        if (Indexs[i] > max) {
                            max = Indexs[i];
                        }
                    }
                    var length = (max + 1) | 0;
                    this.hardHardList = new (System.Collections.Generic.List$1(T))(length);

                    if (length === Indexs.length) {
                        for (var i1 = 0; i1 < this.hardLength; i1 = (i1 + 1) | 0) {
                            this.hardHardList.add(value);
                        }
                    } else {
                        for (var i2 = 0; i2 < length; i2 = (i2 + 1) | 0) {
                            this.hardHardList.add(this.defaultValue);
                        }
                        for (var i3 = 0; i3 < this.hardLength; i3 = (i3 + 1) | 0) {
                            this.hardHardList.setItem(Indexs[i3], value);
                        }
                    }


                } else {
                    this.hardHardList = new (System.Collections.Generic.List$1(T))();
                    this.hardLength = Indexs.length;
                    this.hardList = new (System.Collections.Generic.List$1(ExpressCraft.IndexValue$1(T)))(this.hardLength);
                    for (var i4 = 0; i4 < this.hardLength; i4 = (i4 + 1) | 0) {
                        this.hardList.add(new (ExpressCraft.IndexValue$1(T))(Indexs[i4], value));
                    }
                    this.softList = new (System.Collections.Generic.List$1(System.Int32))();
                }
            }
        },
        clearSoftList: function () {
            this.softList = new (System.Collections.Generic.List$1(System.Int32))();
        },
        clearAndAddOrSet: function (value, index, AddToSoftList) {
            if (AddToSoftList === void 0) { AddToSoftList = false; }
            this.hardHardList = new (System.Collections.Generic.List$1(T))();
            this.hardList = new (System.Collections.Generic.List$1(ExpressCraft.IndexValue$1(T)))();
            this.softList = new (System.Collections.Generic.List$1(System.Int32))();
            this.hardLength = 0;
            this.addOrSet(value, index, AddToSoftList);
        },
        getHardOrSoftIndexValue: function (index, AddToSoftList) {
            if (AddToSoftList === void 0) { AddToSoftList = false; }
            var length = this.softList.getCount();
            for (var i = 0; i < length; i = (i + 1) | 0) {
                var slI = this.softList.getItem(i);
                if (this.hardList.getItem(slI).index === index) {
                    return this.hardList.getItem(slI);
                }
            }

            length = this.hardList.getCount();

            for (var i1 = 0; i1 < length; i1 = (i1 + 1) | 0) {
                var hli = this.hardList.getItem(i1);
                if (hli.index === index) {
                    if (AddToSoftList) {
                        this.softList.add(i1);
                    }
                    return hli;
                }
            }

            return null;
        },
        getHardIndexValue: function (index) {
            var length = this.hardList.getCount();

            for (var i = 0; i < length; i = (i + 1) | 0) {
                var hli = this.hardList.getItem(i);
                if (hli.index === index.v) {
                    index.v = i;
                    return hli;
                }
            }
            index.v = length;

            return null;
        },
        getValue: function (index, AddToSoftList) {
            if (AddToSoftList === void 0) { AddToSoftList = false; }
            if (this.hardLength > this.limit) {
                return this.hardHardList.getItem(index);
            }
            var hiv = this.getHardOrSoftIndexValue(index, AddToSoftList);
            if (hiv == null) {
                return this.defaultValue;
            }
            return hiv.value;
        },
        getIndex: function (index) {
            if (this.hardLength > this.limit) {
                return index;
            }

            var hiv = this.getHardOrSoftIndexValue(index);
            if (hiv == null) {
                return -1;
            }
            return hiv.index;
        },
        addOrSet: function (value, index, AddToSoftList) {
            if (AddToSoftList === void 0) { AddToSoftList = false; }
            if (this.hardLength > this.limit) {
                if (index >= this.hardLength) {
                    var addDiff = ((((index + 1) | 0)) - this.hardHardList.getCount()) | 0;

                    if (addDiff > 0) {
                        var data = System.Array.init(addDiff, function (){
                            return Bridge.getDefaultValue(T);
                        });
                        for (var i = 0; i < addDiff; i = (i + 1) | 0) {
                            data[i] = this.defaultValue;
                        }
                        this.hardHardList.addRange(data);
                    }
                    this.hardHardList.add(value);

                    this.hardLength = this.hardHardList.getCount();
                } else {
                    this.hardHardList.setItem(index, value);
                }
                return;
            }

            var length = this.softList.getCount();
            for (var i1 = 0; i1 < length; i1 = (i1 + 1) | 0) {
                var hli = this.hardList.getItem(this.softList.getItem(i1));
                if (hli.index === index) {
                    hli.value = value;
                    return;
                }
            }

            var hindex = { v : index };
            var hiv = this.getHardIndexValue(hindex);
            if (hiv == null) {
                this.hardList.add(((hiv = new (ExpressCraft.IndexValue$1(T))(index, value))));
            } else {
                hiv.value = value;
            }

            if (AddToSoftList) {
                this.softList.add(hindex.v);
            }
        },
        remove: function (index, OnlySoftList) {
            if (OnlySoftList === void 0) { OnlySoftList = false; }
            if (this.hardLength > this.limit) {
                if (((this.hardLength - 1) | 0) > this.limit) {
                    this.hardHardList.setItem(index, this.defaultValue);
                } else {
                    for (var i = 0; i < this.hardLength; i = (i + 1) | 0) {
                        if (i !== index && !Bridge.equals(this.hardHardList.getItem(i), this.defaultValue)) {
                            this.hardList.add(new (ExpressCraft.IndexValue$1(T))(i, this.hardHardList.getItem(i)));
                        }
                    }

                    this.hardLength = (this.hardLength - 1) | 0;
                }
            } else {
                var Length = this.softList.getCount();
                for (var i1 = 0; i1 < Length; i1 = (i1 + 1) | 0) {
                    var sli = this.softList.getItem(i1);
                    if (this.hardList.getItem(sli).index === index) {
                        this.softList.removeAt(i1);
                        if (OnlySoftList) {
                            return;
                        }
                        this.hardList.removeAt(sli);
                        return;
                    }
                }
                var length = this.hardList.getCount();

                for (var i2 = 0; i2 < length; i2 = (i2 + 1) | 0) {
                    var hli = this.hardList.getItem(i2);
                    if (hli.index === index) {
                        this.hardList.removeAt(i2);
                        return;
                    }
                }
            }
        }
    }; });

    Bridge.define("ExpressCraft.Helper", {
        statics: {
            toPx$2: function (i) {
                return i + 'px';
                //return i.ToString() + "px";
                return "";
            },
            toPx$1: function (i) {
                return i + 'px';
                return "";
            },
            toPx: function (i) {
                return i + 'px';
                return "";
            },
            appendChildren: function (c, Nodes) {
                if (Nodes === void 0) { Nodes = []; }
                if (Nodes != null && Nodes.length > 0) {
                    for (var i = 0; i < Nodes.length; i = (i + 1) | 0) {
                        c.appendChild(Nodes[i]);
                    }
                }
            },
            appendChildren$1: function (c, Nodes) {
                if (Nodes === void 0) { Nodes = []; }
                if (Nodes != null && Nodes.length > 0) {
                    for (var i = 0; i < Nodes.length; i = (i + 1) | 0) {
                        c.appendChild(ExpressCraft.Control.op_Implicit(Nodes[i]));
                    }
                }
            },
            setBounds$1: function (c, left, top, width, height) {
                ExpressCraft.Helper.setBounds$3(c, ExpressCraft.Helper.toPx$1(left), ExpressCraft.Helper.toPx$1(top), ExpressCraft.Helper.toPx$1(width), ExpressCraft.Helper.toPx$1(height));
            },
            setBounds: function (c, left, top, width, height) {
                ExpressCraft.Helper.setBounds$3(c, ExpressCraft.Helper.toPx(left), ExpressCraft.Helper.toPx(top), ExpressCraft.Helper.toPx(width), ExpressCraft.Helper.toPx(height));
            },
            setBounds$2: function (c, left, top, width, height) {
                ExpressCraft.Helper.setBounds$3(c, ExpressCraft.Helper.toPx$2(left), ExpressCraft.Helper.toPx$2(top), ExpressCraft.Helper.toPx$2(width), ExpressCraft.Helper.toPx$2(height));
            },
            setBounds$4: function (c, left, top, width, height) {
                ExpressCraft.Helper.setBounds$3(c.content, ExpressCraft.Helper.toPx$1(left), ExpressCraft.Helper.toPx$1(top), ExpressCraft.Helper.toPx$1(width), ExpressCraft.Helper.toPx$1(height));
            },
            setBounds$5: function (c, left, top, width, height) {
                ExpressCraft.Helper.setBounds$3(c.content, left, top, width, height);
            },
            setBounds$3: function (c, left, top, width, height) {
                c.style.left = left;
                c.style.top = top;
                c.style.width = width;
                c.style.height = height;
            },
            setSize: function (c, width, height) {
                ExpressCraft.Helper.setSize$1(c, ExpressCraft.Helper.toPx$1(width), ExpressCraft.Helper.toPx$1(height));
            },
            setSize$2: function (c, width, height) {
                ExpressCraft.Helper.setSize$1(c.content, ExpressCraft.Helper.toPx$1(width), ExpressCraft.Helper.toPx$1(height));
            },
            setSize$3: function (c, width, height) {
                ExpressCraft.Helper.setSize$1(c.content, width, height);
            },
            setSize$1: function (c, width, height) {
                c.style.width = width;
                c.style.height = height;
            },
            setBoundsFull: function (c) {
                ExpressCraft.Helper.setBounds$3(c.content, "0", "0", "100%", "100%");
            },
            setLocation$4: function (c, left, top) {
                ExpressCraft.Helper.setLocation$3(c.content, ExpressCraft.Helper.toPx$1(left), ExpressCraft.Helper.toPx$1(top));
            },
            setLocation$5: function (c, left, top) {
                ExpressCraft.Helper.setLocation$3(c.content, left, top);
            },
            setLocation: function (c, left, top) {
                ExpressCraft.Helper.setLocation$3(c, ExpressCraft.Helper.toPx(left), ExpressCraft.Helper.toPx(top));
            },
            setLocation$2: function (c, left, top) {
                ExpressCraft.Helper.setLocation$3(c, ExpressCraft.Helper.toPx$2(left), ExpressCraft.Helper.toPx$2(top));
            },
            setLocation$1: function (c, left, top) {
                ExpressCraft.Helper.setLocation$3(c, ExpressCraft.Helper.toPx$1(left), ExpressCraft.Helper.toPx$1(top));
            },
            setLocation$3: function (c, left, top) {
                c.style.left = left;
                c.style.top = top;
            }
        }
    });

    Bridge.define("ExpressCraft.IndexValue$1", function (T) { return {
        index: 0,
        value: Bridge.getDefaultValue(T),
        ctor: function (index, value) {
            this.$initialize();
            this.index = index;
            this.value = value;
        }
    }; });

    Bridge.define("ExpressCraft.Point", {
        $kind: "struct",
        statics: {
            getDefaultValue: function () { return new ExpressCraft.Point(); }
        },
        x: 0,
        y: 0,
        $ctor1: function (x, y) {
            this.$initialize();
            this.x = x;
            this.y = y;
        },
        ctor: function () {
            this.$initialize();
        },
        getHashCode: function () {
            var h = Bridge.addHash([1852403652, this.x, this.y]);
            return h;
        },
        equals: function (o) {
            if (!Bridge.is(o, ExpressCraft.Point)) {
                return false;
            }
            return Bridge.equals(this.x, o.x) && Bridge.equals(this.y, o.y);
        },
        $clone: function (to) {
            var s = to || new ExpressCraft.Point();
            s.x = this.x;
            s.y = this.y;
            return s;
        }
    });

    Bridge.define("ExpressCraft.Rectange", {
        $kind: "struct",
        statics: {
            setBounds: function (x, y, w, h, obj) {
                x.v = parseInt(obj.css("left"));
                y.v = parseInt(obj.css("top"));
                w.v = parseInt(obj.css("width"));
                h.v = parseInt(obj.css("height"));
            },
            valueInRange: function (value, min, max) {
                return (value >= min) && (value <= max);
            },
            rectOverlap: function (A, B) {
                var xOverlap = ExpressCraft.Rectange.valueInRange(A.x, B.x, ((B.x + B.width) | 0)) || ExpressCraft.Rectange.valueInRange(B.x, A.x, ((A.x + A.width) | 0));

                var yOverlap = ExpressCraft.Rectange.valueInRange(A.y, B.y, ((B.y + B.height) | 0)) || ExpressCraft.Rectange.valueInRange(B.y, A.y, ((A.y + A.height) | 0));

                return xOverlap && yOverlap;
            },
            createFromHTMLElement: function (element) {
                if (element == null) {
                    return new ExpressCraft.Rectange.ctor();
                }

                var obj = $(element);
                return Bridge.merge(new ExpressCraft.Rectange.ctor(), {
                    x: parseInt(obj.css("left")),
                    y: parseInt(obj.css("top")),
                    width: parseInt(obj.css("width")),
                    height: parseInt(obj.css("height"))
                } );
            },
            getDefaultValue: function () { return new ExpressCraft.Rectange(); }
        },
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        $ctor1: function (location, size) {
            this.$initialize();
            this.x = location.x;
            this.y = location.y;

            this.width = size.width;
            this.height = size.height;
        },
        $ctor2: function (x, y, width, height) {
            this.$initialize();
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        },
        ctor: function () {
            this.$initialize();
        },
        getHashCode: function () {
            var h = Bridge.addHash([3653948339, this.x, this.y, this.width, this.height]);
            return h;
        },
        equals: function (o) {
            if (!Bridge.is(o, ExpressCraft.Rectange)) {
                return false;
            }
            return Bridge.equals(this.x, o.x) && Bridge.equals(this.y, o.y) && Bridge.equals(this.width, o.width) && Bridge.equals(this.height, o.height);
        },
        $clone: function (to) {
            var s = to || new ExpressCraft.Rectange();
            s.x = this.x;
            s.y = this.y;
            s.width = this.width;
            s.height = this.height;
            return s;
        }
    });

    Bridge.define("ExpressCraft.RibbonControl.RibbonType", {
        $kind: "enum",
        statics: {
            Full: 0,
            Compact: 1
        }
    });

    Bridge.define("ExpressCraft.RibbonGroup.RenderInfo", {
        left: 0,
        width: 0,
        isSmall: false,
        firstButton: null,
        secondButton: null,
        thirdButton: null,
        beginGroup: false
    });

    Bridge.define("ExpressCraft.Settings", {
        statics: {
            resourceURL: "./images/",
            renderControlsOnAdd: true,
            defaultFont: "8.25pt Tahoma",
            defaultStyleSheet: null,
            pluginStyleSheet: null,
            gridViewAutoColumnGenerateFormatAsDate: false,
            setup: function () {
                ExpressCraft.Settings.setupStyleDefaults();
            },
            setupStyleDefaults: function () {
                var sheets = document.styleSheets;
                for (var i = 0; i < sheets.length; i = (i + 1) | 0) {
                    var ownerNode = Bridge.as(sheets[i].ownerNode, HTMLLinkElement);
                    if (ownerNode == null) {
                        continue;
                    }
                    if (Bridge.referenceEquals(ownerNode.id, "expresscraft")) {
                        ExpressCraft.Settings.defaultStyleSheet = sheets[i];
                    }
                    if (Bridge.referenceEquals(ownerNode.id, "expresscraftplugin")) {
                        ExpressCraft.Settings.pluginStyleSheet = sheets[i];
                    }
                }
                if (ExpressCraft.Settings.defaultStyleSheet == null) {
                    return;
                }
                ExpressCraft.Settings.defaultFont = ExpressCraft.Settings.getStyleRuleValue("font", "*");
            },
            getStyleRuleValue: function (style, className) {
                if (ExpressCraft.Settings.pluginStyleSheet != null) {
                    var pStyles = ExpressCraft.Settings.pluginStyleSheet;
                    if (pStyles.cssRules) {
                        for (var i = 0; i < pStyles.cssRules.length; i = (i + 1) | 0) {
                            var rule = pStyles.cssRules[i];
                            if (rule.selectorText && !Bridge.referenceEquals(rule.selectorText.split(44).indexOf(className), -1)) {
                                return rule.style[style];
                            }
                        }
                    }
                }

                if (ExpressCraft.Settings.defaultStyleSheet == null) {
                    return null;
                }
                var Styles = ExpressCraft.Settings.defaultStyleSheet;
                if (!Styles.cssRules) {
                    return null;
                }

                for (var i1 = 0; i1 < Styles.cssRules.length; i1 = (i1 + 1) | 0) {
                    var rule1 = Styles.cssRules[i1];
                    if (rule1.selectorText && !Bridge.referenceEquals(rule1.selectorText.split(44).indexOf(className), -1)) {
                        return rule1.style[style];
                    }
                }
                return null;
            }
        }
    });

    Bridge.define("ExpressCraft.Size", {
        $kind: "struct",
        statics: {
            getDefaultValue: function () { return new ExpressCraft.Size(); }
        },
        width: 0,
        height: 0,
        $ctor1: function (width, height) {
            this.$initialize();
            this.width = width;
            this.height = height;
        },
        ctor: function () {
            this.$initialize();
        },
        getHashCode: function () {
            var h = Bridge.addHash([1702521171, this.width, this.height]);
            return h;
        },
        equals: function (o) {
            if (!Bridge.is(o, ExpressCraft.Size)) {
                return false;
            }
            return Bridge.equals(this.width, o.width) && Bridge.equals(this.height, o.height);
        },
        $clone: function (to) {
            var s = to || new ExpressCraft.Size();
            s.width = this.width;
            s.height = this.height;
            return s;
        }
    });

    Bridge.define("ExpressCraft.SortMode", {
        $kind: "enum",
        statics: {
            None: 0,
            Asc: 1,
            Desc: 2
        }
    });

    Bridge.define("ExpressCraft.StyleController", {
        statics: {
            cSS_calc: "calc",
            setup: function () {
                if (Bridge.Browser.isChrome) {
                    if (Bridge.Browser.chromeVersion < 26.0) {
                        ExpressCraft.StyleController.cSS_calc = "-webkit-calc";
                    }
                } else if (ExpressCraft.StyleController.isFireFox()) {
                    if (Bridge.Browser.firefoxVersion < 16.0) {
                        ExpressCraft.StyleController.cSS_calc = "-moz-calc";
                    }
                } else if (Bridge.Browser.isSafari) {
                    if (Bridge.Browser.safariVersion < 7.0) {
                        ExpressCraft.StyleController.cSS_calc = "-webkit-calc";
                    }
                }
            },
            isFireFox: function () {
                return Bridge.Browser.isFF10 || Bridge.Browser.isFF3_0 || Bridge.Browser.isFF3_5 || Bridge.Browser.isFF3_6 || Bridge.Browser.isFF4 || Bridge.Browser.isFF5;
            },
            calc: function (percent, value, isPixels, roundPercent) {
                if (isPixels === void 0) { isPixels = true; }
                if (roundPercent === void 0) { roundPercent = true; }
                return System.String.format("{0}({1}% - {2}{3})", ExpressCraft.StyleController.cSS_calc, roundPercent ? Bridge.Math.round(percent, 0, 6) : percent, value, isPixels ? "px" : "em");
            }
        }
    });

    Bridge.define("ExpressCraft.ComboBoxEdit", {
        inherits: [ExpressCraft.Control],
        comboBoxBase: null,
        previousSelectedIndex: -1,
        selectedIndexChanged: null,
        enabled: true,
        _readonly: false,
        ctor: function () {
            this.$initialize();
            ExpressCraft.Control.$ctor4.call(this, "inputcontrol", ExpressCraft.ComboBoxTypes.Default);
            this.comboBoxBase = Bridge.as(this.content, HTMLSelectElement);

            this.comboBoxBase.onchange = Bridge.fn.bind(this, $asm.$.ExpressCraft.ComboBoxEdit.f1);
        },
        getText: function () {
            if (this.comboBoxBase.selectedIndex === -1) {
                return "";
            }
            return this.comboBoxBase.options[this.comboBoxBase.selectedIndex].innerHTML;
        },
        setText: function (value) {
            for (var i = 0; i < this.comboBoxBase.options.length; i = (i + 1) | 0) {
                if (Bridge.referenceEquals(this.comboBoxBase.options[i].innerHTML, value)) {
                    this.comboBoxBase.selectedIndex = i;
                }
            }
            this.comboBoxBase.selectedIndex = -1;
        },
        getValue: function () {
            if (this.comboBoxBase.selectedIndex === -1) {
                return "";
            }
            return this.comboBoxBase.options[this.comboBoxBase.selectedIndex].value;
        },
        setValue: function (value) {
            for (var i = 0; i < this.comboBoxBase.options.length; i = (i + 1) | 0) {
                if (Bridge.referenceEquals(this.comboBoxBase.options[i].value, value)) {
                    this.comboBoxBase.selectedIndex = i;
                }
            }
            this.comboBoxBase.selectedIndex = -1;
        },
        getEnabled: function () {
            return this.enabled;
        },
        setEnabled: function (value) {
            this.enabled = value;
            this.content.setAttribute("disabled", System.Boolean.toString((!this.enabled)));
        },
        getReadonly: function () {
            return this._readonly;
        },
        setReadonly: function (value) {
            this._readonly = value;
            this.content.setAttribute("readonly", System.Boolean.toString((this._readonly)));
        },
        fillData: function (dataitems) {
            if (dataitems === void 0) { dataitems = []; }
            $(this.comboBoxBase).empty();

            if (dataitems == null) {
                for (var i = 0; i < dataitems.length; i = (i + 1) | 0) {
                    this.comboBoxBase.appendChild(Bridge.merge(document.createElement('option'), {
                        innerHTML: dataitems[i].text,
                        value: dataitems[i].value
                    } ));
                }
            }
        },
        render: function () {
            ExpressCraft.Control.prototype.render.call(this);
        }
    });

    Bridge.ns("ExpressCraft.ComboBoxEdit", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.ComboBoxEdit, {
        f1: function (ev) {
            if (this.previousSelectedIndex !== this.comboBoxBase.selectedIndex) {
                if (!Bridge.staticEquals(this.selectedIndexChanged, null)) {
                    this.selectedIndexChanged(this);
                }

                this.previousSelectedIndex = this.comboBoxBase.selectedIndex;
            }
            ev.stopPropagation();
        }
    });

    Bridge.define("ExpressCraft.DataColumnDateTime", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(System.Nullable$1(Date)))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.DateTime;
        }
    });

    Bridge.define("ExpressCraft.DataColumnDecimal", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Decimal)))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.Decimal;
        }
    });

    Bridge.define("ExpressCraft.DataColumnDouble", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Double)))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.Double;
        }
    });

    Bridge.define("ExpressCraft.DataColumnFloat", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Single)))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.Float;
        }
    });

    Bridge.define("ExpressCraft.DataColumnInteger", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Int32)))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.Integer;
        }
    });

    Bridge.define("ExpressCraft.DataColumnLong", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(System.Nullable$1(System.Int64)))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.Long;
        }
    });

    Bridge.define("ExpressCraft.DataColumnObject", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(Object))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.Object;
        }
    });

    Bridge.define("ExpressCraft.DataColumnString", {
        inherits: [ExpressCraft.DataColumn],
        cells: null,
        config: {
            init: function () {
                this.cells = new (System.Collections.Generic.List$1(String))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.DataColumn.ctor.call(this);
            this.dataType = ExpressCraft.DataType.String;
        }
    });

    Bridge.define("ExpressCraft.Form", {
        inherits: [ExpressCraft.Control],
        statics: {
            movingForm: null,
            parent: null,
            formOverLay: null,
            formCollections: null,
            _ActiveForm: null,
            _PrevActiveForm: null,
            moveAction: 1,
            windowHolderSelectionBoxX: 0,
            windowHolderSelectionBoxY: 0,
            windowHolderSelectionBoxXOff: 0,
            windowHolderSelectionBoxYOff: 0,
            toClean: null,
            config: {
                properties: {
                    WindowHolder: null,
                    ResizeCorners: 2,
                    Mouse_Down: false,
                    FadeLength: 100,
                    ShowBodyOverLay: false,
                    Window_DefaultHeight: 480,
                    Window_DefaultWidth: 640
                },
                init: function () {
                    this.formCollections = new (System.Collections.Generic.List$1(ExpressCraft.FormCollection))();
                    this.toClean = new (System.Collections.Generic.List$1(ExpressCraft.Form))();
                }
            },
            getActiveForm: function () {
                return ExpressCraft.Form._ActiveForm;
            },
            setActiveForm: function (value) {
                if (!Bridge.referenceEquals(ExpressCraft.Form._ActiveForm, value)) {
                    ExpressCraft.Form._PrevActiveForm = ExpressCraft.Form._ActiveForm;

                    if (ExpressCraft.Form._ActiveForm != null) {
                        if (ExpressCraft.Form._ActiveForm.content != null) {
                            ExpressCraft.Form._ActiveForm.getBodyOverLay().style.visibility = "visible";
                        }
                    }
                    ExpressCraft.Form._ActiveForm = value;
                    if (ExpressCraft.Form._ActiveForm != null) {
                        if (ExpressCraft.Form._ActiveForm.content != null) {
                            ExpressCraft.Form._ActiveForm.getBodyOverLay().style.visibility = "collapse";
                            ExpressCraft.Form._ActiveForm.bringToFront();
                        }
                    }
                }

            },
            midleOfAction: function () {
                return ExpressCraft.Form.movingForm != null; // WindowHolderSelectionBox != null ||
            },
            getActiveFormCollection: function () {
                for (var i = (ExpressCraft.Form.formCollections.getCount() - 1) | 0; i >= 0; i = (i - 1) | 0) {
                    var frmCol = ExpressCraft.Form.formCollections.getItem(i);
                    if (frmCol.formOwner == null) {
                        for (var x = 0; x < frmCol.visibleForms.getCount(); x = (x + 1) | 0) {
                            if (frmCol.visibleForms.getItem(x) != null) {
                                frmCol.visibleForms.getItem(x).close();
                            }
                        }
                        ExpressCraft.Form.formCollections.removeAt(i);
                    } else {
                        return frmCol;
                    }
                }

                return null;
            },
            setBodyOverLay: function () {
                var ActiveCollection = ExpressCraft.Form.getActiveFormCollection();
                if (ActiveCollection == null) {
                    return;
                }

                ActiveCollection.formOwner.showBodyOverLayStyle();

                var VisibleForms = ActiveCollection.visibleForms;

                for (var i = 0; i < VisibleForms.getCount(); i = (i + 1) | 0) {
                    var form = VisibleForms.getItem(i);
                    if (form != null) {
                        form.showBodyOverLayStyle();
                    }
                }
            },
            changeStateTextSelection: function (element, state) {
                if (state) {
                    $(element).css("user-select", "text");
                } else {
                    $(element).css("user-select", "none");
                }
            },
            disableStateDrag: function (element) {
                if (Bridge.is(element, HTMLImageElement)) {
                    element.ondragstart = $asm.$.ExpressCraft.Form.f1;
                } else {
                    $(element).css("user-drag:", "none");
                }
            },
            setup: function (parent) {
                if (parent === void 0) { parent = null; }
                ExpressCraft.StyleController.setup();
                window.onresize = $asm.$.ExpressCraft.Form.f2;

                //Window_PopuoMenu = new PopupMenu();
                //Window_PopuoMenu.Items.AddRange(new MenuItem[] {
                //	new MenuItem() { Caption = "View" },
                //	new MenuItem() { Caption = "Sort by" },
                //	new MenuItem() { Caption = "Refresh" },
                //	new MenuItem() { Caption = "Paste", BeginGroup = true },
                //	new MenuItem() { Caption = "Paste Shortcut"},
                //	new MenuItem() { Caption = "Graphics Properties...", BeginGroup = true },
                //	new MenuItem() { Caption = "Graphics Options"},
                //	new MenuItem() { Caption = "New", BeginGroup = true },
                //	new MenuItem() { Caption = "Display settings", BeginGroup = true },
                //	new MenuItem() { Caption = "Personalise"}
                //});

                //         var keyCodes = new List<int>(new int[] { 61, 107, 173, 109, 187, 189 });

                //Document.AddEventListener(EventType.KeyDown, (ev) =>
                //{
                //	var kev = ev.As<KeyboardEvent>();

                //	if(kev.CtrlKey && (keyCodes.Contains(kev.Which)))
                //	{
                //		ev.PreventDefault();
                //	}
                //});

                if (parent == null) {
                    ExpressCraft.Form.parent = document.body;
                } else {
                    ExpressCraft.Form.parent = parent;
                }

                ExpressCraft.Form.setWindowHolder(ExpressCraft.Control.createDiv$1("form-container"));
                ExpressCraft.Form.formOverLay = ExpressCraft.Control.createDiv$1("system-form-collection-overlay");
                //#0173C7
                ExpressCraft.Form.formOverLay.onclick = $asm.$.ExpressCraft.Form.f3;

                ExpressCraft.Form.formOverLay.oncontextmenu = $asm.$.ExpressCraft.Form.f4;
                ExpressCraft.Form.formOverLay.style.visibility = "visible";

                ExpressCraft.Form.getWindowHolder().appendChild(ExpressCraft.Form.formOverLay);

                var mouseMove = $asm.$.ExpressCraft.Form.f5;

                //Window.OnContextMenu = (ev) => {
                //	var mev = ev.As<MouseEvent>();

                //	var point = new Point(mev.PageX + WindowHolder.ScrollLeft, mev.PageY + WindowHolder.ScrollTop);

                //	if(ActiveForm == null)
                //	{
                //		if(Window_PopuoMenu != null)
                //		{
                //			ev.PreventDefault();
                //			ev.StopImmediatePropagation();
                //			Window_PopuoMenu.Show(point);
                //		}
                //	}
                //	else if(ActiveForm.ContextMenu != null)
                //	{
                //		ev.StopImmediatePropagation();
                //		ev.PreventDefault();
                //		ActiveForm.ContextMenu.Show(point);
                //	}
                //};

                //	Window.AddEventListener(EventType.MouseDown, (ev) => { if(PopupMenu.ActivePopupMenu != null) { PopupMenu.ActivePopupMenu.Close(); } });

                window.addEventListener("mouseup", $asm.$.ExpressCraft.Form.f6);

                window.addEventListener("mousemove", mouseMove);

                ExpressCraft.Form.parent.appendChild(ExpressCraft.Form.getWindowHolder());
                //	Parent.AppendChild(TaskBar);

                //TaskBar.AppendChild(ButtonStart);
                //TaskBar.AppendChild(InputStartSearch);

                //Window_Desktop = new FileExplorer(WindowHolder) { NodeViewType = NodeViewType.Medium_Icons, Path = FileExplorer.DesktopPath };
            },
            calculateZOrder: function () {
                ExpressCraft.Form.getActiveFormCollection();

                if (ExpressCraft.Form.formCollections == null) {
                    return;
                }
                ExpressCraft.Form.formCollections.remove(null);

                var zIndex = { v : 1 };

                if (ExpressCraft.Form.formCollections.getCount() === 1) {
                    ExpressCraft.Form.formOverLay.style.opacity = "0";
                } else {
                    ExpressCraft.Form.formOverLay.style.opacity = "0.4";
                }

                for (var x = 0; x < ExpressCraft.Form.formCollections.getCount(); x = (x + 1) | 0) {
                    if (x === ((ExpressCraft.Form.formCollections.getCount() - 1) | 0)) {
                        $(ExpressCraft.Form.formOverLay).css("zIndex", Bridge.identity(zIndex.v, (zIndex.v = (zIndex.v + 1) | 0)));
                    }

                    var TopMostForms = new (System.Collections.Generic.List$1(ExpressCraft.Form))();

                    var VisibleForms = ExpressCraft.Form.formCollections.getItem(x).visibleForms;

                    ExpressCraft.Form.formCollections.getItem(x).formOwner.setZIndex(zIndex);

                    for (var i = 0; i < VisibleForms.getCount(); i = (i + 1) | 0) {
                        if (VisibleForms.getItem(i).content == null) {
                            ExpressCraft.Form.toClean.add(VisibleForms.getItem(i));
                        } else {
                            if (VisibleForms.getItem(i).topMost) {
                                TopMostForms.add(VisibleForms.getItem(i));
                            }
                        }
                    }
                    for (var i1 = 0; i1 < ExpressCraft.Form.toClean.getCount(); i1 = (i1 + 1) | 0) {
                        if (VisibleForms.contains(ExpressCraft.Form.toClean.getItem(i1))) {
                            VisibleForms.remove(ExpressCraft.Form.toClean.getItem(i1));
                            ExpressCraft.Form.toClean.setItem(i1, null);
                        }

                    }
                    ExpressCraft.Form.toClean.remove(null); // Removes all nulls..

                    for (var i2 = 0; i2 < TopMostForms.getCount(); i2 = (i2 + 1) | 0) {
                        var form = TopMostForms.getItem(i2);
                        VisibleForms.remove(form);
                        VisibleForms.add(form);
                    }
                    for (var i3 = 0; i3 < VisibleForms.getCount(); i3 = (i3 + 1) | 0) {
                        if (VisibleForms.getItem(i3) != null && VisibleForms.getItem(i3).content != null) {
                            VisibleForms.getItem(i3).setZIndex(zIndex);
                        }
                    }
                }
            }
        },
        allowSizeChange: true,
        allowMoveChange: true,
        self: null,
        _IsDialog: false,
        children: null,
        startPosition: 2,
        topMost: false,
        dialogResult: 0,
        prev_px: 0,
        prev_py: 0,
        prev_width: 0,
        prev_height: 0,
        prev_top: 0,
        prev_left: 0,
        dialogResults: null,
        config: {
            properties: {
                Heading: null,
                ButtonClose: null,
                ButtonExpand: null,
                ButtonMinimize: null,
                HeadingTitle: null,
                Body: null,
                BodyOverLay: null,
                Owner: null,
                MinWidth: 200,
                MinHeight: 50,
                windowState: 0
            },
            init: function () {
                this.children = new (System.Collections.Generic.List$1(ExpressCraft.Control))();
                this.dialogResults = new (System.Collections.Generic.List$1(ExpressCraft.DialogResult))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.Control.$ctor1.call(this, "form-base");
            this.setHeading(ExpressCraft.Control.createDiv$1("form-heading"));

            this.getHeading().oncontextmenu = $asm.$.ExpressCraft.Form.f4;

            this.setHeadingTitle(ExpressCraft.Control.createSpan$1("form-heading-title"));

            this.setBody(ExpressCraft.Control.createDiv$1("form-body"));

            this.getBody().oncontextmenu = Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f7);

            this.setBackColor("#F0F0F0");

            this.setBodyOverLay(ExpressCraft.Control.createDiv$1("form-body-overlay"));

            this.getBodyOverLay().style.opacity = ExpressCraft.Form.getShowBodyOverLay() ? "0.5" : "0";

            this.setButtonClose(this.createFormButton(ExpressCraft.Form.FormButtonType.Close));
            this.setButtonExpand(this.createFormButton(ExpressCraft.Form.FormButtonType.Maximize));
            this.setButtonMinimize(this.createFormButton(ExpressCraft.Form.FormButtonType.Minimize));

            this.getBodyOverLay().style.visibility = "collapse";

            this.self = $(this.content);

            this.content.addEventListener("mousedown", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f8));

            this.getHeading().addEventListener("dblclick", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f9));

            this.content.addEventListener("mousemove", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f10));

            this.getHeading().addEventListener("mousedown", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f11));

            this.getBody().addEventListener("mousedown", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f12));

            this.getBody().addEventListener("mousemove", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f13));

            this.getBodyOverLay().addEventListener("mousedown", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f14));

            this.getBody().addEventListener("mouseleave", $asm.$.ExpressCraft.Form.f15);

            this.getBodyOverLay().addEventListener("mouseenter", Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f16));

            $(this.content).css("width", ExpressCraft.Form.getWindow_DefaultWidth()).css("height", ExpressCraft.Form.getWindow_DefaultHeight());

            this.content.appendChild(this.getHeading());
            this.content.appendChild(this.getBody());
            this.content.appendChild(this.getBodyOverLay());

            this.getHeading().appendChild(this.getHeadingTitle());
            this.getHeading().appendChild(this.getButtonClose());
            this.getHeading().appendChild(this.getButtonExpand());
            this.getHeading().appendChild(this.getButtonMinimize());

            this.initialise();
        },
        getHeight: function () {
            return this.content.style.height;
        },
        setHeight: function (value) {
            this.content.style.height = value;
        },
        getWidth: function () {
            return this.content.style.width;
        },
        setWidth: function (value) {
            this.content.style.width = value;
        },
        getLeft: function () {
            return this.content.style.left;
        },
        setLeft: function (value) {
            this.content.style.left = value;
        },
        getTop: function () {
            return this.content.style.top;
        },
        setTop: function (value) {
            this.content.style.top = value;
        },
        getText: function () {
            return this.getHeadingTitle().innerHTML;
        },
        setText: function (value) {
            this.getHeadingTitle().innerHTML = value;
        },
        getBackColor: function () {
            return this.getBody().style.backgroundColor;
        },
        setBackColor: function (value) {
            this.getBody().style.backgroundColor = value;
        },
        getForeColor: function () {
            return this.getBody().style.color;
        },
        setForeColor: function (value) {
            this.getBody().style.color = value;
        },
        isDialog: function () {
            return this._IsDialog;
        },
        linkchildToForm: function (child) {
            if (child == null) {
                return;
            }
            this.children.add(child);
        },
        linkchildrenToForm: function (children) {
            if (children === void 0) { children = []; }
            if (children == null || children.length === 0) {
                return;
            }
            this.children.addRange(children);
        },
        resizing: function () {
            if (!Bridge.staticEquals(this.onResize, null)) {
                this.onResize(this);
            }
            this.onResizing();

            for (var i = 0; i < this.children.getCount(); i = (i + 1) | 0) {
                if (this.children.getItem(i) != null && !Bridge.staticEquals(this.children.getItem(i).onResize, null)) {
                    this.children.getItem(i).onResize(this.children.getItem(i));
                }
            }
        },
        onResizing: function () {

        },
        isContentVisible: function () {
            return this.content != null && this.content.style.visibility === "visible";
        },
        initialise: function () {

        },
        onShowing: function () {

        },
        onShowed: function () {

        },
        onClosing: function () {

        },
        onClosed: function () {

        },
        showBodyOverLayStyle: function () {
            if (this.getBodyOverLay() != null && this.getBodyOverLay().style.visibility === "collapse") {
                this.getBodyOverLay().style.visibility = "visible";
            }
        },
        setWindowState: function (State) {
            if (!this.allowSizeChange) {
                return;
            }

            this.setwindowState(State);

            if (this.getwindowState() === ExpressCraft.Form.WindowState.Normal) {
                this.setWidth(this.prev_width + "px");
                this.setHeight(this.prev_height + "px");

                this.setTop(this.prev_top + "px");
                this.setLeft(this.prev_left + "px");

                this.resizing();
            } else if (this.getwindowState() === ExpressCraft.Form.WindowState.Maximized) {
                this.prev_height = parseInt(this.getHeight());
                this.prev_width = parseInt(this.getWidth());

                this.prev_left = parseInt(this.getLeft());
                this.prev_top = parseInt(this.getTop());

                this.setWidth(ExpressCraft.StyleController.calc(100, 5));
                this.setHeight(ExpressCraft.StyleController.calc(100, 5));

                this.setTop("0");
                this.setLeft("0");

                this.resizing();
            }
        },
        changeWindowState: function () {
            if (this.getwindowState() === ExpressCraft.Form.WindowState.Maximized) {
                this.setWindowState(ExpressCraft.Form.WindowState.Normal);
            } else {
                this.setWindowState(ExpressCraft.Form.WindowState.Maximized);
            }
        },
        createFormButton: function (Type) {
            var butt = ExpressCraft.Control.createDiv$1("form-heading-button");

            switch (Type) {
                case ExpressCraft.Form.FormButtonType.Close: 
                    butt.classList.add("form-heading-button-close");
                    butt.style.left = ExpressCraft.StyleController.calc(100, 45);
                    butt.innerHTML = "X";
                    butt.onmousedown = Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f17);
                    butt.onmouseup = Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f18);
                    butt.onmouseenter = Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f19);
                    butt.onmouseleave = $asm.$.ExpressCraft.Form.f20;
                    break;
                case ExpressCraft.Form.FormButtonType.Maximize: 
                    butt.style.left = ExpressCraft.StyleController.calc(100, 91);
                    butt.innerHTML = "&#9633;";
                    butt.onmouseup = Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f21);
                    break;
                case ExpressCraft.Form.FormButtonType.Minimize: 
                    butt.style.left = ExpressCraft.StyleController.calc(100, 137);
                    butt.innerHTML = "-";
                    butt.onmouseup = Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f22);
                    break;
                case ExpressCraft.Form.FormButtonType.Restore: 
                    break;
                case ExpressCraft.Form.FormButtonType.Help: 
                    break;
                default: 
                    butt.onmouseup = $asm.$.ExpressCraft.Form.f23;
                    break;
            }

            butt.onmousemove = $asm.$.ExpressCraft.Form.f24;

            if (Type !== ExpressCraft.Form.FormButtonType.Close) {
                butt.onmousedown = Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f25);
            }

            return butt;
        },
        setCursor: function (cur) {
            this.content.style.cursor = cur;
            this.getHeading().style.cursor = cur;
        },
        titleBarHeight: function () {
            return this.getHeading().clientHeight;
        },
        titleBarWidth: function () {
            return this.getHeading().clientWidth;
        },
        clientX: function () {
            return this.getBody().clientLeft;
        },
        clientY: function () {
            return this.getBody().clientTop;
        },
        getFormCollectionFromForm: function (form) {
            for (var i = 0; i < ExpressCraft.Form.formCollections.getCount(); i = (i + 1) | 0) {
                if (Bridge.referenceEquals(this, ExpressCraft.Form.formCollections.getItem(i).formOwner)) {
                    return ExpressCraft.Form.formCollections.getItem(i);
                }
                var visibleForms = ExpressCraft.Form.formCollections.getItem(i).visibleForms;
                for (var x = 0; x < visibleForms.getCount(); x = (x + 1) | 0) {
                    if (Bridge.referenceEquals(visibleForms.getItem(x), this)) {
                        return ExpressCraft.Form.formCollections.getItem(i);
                    }
                }
            }
            return null;
        },
        isActiveFormCollection: function () {
            return Bridge.referenceEquals(this.getFormCollectionFromForm(this), ExpressCraft.Form.getActiveFormCollection());
        },
        isVisible: function () {
            return this.getFormCollectionFromForm(this) != null;
        },
        showStartNewLevel: function (owner) {
            if (owner === void 0) { owner = null; }
            if (this.isVisible()) {
                // Already Open???
                throw new System.Exception("Invalid request to open form as a dialog that is already visible!");
            }
            this.addFormToParentElement(owner);

            this.getBody().focus();

            ExpressCraft.Form.formCollections.add(new ExpressCraft.FormCollection(this));

            ExpressCraft.Form.calculateZOrder();

            this.onShowed();

            ExpressCraft.Form.setActiveForm(this);
        },
        showDialog: function (dialogResults) {
            if (dialogResults === void 0) { dialogResults = []; }
            if (this.getButtonMinimize() != null) {
                this.getButtonMinimize().remove();
            }
            if (this.getButtonExpand() != null) {
                this.getButtonExpand().remove();
            }
            if (this.getButtonClose() != null) {
                this.getButtonClose().remove();
            }

            if (dialogResults != null && dialogResults.length > 0) {
                this.dialogResults.addRange(dialogResults);
            }
            this.startPosition = ExpressCraft.Form.FormStartPosition.Center;

            this._IsDialog = true;

            this.showStartNewLevel(null);

            this.centreForm();

            ExpressCraft.Form.setActiveForm(this);
        },
        centreForm: function () {
            if (this.getOwner() == null) {
                return;
            }

            this.self.css("left", (((((Bridge.Int.div(this.getOwner().clientWidth, 2)) | 0)) - (((Bridge.Int.div(parseInt(this.getWidth()), 2)) | 0))) | 0)).css("top", (((((Bridge.Int.div(this.getOwner().clientHeight, 2)) | 0)) - (((Bridge.Int.div(parseInt(this.getHeight()), 2)) | 0))) | 0));
        },
        addFormToParentElement: function (owner) {
            if (owner === void 0) { owner = null; }
            if (!this.getHasRendered()) {
                this.render();
                this.setHasRendered(true);
            }

            this.onShowing();

            if (owner == null) {
                ExpressCraft.Form.getWindowHolder().appendChild(this.content);
                owner = ExpressCraft.Form.getWindowHolder();
            } else {
                owner.appendChild(this.content);
            }
            this.shown();

            this.setOwner(owner);
        },
        shown: function () {
            if (this.children == null) {
                return;
            }
            for (var i = 0; i < this.children.getCount(); i = (i + 1) | 0) {
                if (this.children.getItem(i) != null && !Bridge.staticEquals(this.children.getItem(i).onLoaded, null)) {
                    this.children.getItem(i).onLoaded(this.children.getItem(i));
                }
            }
            this.children.remove(null);
        },
        show: function (owner) {
            if (owner === void 0) { owner = null; }
            if (this._IsDialog) {
                return;
            }

            if (ExpressCraft.Form.formCollections == null || ExpressCraft.Form.formCollections.getCount() === 0) {
                this.showStartNewLevel(owner);
                return;
            }

            var activeCollect = ExpressCraft.Form.getActiveFormCollection();
            var visbileForms = activeCollect.visibleForms;

            if (!visbileForms.contains(this)) {
                this.addFormToParentElement();

                this.content.style.visibility = "visible";
                if (this.startPosition !== ExpressCraft.Form.FormStartPosition.Manual && this.getwindowState() === ExpressCraft.Form.WindowState.Normal) {
                    if (this.startPosition === ExpressCraft.Form.FormStartPosition.Center || (activeCollect == null || visbileForms == null || visbileForms.getCount() === 0 || visbileForms.getItem(((visbileForms.getCount() - 1) | 0)).getwindowState() !== ExpressCraft.Form.WindowState.Normal || visbileForms.getItem(((visbileForms.getCount() - 1) | 0)).content == null)) {
                        this.centreForm();

                    } else if (this.startPosition === ExpressCraft.Form.FormStartPosition.WindowsDefaultLocation) {
                        var obj = visbileForms.getItem(((visbileForms.getCount() - 1) | 0));

                        var x = parseInt(obj.getLeft());
                        var y = parseInt(obj.getTop());

                        var pw25 = this.getOwner().clientWidth * 0.15;
                        var ph25 = this.getOwner().clientHeight * 0.15;

                        var pw75 = this.getOwner().clientWidth * 0.55;
                        var ph75 = this.getOwner().clientHeight * 0.55;

                        if (x < pw25) {
                            x = Bridge.Int.clip32(pw25);
                        }
                        if (y < ph25) {
                            y = Bridge.Int.clip32(ph25);
                        }

                        if (x > pw75) {
                            x = Bridge.Int.clip32(pw25);
                        }
                        if (y > ph75) {
                            y = Bridge.Int.clip32(ph25);
                        }
                        x = (x + 10) | 0;
                        y = (y + 10) | 0;

                        this.self.css("left", x).css("top", y);
                    }
                }

                this.getBody().focus();

                visbileForms.add(this);

                ExpressCraft.Form.calculateZOrder();

                this.onShowed();
            }

            ExpressCraft.Form.setActiveForm(this);
        },
        bringToFront: function () {
            var activeCollect = ExpressCraft.Form.getActiveFormCollection();
            if (activeCollect != null) {
                if (Bridge.referenceEquals(activeCollect.formOwner, this)) {
                    return;
                }
                var visibleForms = activeCollect.visibleForms;
                if (visibleForms != null && visibleForms.getCount() > 1) {
                    visibleForms.remove(this);
                    visibleForms.add(this);
                }

                ExpressCraft.Form.calculateZOrder();
            }
        },
        setZIndex: function (zIndex) {
            this.self.css("zIndex", Bridge.identity(zIndex.v, (zIndex.v = (zIndex.v + 1) | 0)));
        },
        close: function () {
            this.onClosing();

            ExpressCraft.Form.toClean.add(this);

            var ownerFormCollection = this.getFormCollectionFromForm(this);

            if (ownerFormCollection != null) {
                if (Bridge.referenceEquals(ownerFormCollection.formOwner, this)) {
                    ownerFormCollection.formOwner = null;
                    for (var i = 0; i < ownerFormCollection.visibleForms.getCount(); i = (i + 1) | 0) {
                        if (Bridge.referenceEquals(ownerFormCollection.visibleForms.getItem(i), this)) {
                            continue;
                        }
                        ownerFormCollection.visibleForms.getItem(i).close();
                    }
                } else {
                    ownerFormCollection.visibleForms.remove(this);
                }
            }

            if (this.content != null) {
                $(this.content).fadeOut(ExpressCraft.Form.getFadeLength(), Bridge.fn.bind(this, $asm.$.ExpressCraft.Form.f26));
            }

            ExpressCraft.Form.calculateZOrder();

            ExpressCraft.Form.setActiveForm(ExpressCraft.Form._PrevActiveForm);

            if (this.dialogResult !== ExpressCraft.DialogResultEnum.None && this.dialogResults != null && this.dialogResults.getCount() > 0) {
                for (var i1 = 0; i1 < this.dialogResults.getCount(); i1 = (i1 + 1) | 0) {
                    this.dialogResults.getItem(i1).invokeIfResult(this.dialogResult);
                }
            }

            this.onClosed();
        },
        fillControlWithParent: function (element, widthOffset, heightOffset) {
            if (widthOffset === void 0) { widthOffset = 8; }
            if (heightOffset === void 0) { heightOffset = 9; }
            element.style.position = "absolute";
            element.style.width = ExpressCraft.StyleController.calc(100, widthOffset);
            element.style.height = ExpressCraft.StyleController.calc(100, heightOffset);

            element.style.top = "1px";
            element.style.left = "1px";
        },
        fillHorizontalControlWithParent: function (element, widthOffset) {
            if (widthOffset === void 0) { widthOffset = 8; }
            element.style.position = "absolute";
            element.style.width = ExpressCraft.StyleController.calc(100, widthOffset);

            element.style.left = "1px";
        },
        fillVerticalControlWithParent: function (element, heightOffset) {
            if (heightOffset === void 0) { heightOffset = 9; }
            element.style.position = "absolute";
            element.style.height = ExpressCraft.StyleController.calc(100, heightOffset);

            element.style.top = "1px";
        }
    });

    Bridge.ns("ExpressCraft.Form", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.Form, {
        f1: function (ev) {
            ev.preventDefault();
        },
        f2: function (ev) {
            if (ExpressCraft.Form.formCollections == null) {
                return;
            }

            for (var i = 0; i < ExpressCraft.Form.formCollections.getCount(); i = (i + 1) | 0) {
                if (ExpressCraft.Form.formCollections.getItem(i) == null) {
                    continue;
                }
                var fc = ExpressCraft.Form.formCollections.getItem(i);
                if (fc.formOwner != null) {
                    fc.formOwner.resizing();
                }
                for (var x = 0; x < fc.visibleForms.getCount(); x = (x + 1) | 0) {
                    if (fc.visibleForms.getItem(x) != null) {
                        fc.visibleForms.getItem(x).resizing();
                    }
                }
            }
        },
        f3: function (ev) {

            if (ExpressCraft.Form.getActiveForm() != null) {
                var form = ExpressCraft.Form.getActiveForm();
                form.getHeading().classList.add("form-heading-flash");
                Bridge.global.setTimeout(function () {
                    form.getHeading().classList.remove("form-heading-flash");
                }, 800);
            }
        },
        f4: function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
        },
        f5: function (ev) {

            var mev = ev;

            if (ExpressCraft.Form.movingForm != null) {
                ev.preventDefault();
                ev.stopImmediatePropagation();
                ev.stopPropagation();

                if (ExpressCraft.Form.movingForm.getBodyOverLay().style.visibility === "collapse") {
                    ExpressCraft.Form.movingForm.getBodyOverLay().style.visibility = "visible";
                    ExpressCraft.Form.movingForm.getHeading().focus();
                }

                var Y = (((mev.pageY + ExpressCraft.Form.movingForm.prev_py) | 0));
                var X = (((mev.pageX + ExpressCraft.Form.movingForm.prev_px) | 0));

                if (ExpressCraft.Form.movingForm.getwindowState() === ExpressCraft.Form.WindowState.Maximized && ExpressCraft.Form.moveAction === ExpressCraft.Form.MouseMoveAction.Move) {
                    ExpressCraft.Form.movingForm.changeWindowState();
                    X = (mev.pageX - (((Bridge.Int.div(ExpressCraft.Form.movingForm.prev_width, 2)) | 0))) | 0;

                    ExpressCraft.Form.movingForm.prev_px = (X - mev.pageX) | 0;
                }

                var obj = ExpressCraft.Form.movingForm.self;

                var X1 = { };
                var Y1 = { };

                var W = { };
                var H = { };

                if (Y < 0) {
                    Y = 1;
                }
                if (X < 0) {
                    X = 1;
                }

                //
                switch (ExpressCraft.Form.moveAction) {
                    case ExpressCraft.Form.MouseMoveAction.Move: 
                        ExpressCraft.Helper.setLocation$1(ExpressCraft.Form.movingForm.content, X, Y);
                        break;
                    case ExpressCraft.Form.MouseMoveAction.TopLeftResize: 
                        ExpressCraft.Rectange.setBounds(X1, Y1, W, H, obj);
                        W.v = (W.v - (((X - X1.v) | 0))) | 0;
                        H.v = (H.v - (((Y - Y1.v) | 0))) | 0;
                        if (W.v < ExpressCraft.Form.movingForm.getMinWidth()) {
                            X = (X - (((ExpressCraft.Form.movingForm.getMinWidth() - W.v) | 0))) | 0;
                            W.v = ExpressCraft.Form.movingForm.getMinWidth();
                        }
                        if (H.v < ExpressCraft.Form.movingForm.getMinHeight()) {
                            Y = (Y - (((ExpressCraft.Form.movingForm.getMinHeight() - H.v) | 0))) | 0;
                            H.v = ExpressCraft.Form.movingForm.getMinHeight();
                        }
                        ExpressCraft.Helper.setBounds$1(ExpressCraft.Form.movingForm.content, X, Y, W.v, H.v);
                        ExpressCraft.Form.movingForm.resizing();
                        break;
                    case ExpressCraft.Form.MouseMoveAction.TopResize: 
                        Y1.v = parseInt(obj.css("top"));
                        H.v = parseInt(obj.css("height"));
                        H.v = (H.v - (((Y - Y1.v) | 0))) | 0;
                        if (H.v < ExpressCraft.Form.movingForm.getMinHeight()) {
                            Y = (Y - (((ExpressCraft.Form.movingForm.getMinHeight() - H.v) | 0))) | 0;
                            H.v = ExpressCraft.Form.movingForm.getMinHeight();
                        }
                        obj.css("top", Y).css("height", H.v);
                        ExpressCraft.Form.movingForm.resizing();
                        break;
                    case ExpressCraft.Form.MouseMoveAction.TopRightResize: 
                        ExpressCraft.Rectange.setBounds(X1, Y1, W, H, obj);
                        H.v = (H.v - (((Y - Y1.v) | 0))) | 0;
                        W.v = (mev.pageX - X1.v) | 0;
                        if (H.v < ExpressCraft.Form.movingForm.getMinHeight()) {
                            Y = (Y - (((ExpressCraft.Form.movingForm.getMinHeight() - H.v) | 0))) | 0;
                            H.v = ExpressCraft.Form.movingForm.getMinHeight();
                        }
                        if (W.v < ExpressCraft.Form.movingForm.getMinWidth()) {
                            W.v = ExpressCraft.Form.movingForm.getMinWidth();
                        }
                        obj.css("top", Y).css("height", H.v).css("width", W.v);
                        ExpressCraft.Form.movingForm.resizing();
                        break;
                    case ExpressCraft.Form.MouseMoveAction.LeftResize: 
                        X1.v = parseInt(obj.css("left"));
                        W.v = parseInt(obj.css("width"));
                        W.v = (W.v - (((X - X1.v) | 0))) | 0;
                        if (W.v < ExpressCraft.Form.movingForm.getMinWidth()) {
                            X = (X - (((ExpressCraft.Form.movingForm.getMinWidth() - W.v) | 0))) | 0;
                            W.v = ExpressCraft.Form.movingForm.getMinWidth();
                        }
                        obj.css("left", X).css("width", W.v);
                        ExpressCraft.Form.movingForm.resizing();
                        break;
                    case ExpressCraft.Form.MouseMoveAction.BottomLeftResize: 
                        ExpressCraft.Rectange.setBounds(X1, Y1, W, H, obj);
                        W.v = (W.v - (((X - X1.v) | 0))) | 0;
                        H.v = (mev.pageY - Y1.v) | 0;
                        if (W.v < ExpressCraft.Form.movingForm.getMinWidth()) {
                            X = (X - (((ExpressCraft.Form.movingForm.getMinWidth() - W.v) | 0))) | 0;
                            W.v = ExpressCraft.Form.movingForm.getMinWidth();
                        }
                        if (H.v < ExpressCraft.Form.movingForm.getMinHeight()) {
                            H.v = ExpressCraft.Form.movingForm.getMinHeight();
                        }
                        obj.css("left", X).css("width", W.v).css("height", H.v);
                        ExpressCraft.Form.movingForm.resizing();
                        break;
                    case ExpressCraft.Form.MouseMoveAction.BottomResize: 
                        Y1.v = parseInt(obj.css("top"));
                        H.v = parseInt(obj.css("height"));
                        H.v = (mev.pageY - Y1.v) | 0;
                        if (H.v < ExpressCraft.Form.movingForm.getMinHeight()) {
                            H.v = ExpressCraft.Form.movingForm.getMinHeight();
                        }
                        obj.css("height", H.v);
                        ExpressCraft.Form.movingForm.resizing();
                        break;
                    case ExpressCraft.Form.MouseMoveAction.RightResize: 
                        X1.v = parseInt(obj.css("left"));
                        W.v = parseInt(obj.css("width"));
                        W.v = (mev.pageX - X1.v) | 0;
                        if (W.v < ExpressCraft.Form.movingForm.getMinWidth()) {
                            W.v = ExpressCraft.Form.movingForm.getMinWidth();
                        }
                        obj.css("width", W.v);
                        ExpressCraft.Form.movingForm.resizing();
                        break;
                    case ExpressCraft.Form.MouseMoveAction.BottomRightResize: 
                        ExpressCraft.Rectange.setBounds(X1, Y1, W, H, obj);
                        W.v = (mev.pageX - X1.v) | 0;
                        H.v = (mev.pageY - Y1.v) | 0;
                        if (H.v < ExpressCraft.Form.movingForm.getMinHeight()) {
                            H.v = ExpressCraft.Form.movingForm.getMinHeight();
                        }
                        if (W.v < ExpressCraft.Form.movingForm.getMinWidth()) {
                            W.v = ExpressCraft.Form.movingForm.getMinWidth();
                        }
                        obj.css("width", W.v).css("height", H.v);
                        ExpressCraft.Form.movingForm.resizing();
                        break;
                    default: 
                        break;
                }
            }
        },
        f6: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                ExpressCraft.Form.movingForm.getBodyOverLay().style.visibility = "collapse";
            }

            ExpressCraft.Form.movingForm = null;
            ExpressCraft.Form.setMouse_Down(false);
            ExpressCraft.Form.moveAction = ExpressCraft.Form.MouseMoveAction.Move;

            //HideFileSelection();
        },
        f7: function (ev) {
            if (Bridge.referenceEquals(ev.target, this.getBody())) {
                ev.stopPropagation();
                ev.preventDefault();
            }
        },
        f8: function (ev) {
            if (!this.isActiveFormCollection()) {
                return;
            }

            var mev = ev;

            mev.stopPropagation();

            ExpressCraft.Form.setMouse_Down(true);

            ExpressCraft.Form.movingForm = this;
            ExpressCraft.Form.setActiveForm(this);

            ExpressCraft.Form.setBodyOverLay();

            this.prev_px = (parseInt(this.self.css("left")) - mev.pageX) | 0;
            this.prev_py = (parseInt(this.self.css("top")) - mev.pageY) | 0;

            var width = this.content.clientWidth;
            var height = this.content.clientHeight;
            var mouse = new ExpressCraft.Point.$ctor1(((mev.pageX - this.content.offsetLeft) | 0), ((mev.pageY - this.content.offsetTop) | 0));

            if (this.getwindowState() === ExpressCraft.Form.WindowState.Maximized) {
                this.setCursor("default");
                ExpressCraft.Form.moveAction = ExpressCraft.Form.MouseMoveAction.Move;
            } else {
                if (this.getHeadingTitle() != null && Bridge.referenceEquals(ev.target, this.getHeadingTitle())) {
                    this.setCursor("default");
                    ExpressCraft.Form.moveAction = ExpressCraft.Form.MouseMoveAction.Move;
                } else {
                    if (this.allowSizeChange) {
                        if (mouse.x <= ExpressCraft.Form.getResizeCorners() && mouse.y <= ExpressCraft.Form.getResizeCorners()) {
                            this.setCursor("nwse-resize");
                            ExpressCraft.Form.moveAction = ExpressCraft.Form.MouseMoveAction.TopLeftResize;
                        } else if (mouse.y <= ExpressCraft.Form.getResizeCorners() && mouse.x >= ((width - ExpressCraft.Form.getResizeCorners()) | 0)) {
                            this.setCursor("nesw-resize");
                            ExpressCraft.Form.moveAction = ExpressCraft.Form.MouseMoveAction.TopRightResize;
                        } else if (mouse.y <= ExpressCraft.Form.getResizeCorners()) {
                            this.setCursor("n-resize");
                            ExpressCraft.Form.moveAction = ExpressCraft.Form.MouseMoveAction.TopResize;
                        } else if (mouse.x <= ExpressCraft.Form.getResizeCorners() && mouse.y >= ((height - ExpressCraft.Form.getResizeCorners()) | 0)) {
                            this.setCursor("nesw-resize");
                            ExpressCraft.Form.moveAction = ExpressCraft.Form.MouseMoveAction.BottomLeftResize;
                        } else if (mouse.y >= ((height - ExpressCraft.Form.getResizeCorners()) | 0) && mouse.x >= ((width - ExpressCraft.Form.getResizeCorners()) | 0)) {
                            this.setCursor("nwse-resize");
                            ExpressCraft.Form.moveAction = ExpressCraft.Form.MouseMoveAction.BottomRightResize;
                        } else if (mouse.y >= ((height - ExpressCraft.Form.getResizeCorners()) | 0)) {
                            this.setCursor("s-resize");
                            ExpressCraft.Form.moveAction = ExpressCraft.Form.MouseMoveAction.BottomResize;
                        } else if (mouse.x <= ExpressCraft.Form.getResizeCorners()) {
                            this.setCursor("w-resize");
                            ExpressCraft.Form.moveAction = ExpressCraft.Form.MouseMoveAction.LeftResize;

                        } else if (mouse.x >= ((width - ExpressCraft.Form.getResizeCorners()) | 0)) {
                            this.setCursor("e-resize");
                            ExpressCraft.Form.moveAction = ExpressCraft.Form.MouseMoveAction.RightResize;
                        } else {
                            this.setCursor("default");
                            ExpressCraft.Form.moveAction = ExpressCraft.Form.MouseMoveAction.Move;
                        }
                    }
                }
            }

            if (!this.allowMoveChange && ExpressCraft.Form.moveAction === ExpressCraft.Form.MouseMoveAction.Move) {
                ExpressCraft.Form.moveAction = ExpressCraft.Form.MouseMoveAction.None;
            }
        },
        f9: function (ev) {
            if (this.allowSizeChange) {
                this.changeWindowState();
            }
            ev.preventDefault();
            ev.stopPropagation();
        },
        f10: function (ev) {
            if (Bridge.referenceEquals(ev.target, this.getHeadingTitle())) {
                return;
            }
            var mev = ev;

            var width = this.content.clientWidth;
            var height = this.content.clientHeight;
            var mouse = new ExpressCraft.Point.$ctor1(((mev.pageX - this.content.offsetLeft) | 0), ((mev.pageY - this.content.offsetTop) | 0));

            if (ExpressCraft.Form.movingForm != null && ExpressCraft.Form.moveAction === ExpressCraft.Form.MouseMoveAction.Move) {
                this.setCursor("default");
                return;
            } else if (this.getwindowState() === ExpressCraft.Form.WindowState.Maximized) {
                this.setCursor("default");
                return;
            }
            if (this.allowSizeChange) {
                if (ExpressCraft.Form.moveAction === ExpressCraft.Form.MouseMoveAction.TopLeftResize || mouse.x <= ExpressCraft.Form.getResizeCorners() && mouse.y <= ExpressCraft.Form.getResizeCorners()) {
                    this.setCursor("nwse-resize");
                } else if (ExpressCraft.Form.moveAction === ExpressCraft.Form.MouseMoveAction.TopRightResize || mouse.y <= ExpressCraft.Form.getResizeCorners() && mouse.x >= ((width - ExpressCraft.Form.getResizeCorners()) | 0)) {
                    this.setCursor("nesw-resize");
                } else if (mouse.y <= ExpressCraft.Form.getResizeCorners() || ExpressCraft.Form.moveAction === ExpressCraft.Form.MouseMoveAction.TopResize) {
                    this.setCursor("n-resize");
                } else if (ExpressCraft.Form.moveAction === ExpressCraft.Form.MouseMoveAction.BottomLeftResize || mouse.x <= ExpressCraft.Form.getResizeCorners() && mouse.y >= ((height - ExpressCraft.Form.getResizeCorners()) | 0)) {
                    this.setCursor("nesw-resize");
                } else if (ExpressCraft.Form.moveAction === ExpressCraft.Form.MouseMoveAction.BottomRightResize || mouse.y >= ((height - ExpressCraft.Form.getResizeCorners()) | 0) && mouse.x >= ((width - ExpressCraft.Form.getResizeCorners()) | 0)) {
                    this.setCursor("nwse-resize");
                } else if (ExpressCraft.Form.moveAction === ExpressCraft.Form.MouseMoveAction.BottomResize || mouse.y >= ((height - ExpressCraft.Form.getResizeCorners()) | 0)) {
                    this.setCursor("s-resize");
                } else if (ExpressCraft.Form.moveAction === ExpressCraft.Form.MouseMoveAction.LeftResize || mouse.x <= ExpressCraft.Form.getResizeCorners()) {
                    this.setCursor("w-resize");
                } else if (ExpressCraft.Form.moveAction === ExpressCraft.Form.MouseMoveAction.RightResize || mouse.x >= ((width - ExpressCraft.Form.getResizeCorners()) | 0)) {
                    this.setCursor("e-resize");
                } else {
                    this.setCursor("default");
                }
            } else {
                this.setCursor("default");
            }

        },
        f11: function (ev) {
            ExpressCraft.Form.setBodyOverLay();
            if (!this.isActiveFormCollection()) {
                return;
            }

            if (this.getwindowState() === ExpressCraft.Form.WindowState.Maximized) {
                ExpressCraft.Form.movingForm = this;
                this.setCursor("default");

                ExpressCraft.Form.moveAction = ExpressCraft.Form.MouseMoveAction.Move;
            } else {
                ExpressCraft.Form.movingForm = this;
            }

            ExpressCraft.Form.setActiveForm(this);
        },
        f12: function (ev) {
            if (!this.isActiveFormCollection()) {
                return;
            }

            ExpressCraft.Form.setActiveForm(this);
            ExpressCraft.Form.movingForm = null;
            this.setCursor("default");
            ev.stopPropagation();
        },
        f13: function (ev) {
            if (ExpressCraft.Form.movingForm == null) {
                if (!this.isActiveFormCollection()) {
                    return;
                }

                this.setCursor("default");
                ev.stopPropagation();
            }
        },
        f14: function (ev) {
            if (!this.isActiveFormCollection()) {
                return;
            }
            this.getBodyOverLay().style.visibility = "collapse";
            ExpressCraft.Form.setActiveForm(this);
        },
        f15: function (ev) {
            if (ExpressCraft.Form.movingForm == null) {
                ExpressCraft.Form.setBodyOverLay();
            }
        },
        f16: function (ev) {
            if (ExpressCraft.Form.movingForm == null && this.isActiveFormCollection()) {
                this.getBodyOverLay().style.visibility = "collapse";
            } else {
                this.getBodyOverLay().style.visibility = "visible";
            }
        },
        f17: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }
            ExpressCraft.Form.setMouse_Down(true);

            ev.stopPropagation();
            ev.preventDefault();

            ExpressCraft.Form.setActiveForm(this);
        },
        f18: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }

            ev.stopPropagation();
            ev.preventDefault();

            this.close();
        },
        f19: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }

            this.setCursor("default");
        },
        f20: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }
        },
        f21: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }

            ev.stopPropagation();
            ev.preventDefault();

            ExpressCraft.Form.setMouse_Down(false);

            this.changeWindowState();
        },
        f22: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }

            ev.stopPropagation();
            ev.preventDefault();

            ExpressCraft.Form.setMouse_Down(false);
            this.setwindowState(ExpressCraft.Form.WindowState.Minimized);
        },
        f23: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }

            ev.stopPropagation();
            ev.preventDefault();

            ExpressCraft.Form.setMouse_Down(false);
        },
        f24: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }

            ev.stopImmediatePropagation();
            ev.preventDefault();
        },
        f25: function (ev) {
            if (ExpressCraft.Form.movingForm != null) {
                return;
            }

            ExpressCraft.Form.setMouse_Down(true);

            ev.stopPropagation();
            ev.preventDefault();

            ExpressCraft.Form.setActiveForm(this);
        },
        f26: function () {
            $(this.content).empty();
            this.content.remove();
            this.content = null;
        }
    });

    Bridge.define("ExpressCraft.GridView", {
        inherits: [ExpressCraft.Control],
        statics: {
            SortDownBase64: "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",
            SortUpBase64: "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",
            UnitHeight: 28.0
        },
        gridHeader: null,
        gridHeaderContainer: null,
        gridBody: null,
        gridBodyRows: null,
        _dataSource: null,
        onRowSizeChanged: null,
        onColumnSizeChanged: null,
        bottonOfTable: null,
        rightOfTable: null,
        rightOfTableHeader: null,
        selectedRows: null,
        autoGenerateColumnsFromSource: true,
        allowMultiSelection: true,
        _columnAutoWidth: false,
        onRowClick: null,
        visibleRowHandles: null,
        columns: null,
        config: {
            init: function () {
                this.selectedRows = new (ExpressCraft.HardSoftList$1(Boolean))(false);
                this.columns = new (System.Collections.Generic.List$1(ExpressCraft.GridViewColumn))();
            }
        },
        ctor: function (autoGenerateColumns, columnAutoWidth) {
            if (autoGenerateColumns === void 0) { autoGenerateColumns = true; }
            if (columnAutoWidth === void 0) { columnAutoWidth = false; }

            this.$initialize();
            ExpressCraft.Control.$ctor1.call(this, "grid");
            this.gridHeaderContainer = ExpressCraft.Control.createDiv$1("heading-container");
            ExpressCraft.Helper.setBounds$3(this.gridHeaderContainer, "0", "0", "100%", "29px");

            this.gridHeader = ExpressCraft.Control.createDiv();
            ExpressCraft.Helper.setBounds$3(this.gridHeader, "0", "0", "0", "29px");
            this.gridBody = ExpressCraft.Control.createDiv();
            ExpressCraft.Helper.setBounds$3(this.gridBody, "1px", "31px", "calc(100% - 2px)", "calc(100% - 31px)");

            this.gridBody.style.overflowX = "auto";
            this.gridBody.style.overflowY = "auto";

            this.gridHeaderContainer.style.overflow = "hidden";

            this.gridBodyRows = ExpressCraft.Control.createDiv();
            ExpressCraft.Helper.setBounds$3(this.gridBodyRows, "0", "0", "0", "0");

            this.gridBody.appendChild(this.gridBodyRows);
            this.gridHeaderContainer.appendChild(this.gridHeader);

            this.onRowSizeChanged = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f1);
            this.onColumnSizeChanged = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f2);
            this.onResize = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f3);
            this.gridBody.onscroll = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f3);
            //GridBody.OnClick = (ev) =>
            //{
            //	RenderGrid();
            //};
            this.onLoaded = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f3);

            this.onRowClick = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f4);
            this.content.tabIndex = 0;
            this.content.onkeydown = Bridge.fn.bind(this, $asm.$.ExpressCraft.GridView.f5);

            ExpressCraft.Helper.appendChildren(this.content, [this.gridHeaderContainer, this.gridBody]);

            this.autoGenerateColumnsFromSource = autoGenerateColumns;
            this.setColumnAutoWidth(columnAutoWidth);
        },
        getColumnAutoWidth: function () {
            return this._columnAutoWidth;
        },
        setColumnAutoWidth: function (value) {
            if (value) {
                this.gridBody.style.overflowX = "hidden";
            } else {
                this.gridBody.style.overflowX = "auto";
            }

            if (this._columnAutoWidth !== value) {
                this._columnAutoWidth = value;
                this.renderGrid();
            }
        },
        getDataSource: function () {
            return this._dataSource;
        },
        setDataSource: function (value) {
            this._dataSource = value;
            if (this._dataSource != null) {
                if (this.columns.getCount() === 0 && this.autoGenerateColumnsFromSource) {
                    for (var i = 0; i < this._dataSource.getColumnCount(); i = (i + 1) | 0) {
                        var gvc = Bridge.merge(new ExpressCraft.GridViewColumn(this), {
                            caption: this._dataSource.columns.getItem(i).fieldName,
                            column: this._dataSource.columns.getItem(i),
                            visible: true
                        } );
                        switch (this._dataSource.columns.getItem(i).dataType) {
                            case ExpressCraft.DataType.Integer: 
                            case ExpressCraft.DataType.Long: 
                            case ExpressCraft.DataType.Float: 
                            case ExpressCraft.DataType.Double: 
                            case ExpressCraft.DataType.Decimal: 
                                gvc.bodyApparence.alignment = "right";
                                break;
                            case ExpressCraft.DataType.DateTime: 
                                if (ExpressCraft.Settings.gridViewAutoColumnGenerateFormatAsDate) {
                                    gvc.formatString = "{0:d}";
                                }
                                break;
                        }
                        this.columns.add(gvc);
                    }
                }
                this.renderGrid();
            }
        },
        setVisibleRowHandles: function (T, Cells, asc) {
            if (asc) {
                var sorted = System.Linq.Enumerable.from(Cells).select(function (x, i) {
                        return new (System.Collections.Generic.KeyValuePair$2(T,System.Int32))(x, i);
                    }).orderBy($asm.$.ExpressCraft.GridView.f6).toList(System.Collections.Generic.KeyValuePair$2(T,System.Int32));

                this.visibleRowHandles = System.Linq.Enumerable.from(sorted).select($asm.$.ExpressCraft.GridView.f7).toList(System.Int32);
            } else {
                var sorted1 = System.Linq.Enumerable.from(Cells).select(function (x, i) {
                        return new (System.Collections.Generic.KeyValuePair$2(T,System.Int32))(x, i);
                    }).orderByDescending($asm.$.ExpressCraft.GridView.f6).toList(System.Collections.Generic.KeyValuePair$2(T,System.Int32));

                this.visibleRowHandles = System.Linq.Enumerable.from(sorted1).select($asm.$.ExpressCraft.GridView.f7).toList(System.Int32);
            }
        },
        sortColumn: function (column, sort) {
            if (sort === void 0) { sort = 1; }
            column.sortedMode = sort;

            if (sort === ExpressCraft.SortMode.None) {
                this.visibleRowHandles = null;
            } else {
                var sort1 = sort === ExpressCraft.SortMode.Asc;

                switch (column.column.dataType) {
                    default: 
                    case ExpressCraft.DataType.Object: 
                        this.setVisibleRowHandles(Object, (Bridge.as(column.column, ExpressCraft.DataColumnObject)).cells, sort1);
                        break;
                    case ExpressCraft.DataType.DateTime: 
                        this.setVisibleRowHandles(System.Nullable$1(Date), (Bridge.as(column.column, ExpressCraft.DataColumnDateTime)).cells, sort1);
                        break;
                    case ExpressCraft.DataType.String: 
                        this.setVisibleRowHandles(String, (Bridge.as(column.column, ExpressCraft.DataColumnString)).cells, sort1);
                        break;
                    case ExpressCraft.DataType.Integer: 
                        this.setVisibleRowHandles(System.Nullable$1(System.Int32), (Bridge.as(column.column, ExpressCraft.DataColumnInteger)).cells, sort1);
                        break;
                    case ExpressCraft.DataType.Long: 
                        this.setVisibleRowHandles(System.Nullable$1(System.Int64), (Bridge.as(column.column, ExpressCraft.DataColumnLong)).cells, sort1);
                        break;
                    case ExpressCraft.DataType.Float: 
                        this.setVisibleRowHandles(System.Nullable$1(System.Single), (Bridge.as(column.column, ExpressCraft.DataColumnFloat)).cells, sort1);
                        break;
                    case ExpressCraft.DataType.Double: 
                        this.setVisibleRowHandles(System.Nullable$1(System.Double), (Bridge.as(column.column, ExpressCraft.DataColumnDouble)).cells, sort1);
                        break;
                    case ExpressCraft.DataType.Decimal: 
                        this.setVisibleRowHandles(System.Nullable$1(System.Decimal), (Bridge.as(column.column, ExpressCraft.DataColumnDecimal)).cells, sort1);
                        break;
                }
            }

            this.renderGrid();
        },
        columnCount: function () {
            return this.columns.getCount();
        },
        rowCount: function () {
            if (this._dataSource == null) {
                return 0;
            }
            return this._dataSource.getRowCount();
        },
        scrollToBottom: function () {
            this.gridBody.scrollTop = (this.gridBodyRows.clientHeight - this.gridBody.clientHeight) | 0;
        },
        scrollToTop: function () {
            this.gridBody.scrollTop = 0;
        },
        getColumn: function (i) {
            return this.columns.getItem(i);
        },
        getColumnByFieldName: function (fieldName, IgnoreCase) {
            if (IgnoreCase === void 0) { IgnoreCase = false; }
            if (this.getDataSource() == null) {
                return null;
            }

            for (var i = 0; i < this.getDataSource().getColumnCount(); i = (i + 1) | 0) {
                if (this.getDataSource().columns.getItem(i) != null && System.String.compare(this.getDataSource().columns.getItem(i).fieldName, fieldName, IgnoreCase) === 0) {
                    return this.getDataSource().columns.getItem(i);
                }
            }

            return null;
        },
        addColumn$2: function (caption, fieldname, width, formatstring, alignment, forecolor, isBold) {
            if (width === void 0) { width = 100; }
            if (formatstring === void 0) { formatstring = ""; }
            if (alignment === void 0) { alignment = 3; }
            if (forecolor === void 0) { forecolor = null; }
            if (isBold === void 0) { isBold = false; }
            var col = this.getColumnByFieldName(fieldname);
            if (col == null) {
                return;
            }
            this.addColumn$1(caption, col, width, formatstring, alignment, forecolor, isBold);
        },
        addColumn$1: function (caption, column, width, formatstring, alignment, forecolor, isBold) {
            if (width === void 0) { width = 100; }
            if (formatstring === void 0) { formatstring = ""; }
            if (alignment === void 0) { alignment = 3; }
            if (forecolor === void 0) { forecolor = null; }
            if (isBold === void 0) { isBold = false; }
            this.addColumn(Bridge.merge(new ExpressCraft.GridViewColumn(this, width), {
                caption: caption,
                bodyApparence: new ExpressCraft.CellApparence.$ctor3(isBold, alignment, forecolor),
                formatString: formatstring,
                column: column
            } ));
        },
        addColumn: function (column) {
            if (column == null) {
                return;
            }

            this.columns.add(column);

            this.renderGrid();
        },
        addColumns: function (columns) {
            if (columns === void 0) { columns = []; }
            if (columns == null || columns.length === 0) {
                return;
            }

            this.columns.addRange(columns);

            this.renderGrid();
        },
        removeColumn: function (column) {
            this.columns.remove(column);

            this.renderGrid();
        },
        getDataSourceRow: function (i) {
            if (this.visibleRowHandles == null) {
                return i;
            }
            return this.visibleRowHandles.getItem(i);
        },
        getColumnWidths: function () {
            if (this._columnAutoWidth) {
                return this.gridBody.clientWidth;
            } else {
                var width = 0.0;
                for (var i = 0; i < this.columns.getCount(); i = (i + 1) | 0) {
                    width += this.columns.getItem(i).getWidth();
                }
                return width;
            }
        },
        selectAllRows: function () {
            var length = this.rowCount();
            if (length === 0) {
                this.selectedRows.clearAll();
            } else {
                var index = System.Array.init(length, 0);
                for (var i = 0; i < length; i = (i + 1) | 0) {
                    index[i] = this.getDataSourceRow(i);
                }
                this.selectedRows.clearAllSetHardRange(true, index);
            }
            this.renderGrid();
        },
        render: function () {
            ExpressCraft.Control.prototype.render.call(this);
            this.setHasRendered(true);
            this.renderGrid();
        },
        getRawVisibleRowCount: function () {
            return this.gridBody.clientHeight === 0 ? 0.0 : this.gridBody.clientHeight / ExpressCraft.GridView.UnitHeight;
        },
        getRawTopRowIndex: function () {
            return this.gridBody.scrollTop === 0 ? 0.0 : this.gridBody.scrollTop / ExpressCraft.GridView.UnitHeight;
        },
        validateGridWidth: function () {
            var width = this.getColumnWidths();
            this.gridBodyRows.style.width = ExpressCraft.Helper.toPx$2((width));
            this.gridHeader.style.width = ExpressCraft.Helper.toPx$2(((width) + 24)); // (width).ToPx();
            if (this.rightOfTable == null) {
                this.rightOfTable = ExpressCraft.Control.createDiv();
                this.gridBodyRows.appendChild(this.rightOfTable);
            }
            if (this.rightOfTableHeader == null) {
                this.rightOfTableHeader = ExpressCraft.Control.createDiv();
                this.gridHeader.appendChild(this.rightOfTableHeader);
            }
            ExpressCraft.Helper.setBounds$2(this.rightOfTable, width - 1, 0, 1, 1);
            ExpressCraft.Helper.setBounds$2(this.rightOfTableHeader, width - 1, 0, 1, 1);
        },
        validateGridHeight: function () {
            var i = this.rowCount();

            this.gridBodyRows.style.height = ExpressCraft.Helper.toPx$2((i * ExpressCraft.GridView.UnitHeight));
            if (this.bottonOfTable == null) {
                this.bottonOfTable = ExpressCraft.Control.createDiv();
                this.gridBodyRows.appendChild(this.bottonOfTable);
            }
            ExpressCraft.Helper.setBounds$2(this.bottonOfTable, 0, (i * ExpressCraft.GridView.UnitHeight) - 1, 1, 1);
        },
        validateGridSize: function () {
            this.validateGridHeight();
            this.validateGridWidth();
        },
        clearHeader: function () {
            for (var i = (this.gridHeader.children.length - 1) | 0; i >= 0; i = (i - 1) | 0) {
                if (this.gridHeader.children[i] != null && !Bridge.referenceEquals(this.gridHeader.children[i], this.rightOfTableHeader)) {
                    this.gridHeader.children[i].remove();
                }
            }
        },
        clearBody: function () {
            for (var i = (this.gridBodyRows.children.length - 1) | 0; i >= 0; i = (i - 1) | 0) {
                if (this.gridBodyRows.children[i] != null && !Bridge.referenceEquals(this.gridBodyRows.children[i], this.rightOfTable) && !Bridge.referenceEquals(this.gridBodyRows.children[i], this.bottonOfTable)) {
                    this.gridBodyRows.children[i].remove();
                }
            }
        },
        clearGrid: function () {
            this.clearHeader();
            this.clearBody();
        },
        renderGrid: function () {
            this.gridHeaderContainer.scrollLeft = this.gridBody.scrollLeft;

            this.validateGridSize();

            if (this.columnCount() === 0) {
                this.clearGrid();

                return;
            }

            var RawLeftCellIndex = 0;
            var RawLeftCellScrollPadding = 0;

            var RawLeftCellCount = this.columns.getCount();

            var LeftLocation = 0;
            var foundLeftLocation = false;
            var foundRightLocation = false;

            var ClientWidth = this.gridBody.clientWidth;

            var ViewWidth = (this.gridBody.scrollLeft + ClientWidth) | 0;
            var _columnAutoWidthSingle = 0.0;
            if (this._columnAutoWidth) {
                _columnAutoWidthSingle = ClientWidth === 0 ? 0.0 : ((Bridge.Int.div(ClientWidth, this.columns.getCount())) | 0);
            }

            for (var x = 0; x < this.columns.getCount(); x = (x + 1) | 0) {
                this.columns.getItem(x).cachedX = LeftLocation;
                LeftLocation += this._columnAutoWidth ? _columnAutoWidthSingle : this.columns.getItem(x).getWidth();
                if (!foundLeftLocation && LeftLocation >= this.gridBody.scrollLeft) {
                    foundLeftLocation = true;
                    RawLeftCellIndex = x;
                    RawLeftCellScrollPadding = LeftLocation - this.gridBody.scrollLeft;
                }
                if (foundLeftLocation && !foundRightLocation && LeftLocation >= ViewWidth) {
                    foundRightLocation = true;
                    RawLeftCellCount = (x + 1) | 0;
                    break;
                }
            }

            this.clearHeader();

            var uboundRowCount = (RawLeftCellCount - 1) | 0;
            for (var x1 = RawLeftCellIndex; x1 < RawLeftCellCount; x1 = (x1 + 1) | 0) {
                (function () {
                    var gcol = this.columns.getItem(x1);
                    var apparence = gcol.headingApparence;

                    var col = ExpressCraft.Control.createLabel$2(gcol.caption, (this._columnAutoWidth ? gcol.cachedX : gcol.cachedX) + 1, 0, (this._columnAutoWidth ? _columnAutoWidthSingle : gcol.getWidth()) - (x1 === uboundRowCount ? 0 : 1), apparence.isBold, false, "heading", apparence.alignment, apparence.forecolor);

                    if (gcol.sortedMode !== ExpressCraft.SortMode.None) {
                        var sortImage = ExpressCraft.Control.createDiv();
                        ExpressCraft.Helper.setBounds$3(sortImage, "calc(100% - 13px)", "11px", "9px", "5px");
                        sortImage.style.background = ExpressCraft.Control.getImageString(gcol.sortedMode === ExpressCraft.SortMode.Asc ? ExpressCraft.GridView.SortUpBase64 : ExpressCraft.GridView.SortDownBase64);
                        col.appendChild(sortImage);
                    }

                    col.onclick = Bridge.fn.bind(this, function (ev) {
                        for (var i = 0; i < this.columnCount(); i = (i + 1) | 0) {
                            if (!Bridge.referenceEquals(this.columns.getItem(i), gcol)) {
                                this.columns.getItem(i).sortedMode = ExpressCraft.SortMode.None;
                            }
                        }
                        switch (gcol.sortedMode) {
                            default: 
                            case ExpressCraft.SortMode.None: 
                                this.sortColumn(gcol, ExpressCraft.SortMode.Asc);
                                break;
                            case ExpressCraft.SortMode.Asc: 
                                this.sortColumn(gcol, ExpressCraft.SortMode.Desc);
                                break;
                            case ExpressCraft.SortMode.Desc: 
                                this.sortColumn(gcol, ExpressCraft.SortMode.None);
                                break;
                        }
                    });

                    this.gridHeader.appendChild(col);
                }).call(this);
            }

            if (this._dataSource == null || this._dataSource.getRowCount() === 0 || this._dataSource.getColumnCount() === 0) {
                this.clearBody();
                return;
            }

            var RawTopRowIndex = this.getRawTopRowIndex();
            var RawTopRowScrollPadding = RawTopRowIndex % 1.0;
            var RawVisibleRowCount = this.getRawVisibleRowCount();

            var Length = (Bridge.Int.clip32(RawVisibleRowCount + RawTopRowIndex) + 1) | 0;
            var start = Bridge.Int.clip32(RawTopRowIndex);

            for (var x2 = (this.selectedRows.softList.getCount() - 1) | 0; x2 >= 0; x2 = (x2 - 1) | 0) {
                var Found = false;
                for (var i = start; i < Length; i = (i + 1) | 0) {
                    if (i < this.getDataSource().getRowCount()) {
                        var DataRowhandle = this.getDataSourceRow(i);
                        if (this.selectedRows.getIndexValueByHardListIndex(this.selectedRows.softList.getItem(x2)).index === DataRowhandle) {
                            Found = true;
                            break;
                        }
                    }
                }
                if (!Found) {
                    this.selectedRows.softList.removeAt(x2);
                }
            }

            var Rows = new (System.Collections.Generic.List$1(HTMLDivElement))();

            for (var i1 = start; i1 < Length; i1 = (i1 + 1) | 0) {
                if (i1 < this.getDataSource().getRowCount()) {
                    var DataRowhandle1 = this.getDataSourceRow(i1);

                    var Y = (i1 * (ExpressCraft.GridView.UnitHeight)) - RawTopRowScrollPadding;
                    var classname = System.String.concat((i1 % 2 === 0 ? "cellrow even" : "cellrow"), (this.selectedRows.getValue(DataRowhandle1, true) ? " cellrow-selected" : ""));

                    var dr = ExpressCraft.Control.createDiv$1(classname);
                    var Last = this.columns.getItem(((RawLeftCellCount - 1) | 0));
                    ExpressCraft.Helper.setBounds$2(dr, 0, Y, this._columnAutoWidth ? ClientWidth : (Last.cachedX + Last.getWidth()), ExpressCraft.GridView.UnitHeight);
                    dr.setAttribute("i", System.Convert.toString(this.getDataSourceRow(i1)));

                    dr.onclick = this.onRowClick;

                    for (var x3 = RawLeftCellIndex; x3 < RawLeftCellCount; x3 = (x3 + 1) | 0) {
                        var apparence1 = this.columns.getItem(x3).bodyApparence;
                        var cell = ExpressCraft.Control.createLabel$2(this.columns.getItem(x3).getDisplayValueByDataRowHandle(DataRowhandle1), this.columns.getItem(x3).cachedX, 0, this._columnAutoWidth ? _columnAutoWidthSingle : this.columns.getItem(x3).getWidth(), apparence1.isBold, false, "cell", apparence1.alignment, apparence1.forecolor);

                        dr.appendChild(cell);
                    }

                    Rows.add(dr);

                }
            }

            this.clearBody();

            if (Rows.getCount() > 0) {
                $(this.gridBodyRows).append(Rows.toArray());
            }
        }
    });

    Bridge.ns("ExpressCraft.GridView", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.GridView, {
        f1: function (i) {
            this.validateGridHeight();
        },
        f2: function (i) {
            this.validateGridWidth();
        },
        f3: function (ev) {
            this.renderGrid();
        },
        f4: function (ev) {
            var mev = ev;
            if (this.allowMultiSelection) {
                if (mev.ctrlKey) {
                    this.selectedRows.addOrSet(true, parseInt(ev.currentTarget.getAttribute("i")), true);
                    this.renderGrid();
                    return;
                } else if (mev.shiftKey) {
                    return;
                }
            }
            this.selectedRows.clearAndAddOrSet(true, parseInt(ev.currentTarget.getAttribute("i")), true);
            this.renderGrid();
        },
        f5: function (ev) {
            var kev = ev;
            //Global.Alert("CONTROL + A");
            if (this.allowMultiSelection && kev.ctrlKey && (kev.keyCode === 65 || kev.keyCode === 97)) {
                // keyCode == 65 || keyCode == 97
                //Global.Alert("AllowMultiSelection = TRUE");
                this.selectAllRows();
            } else {
                //Global.Alert("AllowMultiSelection = FALSE");
            }
        },
        f6: function (x) {
            return x.key;
        },
        f7: function (x) {
            return x.value;
        }
    });

    Bridge.define("ExpressCraft.RibbonButton", {
        inherits: [ExpressCraft.Control],
        _icon: "",
        _iconURL: "",
        _caption: "",
        beginGroup: false,
        isSmallCaption: false,
        itemClick: null,
        enabled: true,
        captionDiv: null,
        imageDiv: null,
        ctor: function (_caption, _isSmallCaption) {
            if (_caption === void 0) { _caption = ""; }
            if (_isSmallCaption === void 0) { _isSmallCaption = false; }

            this.$initialize();
            ExpressCraft.Control.$ctor1.call(this, _isSmallCaption ? "ribbonbuttonsmall" : "ribbonbutton");
            this.setCaption(_caption);
            this.isSmallCaption = _isSmallCaption;
        },
        getIcon: function () {
            return this._icon;
        },
        setIcon: function (value) {
            if (!Bridge.referenceEquals(this._icon, value)) {
                this._icon = value;
                this.processImage();
            }
        },
        getIconURL: function () {
            return this._iconURL;
        },
        setIconURL: function (value) {
            if (!Bridge.referenceEquals(this._iconURL, value)) {
                this._iconURL = value;
                this.processImage();
            }
        },
        getCaption: function () {
            return this._caption;
        },
        setCaption: function (value) {
            if (!Bridge.referenceEquals(this._caption, value)) {
                this._caption = value;
                this.processCaption();
            }
        },
        getEnabled: function () {
            return this.enabled;
        },
        setEnabled: function (value) {
            this.enabled = value;
            this.setEnabled$1(value);
        },
        setEnabled$1: function (value) {
            this.changeState(value);
            if (value) {
                if (this.imageDiv != null) {
                    this.imageDiv.classList.remove("disabled");
                }
                if (this.captionDiv != null) {
                    this.captionDiv.classList.remove("disabled");
                }
            } else {
                if (this.imageDiv != null) {
                    this.imageDiv.classList.add("disabled");
                }
                if (this.captionDiv != null) {
                    this.captionDiv.classList.add("disabled");
                }
            }
        },
        render: function () {
            this.setHasRendered(true);

            this.content.onclick = Bridge.fn.bind(this, $asm.$.ExpressCraft.RibbonButton.f1);

            this.processCaption();
            this.processImage();

            this.setEnabled$1(this.enabled);
        },
        processCaption: function () {
            if (!System.String.isNullOrWhiteSpace(this.getCaption())) {
                this.captionDiv = ExpressCraft.Control.createDiv$1(this.isSmallCaption ? "ribbonbuttonsmallcaption" : "ribbonbuttoncaption");

                this.captionDiv.innerHTML = this.getCaption();

                this.content.appendChild(this.captionDiv);

            } else {
                if (this.captionDiv != null) {
                    this.captionDiv.remove();
                }
            }
        },
        processImage: function () {
            if (this.imageDiv == null) {
                if (!System.String.isNullOrWhiteSpace(this.getIcon())) {
                    this.imageDiv = ExpressCraft.Control.createDiv$1(this.isSmallCaption ? "ribbonbuttonsmallicon" : "ribbonbuttonicon");
                    this.imageDiv.style.background = ExpressCraft.Control.getImageString(this.getIcon());

                    this.content.appendChild(this.imageDiv);
                } else if (!System.String.isNullOrWhiteSpace(this.getIconURL())) {
                    this.imageDiv = ExpressCraft.Control.createDiv$1(this.isSmallCaption ? "ribbonbuttonsmallicon" : "ribbonbuttonicon");
                    this.imageDiv.style.background = ExpressCraft.Control.getImageStringURI(this.getIconURL());

                    this.content.appendChild(this.imageDiv);
                }
            } else {
                if (!System.String.isNullOrWhiteSpace(this.getIcon())) {
                    this.imageDiv.style.background = ExpressCraft.Control.getImageString(this.getIcon());
                } else if (!System.String.isNullOrWhiteSpace(this.getIconURL())) {
                    this.imageDiv.style.background = ExpressCraft.Control.getImageStringURI(this.getIconURL());
                }
            }
            if (this.imageDiv != null) {
                this.imageDiv.style.backgroundSize = "100% 100%";

                if (this.captionDiv != null && this.isSmallCaption) {
                    this.captionDiv.style.left = "28px";
                }
            } else {
                if (this.captionDiv != null && this.isSmallCaption) {
                    this.captionDiv.style.left = "6px";
                }
            }
        }
    });

    Bridge.ns("ExpressCraft.RibbonButton", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.RibbonButton, {
        f1: function (ev) {
            if (this.enabled && !Bridge.staticEquals(this.itemClick, null)) {
                this.itemClick(this);
            }
            ev.stopPropagation();
        }
    });

    Bridge.define("ExpressCraft.RibbonControl", {
        inherits: [ExpressCraft.Control],
        iconURL: "fav.ico",
        type: 0,
        selectedindex: 0,
        config: {
            properties: {
                RibbonPages: null
            },
            init: function () {
                this.RibbonPages = new (System.Collections.Generic.List$1(ExpressCraft.RibbonPage))();
            }
        },
        ctor: function (type) {
            if (type === void 0) { type = 0; }

            this.$initialize();
            ExpressCraft.Control.$ctor1.call(this, System.String.concat("ribboncontrol", (type === ExpressCraft.RibbonControl.RibbonType.Full ? "" : " ribboncontrol-compact")));
            this.type = type;

            this.content.oncontextmenu = $asm.$.ExpressCraft.RibbonControl.f1;
        },
        getSelectedIndex: function () {
            return this.selectedindex;
        },
        setSelectedIndex: function (value) {
            if (value < 0) {
                value = 0;
            }
            this.selectedindex = value;
            this.setSelectedIndex$1(value);
        },
        addRibbonPages: function (pages) {
            if (pages === void 0) { pages = []; }
            if (pages != null) {
                this.getRibbonPages().addRange(pages);
            }
        },
        setSelectedIndex$1: function (index) {
            if (this.getRibbonPages() != null && this.getRibbonPages().getCount() > 0) {
                for (var i = 0; i < this.getRibbonPages().getCount(); i = (i + 1) | 0) {
                    if (this.getRibbonPages().getItem(i).ribbonHeader != null) {
                        this.getRibbonPages().getItem(i).ribbonHeader.classList.remove("ribbonpageheader-hidden");
                        this.getRibbonPages().getItem(i).ribbonHeader.classList.remove("ribbonpageheader-active");

                        if (i === index) {
                            this.getRibbonPages().getItem(i).ribbonHeader.classList.add("ribbonpageheader-active");
                            this.getRibbonPages().getItem(i).content.style.visibility = "visible";
                        } else {
                            this.getRibbonPages().getItem(i).ribbonHeader.classList.add("ribbonpageheader-hidden");
                            this.getRibbonPages().getItem(i).content.style.visibility = "hidden";
                        }
                    }
                }
            }
        },
        render: function () {
            this.setHasRendered(true);
            if (this.type === ExpressCraft.RibbonControl.RibbonType.Full) {
                var applicationIcon = ExpressCraft.Control.createDiv$1("application-icon");
                var appIconImage = ExpressCraft.Control.createDiv$1("fav-icon");
                appIconImage.style.background = ExpressCraft.Control.getImageStringURI(this.iconURL);
                appIconImage.style.backgroundSize = "100% 100%";

                applicationIcon.appendChild(appIconImage);

                this.content.appendChild(applicationIcon);
            }

            if (this.getRibbonPages() != null && this.getRibbonPages().getCount() > 0) {
                var width = 58;
                for (var i = 0; i < this.getRibbonPages().getCount(); i = (i + 1) | 0) {
                    (function () {
                        this.getRibbonPages().getItem(i).render();

                        if (this.type === ExpressCraft.RibbonControl.RibbonType.Compact) {
                            if (!System.String.contains(this.getRibbonPages().getItem(i).content.className,"ribbonpage-compact")) {
                                this.getRibbonPages().getItem(i).content.classList.add("ribbonpage-compact");
                            }
                        } else {
                            if (System.String.contains(this.getRibbonPages().getItem(i).content.className,"ribbonpage-compact")) {
                                this.getRibbonPages().getItem(i).content.classList.remove("ribbonpage-compact");
                            }
                        }

                        var index = i;

                        if (i === this.selectedindex) {
                            this.getRibbonPages().getItem(i).ribbonHeader = ExpressCraft.Control.createDiv$1(System.String.concat("ribbonpageheader ribbonpageheader-active", (this.type === ExpressCraft.RibbonControl.RibbonType.Full ? "" : " ribbonpageheader-compact")));
                            this.getRibbonPages().getItem(i).content.style.visibility = "visible";
                        } else {
                            this.getRibbonPages().getItem(i).ribbonHeader = ExpressCraft.Control.createDiv$1(System.String.concat("ribbonpageheader ribbonpageheader-hidden", (this.type === ExpressCraft.RibbonControl.RibbonType.Full ? "" : " ribbonpageheader-compact")));
                            this.getRibbonPages().getItem(i).content.style.visibility = "hidden";
                        }

                        this.getRibbonPages().getItem(i).ribbonHeader.onmousedown = Bridge.fn.bind(this, function (ev) {
                            this.setSelectedIndex(index);
                        });
                        this.getRibbonPages().getItem(i).ribbonHeader.ontouchstart = Bridge.fn.bind(this, function (ev) {
                            this.setSelectedIndex(index);
                        });

                        this.getRibbonPages().getItem(i).ribbonHeader.innerHTML = this.getRibbonPages().getItem(i).getCaption();

                        var inwidth = 20;

                        if (!System.String.isNullOrEmpty(this.getRibbonPages().getItem(i).getCaption())) {
                            inwidth = (inwidth + Bridge.Int.clip32(this.getTextWidth(this.getRibbonPages().getItem(i).getCaption(), ExpressCraft.Settings.defaultFont))) | 0;
                        }

                        this.getRibbonPages().getItem(i).ribbonHeader.style.left = width + "px";
                        this.getRibbonPages().getItem(i).ribbonHeader.style.width = inwidth + "px";

                        this.content.appendChild(this.getRibbonPages().getItem(i).ribbonHeader);
                        this.content.appendChild(ExpressCraft.Control.op_Implicit(this.getRibbonPages().getItem(i)));

                        width = (width + inwidth) | 0;
                    }).call(this);
                }
            }
        }
    });

    Bridge.ns("ExpressCraft.RibbonControl", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.RibbonControl, {
        f1: function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
        }
    });

    Bridge.define("ExpressCraft.RibbonGroup", {
        inherits: [ExpressCraft.Control],
        enabled: true,
        captionDiv: null,
        riList: null,
        config: {
            properties: {
                Caption: null,
                Buttons: null
            }
        },
        ctor: function (_caption) {
            if (_caption === void 0) { _caption = ""; }

            this.$initialize();
            ExpressCraft.Control.$ctor1.call(this, "ribbongroup");
            this.setCaption(_caption);
            this.setButtons(new (System.Collections.Generic.List$1(ExpressCraft.RibbonButton))());
        },
        $ctor1: function (_caption, buttons) {
            if (buttons === void 0) { buttons = []; }

            this.$initialize();
            ExpressCraft.Control.$ctor1.call(this, "ribbongroup");
            this.setCaption(_caption);
            this.setButtons(new (System.Collections.Generic.List$1(ExpressCraft.RibbonButton))());
            if (buttons != null) {
                this.getButtons().addRange(buttons);
            }
        },
        getEnabled: function () {
            return this.enabled;
        },
        setEnabled: function (value) {
            this.enabled = value;
            this.setEnabled$1(value);
        },
        setEnabled$1: function (value) {
            if (this.getButtons().getCount() > 0) {
                for (var i = 0; i < this.getButtons().getCount(); i = (i + 1) | 0) {
                    if (!value) {
                        this.getButtons().getItem(i).setEnabled$1(value);
                    } else {
                        this.getButtons().getItem(i).setEnabled$1(this.getButtons().getItem(i).getEnabled());
                    }
                }
            }
            this.changeState(value);
            if (value) {
                if (this.captionDiv != null) {
                    this.captionDiv.classList.remove("disabled");
                }
            } else {
                if (this.captionDiv != null) {
                    this.captionDiv.classList.add("disabled");
                }
            }
        },
        createVerticalLine: function (height) {
            var htmlDiv = ExpressCraft.Control.createDiv$1("ribbonseperator");
            if (height !== 58) {
                htmlDiv.style.height = height + "px";
            }

            return htmlDiv;
        },
        generateRList: function () {

            var ri = null;

            if (this.riList == null) {
                this.riList = new (System.Collections.Generic.List$1(ExpressCraft.RibbonGroup.RenderInfo))();
                for (var i = 0; i < this.getButtons().getCount(); i = (i + 1) | 0) {
                    if (ri == null) {
                        ri = new ExpressCraft.RibbonGroup.RenderInfo();
                        ri.firstButton = this.getButtons().getItem(i);
                        ri.isSmall = ri.firstButton.isSmallCaption;
                    } else {
                        if (ri.isSmall !== this.getButtons().getItem(i).isSmallCaption || this.getButtons().getItem(i).beginGroup || !this.getButtons().getItem(i).isSmallCaption || (ri.firstButton != null && ri.secondButton != null && ri.thirdButton != null)) {
                            this.riList.add(ri);

                            ri = new ExpressCraft.RibbonGroup.RenderInfo();
                            ri.firstButton = this.getButtons().getItem(i);
                            ri.isSmall = this.getButtons().getItem(i).isSmallCaption;
                            ri.beginGroup = this.getButtons().getItem(i).beginGroup;
                        } else {
                            if (ri.secondButton == null) {
                                ri.secondButton = this.getButtons().getItem(i);
                            } else {
                                ri.thirdButton = this.getButtons().getItem(i);
                            }
                        }
                    }
                }

                if (ri != null) {
                    this.riList.add(ri);
                    ri = null;
                }
            }
        },
        render: function () {
            this.setHasRendered(true);
            if (this.getButtons() == null || this.getButtons().getCount() === 0) {
                return;
            }

            this.generateRList();

            var width = 0;

            for (var i = 0; i < this.riList.getCount(); i = (i + 1) | 0) {
                var ri = this.riList.getItem(i);

                if (ri.beginGroup) {
                    width = (width + 3) | 0;
                    var vlbg = this.createVerticalLine(58);
                    vlbg.style.left = width + "px";

                    this.content.appendChild(vlbg);
                }

                width = (width + 3) | 0;

                if (ri.isSmall) {
                    var MaxWidth;

                    if (ri.thirdButton == null) {
                        if (ri.secondButton == null) {
                            MaxWidth = Math.max(((((Bridge.Int.clip32(this.getTextWidth(ri.firstButton.getCaption(), ExpressCraft.Settings.defaultFont)) + 28) | 0) + 6) | 0), 64);

                            ri.firstButton.render();

                            ri.firstButton.content.style.left = width + "px";
                            ri.firstButton.content.style.width = MaxWidth + "px";

                            ri.firstButton.content.style.top = "26px";

                            this.content.appendChild(ExpressCraft.Control.op_Implicit(ri.firstButton));
                            // 1
                        } else {
                            MaxWidth = Math.max(((((Math.max(Bridge.Int.clip32(this.getTextWidth(ri.firstButton.getCaption(), ExpressCraft.Settings.defaultFont)), Bridge.Int.clip32(this.getTextWidth(ri.secondButton.getCaption(), ExpressCraft.Settings.defaultFont))) + 28) | 0) + 6) | 0), 64);

                            ri.firstButton.render();
                            ri.secondButton.render();

                            ri.firstButton.content.style.left = width + "px";
                            ri.secondButton.content.style.left = width + "px";

                            ri.firstButton.content.style.top = (21) + "px";

                            ri.firstButton.content.style.width = MaxWidth + "px";
                            ri.secondButton.content.style.width = MaxWidth + "px";

                            ri.firstButton.content.style.top = "11px";
                            ri.secondButton.content.style.top = "41px";

                            this.content.appendChild(ExpressCraft.Control.op_Implicit(ri.firstButton));
                            this.content.appendChild(ExpressCraft.Control.op_Implicit(ri.secondButton));
                            // 2
                        }
                    } else {
                        MaxWidth = Math.max(((((Math.max(Bridge.Int.clip32(this.getTextWidth(ri.firstButton.getCaption(), ExpressCraft.Settings.defaultFont)), Bridge.Int.clip32(this.getTextWidth(ri.secondButton.getCaption(), ExpressCraft.Settings.defaultFont)), Bridge.Int.clip32(this.getTextWidth(ri.thirdButton.getCaption(), ExpressCraft.Settings.defaultFont))) + 28) | 0) + 6) | 0), 64);

                        ri.firstButton.render();
                        ri.secondButton.render();
                        ri.thirdButton.render();

                        ri.firstButton.content.style.left = width + "px";
                        ri.secondButton.content.style.left = width + "px";
                        ri.thirdButton.content.style.left = width + "px";

                        ri.firstButton.content.style.width = MaxWidth + "px";
                        ri.secondButton.content.style.width = MaxWidth + "px";
                        ri.thirdButton.content.style.width = MaxWidth + "px";

                        ri.firstButton.content.style.top = "3px";
                        ri.secondButton.content.style.top = "26px";
                        ri.thirdButton.content.style.top = "49px";
                        // 3

                        this.content.appendChild(ExpressCraft.Control.op_Implicit(ri.firstButton));
                        this.content.appendChild(ExpressCraft.Control.op_Implicit(ri.secondButton));
                        this.content.appendChild(ExpressCraft.Control.op_Implicit(ri.thirdButton));
                    }

                    width = (width + MaxWidth) | 0;
                } else {
                    ri.firstButton.render();

                    ri.firstButton.content.style.left = width + "px";
                    var inwidth = 0;
                    if (System.String.contains(ri.firstButton.getCaption()," ")) {
                        var strings = ri.firstButton.getCaption().split(" ");
                        var builder = new System.Text.StringBuilder();

                        var length = (Bridge.Int.div(ri.firstButton.getCaption().length, 2)) | 0;

                        for (var j = 0; j < strings.length; j = (j + 1) | 0) {
                            if (builder.getLength() > length) {
                                inwidth = (Bridge.Int.clip32(this.getTextWidth(builder.toString(), ExpressCraft.Settings.defaultFont)) + 20) | 0;
                                break;
                            }
                            if (builder.getLength() > 0) {
                                builder.append(System.String.concat(" ", strings[j]));
                            } else {
                                builder.append(strings[j]);
                            }
                        }
                        if (inwidth === 0) {
                            inwidth = (Bridge.Int.clip32(this.getTextWidth(builder.toString(), ExpressCraft.Settings.defaultFont)) + 20) | 0;
                        }
                    } else {
                        inwidth = (Bridge.Int.clip32(this.getTextWidth(ri.firstButton.getCaption(), ExpressCraft.Settings.defaultFont)) + 20) | 0;
                    }

                    if (inwidth < 44) {
                        inwidth = 44;
                    }

                    ri.firstButton.content.style.width = inwidth + "px";

                    width = (width + inwidth) | 0;

                    this.content.appendChild(ExpressCraft.Control.op_Implicit(ri.firstButton));
                }
            }

            var minWidth = (Bridge.Int.clip32(this.getTextWidth(this.getCaption(), ExpressCraft.Settings.defaultFont)) + 20) | 0;

            if (width < minWidth) {
                width = minWidth;
            }

            width = (width + 3) | 0;

            var vl = this.createVerticalLine(80);
            vl.style.left = ((width - 1) | 0) + "px";

            this.content.appendChild(vl);

            this.content.style.width = width + "px";

            if (!System.String.isNullOrWhiteSpace(this.getCaption())) {
                this.captionDiv = ExpressCraft.Control.createDiv$1("ribbongroupcaption");

                this.captionDiv.innerHTML = this.getCaption();
                this.content.appendChild(this.captionDiv);
            }

            this.setEnabled$1(this.enabled);
        }
    });

    Bridge.define("ExpressCraft.RibbonPage", {
        inherits: [ExpressCraft.Control],
        ribbonHeader: null,
        config: {
            properties: {
                Caption: null,
                RibbonGroups: null
            },
            init: function () {
                this.RibbonGroups = new (System.Collections.Generic.List$1(ExpressCraft.RibbonGroup))();
            }
        },
        ctor: function (_caption) {
            if (_caption === void 0) { _caption = ""; }

            this.$initialize();
            ExpressCraft.Control.$ctor1.call(this, "ribbonpage");
            this.setCaption(_caption);
        },
        addRibbonGroups: function (pages) {
            if (pages === void 0) { pages = []; }
            if (pages != null) {
                this.getRibbonGroups().addRange(pages);
            }
        },
        render: function () {
            this.setHasRendered(true);
            if (this.getRibbonGroups() == null || this.getRibbonGroups().getCount() === 0) {
                return;
            }
            var width = 0;
            for (var i = 0; i < this.getRibbonGroups().getCount(); i = (i + 1) | 0) {
                this.getRibbonGroups().getItem(i).render();
                this.getRibbonGroups().getItem(i).content.style.left = width + "px";
                width = (width + (parseInt(this.getRibbonGroups().getItem(i).content.style.width))) | 0;
                this.content.appendChild(ExpressCraft.Control.op_Implicit(this.getRibbonGroups().getItem(i)));
            }
        }
    });

    Bridge.define("ExpressCraft.SimpleButton", {
        inherits: [ExpressCraft.Control],
        itemClick: null,
        parentForm: null,
        dialogResult: 0,
        enabled: true,
        ctor: function (button) {
            if (button === void 0) { button = 2; }

            this.$initialize();
            ExpressCraft.Control.$ctor2.call(this, "simplebutton", button);
            this.content.oncontextmenu = $asm.$.ExpressCraft.SimpleButton.f1;

            ExpressCraft.Helper.setSize$3(this, "69px", "20px");

            this.content.onclick = Bridge.fn.bind(this, $asm.$.ExpressCraft.SimpleButton.f2);
        },
        getText: function () {
            return this.content.innerHTML;
        },
        setText: function (value) {
            this.content.innerHTML = value;
        },
        getEnabled: function () {
            return this.enabled;
        },
        setEnabled: function (value) {
            this.enabled = value;
            if (this.enabled) {
                this.content.removeAttribute("disabled");
            } else {
                this.content.setAttribute("disabled", System.Boolean.toString((!this.enabled)));
            }
        }
    });

    Bridge.ns("ExpressCraft.SimpleButton", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.SimpleButton, {
        f1: function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
        },
        f2: function (ev) {
            if (this.enabled) {
                this.content.blur();

                if (this.dialogResult !== ExpressCraft.DialogResultEnum.None && this.parentForm != null && this.parentForm.isDialog()) {
                    this.parentForm.dialogResult = this.dialogResult;
                }

                if (!Bridge.staticEquals(this.itemClick, null)) {
                    this.itemClick(this);
                }

                if (this.dialogResult !== ExpressCraft.DialogResultEnum.None && this.parentForm.dialogResult !== ExpressCraft.DialogResultEnum.None && this.parentForm != null && this.parentForm.isDialog()) {
                    this.parentForm.close();
                }
            }

            ev.stopPropagation();
        }
    });

    Bridge.define("ExpressCraft.TabControl", {
        inherits: [ExpressCraft.Control],
        selectedindex: 0,
        config: {
            properties: {
                TabPages: null
            },
            init: function () {
                this.TabPages = new (System.Collections.Generic.List$1(ExpressCraft.TabControlPage))();
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.Control.$ctor1.call(this, "tabcontrol");
            this.content.oncontextmenu = $asm.$.ExpressCraft.TabControl.f1;
        },
        getSelectedIndex: function () {
            return this.selectedindex;
        },
        setSelectedIndex: function (value) {
            if (value < 0) {
                value = 0;
            }
            this.selectedindex = value;
            if (this.getTabPages() != null && this.getTabPages().getCount() > 0) {
                for (var i = 0; i < this.getTabPages().getCount(); i = (i + 1) | 0) {
                    var page = { v : this.getTabPages().getItem(i) };
                    this.tabControlActiveStyleChange(i, page);
                    this.getTabPages().setItem(i, page.v);
                }
            }
        },
        addPages: function (Pages) {
            if (Pages === void 0) { Pages = []; }
            this.getTabPages().addRange(Pages);
        },
        tabControlActiveStyleChange: function (i, page) {
            var Isselected = i === this.selectedindex;

            var state = Isselected ? "active" : "hidden";
            if (page.v.tabPageHeader != null) {
                page.v.tabPageHeader.classList.remove("tabcontrolpageheader-hidden");
                page.v.tabPageHeader.classList.remove("tabcontrolpageheader-active");

                page.v.tabPageHeader.classList.add(System.String.concat("tabcontrolpageheader-", state));
            } else {
                page.v.tabPageHeader = ExpressCraft.Control.createDiv$1(System.String.concat("tabcontrolpageheader tabcontrolpageheader-", state));
                page.v.tabPageHeader.setAttribute("i", i.toString());
            }
            page.v.content.style.visibility = Isselected ? "inherit" : "collapse";
        },
        resizeTabHeaders: function () {
            if (this.getTabPages() != null && this.getTabPages().getCount() > 0) {
                var width = 0;

                for (var i = 0; i < this.getTabPages().getCount(); i = (i + 1) | 0) {
                    var page = { v : this.getTabPages().getItem(i) };

                    page.v.render();

                    if (page.v.tabPageHeader == null) {
                        this.tabControlActiveStyleChange(i, page);

                        if (Bridge.Browser.isAndroid || Bridge.Browser.iOS) {
                            page.v.tabPageHeader.ontouchstart = Bridge.fn.bind(this, $asm.$.ExpressCraft.TabControl.f2);
                        } else {
                            page.v.tabPageHeader.onmousedown = Bridge.fn.bind(this, $asm.$.ExpressCraft.TabControl.f2);
                        }

                        this.content.appendChild(page.v.content);
                        this.content.appendChild(page.v.tabPageHeader);
                    }

                    page.v.tabPageHeader.innerHTML = page.v.getCaption();
                    var inwidth = 20;

                    if (!System.String.isNullOrEmpty(page.v.getCaption())) {
                        inwidth = (inwidth + Bridge.Int.clip32(this.getTextWidth(page.v.getCaption(), ExpressCraft.Settings.defaultFont))) | 0;
                    }

                    page.v.tabPageHeader.style.left = width + "px";
                    page.v.tabPageHeader.style.width = inwidth + "px";

                    width = (width + (((inwidth + 2) | 0))) | 0;

                    this.getTabPages().setItem(i, page.v);
                }
            }
        },
        render: function () {
            this.setHasRendered(true);
            this.resizeTabHeaders();
        }
    });

    Bridge.ns("ExpressCraft.TabControl", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.TabControl, {
        f1: function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
        },
        f2: function (ev) {
            this.setSelectedIndex(parseInt(ev.target.getAttribute("i")));
        }
    });

    Bridge.define("ExpressCraft.TabControlPage", {
        inherits: [ExpressCraft.Control],
        index: 0,
        tabPageHeader: null,
        config: {
            properties: {
                Caption: null
            }
        },
        ctor: function () {
            this.$initialize();
            ExpressCraft.Control.$ctor1.call(this, "tabcontrolpage");

        }
    });

    Bridge.define("ExpressCraft.TextInput", {
        inherits: [ExpressCraft.Control],
        prevText: "",
        onTextChanged: null,
        onKeyDown: null,
        onKeyUp: null,
        onKeyPress: null,
        enabled: true,
        _readonly: false,
        ctor: function (type) {
            if (type === void 0) { type = 19; }

            this.$initialize();
            ExpressCraft.Control.$ctor3.call(this, "inputcontrol", type);
            this.content.onchange = Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f1);
            this.content.onkeypress = Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f2);
            this.content.onkeydown = Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f3);
            this.content.onkeyup = Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f4);
            this.content.addEventListener("paste", Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f5));
            this.content.addEventListener("cut", Bridge.fn.bind(this, $asm.$.ExpressCraft.TextInput.f5));
        },
        getText: function () {
            return this.content.value;
        },
        setText: function (value) {
            this.content.value = value;

            this.checkTextChanged();
        },
        getEnabled: function () {
            return this.enabled;
        },
        setEnabled: function (value) {
            this.enabled = value;
            this.content.setAttribute("disabled", System.Boolean.toString((!this.enabled)));
        },
        getReadonly: function () {
            return this._readonly;
        },
        setReadonly: function (value) {
            this._readonly = value;
            this.content.setAttribute("readonly", System.Boolean.toString((this._readonly)));
        },
        checkTextChanged: function () {
            if (!Bridge.referenceEquals(this.getText(), this.prevText)) {
                if (!Bridge.staticEquals(this.onTextChanged, null)) {
                    this.onTextChanged(this);
                }
                this.prevText = this.getText();
            }
        },
        render: function () {
            ExpressCraft.Control.prototype.render.call(this);
            this.prevText = this.getText();
        }
    });

    Bridge.ns("ExpressCraft.TextInput", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.TextInput, {
        f1: function (ev) {
            this.checkTextChanged();
        },
        f2: function (ev) {
            this.checkTextChanged();
            if (!Bridge.staticEquals(this.onKeyPress, null)) {
                this.onKeyPress(this, ev);
            }
        },
        f3: function (ev) {
            this.checkTextChanged();
            if (!Bridge.staticEquals(this.onKeyDown, null)) {
                this.onKeyDown(this, ev);
            }
        },
        f4: function (ev) {
            this.checkTextChanged();
            if (!Bridge.staticEquals(this.onKeyUp, null)) {
                this.onKeyUp(this, ev);
            }
        },
        f5: function () {
            this.checkTextChanged();
        }
    });

    Bridge.define("ExpressCraft.MessageBoxForm", {
        inherits: [ExpressCraft.Form],
        buttons: null,
        buttonOk: null,
        config: {
            init: function () {
                this.buttons = new (System.Collections.Generic.List$1(ExpressCraft.SimpleButton))();
            }
        },
        ctor: function (message, title) {
            if (title === void 0) { title = ""; }

            this.$initialize();
            ExpressCraft.Form.ctor.call(this);
            this.setText(title);
            this.getBody().innerHTML = message;
            this.setWidth("400px");
            this.setHeight("200px");

            this.buttonOk = Bridge.merge(new ExpressCraft.SimpleDialogButton(this, ExpressCraft.DialogResultEnum.OK), {
                setText: "Ok"
            } );
            //var ButtonCancel = new SimpleDialogButton(this, DialogResultEnum.Cancel) { Text = "Cancel" };
            //var ButtonOpenMeAgain = new SimpleDialogButton(this, DialogResultEnum.None) { Text = "New Dialog", ItemClick = (r) =>
            //{
            //    var dlg = new MessageBoxForm("This is a new Order!");

            //    dlg.ShowDialog();
            //}};

            //var Input = new TextInput() { Text = "hello" };
            //Input.SetBounds("calc(100% - 103px)", "calc(100% - 52px)", "100px", "23px");

            //ButtonOpenMeAgain.SetLocation("calc(100% - 234px)", "calc(100% - 26px)");
            ExpressCraft.Helper.setLocation$5(this.buttonOk, "calc(100% - 78px)", "calc(100% - 26px)"); //.SetLocation("calc(100% - 156px)", "calc(100% - 26px)");

            ExpressCraft.Helper.appendChildren$1(this.getBody(), [this.buttonOk]); //, ButtonCancel, ButtonOpenMeAgain, Input);
            this.buttonOk.content.tabIndex = 0;

            this.allowSizeChange = false;
        },
        onShowed: function () {
            ExpressCraft.Form.prototype.onShowed.call(this);
            this.buttonOk.content.focus();
        }
    });

    Bridge.define("ExpressCraft.SimpleDialogButton", {
        inherits: [ExpressCraft.SimpleButton],
        ctor: function (parentForm, dialogResult) {
            if (dialogResult === void 0) { dialogResult = 0; }

            this.$initialize();
            ExpressCraft.SimpleButton.ctor.call(this);
            this.parentForm = parentForm;
            this.dialogResult = dialogResult;

            ExpressCraft.Helper.setSize$2(this, 75, 23);
        }
    });

    Bridge.define("ExpressCraft.StatusListForm", {
        inherits: [ExpressCraft.Form],
        ribbonControl: null,
        render: function () {
            this.setHasRendered(true);

            ExpressCraft.Helper.setBoundsFull(this);

            this.ribbonControl = new ExpressCraft.RibbonControl();

            var status = new ExpressCraft.RibbonPage("Status Lists");

            status.addRibbonGroups([new ExpressCraft.RibbonGroup.$ctor1("Print and Export", [new ExpressCraft.RibbonButton("Print"), Bridge.merge(new ExpressCraft.RibbonButton("Print Picking Slip(s)"), {
                beginGroup: true
            } ), new ExpressCraft.RibbonButton("Print Unit Label(s)"), Bridge.merge(new ExpressCraft.RibbonButton("eMail List", true), {
                beginGroup: true
            } ), new ExpressCraft.RibbonButton("Export as XLS", true), new ExpressCraft.RibbonButton("Export as PDF", true)]), new ExpressCraft.RibbonGroup.$ctor1("Actions", [new ExpressCraft.RibbonButton("Refresh")]), new ExpressCraft.RibbonGroup.$ctor1("Filters", [new ExpressCraft.RibbonButton("Show Total New Documents", true)])]);

            var dataRecords = new ExpressCraft.RibbonPage("Data Records");

            var accounts = new ExpressCraft.RibbonPage("Accounts");
            var inventory = new ExpressCraft.RibbonPage("Inventory");
            var tools = new ExpressCraft.RibbonPage("Tools");
            var config = new ExpressCraft.RibbonPage("Configuration");
            var callCentre = new ExpressCraft.RibbonPage("Call Centre");
            var quickReports = new ExpressCraft.RibbonPage("Quick Reports");
            var design = new ExpressCraft.RibbonPage("Design");

            this.ribbonControl.addRibbonPages([status, dataRecords, accounts, inventory, tools, config, callCentre, quickReports, design]);

            this.content.appendChild(ExpressCraft.Control.op_Implicit(this.ribbonControl));
        }
    });
});
