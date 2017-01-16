﻿using System.Collections.Generic;
using Bridge.Html5;
using Bridge.jQuery2;
using Bridge;
using System;
using System.Linq;
using System.Diagnostics;

namespace ExpressCraft
{
	public class GridView : Control
	{
		public HTMLDivElement GridHeader;
		public HTMLDivElement GridHeaderContainer;
		public HTMLDivElement GridBodyContainer;
		public HTMLDivElement GridBody;

		private DataTable _dataSource = null;
		public Action<int> OnRowSizeChanged = null;
		public Action<int> OnColumnSizeChanged = null;
		public Action<int, int> OnFocusedRowChanged = null;

		public Action<int> OnRowDoubleClick = null;

		private HTMLDivElement BottonOfTable;
		private HTMLDivElement RightOfTable;
		private HTMLDivElement RightOfTableHeader;

		public HardSoftList<bool> SelectedRows = new HardSoftList<bool>(false);

		public bool AutoGenerateColumnsFromSource = true;

		public bool AllowMultiSelection = true;

		private const string SortDownBase64 = "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";
		private const string SortUpBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAYAAACXU8ZrAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAADJJREFUeNpi+P//PwMyXr169X90MQwFaWlp/9EVYiiAYWSFWBWgK8SpAFkhAAAA//8DACV7edV9gmUZAAAAAElFTkSuQmCC";
		public const float UnitHeight = 28.0f;
		private bool _columnAutoWidth = false;
		
		private int _focusedDataHandle = -1;
		public int FocusedDataHandle
		{
			get { return _focusedDataHandle; }
			set {
				if(value != _focusedDataHandle)
				{
					var prev = _focusedDataHandle;
					_focusedDataHandle = value;
					RenderGrid();
					if(OnFocusedRowChanged != null)					
						OnFocusedRowChanged(_focusedDataHandle, prev);					
				}
			}
		}

		public bool ColumnAutoWidth
		{
			get { return _columnAutoWidth; }
			set {
				if(value)				
					GridBodyContainer.Style.OverflowX = Overflow.Hidden;				
				else				
					GridBodyContainer.Style.OverflowX = Overflow.Auto;				

				if(_columnAutoWidth != value)
				{
					_columnAutoWidth = value;					
					RenderGrid();
				}				
			}
		}

		private bool _useEditForm = true;

		public bool UseEditForm
		{
			get { return _useEditForm; }
			set {
				if(value != _useEditForm)
				{
					_useEditForm = value;
					RenderGrid();
				}
			}
		}


		public Action<MouseEvent<HTMLDivElement>> OnRowClick;
		public Action<MouseEvent<HTMLDivElement>> OnDoubleClick;

		public List<int> VisibleRowHandles = null;		

		public void SetVisibleRowHandles<T>(List<T> Cells, bool asc)
		{
			if(asc)
			{
				var sorted = Cells
					.Select((x, i) => new KeyValuePair<T, int>(x, i))
					.OrderBy(x => x.Key)
					.ToList();

				VisibleRowHandles = sorted.Select(x => x.Value).ToList();
			}
			else
			{
				var sorted = Cells
					.Select((x, i) => new KeyValuePair<T, int>(x, i))
					.OrderByDescending(x => x.Key)
					.ToList();

				VisibleRowHandles = sorted.Select(x => x.Value).ToList();
			}
		}

		public void SortColumn(GridViewColumn column, SortMode sort = SortMode.Asc)
		{
			column.SortedMode = sort;

			if(sort == SortMode.None)
			{
				VisibleRowHandles = null;
			}else
			{
				bool sort1 = sort == SortMode.Asc;

				switch(column.Column.DataType)
				{
					default:
					case DataType.Object:
						SetVisibleRowHandles((column.Column as DataColumnObject).Cells, sort1);
						break;
					case DataType.DateTime:
						SetVisibleRowHandles((column.Column as DataColumnDateTime).Cells, sort1);
						break;
					case DataType.String:
						SetVisibleRowHandles((column.Column as DataColumnString).Cells, sort1);
						break;
					case DataType.Integer:
						SetVisibleRowHandles((column.Column as DataColumnInteger).Cells, sort1);
						break;
					case DataType.Long:
						SetVisibleRowHandles((column.Column as DataColumnLong).Cells, sort1);
						break;
					case DataType.Float:
						SetVisibleRowHandles((column.Column as DataColumnFloat).Cells, sort1);
						break;
					case DataType.Double:
						SetVisibleRowHandles((column.Column as DataColumnDouble).Cells, sort1);
						break;
					case DataType.Decimal:
						SetVisibleRowHandles((column.Column as DataColumnDecimal).Cells, sort1);
						break;
				}
			}					

			RenderGrid();
		}

