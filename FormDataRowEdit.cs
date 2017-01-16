﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
	public class FormDataRowEdit : Form
	{
		public bool LiveData;
		public GridView GridView;
		public DataRow DataRow;

		public FormDataRowEdit(DataRow _dataRow, GridView _gridView, bool _liveData) : base()
		{
			DataRow = _dataRow;
			GridView = _gridView;
			LiveData = _liveData;

			this.Text = "Row Edit Form";
			this.Width = "400px"; // 25px - 25px 350px width;
			this.Height = "600px";
			this.Body.Style.OverflowY = Bridge.Html5.Overflow.Auto;

			this.AllowSizeChange = false;
		}
		
		protected override void OnShowed()
		{
			base.OnShowed();

			if(DataRow == null)
			{
				this.DialogResult = DialogResultEnum.Cancel;
				this.Close();
			}else
			{
				GenerateForm();
			}
		}

		private void GenerateForm()
		{
			this.Body.Empty();
			var length = GridView.ColumnCount();

			int col = 0;
			int height = 25;

			int defaultHeight = 24 + 3 + 24 + 3;
			int defaultHeight2X = defaultHeight * 3;
			int incrementHeight = defaultHeight;

			int eachWidth = (350 / 3) - 3;

			for(int i = 0; i < length; i++)
			{				
				incrementHeight = defaultHeight;
				var grCol = GridView.GetColumn(i);

				if(!grCol.AllowEdit)
					continue;

				var dtCol = grCol.Column;

				var dtIndex = grCol.GetDataColumnIndex();

				if(grCol.Column.FieldName.ToLower() == "cntr")
				{
					grCol.ReadOnly = true;
				}

				switch(dtCol.DataType)
				{
					case DataType.DateTime:
						var lbldate = Label(grCol.Caption, 25 + (col * eachWidth + (col * 3)), height);
						var inputDate = new TextInput(Bridge.Html5.InputType.Date);
						inputDate.SetBounds(25 + (col * eachWidth + (col * 3)), height + 16 + 3, eachWidth, 24);
						inputDate.SetDate(Convert.ToString(DataRow[dtIndex]));
						inputDate.Readonly = grCol.ReadOnly;
						if(!grCol.ReadOnly)
						{
							inputDate.OnTextChanged = (ev) =>
							{
								DataRow[dtIndex] = inputDate.GetDate();
								if(LiveData)
									GridView.RenderGrid();
							};
						}
						
						Body.AppendChildren(lbldate, inputDate);
						
						break;																
					case DataType.Integer:						
					case DataType.Long:						
					case DataType.Float:						
					case DataType.Double:						
					case DataType.Decimal:						
					case DataType.Bool:						
					case DataType.Byte:					
					case DataType.Short:
						var lblnmb = Label(grCol.Caption, 25 + (col * eachWidth + (col * 3)), height);
						var inputNum = new TextInput(Bridge.Html5.InputType.Number);
						inputNum.SetBounds(25 + (col * eachWidth + (col * 3)), height + 16 + 3, eachWidth, 24);
						inputNum.Text = Convert.ToString(DataRow[dtIndex]);
						inputNum.Readonly = grCol.ReadOnly;

						if(!grCol.ReadOnly)
						{
							inputNum.OnTextChanged = (ev) =>
							{							
								DataRow[dtIndex] = inputNum.Text;
								if(LiveData)
									GridView.RenderGrid();
							};
						}

						Body.AppendChildren(lblnmb, inputNum);
						break;
					default:
					case DataType.Object:
					case DataType.String:						
						var lblstr = Label(grCol.Caption, 25 + (col * eachWidth + (col * 3)), height);
						var inputstr = new TextInput(Bridge.Html5.InputType.Text);
						inputstr.SetBounds(25 + (col * eachWidth + (col * 3)), height + 16 + 3, eachWidth, 24);
						inputstr.Text = Convert.ToString(DataRow[dtIndex]);
						inputstr.Readonly = grCol.ReadOnly;

						if(!grCol.ReadOnly)
						{
							inputstr.OnTextChanged = (ev) =>
							{
								DataRow[dtIndex] = inputstr.Text;

								if(LiveData)
									GridView.RenderGrid();
							};
						}

						Body.AppendChildren(lblstr, inputstr);

						//if(obj.Length > 100)
						//{
						//	incrementHeight = defaultHeight2X;

						//	col = 2;
						//}
						//else
						//{

						//}

						break;
				}
				if(col == 2)
				{
					height += incrementHeight + 3;
					col = 0;
				}else
				{
					col++;
				}
				
			}
			// Add Accept Changes
		}
	}
}
