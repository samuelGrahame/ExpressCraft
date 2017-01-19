using Bridge.Html5;

namespace ExpressCraft
{
	public class GridViewCellDisplayCheckBox : GridViewCellDisplay
	{
		public static string resource_checked = "checked";

		public override HTMLElement OnCreate(GridView gridView, int dataRowIndex, int columnIndex)
		{
			var value = gridView.GetRowCellValue(dataRowIndex, columnIndex);
			
			
			var input = Control.Input(null, InputType.Checkbox);			

			input.SetChecked(value);

			input.Style.Height = (GridView.UnitHeight - 8).ToPx();
		
			return input;
		}
	}
}