		public int ColumnCount()
		{
			return Columns.Count;
		}

		public int RowCount()
		{
			if(_dataSource == null)
				return 0;
			return _dataSource.RowCount;
		}

		public void ScrollToBottom()
		{
			GridBodyContainer.ScrollTop = GridBody.ClientHeight - GridBodyContainer.ClientHeight;
		}

		public void ScrollToTop()
		{
			GridBodyContainer.ScrollTop = 0;
		}

		public DataTable DataSource { get { return _dataSource; }
			set {
				FocusedDataHandle = -1;
				SelectedRows = new HardSoftList<bool>(false);
				_dataSource = value;
				
				if(_dataSource != null)
				{
					if(Columns.Count == 0 && AutoGenerateColumnsFromSource)
					{
						var sw = Stopwatch.StartNew();

						for(int i = 0; i < _dataSource.ColumnCount; i++)
						{
							var sw1 = Stopwatch.StartNew();

							var gvc = new GridViewColumn(this);							
							gvc.Caption = _dataSource.Columns[i].FieldName;
							gvc.Column = _dataSource.Columns[i];
							gvc.Visible = true;							

							switch (_dataSource.Columns[i].DataType)
                            {                                                                
                                case DataType.Integer:
                                case DataType.Long:
                                case DataType.Float:
                                case DataType.Double:
                                case DataType.Decimal:
                                    gvc.BodyApparence.Alignment = TextAlign.Right;
                                    break;
                                case DataType.DateTime:
									if(Settings.GridViewAutoColumnGenerateFormatAsDate)
										gvc.FormatString = "{0:d}";
									else
										gvc.FormatString = "{0:yyyy-MM-dd}";

									break;
                            }

                            Columns.Add(gvc);

							sw.Stop();
							Console.WriteLine("DataSource AddColumn Auto: " + sw1.ElapsedMilliseconds);
						}

						sw.Stop();
						Console.WriteLine("DataSource AutoColumns: " + sw.ElapsedMilliseconds);
					}
					
					RenderGrid();
				}
			}
		}

		private List<GridViewColumn> Columns = new List<GridViewColumn>();

		public GridViewColumn GetColumn(int i)
		{
			return Columns[i];
		}

		public object GetFocusedRowCellValue(int columnIndex)
		{
			return GetFocusedRowCellValue(Columns[columnIndex]);
		}

		public GridViewColumn GetColumnFromFieldName(string FieldName)
		{
			for(int i = 0; i < ColumnCount(); i++)
			{
				if(Columns[i].Column.FieldName == FieldName)
				{
					return Columns[i];
				}
			}
			return null;
		}
		
		public object GetFocusedRowCellValue(string FieldName)
		{
			return GetFocusedRowCellValue(GetColumnByFieldName(FieldName));
		}		

		public object GetFocusedRowCellValue(GridViewColumn column)
		{
			return GetRowCellValue(FocusedDataHandle, column);			
		}

		public object GetFocusedRowCellValue(DataColumn column)
		{
			return GetRowCellValue(FocusedDataHandle, column);
		}

		public object GetRowCellValue(int Datahandle, GridViewColumn column)
		{			
			return GetRowCellValue(Datahandle, column.Column);
		}
		
		public object GetRowCellValue(int Datahandle, DataColumn column)
		{
			if(Datahandle == -1)
				return null;
			return column.GetCellValue(Datahandle);
		}

