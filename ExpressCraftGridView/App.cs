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
            public SimpleButton Add100000RowsButton;
            public SimpleButton ClearRowsButton;

            protected override void OnShowing()
            {
                base.OnShowing();
            }
            private int x = 0;
            public GridForm()
            {
				SetWindowState(WindowState.Maximized);
				
				Settings.ResourceURL = "";

				GridView = new GridView(true, true);

                var dataTable = new DataTable();
				
                dataTable.AddColumn("Number", DataType.Integer);
                dataTable.AddColumn("String", DataType.String);                
                dataTable.AddColumn("Date", DataType.DateTime);
				dataTable.AddColumn("Boolean", DataType.Bool);
				dataTable.AddColumn("Image", DataType.String);

				GridView.OnCustomRowStyle = (row, handle) =>
				{
					if(row == null || handle < 0)
						return;

					if((int)GridView.GetRowCellValue(handle, "Number") % 2 == 0)
					{
						foreach(var item in row.Children)
						{
							item.Style.Color = Color.Red;
						}						
					}
				};

				GridView.DataSource = dataTable;				

				var gridColumn = GridView.GetGridViewColumnByFieldName("Image");
				gridColumn.CellDisplay = new GridViewCellDisplayImage() { UseBase64Resource = false };

				gridColumn = GridView.GetGridViewColumnByFieldName("Date");
				gridColumn.FormatString = "{0:yyyy-MM-dd}";

				GridView.SetBoundsFull();
                
                AddNewRowButton = new SimpleButton() { Text = "Add New a Row" };
                AddNewRowButton.SetBounds("3px", "3px", "auto", "24px");

                Add100000RowsButton = new SimpleButton() { Text = "Add 100000 Row's" };
                Add100000RowsButton.SetBounds("98px", "3px", "auto", "24px");

                ClearRowsButton = new SimpleButton() { Text = "Clear Rows" };
                ClearRowsButton.SetBounds("205px", "3px", "auto", "24px");

                ClearRowsButton.ItemClick = (ev) =>
                {
                    dataTable.ClearRows();

                    GridView.RenderGrid();
                };

                Add100000RowsButton.ItemClick = (ev) =>
                {
                    dataTable.BeginNewRow(100000);

                    for (int i = 0; i < 100000; i++)
                    {
                        x++;
                        var dr = dataTable.NewRow();
                        dr[0] = x;
                        dr[1] = "Some Last Name";
                        dr[2] = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                        dr[3] = i % 2 == 0;
						dr[4] = "";
					}

                    dataTable.AcceptNewRows();

                    GridView.RenderGrid();
                    GridView.ScrollToBottom();                    
                };

                AddNewRowButton.ItemClick = (ev) =>
                {                    
                    var dr = dataTable.NewRow();
                    var fdre = new DataRowEditForm(dr, GridView, true);
                    
                    fdre.ShowDialog(new ExpressCraft.DialogResult(DialogResultEnum.OK, () => {
                        dataTable.AcceptNewRows();
                        GridView.RenderGrid();
                    }), new DialogResult(DialogResultEnum.Cancel, () => {
                        dataTable.RejectNewRows();
                    }));
                };

                this.Heading.AppendChildren(AddNewRowButton, Add100000RowsButton, ClearRowsButton);                
                this.Body.AppendChild(GridView);

                this.LinkchildToForm(GridView);				

				GridView.RenderGrid();
            }
        }
    }
}