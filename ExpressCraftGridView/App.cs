using System;
using Bridge;
using Bridge.Html5;
using ExpressCraft;

namespace ExpressCraftGridView
{
    public class App
    {
        public static void Main()
        {
            Form.Setup();
            
            Application.Run(new GridForm());
        }
        
        public class GridForm : Form
        {
            public GridView GridView;
            public SimpleButton AddNewRowButton;
            public GridForm()
            {
                GridView = new GridView(true, true);

                var dataTable = new DataTable();

                dataTable.AddColumn("Account Number", DataType.Integer);
                dataTable.AddColumn("Last Name", DataType.String);
                dataTable.AddColumn("First Name", DataType.String);
                dataTable.AddColumn("Date Contacted", DataType.DateTime);

                GridView.DataSource = dataTable;

                GridView.SetBoundsFull();


                AddNewRowButton = new SimpleButton() { Text = "Add New a Row" };
                AddNewRowButton.SetBounds("5px", "5px", "auto", "24px");

                AddNewRowButton.ItemClick = (ev) =>
                {                    
                    var dr = dataTable.NewRow();
                    var fdre = new FormDataRowEdit(dr, GridView, true);
                    
                    fdre.ShowDialog(new ExpressCraft.DialogResult(DialogResultEnum.OK, () => {
                        dataTable.AcceptNewRows();
                        GridView.RenderGrid();
                    }), new DialogResult(DialogResultEnum.Cancel, () => {
                        dataTable.RejectNewRows();
                    }));
                };

                this.Heading.AppendChild(AddNewRowButton);                
                this.Body.AppendChild(GridView);                
            }
        }
    }
}