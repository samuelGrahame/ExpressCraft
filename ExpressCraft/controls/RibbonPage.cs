using Bridge;
using static Retyped.dom;
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
            {
                foreach(var item in pages)
                {
                    if(item != null)
                        RibbonGroups.Add(item);
                }
            }                
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
                RibbonGroups[i].Content.style.left = width + "px";
                width += Script.ParseInt(RibbonGroups[i].Content.style.width);
                Content.AppendChild(RibbonGroups[i]);
            }
        }
    }
}