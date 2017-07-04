/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.0.0-beta4
 */
Bridge.assembly("ExpressCraftGridView", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraftGridView.App", {
        main: function Main () {
            ExpressCraft.Settings.ShowExceptionDialog = false;
            ExpressCraft.Application.SetApplicationDefinition(ExpressCraft.ApplicationDefitnion.BrowserConsole);
            ExpressCraft.Application.Run(new ExpressCraftGridView.App.GridForm());
        }
    });

    Bridge.define("ExpressCraftGridView.App.GridForm", {
        inherits: [ExpressCraft.Form],
        fields: {
            GridView: null,
            AddNewRowButton: null,
            Add100000RowsButton: null,
            ClearRowsButton: null,
            NewFormButton: null,
            x: 0
        },
        ctors: {
            init: function () {
                this.x = 0;
            },
            ctor: function () {
                this.$initialize();
                ExpressCraft.Form.ctor.call(this);
                var $t;
                this.SetWindowState(ExpressCraft.WindowState.Maximized);

                ExpressCraft.Settings.ResourceURL = "";
                ExpressCraft.Settings.GridViewAutoColumnFormatDates = false;

                this.GridView = new ExpressCraft.GridView(true, false);

                var dataTable = new ExpressCraft.DataTable();

                for (var i = 0; i < 100; i = (i + 1) | 0) {
                    dataTable.AddColumn(System.String.concat("Date", i.toString()), ExpressCraft.DataType.DateTime);
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

                this.GridView.DataSource = dataTable;

                //var gridColumn = GridView.GetGridViewColumnByFieldName("Image");
                //gridColumn.CellDisplay = new GridViewCellDisplayImage() { UseBase64Resource = false };

                //gridColumn = GridView.GetGridViewColumnByFieldName("Date");
                //gridColumn.FormatString = "{0:yyyy-MM-dd}";

                ExpressCraft.Helper.SetBoundsFull(this.GridView);

                this.AddNewRowButton = ($t = new ExpressCraft.SimpleButton(), $t.Text = "Add New a Row", $t);
                ExpressCraft.Helper.SetBounds(this.AddNewRowButton, "3px", "3px", "auto", "24px");

                this.Add100000RowsButton = ($t = new ExpressCraft.SimpleButton(), $t.Text = "Add 1000 Row's", $t);
                ExpressCraft.Helper.SetBounds(this.Add100000RowsButton, "98px", "3px", "auto", "24px");

                this.ClearRowsButton = ($t = new ExpressCraft.SimpleButton(), $t.Text = "Clear Rows", $t);
                ExpressCraft.Helper.SetBounds(this.ClearRowsButton, "205px", "3px", "auto", "24px");

                this.NewFormButton = ($t = new ExpressCraft.SimpleButton(), $t.Text = "New Form", $t);
                ExpressCraft.Helper.SetBounds(this.NewFormButton, "308px", "3px", "auto", "24px");

                this.ClearRowsButton.ItemClick = Bridge.fn.bind(this, function (ev) {
                    dataTable.ClearRows();

                    this.GridView.RenderGrid();
                });

                this.NewFormButton.ItemClick = $asm.$.ExpressCraftGridView.App.GridForm.f1;


                this.Add100000RowsButton.ItemClick = Bridge.fn.bind(this, function (ev) {
                    dataTable.BeginDataUpdate();

                    for (var i1 = 0; i1 < 1000; i1 = (i1 + 1) | 0) {
                        var data = System.Array.init(100, null, System.Object);
                        for (var x = 0; x < 100; x = (x + 1) | 0) {
                            data[System.Array.index(x, data)] = Bridge.box(new Date(), System.DateTime, System.DateTime.format);
                        }
                        dataTable.AddRow$1(data);
                    }
                    dataTable.EndDataUpdate();

                    this.GridView.RenderGrid();
                    this.GridView.ScrollToBottom();
                });

                this.AddNewRowButton.ItemClick = Bridge.fn.bind(this, function (ev) {
                    var dr = dataTable.NewRow();
                    var fdre = new ExpressCraft.DataRowEditForm(dr, this.GridView, true);

                    fdre.ShowDialog([new ExpressCraft.DialogResult(ExpressCraft.DialogResultEnum.OK, Bridge.fn.bind(this, function () {
                        dataTable.AcceptNewRows();
                        this.GridView.RenderGrid();
                    })), new ExpressCraft.DialogResult(ExpressCraft.DialogResultEnum.Cancel, function () {
                        dataTable.RejectNewRows();
                    })]);
                });

                ExpressCraft.Helper.AppendChildren$2(this.Heading, [this.AddNewRowButton, this.Add100000RowsButton, this.ClearRowsButton, this.NewFormButton]);
                this.Body.AppendChild(ExpressCraft.Control.op_Implicit(this.GridView));

                this.LinkchildToForm(this.GridView);

                this.GridView.RenderGrid();
        }
    },
    methods: {
        OnShowing: function () {
            ExpressCraft.Form.prototype.OnShowing.call(this);
        }
    }
    });

    Bridge.ns("ExpressCraftGridView.App.GridForm", $asm.$);

    Bridge.apply($asm.$.ExpressCraftGridView.App.GridForm, {
        f1: function (ev) {
            new ExpressCraft.Form().Show();
        }
    });
});
