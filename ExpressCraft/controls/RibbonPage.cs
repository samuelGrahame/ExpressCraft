using Bridge;
using Bridge.Html5;
using System.Collections.Generic;

namespace ExpressCraft
{
    [Namespace(true)]
    public class RibbonPage : Control
    {
        public string Caption { get; set; }
        public List<RibbonGroup> RibbonGroups { get; set; } = new List<RibbonGroup>();
        public HTMLDivElement RibbonHeader = null;

        public RibbonPage(string _caption = "") : base("ribbonpage")
        {
            Caption = _caption;
        }

        public void AddRibbonGroups(params RibbonGroup[] pages)
        {
            if(pages != null)
                RibbonGroups.AddRange(pages);
        }

        public override void Render()
        {
            HasRendered = true;
            if(RibbonGroups == null || RibbonGroups.Count == 0)
                return;
            int width = 0;
            for(int i = 0; i < RibbonGroups.Count; i++)
            {
                RibbonGroups[i].Render();
                RibbonGroups[i].Content.Style.Left = width + "px";
                width += Global.ParseInt(RibbonGroups[i].Content.Style.Width);
                Content.AppendChild(RibbonGroups[i]);
            }
        }
    }
}