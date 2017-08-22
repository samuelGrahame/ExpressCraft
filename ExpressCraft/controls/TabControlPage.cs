using Bridge.Html5;

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
        public string Caption { get; set; }
    }
}