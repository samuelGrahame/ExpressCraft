using Bridge.Html5;

namespace ExpressCraft
{
	public class GridViewCellDisplayCheckBox : GridViewCellDisplay
	{
		private static string resource_checked = "checked";

		public override HTMLDivElement OnCreate(GridView gridView, int dataRowIndex, int columnIndex)
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

			var input = new HTMLInputElement() { Type = InputType.Checkbox };

			//< input type = "checkbox" name = "vehicle" value = "Bike" > I have a bike < br >
		
		 // < input type = "checkbox" name = "vehicle" value = "Car" checked> I have a car < br >
			   

			return ChkDiv;
		}
	}
}
