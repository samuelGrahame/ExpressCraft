using Bridge.Html5;

namespace ExpressCraft
{
	public class GridViewCellDisplayCheckBox : GridViewCellDisplay
	{
		public static string resource_checked = "checked";

		public override HTMLElement OnCreate(GridView gridView, int dataRowIndex, int columnIndex)
		{
			var value = gridView.GetRowCellValue(dataRowIndex, columnIndex);
			
			
			var input = Control.Input("cell", InputType.Checkbox);			

			input.SetChecked(value);
            		
			return input;
		}
	}
}
