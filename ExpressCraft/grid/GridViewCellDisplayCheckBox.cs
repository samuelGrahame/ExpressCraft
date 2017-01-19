using Bridge.Html5;

namespace ExpressCraft
{
	public class GridViewCellDisplayCheckBox : GridViewCellDisplay
	{
		private static string resource_checked = "checked";

		public override HTMLElement OnCreate(GridView gridView, int dataRowIndex, int columnIndex)
		{
			var value = gridView.GetRowCellValue(dataRowIndex, columnIndex);
			string attribute = "";
			if(value != null)
			{
				if(value is bool || value.IsNumber())
				{
					if((bool)value)
					{
						attribute = resource_checked;
					}
				}
				else if(value is string)
				{
					string strValue = ((string)value);

					if(strValue == "1" || string.Compare(strValue.ToLower(), "true") == 0)
					{
						attribute = resource_checked;
					}
				}
			}
			
			var ChkDiv = Control.Div();
			ChkDiv.Style.TextAlign = TextAlign.Center;
			ChkDiv.Style.VerticalAlign = VerticalAlign.Middle;
			
			var input = new HTMLInputElement() { Type = InputType.Checkbox };

			input.SetAttribute(attribute, "");

			ChkDiv.AppendChild(input);			

			return ChkDiv;
		}
	}
}
