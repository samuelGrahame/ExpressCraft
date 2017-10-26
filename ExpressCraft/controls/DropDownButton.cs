using Bridge.Html5;
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
            Content.OnMouseDown = (ev) => {
                if(Enabled)
                    OnDropDownClicked(ev);
            };
        }

        public virtual void OnDropDownClicked(MouseEvent mouseEvent)
        {
            
        }
    }
}
