using static Retyped.dom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class DropDownButton : SimpleButton
    {
        public DropDownButton() : base()
        {
            Content.onmousedown = (ev) => {
                if(Enabled)
                    OnDropDownClicked(ev);
            };
        }

        public virtual void OnDropDownClicked(MouseEvent mouseEvent)
        {
            
        }
    }
}
