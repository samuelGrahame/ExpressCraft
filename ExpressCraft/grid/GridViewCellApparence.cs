using static Retyped.dom;

namespace ExpressCraft
{
    public class GridViewCellApparence
    {
        public bool IsBold = false;
        public string Alignment = "left";
        public string Forecolor = null;
        public string Backcolor = null;


        public GridViewCellApparence()
        {
        }

        public GridViewCellApparence(bool isBold)
        {
            IsBold = isBold;
        }

        public GridViewCellApparence(bool isBold, string alignment)
        {
            IsBold = isBold;
            Alignment = alignment;
        }

        public GridViewCellApparence(bool isBold, string alignment, string forecolor)
        {
            IsBold = isBold;
            Alignment = alignment;
            Forecolor = forecolor;
        }
    }
}