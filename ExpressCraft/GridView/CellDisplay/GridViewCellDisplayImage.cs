using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

namespace ExpressCraft
{
	public class GridViewCellDisplayImage : GridViewCellDisplay
	{
		public bool UseBase64Resource;
		public override HTMLDivElement OnCreate(GridView gridView, int dataRowIndex, int columnIndex)
		{
			var src = gridView.GetRowCellValue(dataRowIndex, columnIndex).HtmlEscape();
			var imgDiv = Control.Div();

			imgDiv.SetImage(src, !UseBase64Resource);			

			return imgDiv;
		}
	}
}
