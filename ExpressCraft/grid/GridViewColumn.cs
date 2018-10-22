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

        public TextInput FilterEdit = null;

        private object filterValue;

        public object FilterValue
        {
            get { return filterValue; }
            set
            {
                if(filterValue != value)
                {
                    filterValue = value;
                    if(View.ShowAutoFilterRow)
                    {
                        View.CalculateVisibleRows();
                    }
                }
            }
        }        

        public bool ValueMatchFilter(int index)
        {
            if(filterValue == null)
                return true;

            object abc = GetDisplayValueByDataRowHandle(index);

            switch(Column.DataType)
            {
                default:
                case DataType.Object:
                case DataType.Integer:
                case DataType.Long:
                case DataType.Float:
                case DataType.Double:
                case DataType.Decimal:
                case DataType.Bool:
                case DataType.Byte:
                case DataType.Short:
                    return abc == filterValue;

                case DataType.DateTime:
                case DataType.String:
                    return (abc + "").StartsWith(filterValue + "");
            }
        }

        public bool AllowEdit = true;
        public bool ReadOnly = false;

        public GridViewColumnCustomEditor CustomEditor;

        public TextInput GetNewInput()
        {
            TextInput input = null;
            if(CustomEditor != null)
            {
                input = CustomEditor.GetNewEditor();
            }

            if(input == null)
            {
                if (Column.DataType == DataType.Object)
                    return null;

                switch (Column.DataType)
                {                    
                    case DataType.Integer:
                    case DataType.Long:
                    case DataType.Float:
                    case DataType.Double:
                    case DataType.Decimal:
                    case DataType.Bool:
                    case DataType.Byte:
                    case DataType.Short:
                        return new NumberInput();
                    case DataType.DateTime:
                        return new DateInput();
                    default:
                    case DataType.String:
                        return new TextInput();
                }
            }

            return input;
        }

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