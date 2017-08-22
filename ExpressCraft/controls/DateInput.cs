using Bridge.Html5;

namespace ExpressCraft
{
    public class DateInput : TextInputDropDown
    {
        public DateInput() : base(InputType.Date)
        {
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