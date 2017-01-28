﻿using ExpressCraft;
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
        public Control panel1;

        public StudioForm()
        {
            ribbonControl = new RibbonControl(RibbonControl.RibbonType.Compact);

            panel1 = new Control();

            panel1.SetBounds(0, 154, "100%", Helper.oneHundrendTake(154));

            this.AppendChildren(ribbonControl, panel1);
        }
    }
}