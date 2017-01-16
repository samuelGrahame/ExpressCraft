//using Bridge;
//using Bridge.Html5;
//using Bridge.jQuery2;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace ExpressCraft
//{
//	public class GridControl : Control
//	{		
//        public HTMLTableElement TableControl;
//        public HTMLTableSectionElement TableHeader;
//        public HTMLTableSectionElement TableBody;

//        public static List<GridControl> RegisteredGridControls = new List<GridControl>();

//        private void CheckSettings()
//        {
//            if (_columnAutoWidth)
//            {
//                TableControl.Style.Width = "100%";
//            }
//            else
//            {
//                TableControl.Style.Width = "auto";
//            }
//        }

//        private bool _columnAutoWidth;
//        public bool ColumnAutoWidth
//        {
//            set
//            {
//                _columnAutoWidth = value;
//                CheckSettings();
//            }
//            get
//            {
//                return _columnAutoWidth;                
//            }
//        }

//        public bool AllowMultiSelection { get; set; } = false;

//        public GridControl() : base("gridcontrol")
//		{
//            //table-responsive
//            // table-bordered
//            //table-striped
//            RegisteredGridControls.Add(this);

//            TableControl = new HTMLTableElement() {ClassName = "table table-bordered table-hover tablesorter control gridview" };
            
//            TableHeader = new HTMLTableSectionElement(TableSectionType.Header) ;
            
//            TableBody = new HTMLTableSectionElement(TableSectionType.Body);            

//			TableControl.AppendChild(TableHeader);

//			Content.TabIndex = 0;
//            TableControl.AppendChild(TableBody);            
//            Content.AppendChild(TableControl);

//            Content.OnContextMenu = (ev) => {
//                ev.StopPropagation();
//                ev.PreventDefault();
//            };


//            Content.OnClick = (ev) =>
//            {
//                if (ActiveGridControl != null)
//                {
//                    if (ActiveGridControl.FocusedRow != null)
//                    {
//                        if (ActiveGridControl != this)
//                        {
//                            ActiveGridControl.FocusedRow.ClassList.Remove("gridview-focusedrow-active");
//                            if (FocusedRow != null)
//                            {
//                                FocusedRow.ClassList.Remove("gridview-focusedrow-active");
//                                FocusedRow.ClassList.Add("gridview-focusedrow-active");
//                            }
//                        }

//                    }

//                    if (ActiveGridControl != this)
//                    {
//                        for (int x = 0; x < ActiveGridControl.SelectedRows.Count; x++)
//                        {
//                            ActiveGridControl.SelectedRows[x].ClassList.Remove("gridview-focusedrow-active");
//                        }

//                        for (int x = 0; x < SelectedRows.Count; x++)
//                        {
//                            SelectedRows[x].ClassList.Remove("gridview-focusedrow-active");
//                            SelectedRows[x].ClassList.Add("gridview-focusedrow-active");
//                        }
//                    }

//                }
//                ActiveGridControl = this;
//            };

//            Content.OnKeyDown = (ev) =>
//            {
//                var kev = ev.As<KeyboardEvent>();
                
//                if (AllowMultiSelection && kev.CtrlKey && (kev.KeyCode == 65 || kev.KeyCode == 97))
//                {
//                    // keyCode == 65 || keyCode == 97

//                    SelectedRows = new List<HTMLTableRowElement>();
//                    for (int x = 0; x < TableBody.Rows.Length; x++)
//                    {
//                        var row = TableBody.Rows[x];
//                        //gridview-focusedrow
//                        row.ClassList.Remove("gridview-focusedrow");
//                        row.ClassList.Add("gridview-focusedrow");

//                        row.ClassList.Remove("gridview-focusedrow-active");
//                        row.ClassList.Add("gridview-focusedrow-active");
//                        SelectedRows.Add(row);
//                    }
//                }
//            };

//            CheckSettings();            
//        }

//        public override void Render()
//        {
//            HasRendered = true;
//            base.Render();            
//        }
//        public HTMLTableRowElement FocusedRow = null; // gridview-focusedrow
//        public static GridControl ActiveGridControl = null;

//        public List<HTMLTableRowElement> SelectedRows = new List<HTMLTableRowElement>();

//        public int GetRowIndex(HTMLTableRowElement row)
//        {
//            for (int i = 0; i < TableBody.Rows.Length; i++)
//            {
//                if (TableBody.Rows[i] == row)
//                    return i;
//            }
//            return -1;
//        }

//        public void FillData(List<List<object>> data, bool Empty = false)
//        {            
//            jQuery.Select(TableHeader).Empty();
//            jQuery.Select(TableBody).Empty();            

//            if (data.Count > 0)
//            {
//                TableBody.Remove();
//                HTMLTableRowElement headerRow = new HTMLTableRowElement() ;
//                // COLUMNS

//                for (int i = 0; i < data[0].Count; i++)
//                {
//                    var columnCell = new HTMLTableHeaderCellElement() { InnerHTML = Convert.ToString(data[0][i] + "") };                                                  

