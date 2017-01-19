using Bridge.Html5;

namespace ExpressCraft
{
	public class GridViewCellDisplayCheckBox : GridViewCellDisplay
	{
		public static string resource_checked = "checked";

		public override HTMLElement OnCreate(GridView gridView, int dataRowIndex, int columnIndex)
		{
			var value = gridView.GetRowCellValue(dataRowIndex, columnIndex);
			
			
			var ChkDiv = Control.Div();
			ChkDiv.Style.TextAlign = TextAlign.Center;
			ChkDiv.Style.VerticalAlign = VerticalAlign.Middle;
			
			var input = new HTMLInputElement() { Type = InputType.Checkbox };
			input.SetChecked(value);
			ChkDiv.AppendChild(input);			

			return ChkDiv;
		}
	}
}
