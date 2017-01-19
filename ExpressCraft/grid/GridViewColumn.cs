using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
	public class GridViewColumn
	{
		public DataColumn Column;
		public GridView View;
		public string Caption;
		public bool Visible;
		public float CachedX;
		public string FormatString = string.Empty;
		public GridViewCellApparence HeadingApparence = new GridViewCellApparence();
		public GridViewCellApparence BodyApparence = new GridViewCellApparence();
		public GridViewCellDisplay CellDisplay = null;
		public GridViewSortMode SortedMode = GridViewSortMode.None;

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
			get
			{
				return _width;
			}
			set
			{
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
