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
            ExpressCraft.Application.setApplicationDefinition(ExpressCraft.ApplicationDefitnion.BrowserConsole);
            ExpressCraft.Application.run(new ExpressCraftGridView.App.GridForm());
        }
    });

    Bridge.define("ExpressCraftGridView.App.GridForm", {
        inherits: [ExpressCraft.Form],
        gridView: null,
        addNewRowButton: null,
        add100000RowsButton: null,
        clearRowsButton: null,
        newFormButton: null,
        x: 0,
        ctor: function () {
            this.$initialize();
            ExpressCraft.Form.ctor.call(this);
            this.setWindowState(ExpressCraft.WindowState.Maximized);

            ExpressCraft.Settings.resourceURL = "";
            ExpressCraft.Settings.gridViewAutoColumnFormatDates = false;

            this.gridView = new ExpressCraft.GridView(true, false);

            var dataTable = new ExpressCraft.DataTable();

            for (var i = 0; i < 100; i = (i + 1) | 0) {
                dataTable.addColumn(System.String.concat("Date", i.toString()), ExpressCraft.DataType.DateTime);
            }

            //            dataTable.AddColumn("Number", DataType.Integer);
            //            dataTable.AddColumn("String", DataType.String);                

            //dataTable.AddColumn("Boolean", DataType.Bool);
            //dataTable.AddColumn("Image", DataType.String);

            //GridView.OnCustomRowStyle = (row, handle) =>
            //{
            //	if(row == null || handle < 0)
            //		return;

            //	if((int)GridView.GetRowCellValue(handle, "Number") % 2 == 0)
            //	{
            //		foreach(var item in row.Children)
            //		{
            //			item.Style.Color = Color.Red;
            //		}
            //	}
            //};

            this.gridView.setDataSource(dataTable);

            //var gridColumn = GridView.GetGridViewColumnByFieldName("Image");
            //gridColumn.CellDisplay = new GridViewCellDisplayImage() { UseBase64Resource = false };

            //gridColumn = GridView.GetGridViewColumnByFieldName("Date");
            //gridColumn.FormatString = "{0:yyyy-MM-dd}";

            ExpressCraft.Helper.setBoundsFull(this.gridView);

            this.addNewRowButton = Bridge.merge(new ExpressCraft.SimpleButton(), {
                setText: "Add New a Row"
            } );
            ExpressCraft.Helper.setBounds(this.addNewRowButton, "3px", "3px", "auto", "24px");

            this.add100000RowsButton = Bridge.merge(new ExpressCraft.SimpleButton(), {
                setText: "Add 1000 Row's"
            } );
            ExpressCraft.Helper.setBounds(this.add100000RowsButton, "98px", "3px", "auto", "24px");

            this.clearRowsButton = Bridge.merge(new ExpressCraft.SimpleButton(), {
                setText: "Clear Rows"
            } );
            ExpressCraft.Helper.setBounds(this.clearRowsButton, "205px", "3px", "auto", "24px");

            this.newFormButton = Bridge.merge(new ExpressCraft.SimpleButton(), {
                setText: "New Form"
            } );
            ExpressCraft.Helper.setBounds(this.newFormButton, "308px", "3px", "auto", "24px");

            this.clearRowsButton.itemClick = Bridge.fn.bind(this, function (ev) {
                dataTable.clearRows();

                this.gridView.renderGrid();
            });

            this.newFormButton.itemClick = $asm.$.ExpressCraftGridView.App.GridForm.f1;


            this.add100000RowsButton.itemClick = Bridge.fn.bind(this, function (ev) {
                dataTable.beginDataUpdate();

                for (var i1 = 0; i1 < 1000; i1 = (i1 + 1) | 0) {
                    var data = System.Array.init(100, null, Object);
                    for (var x = 0; x < 100; x = (x + 1) | 0) {
                        data[x] = new Date();
                    }
                    dataTable.addRow$1(data);
                }
                dataTable.endDataUpdate();

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

            ExpressCraft.Helper.appendChildren$2(this.getHeading(), [this.addNewRowButton, this.add100000RowsButton, this.clearRowsButton, this.newFormButton]);
            this.getBody().appendChild(ExpressCraft.Control.op_Implicit(this.gridView));

            this.linkchildToForm(this.gridView);

            this.gridView.renderGrid();
        },
        onShowing: function () {
            ExpressCraft.Form.prototype.onShowing.call(this);
        }
    });

    Bridge.ns("ExpressCraftGridView.App.GridForm", $asm.$);

    Bridge.apply($asm.$.ExpressCraftGridView.App.GridForm, {
        f1: function (ev) {
            new ExpressCraft.Form().show();
        }
    });
});
