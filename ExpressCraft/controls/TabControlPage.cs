using static Retyped.dom;

namespace ExpressCraft
{
    public class TabControlPage : Control
    {
        public int index;

        public TabControlPage() : base("tabcontrolpage")
        {
        }

        public HTMLDivElement TabPageHeader = null;
        public HTMLDivElement TabPageHeaderClose = null;
        public string Caption;
        public bool Hidden;
    }
}