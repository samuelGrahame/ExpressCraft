using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class GroupPanel : Control
    {
        private HTMLLegendElement legend;
        public string Caption
        {
            get { return legend.TextContent; }
            set { legend.TextContent = value; }
        }

        public GroupPanel() : base(new HTMLFieldSetElement())
        {
            this.Content.AppendChild(legend = new HTMLLegendElement());
            this.Content.ClassName = "control inputcontrol";
            legend.Style.MarginLeft = "7px";            
        }
    }
}
