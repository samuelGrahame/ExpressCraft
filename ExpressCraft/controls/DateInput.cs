using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class DateInput : TextInputDropDown
    {
        public DateInput() : base(InputType.Date)
        {
            
        }

        public override void OnDropDownClicked(MouseEvent mouseEvent)
        {
            (new DateForm(this.UsedEdit)).
                ShowPopup(FormPopup.
                    GetPopupDefaultLocation(DropDownButton, true));
        }
    }
}
