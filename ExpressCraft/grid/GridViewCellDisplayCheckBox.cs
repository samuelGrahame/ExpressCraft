using static Retyped.dom;

namespace ExpressCraft
{
    public class GridViewCellDisplayCheckBox : GridViewCellDisplay
    {
        public static string resource_checked = "checked";

        public override HTMLElement OnCreate(GridView gridView, int dataRowIndex, int columnIndex)
        {
            var value = gridView.GetRowCellValue(dataRowIndex, columnIndex);

            var cell = Control.Div("cell");
            var input = Control.Input("", "checkbox");
            input.SetBoundsFull();
            input.SetChecked(value);
            input.style.margin = "0";
            cell.AppendChild(input);

            return cell;
        }
    }
}