/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 15.7.0
 */
Bridge.assembly("ExpressCraftGridView", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraftGridView.App", {
        $main: function () {
            ExpressCraft.Settings.showExceptionDialog = false;
            ExpressCraft.Application.setApplicationDefinition(ExpressCraft.ApplicationDefitnion.ExpressCraftConsole);

            ExpressCraft.Application.run(new ExpressCraftGridView.App.GridForm());
        }
    });

    Bridge.define("ExpressCraftGridView.App.GridForm", {
        inherits: [ExpressCraft.Form],
        gridView: null,
        addNewRowButton: null,
        add100000RowsButton: null,
        clearRowsButton: null,
        x: 0,
        ctor: function () {
            this.$initialize();
            ExpressCraft.Form.ctor.call(this);
            this.setWindowState(ExpressCraft.WindowState.Maximized);

            ExpressCraft.Settings.resourceURL = "";

            this.gridView = new ExpressCraft.GridView(true, false);

            var dataTable = new ExpressCraft.DataTable();

            dataTable.addColumn("Number", ExpressCraft.DataType.Integer);
            dataTable.addColumn("String", ExpressCraft.DataType.String);
            dataTable.addColumn("Date", ExpressCraft.DataType.DateTime);
            dataTable.addColumn("Boolean", ExpressCraft.DataType.Bool);
            dataTable.addColumn("Image", ExpressCraft.DataType.String);

            this.gridView.onCustomRowStyle = Bridge.fn.bind(this, function (row, handle) {
                var $t;
                if (row == null || handle < 0) {
                    return;
                }

                if (System.Nullable.getValue(Bridge.cast(this.gridView.getRowCellValue$3(handle, "Number"), System.Int32)) % 2 === 0) {
                    $t = Bridge.getEnumerator(row.children);
                    while ($t.moveNext()) {
                        var item = $t.getCurrent();
                        item.style.color = ExpressCraft.Color.op_Implicit$1(ExpressCraft.Color.getRed().$clone());
                    }
                }
            });

            this.gridView.setDataSource(dataTable);

            var gridColumn = this.gridView.getGridViewColumnByFieldName("Image");
            gridColumn.cellDisplay = Bridge.merge(new ExpressCraft.GridViewCellDisplayImage(), {
                useBase64Resource: false
            } );

            gridColumn = this.gridView.getGridViewColumnByFieldName("Date");
            gridColumn.formatString = "{0:yyyy-MM-dd}";

            ExpressCraft.Helper.setBoundsFull(this.gridView);

            this.addNewRowButton = Bridge.merge(new ExpressCraft.SimpleButton(), {
                setText: "Add New a Row"
            } );
            ExpressCraft.Helper.setBounds(this.addNewRowButton, "3px", "3px", "auto", "24px");

            this.add100000RowsButton = Bridge.merge(new ExpressCraft.SimpleButton(), {
                setText: "Add 100000 Row's"
            } );
            ExpressCraft.Helper.setBounds(this.add100000RowsButton, "98px", "3px", "auto", "24px");

            this.clearRowsButton = Bridge.merge(new ExpressCraft.SimpleButton(), {
                setText: "Clear Rows"
            } );
            ExpressCraft.Helper.setBounds(this.clearRowsButton, "205px", "3px", "auto", "24px");

            this.clearRowsButton.itemClick = Bridge.fn.bind(this, function (ev) {
                dataTable.clearRows();

                this.gridView.renderGrid();
            });

            this.add100000RowsButton.itemClick = Bridge.fn.bind(this, function (ev) {
                dataTable.beginNewRow(100000);

                for (var i = 0; i < 100000; i = (i + 1) | 0) {
                    this.x = (this.x + 1) | 0;
                    var dr = dataTable.newRow();
                    dr.setItem(0, this.x);
                    dr.setItem(1, "Some Last Name");
                    dr.setItem(2, Bridge.Date.format(new Date(), "yyyy-MM-dd HH:mm:ss"));
                    dr.setItem(3, i % 2 === 0);
                    dr.setItem(4, "");
                }

                dataTable.acceptNewRows();

                this.gridView.renderGrid();
                this.gridView.scrollToBottom();
            });

            this.addNewRowButton.itemClick = Bridge.fn.bind(this, function (ev) {
                var dr = dataTable.newRow();
                var fdre = new ExpressCraft.DataRowEditForm(dr, this.gridView, true);

                fdre.showDialog([new ExpressCraft.DialogResult(ExpressCraft.DialogResultEnum.OK, Bridge.fn.bind(this, function () {
                    dataTable.acceptNewRows();
                    this.gridView.renderGrid();
                })), new ExpressCraft.DialogResult(ExpressCraft.DialogResultEnum.Cancel, function () {
                    dataTable.rejectNewRows();
                })]);
            });

            ExpressCraft.Helper.appendChildren$2(this.getHeading(), [this.addNewRowButton, this.add100000RowsButton, this.clearRowsButton]);
            this.getBody().appendChild(ExpressCraft.Control.op_Implicit(this.gridView));

            this.linkchildToForm(this.gridView);

            this.gridView.renderGrid();
        },
        onShowing: function () {
            ExpressCraft.Form.prototype.onShowing.call(this);
        }
    });
});
