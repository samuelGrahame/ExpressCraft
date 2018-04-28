using static Retyped.dom;

namespace ExpressCraft
{
    public class DateInput : TextInputDropDown
    {
        public DateInput() : base("date")
        {
            UsedEdit.OnKeyDown = (sender, ev) =>
            {
                if(ev.keyCode == KeyCodes.Enter)
                    UsedEdit.Content.blur();
            };
        }

        public override void OnDropDownClicked(MouseEvent mouseEvent)
        {
            if(!Readonly && Enabled)
                (new DateForm(this.UsedEdit)).
                ShowPopup(FormPopup.
                    GetPopupDefaultLocation(DropDownButton, true));
        }
    }
}