//                    headerRow.AppendChild(columnCell);
//                }
//                TableHeader.AppendChild(headerRow);
//                // Data Table!
//             //   HTMLTableRowElement Lastdatarow = null;
//                for (int i = 1; i < data.Count; i++)
//                {
//                    HTMLTableRowElement dataRow = new HTMLTableRowElement();                    

//                    dataRow.OnClick = (ev) =>
//                    {
//                        var mev = ev.As<MouseEvent>();
//                        bool DontChangeFocused = false;
//                        if (AllowMultiSelection)
//                        {
//                            if (!mev.CtrlKey)
//                            {
//                                if(SelectedRows != null && SelectedRows.Count > 0)
//                                {
//                                    for (int j = 0; j < SelectedRows.Count; j++)
//                                    {
//                                        var row = SelectedRows[j];

//                                        row.ClassList.Remove("gridview-focusedrow");
//                                        row.ClassList.Remove("gridview-focusedrow-active");
//                                    }
//                                }
//                                SelectedRows = new List<HTMLTableRowElement>();
                                
//                                if(mev.ShiftKey && FocusedRow != null && dataRow != FocusedRow)
//                                {
//                                    DontChangeFocused = true;
//                                    int PrevIndex = GetRowIndex(FocusedRow);
//                                    int CurrentIndex = GetRowIndex(dataRow);
                                    
//                                    if(PrevIndex < CurrentIndex)
//                                    {
//                                        for (int x = PrevIndex; x < CurrentIndex + 1; x++)
//                                        {
//                                            var row = TableBody.Rows[x];
//                                            //gridview-focusedrow
//                                            row.ClassList.Remove("gridview-focusedrow");
//                                            row.ClassList.Add("gridview-focusedrow");

//                                            row.ClassList.Remove("gridview-focusedrow-active");
//                                            row.ClassList.Add("gridview-focusedrow-active");
//                                            SelectedRows.Add(row);
//                                        }
//                                    }else
//                                    {
//                                        for (int x = CurrentIndex; x < PrevIndex + 1; x++)
//                                        {
//                                            var row = TableBody.Rows[x];
//                                            //gridview-focusedrow
//                                            row.ClassList.Remove("gridview-focusedrow");
//                                            row.ClassList.Add("gridview-focusedrow");

//                                            row.ClassList.Remove("gridview-focusedrow-active");
//                                            row.ClassList.Add("gridview-focusedrow-active");
//                                            SelectedRows.Add(row);
//                                        }
//                                    }
//                                }else
//                                {
//                                    if (FocusedRow != null)
//                                    {
//                                        FocusedRow.ClassList.Remove("gridview-focusedrow");
//                                        FocusedRow.ClassList.Remove("gridview-focusedrow-active");

//                                        FocusedRow = null;
//                                    }
//                                }
//                            }                            
//                        }                        
                        
//                        if (FocusedRow != null)
//                        {
//                            if (!AllowMultiSelection || (AllowMultiSelection && !mev.CtrlKey && !mev.ShiftKey))
//                            {
//                                //Global.Alert("Removing Class!!" + AllowMultiSelection.ToString() +" " +( AllowMultiSelection && !mev.CtrlKey).ToString());
//                                FocusedRow.ClassList.Remove("gridview-focusedrow");
//                                FocusedRow.ClassList.Remove("gridview-focusedrow-active");
//                            }
//                        }
//                        if (!DontChangeFocused)
//                        {
//                            if (AllowMultiSelection)
//                            {

//                                if (SelectedRows.Contains(dataRow))
//                                {
//                                    SelectedRows.Remove(dataRow);
//                                    dataRow.ClassList.Remove("gridview-focusedrow");
//                                    dataRow.ClassList.Remove("gridview-focusedrow-active");
//                                }
//                                else
//                                {
//                                    SelectedRows.Add(dataRow);
//                                    FocusedRow = dataRow;
//                                    FocusedRow.ClassList.Add("gridview-focusedrow");
//                                    FocusedRow.ClassList.Add("gridview-focusedrow-active");
//                                }
//                            }
//                            else
//                            {
//                                FocusedRow = dataRow;
//                                FocusedRow.ClassList.Add("gridview-focusedrow");
//                                FocusedRow.ClassList.Add("gridview-focusedrow-active");
//                            }
//                        }
                                                                                         
//                    };

//                    for (int j = 0; j < data[i].Count; j++)
//                    {
//                        dataRow.AppendChild(new HTMLTableDataCellElement() { InnerHTML = Convert.ToString(data[i][j] + "") });
//                    }                    
//                    TableBody.AppendChild(dataRow);
//                   // Lastdatarow = dataRow;
//                }

//                TableControl.AppendChild(TableBody);
//                Script.Write("$(this.tableControl).tablesorter();");

//                // DO NOT DELETE - THIS FIXES RENDER
//                var activeElement = Document.ActiveElement;
//                if (activeElement != null)
//                {
//                    activeElement.Blur();
//                }
//            }
//        }
//    }	
//}