		public object GetRowCellValue(int Datahandle, string FieldName)
		{
			return GetRowCellValue(Datahandle, GetColumnByFieldName(FieldName));
		}

		public object GetRowCellValue(int Datahandle, int columnIndex)
		{
			return GetRowCellValue(Datahandle, Columns[columnIndex]);
		}

		public DataColumn GetColumnByFieldName(string fieldName, bool IgnoreCase = false)
		{
			if(DataSource == null)
				return null;

			for(int i = 0; i < DataSource.ColumnCount; i++)
			{
				if(DataSource.Columns[i] != null &&
					string.Compare(DataSource.Columns[i].FieldName, fieldName, IgnoreCase) == 0)
					return DataSource.Columns[i];
			}

			return null;
		}		

		public void AddColumn(string caption, string fieldname, int width = 100, string formatstring = "", TextAlign alignment = TextAlign.Left, string forecolor = null, bool isBold = false)
		{
			var col = GetColumnByFieldName(fieldname);
			if(col == null)
				return;
			AddColumn(caption, col, width, formatstring, alignment, forecolor, isBold);
		}

		public void AddColumn(string caption, DataColumn column, int width = 100, string formatstring = "", TextAlign alignment = TextAlign.Left, string forecolor = null, bool isBold = false)
		{
			AddColumn(new GridViewColumn(this, width) { Caption = caption, BodyApparence = new CellApparence(isBold, alignment, forecolor), FormatString = formatstring, Column = column });
		}

		public void AddColumn(GridViewColumn column)
		{
			if(column == null)
				return;

			Columns.Add(column);

			RenderGrid();
		}

		public void AddColumns(params GridViewColumn[] columns)
		{
			if(columns == null || columns.Length == 0)
				return;

			Columns.AddRange(columns);
			
			RenderGrid();
		}

		public void RemoveColumn(GridViewColumn column)
		{
			Columns.Remove(column);

			RenderGrid();
		}

		public int GetDataSourceRow(int i)
		{
			if(VisibleRowHandles == null)
				return i;
			return VisibleRowHandles[i];
		}

		public float GetColumnWidths()
		{
			if(_columnAutoWidth)
			{
				return GridBodyContainer.ClientWidth;
			}
			else
			{
				float width = 0.0f;
				for(int i = 0; i < Columns.Count; i++)
				{
					width += Columns[i].Width;
				}
				return width;
			}
		}

		public void SelectAllRows()
		{
			int length = RowCount();
			if(length == 0)
			{
				SelectedRows.ClearAll();
			}
			else
			{
				int[] index = new int[length];
				for(int i = 0; i < length; i++)
				{
					index[i] = GetDataSourceRow(i);
				}
				SelectedRows.ClearAllSetHardRange(true, index);				
			}
			RenderGrid();
		}
		private int PrevRenderGridScrollId = -1;

