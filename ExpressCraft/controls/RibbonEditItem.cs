using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class RibbonEditItem : RibbonItem
    {
        public TextInput Edit;
        public RibbonEditItem(TextInput edit, int editWidth = 100) : base("ribbonbuttonsmall")
        {
            Edit = edit;
            EditWidth = editWidth;
            this.Content.AppendChild(Edit);

            IsSmallItem = true;
        }
        
        public int EditWidth
        {
            get { return Edit.Width.ToInt(); }
            set {
                Edit.Width = value;
                Edit.Top = 0;
                Edit.Left = "(100% - " + value + "px)";
                Edit.Height = "100%";
            }
        }

    }
}
