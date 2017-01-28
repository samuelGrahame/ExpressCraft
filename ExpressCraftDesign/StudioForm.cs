using ExpressCraft;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraftDesign
{
    public class StudioForm : Form
    {
        public RibbonControl ribbonControl;

        public StudioForm()
        {
            ribbonControl = new RibbonControl(RibbonControl.RibbonType.Compact);

            this.AppendChildren(ribbonControl);
        }
    }
}