		public void DelayedRenderGrid()
		{
			if(Settings.GridViewScrollDelayed)
			{
				if(PrevRenderGridScrollId != -1)
				{
					Global.ClearTimeout(PrevRenderGridScrollId);
					PrevRenderGridScrollId = -1;
				}
				PrevRenderGridScrollId = Global.SetTimeout(() => {
					RenderGrid();
				}, Math.Max(1, Settings.GridViewScrollDelayMS));
			}else
			{
				RenderGrid();
			}			
		}
		private Stopwatch clickTimeDiff = null;
		public GridView(bool autoGenerateColumns = true, bool columnAutoWidth = false) : base("grid")
		{			
			GridHeaderContainer = Div("heading-container");
			GridHeaderContainer.SetBounds("0", "0", "100%", "29px");

			GridHeader = Div();						
			GridHeader.SetBounds("0", "0", "0", "29px");
			GridBodyContainer = Div();
			GridBodyContainer.SetBounds("1px", "31px", "calc(100% - 2px)", "calc(100% - 31px)");
			
			GridBodyContainer.Style.OverflowX = Overflow.Auto;
			GridBodyContainer.Style.OverflowY = Overflow.Auto;

			GridHeaderContainer.Style.Overflow = Overflow.Hidden;

			GridBody = Div();			
			GridBody.SetBounds("0", "0", "0", "0");

			GridBodyContainer.AppendChild(GridBody);
			GridHeaderContainer.AppendChild(GridHeader);

            Content.OnMouseUp = (ev) =>
            {
                if (ResizeIndex == -1)
                    return;
                int x = Script.Write<int>("ev.pageX");
                x = Columns[ResizeIndex].Width + (x - ResizePageX);
                if (x < 24)
                    x = 24;
                Columns[ResizeIndex].Width = x;
                
                ResizeSpan.Style.Cursor = Cursor.Default;

                ev.PreventDefault();
                ev.StopImmediatePropagation();
                ev.StopPropagation();

                ResizeIndex = -1;
                ResizeSpan = null;
            };            
            OnRowSizeChanged = (i) =>
			{
				ValidateGridHeight();
			};
			OnColumnSizeChanged = (i) =>
			{
				ValidateGridWidth();
			};
			OnResize = (ev) =>
			{
				DelayedRenderGrid();
			};
			GridBodyContainer.OnScroll = (ev) => {
				DelayedRenderGrid();
			};
			OnLoaded = (ev) =>
			{
				RenderGrid();
			};
			OnRowClick = (ev) =>
			{
				if(!Settings.IsChrome)
				{
					if(clickTimeDiff == null)
					{
						clickTimeDiff = Stopwatch.StartNew();
					}
					else
					{
						clickTimeDiff.Stop();
						var ems = clickTimeDiff.ElapsedMilliseconds;
						clickTimeDiff = null;

						if(ems < 200)
						{
							OnDoubleClick(ev);
						}
					}
				}				

				var DataRowHandle = Global.ParseInt(ev.CurrentTarget.GetAttribute("i"));

				var mev = ev.As<MouseEvent>();	
				if(AllowMultiSelection)
				{
					if(mev.CtrlKey)
					{
						SelectedRows.AddOrSet(true, DataRowHandle, true);
						RenderGrid();
						return;
					}
					else if(mev.ShiftKey)
					{
						return;
					}
				}
				SelectedRows.ClearAndAddOrSet(true, DataRowHandle, true);			
				if(DataRowHandle != _focusedDataHandle)
				{
					FocusedDataHandle = DataRowHandle;
				}else
				{
					RenderGrid();
				}
			};
			Content.TabIndex = 0;
			OnDoubleClick = (ev) =>
			{				
				int drh = Global.ParseInt(ev.CurrentTarget.GetAttribute("i"));
				if(OnRowDoubleClick != null)
					OnRowDoubleClick(drh);

				if(_useEditForm)
				{
					var idr = DataSource[drh];

					var fdre = new FormDataRowEdit(idr, this, true);
					fdre.Show();
				}				
			};

			Content.OnKeyDown = (ev) =>
			{
				var kev = ev.As<KeyboardEvent>();
				//Global.Alert("CONTROL + A");
				if(AllowMultiSelection && kev.CtrlKey && (kev.KeyCode == 65 || kev.KeyCode == 97))
				{
					// keyCode == 65 || keyCode == 97
					//Global.Alert("AllowMultiSelection = TRUE");
					SelectAllRows();
				}
				else
				{
					//Global.Alert("AllowMultiSelection = FALSE");
				}
			};

			ContextMenu = new ContextMenu();

			ContextMenu.ContextItems.AddRange(new ContextItem[] {
				new ContextItem("Sort Ascending"),
				new ContextItem("Sort Descending"),
				new ContextItem("Clear All Sorting", true),
				new ContextItem("Group By This Column"),
				new ContextItem("Hide Group By Box", true),
				new ContextItem("Hide This Column"),
				new ContextItem("View Columns"),
				new ContextItem("Save Column Layout"),
				new ContextItem("Best Fit"),
				new ContextItem("Best Fit (all columns)", true),
				new ContextItem("Filter Editor..."),
				new ContextItem("Show Find Panel"),
				new ContextItem("Show Auto Filter Row"),
				new ContextItem("Select All")
			});

			Content.OnContextMenu = (ev) =>
			{
				if(ContextMenu != null)
				{
					ContextMenu.Show(Helper.GetClientMouseLocation(ev));
					ev.PreventDefault();
					ev.StopPropagation();
				}
			};

			Content.AppendChildren(GridHeaderContainer, GridBodyContainer);

			AutoGenerateColumnsFromSource = autoGenerateColumns;
			ColumnAutoWidth = columnAutoWidth;
		}

