using static Retyped.dom;
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
            get { return legend.textContent; }
            set { legend.textContent = value; }
        }

        public GroupPanel() : base(new HTMLFieldSetElement())
        {
            this.Content.AppendChild(legend = new HTMLLegendElement());
            this.Content.className = "control inputcontrol popup";
            legend.style.marginLeft = "7px";            
        }
    }
}
