using static Retyped.dom;

namespace ExpressCraft
{
    public class NumberInput : TextInputDropDown
    {
        public NumberInput() : base("number")
        {
            UsedEdit.SetAttribute("step", "any");
        }

        public override void OnDropDownClicked(MouseEvent mouseEvent)
        {
            if(!Readonly && Enabled)
            {
                var calcEdit = new CalcForm(this.UsedEdit);
                calcEdit.
                ShowPopup(FormPopup.
                    GetPopupDefaultLocation(DropDownButton, true));
                calcEdit.OnFormClosed = () =>
                {
                    ValidateData();
                };
            }
                
        }
    }
}