		public override void Render()
		{
			base.Render();
			HasRendered = true;
			RenderGrid();
		}

		public float GetRawVisibleRowCount()
		{
			return GridBodyContainer.ClientHeight == 0 ? 0.0f : GridBodyContainer.ClientHeight / UnitHeight;
		}		

		public float GetRawTopRowIndex()
		{
			return GridBodyContainer.ScrollTop == 0 ? 0.0f : GridBodyContainer.ScrollTop / UnitHeight;
		}

		public void ValidateGridWidth()
		{			
			var width = GetColumnWidths();
			GridBody.Style.Width = (width).ToPx();
			GridHeader.Style.Width = ((width) + 24).ToPx(); // (width).ToPx();
			if(RightOfTable == null)
			{
				RightOfTable = Div();
				GridBody.AppendChild(RightOfTable);
			}
			if(RightOfTableHeader == null)
			{
				RightOfTableHeader = Div();
				GridHeader.AppendChild(RightOfTableHeader);
			}
			RightOfTable.SetBounds(width - 1, 0, 1, 1);
			RightOfTableHeader.SetBounds(width - 1, 0, 1, 1);
		}

		public void ValidateGridHeight()
		{
			var i = RowCount();

			GridBody.Style.Height = (i * UnitHeight).ToPx();
			if(BottonOfTable == null)
			{
				BottonOfTable = Div();
				GridBody.AppendChild(BottonOfTable);
			}
			BottonOfTable.SetBounds(0, (i * UnitHeight) - 1, 1, 1);
		}

		public void ValidateGridSize()
		{
			ValidateGridHeight();
			ValidateGridWidth();
		}

		public void ClearHeader()
		{
			GridHeader.Empty();
			GridHeader.AppendChild(RightOfTableHeader);
			//for(int i = GridHeader.Children.Length - 1; i >= 0; i--)
			//{
			//	if(GridHeader.Children[i] != null && GridHeader.Children[i] != RightOfTableHeader)
			//	{
			//		GridHeader.RemoveChild(GridHeader.Children[i]);
			//		//GridHeader.Children[i].Delete();
			//	}
			//}
					//GridHeader.Children[i].Delete();
		}

		public void ClearColumns()
		{
			Columns = new List<GridViewColumn>();			
		}

		public void ClearView()
		{
			Columns = new List<GridViewColumn>();
			_dataSource = null;
		}

		public void ClearBody()
		{
			GridBody.Empty();
			GridBody.AppendChildren(RightOfTable, BottonOfTable);
			//for(int i = GridBodyRows.Children.Length - 1; i >= 0; i--)
			//{
			//	if(GridBodyRows.Children[i] != null && GridBodyRows.Children[i] != RightOfTable && GridBodyRows.Children[i] != BottonOfTable)
			//	{
			//		GridBodyRows.RemoveChild(GridBodyRows.Children[i]);
			//		//GridBodyRows.Children[i].Delete();
			//	}
			//}					
		}

		public void ClearGrid()
		{
			ClearHeader();
			ClearBody();
		}
        private int DragIndex = -1;
        private int ResizeIndex = -1;
        private int ResizePageX = 0;
        private HTMLSpanElement ResizeSpan = null;

