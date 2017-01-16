using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{

	public enum DataType
	{
		Object,
		DateTime,
		String,
		Integer,
		Long,
		Float,
		Double,
		Decimal,
		Bool,
		Byte,
		Short
	}

	public class DataTable
	{
		public List<DataColumn> Columns = new List<DataColumn>();

		public Action<int> RowSizeChanged = null;

		private int _ColCount;
		public int ColumnCount
		{
			get
			{
				return _ColCount;
			}
		}

		public int _RowCount;
		public int RowCount
		{
			get
			{
				return _RowCount;
			}
		}

		private List<DataRow> NewRows = new List<DataRow>();		

		public void AddColumn(string fieldName, DataType type = DataType.Object)
		{
			switch(type)
			{
				default:
				case DataType.Object:
					Columns.Add(new DataColumnObject() { FieldName = fieldName });
					break;
				case DataType.DateTime:
					Columns.Add(new DataColumnDateTime() { FieldName = fieldName });
					break;
				case DataType.String:
					Columns.Add(new DataColumnString() { FieldName = fieldName });
					break;
				case DataType.Integer:
					Columns.Add(new DataColumnInteger() { FieldName = fieldName });
					break;
				case DataType.Long:
					Columns.Add(new DataColumnLong() { FieldName = fieldName });
					break;
				case DataType.Float:
					Columns.Add(new DataColumnFloat() { FieldName = fieldName });
					break;
				case DataType.Double:
					Columns.Add(new DataColumnDouble() { FieldName = fieldName });
					break;
				case DataType.Decimal:
					Columns.Add(new DataColumnDecimal() { FieldName = fieldName });
					break;
				case DataType.Bool:
					Columns.Add(new DataColumnBool() { FieldName = fieldName });
					break;
				case DataType.Byte:
					Columns.Add(new DataColumnByte() { FieldName = fieldName });
					break;
				case DataType.Short:
					Columns.Add(new DataColumnShort() { FieldName = fieldName });
					break;
			}			
			_ColCount = Columns.Count;
		}

		public DataRow this[int rowIndex]
		{
			get
			{
				return new DataRow(this, rowIndex);
			}
		}

		public void BeginNewRow(int EstimatedNewRows)
		{
			NewRows = new List<DataRow>(EstimatedNewRows);
		}

		public DataRow AddRow()
		{			
			var dr = new DataRow(this, _RowCount++);
			int colLength = Columns.Count;
			for(int x = 0; x < colLength; x++)
			{
				dynamic col = Columns[x];
				col.cells.add(null);
				//Columns[x].Cells.Add(null);
			}
			if(RowSizeChanged != null)
				RowSizeChanged(RowCount);
			return dr;
		}

		public void AddRow(params object[] row)
		{
			if(row.Length == ColumnCount)
			{
				_RowCount++;
				int colLength = Columns.Count;
				for(int x = 0; x < colLength; x++)
				{
					dynamic col = Columns[x];
					col.cells.add(row[x]);
					//Columns[x].Cells.Add(row[x]);
				}
				if(RowSizeChanged != null)
					RowSizeChanged(RowCount);
			}
		}

		public DataRow NewRow()
		{
			var dr = new DataRow(this);

			NewRows.Add(dr);

			return dr;
		}

		public void AcceptNewRows()
		{
			if(NewRows == null || NewRows.Count == 0)
				return;
			int colLength = Columns.Count;
			int rowLength = NewRows.Count;			
			int colN1 = colLength - 1;

			for(int x = 0; x < colLength; x++)
			{
				dynamic col = Columns[x];
				var DataCells = new object[rowLength];

				if(x == 0)
				{
					for(int y = 0; y < rowLength; y++)
					{						
						NewRows[y].RowIndex = _RowCount++;
						DataCells[y] = NewRows[y].batchData[x];
					}
				}
				else if(x == colN1)
				{
					for(int y = 0; y < rowLength; y++)
					{
						DataCells[y] = NewRows[y].batchData[x];
						NewRows[y].batchData = null;
					}
				}
				else
				{
					for(int y = 0; y < rowLength; y++)
					{
						DataCells[y] = NewRows[y].batchData[x];
					}
				}
				col.cells.addRange(DataCells);

			}
			NewRows.Clear();

			if(RowSizeChanged != null)
				RowSizeChanged(RowCount);
		}

		public void RejectNewRows()
		{
			NewRows.Clear();
		}
	}	
	
	public class DataRow
	{
		public DataTable ParentTable;
		public int RowIndex;
		public object[] batchData;

		public DataRow(DataTable parentTable, int rowIndex = -1)
		{
			ParentTable = parentTable;
			RowIndex = rowIndex;
			if(rowIndex == -1)
			{
				batchData = new object[parentTable.ColumnCount];
			}
		}

		public object this[int columnIndex] { get {
				if(RowIndex == -1)
				{
					return batchData[columnIndex];
				}
				dynamic col = ParentTable.Columns[columnIndex];
				return col.cells.items[RowIndex];
			} set {
				if(RowIndex == -1)
				{
					batchData[columnIndex] = value;
					return;
				}
				dynamic col = ParentTable.Columns[columnIndex];
				col.cells.items[RowIndex] = value;
			}
		}
	}	

	public class DataColumn
	{
		public string FieldName;
		public DataType DataType;
		//public List<object> Cells = new List<object>();
		public string GetDisplayValue(int rowIndex, string formatString)
		{
			switch(DataType)
			{
				default:
				case DataType.Object:
					return string.Format(formatString, (((DataColumnObject)this).Cells[rowIndex]));
				case DataType.DateTime:
					return string.Format(formatString, ((DataColumnDateTime)this).Cells[rowIndex]);
				case DataType.String:
					return string.Format(formatString, ((DataColumnString)this).Cells[rowIndex]);
				case DataType.Integer:
					return string.Format(formatString, ((DataColumnInteger)this).Cells[rowIndex]);
				case DataType.Long:
					return string.Format(formatString, ((DataColumnLong)this).Cells[rowIndex]);
				case DataType.Float:
					return string.Format(formatString, ((DataColumnFloat)this).Cells[rowIndex]);
				case DataType.Double:
					return string.Format(formatString, ((DataColumnDouble)this).Cells[rowIndex]);
				case DataType.Decimal:
					return string.Format(formatString, ((DataColumnDecimal)this).Cells[rowIndex]);
				case DataType.Byte:
					return string.Format(formatString, ((DataColumnByte)this).Cells[rowIndex]);
				case DataType.Short:
					return string.Format(formatString, ((DataColumnShort)this).Cells[rowIndex]);
				case DataType.Bool:
					return string.Format(formatString, ((DataColumnBool)this).Cells[rowIndex]);
			}
		}

		public object GetCellValue(int rowIndex)
		{
			switch(DataType)
			{
				default:
				case DataType.Object:
					return ((DataColumnObject)this).Cells[rowIndex];
				case DataType.DateTime:
					return ((DataColumnDateTime)this).Cells[rowIndex];
				case DataType.String:
					return ((DataColumnString)this).Cells[rowIndex];
				case DataType.Integer:
					return (((DataColumnInteger)this).Cells[rowIndex]);
				case DataType.Long:
					return (((DataColumnLong)this).Cells[rowIndex]);
				case DataType.Float:
					return (((DataColumnFloat)this).Cells[rowIndex]);
				case DataType.Double:
					return (((DataColumnDouble)this).Cells[rowIndex]);
				case DataType.Decimal:
					return (((DataColumnDecimal)this).Cells[rowIndex]);
				case DataType.Byte:
					return (((DataColumnByte)this).Cells[rowIndex]);
				case DataType.Bool:
					return (((DataColumnBool)this).Cells[rowIndex]);
				case DataType.Short:
					return (((DataColumnShort)this).Cells[rowIndex]);
			}
		}

		public string GetDisplayValue(int rowIndex)
		{
			switch(DataType)
			{
				default:
				case DataType.Object:
					return Convert.ToString(((DataColumnObject)this).Cells[rowIndex]);					
				case DataType.DateTime:				
					return Convert.ToString(((DataColumnDateTime)this).Cells[rowIndex]);
				case DataType.String:					
					return ((DataColumnString)this).Cells[rowIndex];
				case DataType.Integer:					
					return Convert.ToString(((DataColumnInteger)this).Cells[rowIndex]);					
				case DataType.Long:					
					return Convert.ToString(((DataColumnLong)this).Cells[rowIndex]);
				case DataType.Float:					
					return Convert.ToString(((DataColumnFloat)this).Cells[rowIndex]);
				case DataType.Double:					
					return Convert.ToString(((DataColumnDouble)this).Cells[rowIndex]);
				case DataType.Decimal:					
					return Convert.ToString(((DataColumnDecimal)this).Cells[rowIndex]);
				case DataType.Byte:
					return Convert.ToString(((DataColumnByte)this).Cells[rowIndex]);
				case DataType.Bool:
					return Convert.ToString(((DataColumnBool)this).Cells[rowIndex]);
				case DataType.Short:
					return Convert.ToString(((DataColumnShort)this).Cells[rowIndex]);
			}
		}

	}
	public class DataColumnString : DataColumn
	{
		public DataColumnString()
		{
			base.DataType = DataType.String;
		}
		public List<string> Cells = new List<string>();
	}
	public class DataColumnDateTime : DataColumn
	{
		public DataColumnDateTime()
		{
			base.DataType = DataType.DateTime;
		}
		public List<DateTime?> Cells = new List<DateTime?>();
	}
	public class DataColumnInteger : DataColumn
	{
		public DataColumnInteger()
		{
			base.DataType = DataType.Integer;
		}
		public List<int?> Cells = new List<int?>();
	}
	public class DataColumnLong : DataColumn
	{
		public DataColumnLong()
		{
			base.DataType = DataType.Long;
		}
		public List<long?> Cells = new List<long?>();
	}
	public class DataColumnObject : DataColumn
	{
		public DataColumnObject()
		{
			base.DataType = DataType.Object;
		}
		public List<object> Cells = new List<object>();
	}
	public class DataColumnDecimal : DataColumn
	{
		public DataColumnDecimal()
		{
			base.DataType = DataType.Decimal;
		}
		public List<decimal?> Cells = new List<decimal?>();
	}	
	public class DataColumnFloat : DataColumn
	{
		public DataColumnFloat()
		{
			base.DataType = DataType.Float;
		}
		public List<float?> Cells = new List<float?>();
	}
	public class DataColumnDouble : DataColumn
	{
		public DataColumnDouble()
		{
			base.DataType = DataType.Double;
		}
		public List<double?> Cells = new List<double?>();
	}
	public class DataColumnBool : DataColumn
	{
		public DataColumnBool()
		{
			base.DataType = DataType.Bool;
		}
		public List<bool?> Cells = new List<bool?>();
	}
	public class DataColumnByte : DataColumn
	{
		public DataColumnByte()
		{
			base.DataType = DataType.Byte;
		}
		public List<byte?> Cells = new List<byte?>();
	}
	public class DataColumnShort : DataColumn
	{
		public DataColumnShort()
		{
			base.DataType = DataType.Short;
		}
		public List<short?> Cells = new List<short?>();
	}
}
