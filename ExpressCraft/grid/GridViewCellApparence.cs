using Bridge.Html5;

namespace ExpressCraft
{	
	public class GridViewCellApparence
	{
		public bool IsBold = false;
		public TextAlign Alignment = TextAlign.Left;
		public string Forecolor = null;

		public GridViewCellApparence()
		{

		}
		public GridViewCellApparence(bool isBold)
		{
			IsBold = isBold;
		}
		public GridViewCellApparence(bool isBold, TextAlign alignment)
		{
			IsBold = isBold;
			Alignment = alignment;
		}
		public GridViewCellApparence(bool isBold, TextAlign alignment, string forecolor)
		{
			IsBold = isBold;
			Alignment = alignment;
			Forecolor = forecolor;
		}
	}
}