        private void SetupColumn(HTMLSpanElement se, int index, GridViewColumn gcol)
        {
            se.SetAttribute("i", Convert.ToString(index));
            se.SetAttribute("draggable", "true");
            se.OnClick = (ev) => {
                if (ResizeIndex >= 0)
                    return;

                for (int i = 0; i < ColumnCount(); i++)
                {
                    if (Columns[i] != gcol)
                    {
                        Columns[i].SortedMode = SortMode.None;
                    }
                }
                switch (gcol.SortedMode)
                {
                    default:
                    case SortMode.None:
                        SortColumn(gcol, SortMode.Asc);
                        break;
                    case SortMode.Asc:
                        SortColumn(gcol, SortMode.Desc);
                        break;
                    case SortMode.Desc:
                        SortColumn(gcol, SortMode.None);
                        break;
                }
            };
            se.OnDragStart = (ev) =>
            {
                //ev.dataTransfer.setData("text", ev.target.id);
                Script.Call("ev.dataTransfer.setData", "gridviewColumnDrag", index.ToString());
            };
            se.OnDragOver = (ev) =>
            {
                ev.PreventDefault();                
            };
            se.OnDrop = (ev) =>
            {
                if (ev.Target == null || !(ev.Target is HTMLSpanElement))
                    return;

                var target = ev.Target.As<HTMLSpanElement>();
                
                if (target.ParentElement != GridHeader)
                    return;
                
                var HoverIndex = Global.ParseInt(target.GetAttribute("i"));
                var SelectedIndex = Script.Write<int>("parseInt(ev.dataTransfer.getData(\"gridviewColumnDrag\"));");
                if (SelectedIndex == HoverIndex)
                    return;
                
                if (HoverIndex < 0)
                    return;

                int x = Script.Write<int>("ev.layerX");
                x -= target.ClientLeft;
                int w = target.ClientWidth / 2;
                
                if (HoverIndex == SelectedIndex - 1 && x > w)
                    return;
                if (HoverIndex == SelectedIndex + 1 && x < w)
                    return;
                
                if (x < w)
                {
                    DragIndex = HoverIndex;
                }
                else
                {
                    DragIndex = HoverIndex + 1;
                }

                if (DragIndex < 0 || SelectedIndex < 0)
                    return;
                var col = Columns[SelectedIndex];
                if (DragIndex == Columns.Count)
                {
                    Columns.Remove(col);
                    Columns.Add(col);
                }
                else
                {                    
                    var col1 = Columns[DragIndex];
                    Columns.Remove(col);
                    Columns.Insert(Columns.IndexOf(col1), col);
                }
                
                RenderGrid();
            };

            se.OnMouseDown = (ev) =>
            {
                int x = Script.Write<int>("ev.layerX");
                var target = ev.Target.As<HTMLSpanElement>();
                x -= target.ClientLeft;
                ResizePageX = Script.Write<int>("ev.pageX");                               

                if (x >= target.ClientWidth - 2)
                {
                    ResizeIndex = Global.ParseInt(target.GetAttribute("i"));
                    ResizeSpan = target;
                    ResizeSpan.Style.Cursor = Cursor.EastWestResize;
                    
                    ev.PreventDefault();
                }else
                {
                    ResizeSpan = null;
                    ResizeIndex = -1;
                }
            };

            se.OnMouseMove = (ev) =>
            {
                if (ResizeIndex == -1)
                {
                    int x = Script.Write<int>("ev.layerX");
                    var target = ev.Target.As<HTMLSpanElement>();
                    x -= target.ClientLeft;
                    
                    if (x >= target.ClientWidth - 2)
                    {
                        target.Style.Cursor = Cursor.EastWestResize;
                        return;
                    }
                    target.Style.Cursor = Cursor.Default;
                }
            };
        }
        int lastId = -1;

        int PrevScroll = -1;

        private void ProcessBlur()
        {
            if (PrevScroll != GridBodyContainer.ScrollTop)
            {
                GridBody.ClassList.Add("blur");
                if (lastId != -1)
                {
                    Global.ClearTimeout(lastId);
                    lastId = -1;
                }

                lastId = Global.SetTimeout(() =>
                {
                    GridBody.ClassList.Remove("blur");
                }, 100);
            }
            PrevScroll = GridBodyContainer.ScrollTop;
        }
		
