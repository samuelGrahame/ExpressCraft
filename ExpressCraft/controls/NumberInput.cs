using Bridge.Html5;

namespace ExpressCraft
{
    public class NumberInput : TextInputDropDown
    {
        public NumberInput() : base(InputType.Number)
        {
            UsedEdit.SetAttribute("step", "any");
        }

        public override void OnDropDownClicked(MouseEvent mouseEvent)
        {
            if(!Readonly && Enabled)
                (new CalcForm(this.UsedEdit)).
                ShowPopup(FormPopup.
                    GetPopupDefaultLocation(DropDownButton, true));
        }
    }
}