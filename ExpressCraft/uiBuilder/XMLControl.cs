using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{    
    public class XMLControl
    {
        public XMLControl Parent;
        public Control Control;
        public List<XMLControl> Children = new List<XMLControl>();

        public Form GetForm()
        {
            if(Parent == null)
            {
                if(Control != null && Control is Form)
                {
                    return Control.As<Form>();
                }else
                {
                    return null;
                }
            }else
            {
                return Parent.GetForm();
            }
        }
    }
}
