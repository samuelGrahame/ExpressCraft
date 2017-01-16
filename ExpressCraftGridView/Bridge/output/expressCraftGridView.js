/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 15.6.0
 */
Bridge.assembly("ExpressCraftGridView", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraftGridView.App", {
        $main: function () {
            ExpressCraft.Form.setup();

            ExpressCraft.Application.run(new ExpressCraftGridView.App.GridForm());
        }
    });

    Bridge.define("ExpressCraftGridView.App.GridForm", {
        inherits: [ExpressCraft.Form],
        gridView: null,
        addNewRowButton: null,
        ctor: function () {
            this.$initialize();
            ExpressCraft.Form.ctor.call(this);
            this.gridView = new ExpressCraft.GridView(true, true);

            var dataTable = new ExpressCraft.DataTable();

            dataTable.addColumn("Account Number", ExpressCraft.DataType.Integer);
            dataTable.addColumn("Last Name", ExpressCraft.DataType.String);
            dataTable.addColumn("First Name", ExpressCraft.DataType.String);
            dataTable.addColumn("Date Contacted", ExpressCraft.DataType.DateTime);

            this.gridView.setDataSource(dataTable);

            ExpressCraft.Helper.setBoundsFull(this.gridView);


            this.addNewRowButton = Bridge.merge(new ExpressCraft.SimpleButton(), {
                setText: "Add New a Row"
            } );
            ExpressCraft.Helper.setBounds$5(this.addNewRowButton, "5px", "5px", "auto", "24px");

            this.addNewRowButton.itemClick = Bridge.fn.bind(this, function (ev) {
                var dr = dataTable.newRow();
                var fdre = new ExpressCraft.FormDataRowEdit(dr, this.gridView, true);
                fdre.dialogResult = ExpressCraft.DialogResultEnum.OK;



                fdre.showDialog([new ExpressCraft.DialogResult(ExpressCraft.DialogResultEnum.OK, Bridge.fn.bind(this, function () {
                    dataTable.acceptNewRows();
                    this.gridView.renderGrid();
                }))]);
            });

            this.getHeading().appendChild(ExpressCraft.Control.op_Implicit(this.addNewRowButton));
            this.getBody().appendChild(ExpressCraft.Control.op_Implicit(this.gridView));
        }
    });
});
