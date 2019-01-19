using static Retyped.dom;

namespace ExpressCraft
{
    public class GridViewCellDisplayCheckBox : GridViewCellDisplay
    {
        public static string resource_checked = "checked";

        public override HTMLElement OnCreate(GridView gridView, int dataRowIndex, int columnIndex)
        {
            var value = gridView.GetRowCellValue(dataRowIndex, columnIndex);

            var cell = ExControl.Div("cell");
            var input = ExControl.Input("", "checkbox");
            input.SetBoundsFull();
            input.SetChecked(value);
            input.style.margin = "0";
            cell.AppendChild(input);

            return cell;
        }
    }
}