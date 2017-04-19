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
			Settings.ShowExceptionDialog = false;
			Application.SetApplicationDefinition(ApplicationDefitnion.BrowserConsole);			
			Application.Run(new GridForm());
        }
        
        public class GridForm : Form
        {
            public GridView GridView;
            public SimpleButton AddNewRowButton;
            public SimpleButton Add100000RowsButton;
            public SimpleButton ClearRowsButton;
			public SimpleButton NewFormButton;

			protected override void OnShowing()
            {
                base.OnShowing();
            }
            private int x = 0;
            public GridForm()
            {
				SetWindowState(WindowState.Maximized);
				
				Settings.ResourceURL = "";
				Settings.GridViewAutoColumnFormatDates = false;

				GridView = new GridView(true, false);

                var dataTable = new DataTable();

				for(int i = 0; i < 100; i++)
				{
					dataTable.AddColumn("Date" + i.ToString(), DataType.DateTime);
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

				GridView.DataSource = dataTable;				

				//var gridColumn = GridView.GetGridViewColumnByFieldName("Image");
				//gridColumn.CellDisplay = new GridViewCellDisplayImage() { UseBase64Resource = false };

				//gridColumn = GridView.GetGridViewColumnByFieldName("Date");
				//gridColumn.FormatString = "{0:yyyy-MM-dd}";

				GridView.SetBoundsFull();
                
                AddNewRowButton = new SimpleButton() { Text = "Add New a Row" };
                AddNewRowButton.SetBounds("3px", "3px", "auto", "24px");

                Add100000RowsButton = new SimpleButton() { Text = "Add 1000 Row's" };
                Add100000RowsButton.SetBounds("98px", "3px", "auto", "24px");

                ClearRowsButton = new SimpleButton() { Text = "Clear Rows" };
                ClearRowsButton.SetBounds("205px", "3px", "auto", "24px");

				NewFormButton = new SimpleButton() { Text = "New Form" };
				NewFormButton.SetBounds("308px", "3px", "auto", "24px");

				ClearRowsButton.ItemClick = (ev) =>
                {
                    dataTable.ClearRows();

                    GridView.RenderGrid();
                };

				NewFormButton.ItemClick = (ev) =>
				{
					new Form().Show();
				};


				Add100000RowsButton.ItemClick = (ev) =>
                {
					dataTable.BeginDataUpdate();

                    for (int i = 0; i < 1000; i++)
                    {						
						var data = new object[100];
						for(int x = 0; x < 100; x++)
						{
							data[x] = DateTime.Now;
						}
						dataTable.AddRow(data);
					}
					dataTable.EndDataUpdate();

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

                this.Heading.AppendChildren(AddNewRowButton, Add100000RowsButton, ClearRowsButton, NewFormButton);                
                this.Body.AppendChild(GridView);

                this.LinkchildToForm(GridView);				

				GridView.RenderGrid();
            }
        }
    }
}