        public void RenderGrid()
		{									
			GridHeaderContainer.ScrollLeft = GridBodyContainer.ScrollLeft;
            if(Settings.GridViewBlurOnScroll)            
                ProcessBlur();
                        
            ValidateGridSize();
			
			if (ColumnCount() == 0)
			{
				ClearGrid();				
				return;
			}

			int RawLeftCellIndex = 0;
			float RawLeftCellScrollPadding = 0;

			int RawLeftCellCount = Columns.Count;

			float LeftLocation = 0;
			bool foundLeftLocation = false;
			bool foundRightLocation = false;

			int ClientWidth = GridBodyContainer.ClientWidth;

			float ViewWidth = GridBodyContainer.ScrollLeft + ClientWidth;
			float _columnAutoWidthSingle = 0.0f;
			if(_columnAutoWidth)
			{
				_columnAutoWidthSingle = ClientWidth == 0 ? 0.0f : ClientWidth / Columns.Count;
			}			

			for(int x = 0; x < Columns.Count; x++)
			{
				Columns[x].CachedX = LeftLocation;
				LeftLocation += _columnAutoWidth ? _columnAutoWidthSingle : Columns[x].Width;
				if(!foundLeftLocation && LeftLocation >= GridBodyContainer.ScrollLeft)
				{
					foundLeftLocation = true;
					RawLeftCellIndex = x;
					RawLeftCellScrollPadding = LeftLocation - GridBodyContainer.ScrollLeft;
				}
				if(foundLeftLocation && !foundRightLocation && LeftLocation >= ViewWidth)
				{
					foundRightLocation = true;
					RawLeftCellCount = x + 1;
					break;
				}
			}

			var Cols = new List<HTMLSpanElement>();

			int uboundRowCount = RawLeftCellCount - 1;
			for(int x = RawLeftCellIndex; x < RawLeftCellCount; x++)
			{
				var gcol = Columns[x];
				var apparence = gcol.HeadingApparence;				

				var col = Label(gcol.Caption, 
					(_columnAutoWidth ? gcol.CachedX  : gcol.CachedX) + 1, 0, (_columnAutoWidth ? _columnAutoWidthSingle : gcol.Width) - (x == uboundRowCount ? 0 : 1), 
					apparence.IsBold, false, "heading", apparence.Alignment, apparence.Forecolor);

				if(gcol.SortedMode != SortMode.None)
				{
					var sortImage = Div();					
					sortImage.SetBounds("calc(100% - 13px)", "11px", "9px", "5px");
					sortImage.Style.Background = GetImageString(gcol.SortedMode == SortMode.Asc ? SortUpBase64 : SortDownBase64);
					col.AppendChild(sortImage);
				}

                SetupColumn(col, x, gcol);

				Cols.Add(col);				
			}

			if(_dataSource == null || _dataSource.RowCount == 0 || _dataSource.ColumnCount == 0)
			{				
				ClearGrid();
				GridHeader.AppendChildren(Cols.ToArray());
								
				return;
			}

			float RawTopRowIndex = GetRawTopRowIndex();
			float RawTopRowScrollPadding = RawTopRowIndex % 1.0f;
			float RawVisibleRowCount = GetRawVisibleRowCount();

			int Length = (int)(RawVisibleRowCount + RawTopRowIndex) + 1;
			int start = (int)RawTopRowIndex;

			for(int x = SelectedRows.SoftList.Count - 1; x >= 0; x--)
			{
				bool Found = false;
				for(int i = start; i < Length; i++)
				{
					if(i < DataSource.RowCount)
					{
						var DataRowhandle = GetDataSourceRow(i);
						if(SelectedRows.GetIndexValueByHardListIndex(SelectedRows.SoftList[x]).Index == DataRowhandle)
						{
							Found = true;
							break;
						}
					}
				}
				if(!Found)
				{
					SelectedRows.SoftList.RemoveAt(x);
				}
			}

			var Rows = new List<HTMLDivElement>();
            if(Settings.GridViewRowScrollPadding > 0)
            {
                start -= Settings.GridViewRowScrollPadding;
                Length += Settings.GridViewRowScrollPadding;
            }			
			for(int i = start; i < Length; i++)
			{
				if(i < DataSource.RowCount && i >= 0)
				{
					var DataRowhandle = GetDataSourceRow(i);

					var Y = (i * (UnitHeight)) - RawTopRowScrollPadding;
					string classname = (i % 2 == 0 ? "cellrow even" : "cellrow") + (SelectedRows.GetValue(DataRowhandle, true) ? " cellrow-selected" : "") + (DataRowhandle == FocusedDataHandle ? " focusedrow" : "");
					
					var dr = Div(classname);
					var Last = Columns[RawLeftCellCount - 1];
					dr.SetBounds(0, Y, _columnAutoWidth ? ClientWidth : (Last.CachedX + Last.Width), UnitHeight);
					dr.SetAttribute("i", Convert.ToString(DataRowhandle));
									
					dr.OnClick = OnRowClick;
					if(Settings.IsChrome)
					{
						dr.OnDblClick = OnDoubleClick;
					}

					for(int x = RawLeftCellIndex; x < RawLeftCellCount; x++)
					{
						var apparence = Columns[x].BodyApparence;
						var cell = Label(Columns[x].GetDisplayValueByDataRowHandle(DataRowhandle), Columns[x].CachedX, 0, _columnAutoWidth ? _columnAutoWidthSingle : Columns[x].Width, apparence.IsBold, false, "cell", apparence.Alignment, apparence.Forecolor);                       
                        dr.AppendChild(cell);						
					}
					Rows.Add(dr);
				}
			}

			ClearGrid();

			GridHeaderContainer.RemoveChild(GridHeader);
			GridHeader.AppendChildren(Cols.ToArray());
			GridHeaderContainer.AppendChild(GridHeader);

			if (Rows.Count > 0)
			{
				GridBodyContainer.RemoveChild(GridBody);
				GridBody.AppendChildren(Rows.ToArray());
				GridBodyContainer.AppendChild(GridBody);
				//jQuery.Select(GridBodyRows).Append(Rows.ToArray());
			}			
		}
	}



