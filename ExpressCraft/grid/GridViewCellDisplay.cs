using static Retyped.dom;

namespace ExpressCraft
{
    public abstract class GridViewCellDisplay
    {
        public bool UseDefaultElement;

        public virtual HTMLElement OnCreate(GridView gridView, int dataRowIndex, int columnIndex)
        {
            return null;
        }

        public virtual HTMLElement OnCreateDefault(HTMLElement originalElement, GridView gridView, int dataRowIndex, int columnIndex)
        {
            return originalElement;
        }
    }
}