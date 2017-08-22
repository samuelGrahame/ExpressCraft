using Bridge.Html5;

namespace ExpressCraft
{
    public class GridViewCellDisplayCheckBox : GridViewCellDisplay
    {
        public static string resource_checked = "checked";

        public override HTMLElement OnCreate(GridView gridView, int dataRowIndex, int columnIndex)
        {
            var value = gridView.GetRowCellValue(dataRowIndex, columnIndex);

            var cell = Control.Div("cell");
            var input = Control.Input("", InputType.Checkbox);
            input.SetBoundsFull();
            input.SetChecked(value);
            input.Style.Margin = "0";
            cell.AppendChild(input);

            return cell;
        }
    }
}