	public class CellApparence
	{
		public bool IsBold = false;
		public TextAlign Alignment = TextAlign.Left;
		public string Forecolor = null;

		public CellApparence()
		{

		}
		public CellApparence(bool isBold)
		{
			IsBold = isBold;
		}
		public CellApparence(bool isBold, TextAlign alignment)
		{
			IsBold = isBold;
			Alignment = alignment;
		}
		public CellApparence(bool isBold, TextAlign alignment, string forecolor)
		{
			IsBold = isBold;
			Alignment = alignment;
			Forecolor = forecolor;
		}
	}

	public enum SortMode
	{
		None,
		Asc,
		Desc
	}

	public class GridViewColumn
	{
		public DataColumn Column;
		public GridView View;
		public string Caption;		
		public bool Visible;
		public float CachedX;
		public string FormatString = string.Empty;
		public CellApparence HeadingApparence = new CellApparence();
		public CellApparence BodyApparence = new CellApparence();
		public SortMode SortedMode = SortMode.None;

		public bool AllowEdit = true;
		public bool ReadOnly = false;

		public int GetDataColumnIndex()
		{
			var length = View.DataSource.ColumnCount;
			for(int i = 0; i < length; i++)
			{
				if(View.DataSource.Columns[i] == Column)
					return i;
			}
			return -1;
		}

		public string GetDisplayValueByDataRowHandle(int RowHandle)
		{			
			if(string.IsNullOrWhiteSpace(FormatString))
			{
				return Column.GetDisplayValue(RowHandle);
			}
			else
			{
				return Column.GetDisplayValue(RowHandle, FormatString);
			}
		}

		public string GetDisplayValue(int RowHandle)
		{
			if(View.VisibleRowHandles != null)
			{
				RowHandle = View.VisibleRowHandles[RowHandle];
			}

			if(string.IsNullOrWhiteSpace(FormatString))
			{
				return Column.GetDisplayValue(RowHandle);
			}
			else
			{
				return Column.GetDisplayValue(RowHandle, FormatString);
			}
		}

		private int _width;

		public int Width
		{
			get { return _width; }
			set {
				if(value < 24)
					value = 24;
				if(_width != value)
				{
					_width = value;
					View.RenderGrid();
				}
			}
		}

		public GridViewColumn(GridView view, int width = 100)
		{
			View = view;
			_width = width;
		}
	}
}
