using static Retyped.dom;

namespace ExpressCraft
{
    public class GridViewCellDisplayImage : GridViewCellDisplay
    {
        public bool UseBase64Resource;

        public override HTMLElement OnCreate(GridView gridView, int dataRowIndex, int columnIndex)
        {
            var src = (gridView.GetRowCellValue(dataRowIndex, columnIndex) + "").HtmlUrlEscape();
            var imgDiv = ExControl.Div("cell");

            imgDiv.SetImage(src, !UseBase64Resource);

            return imgDiv;
        }
    }
}