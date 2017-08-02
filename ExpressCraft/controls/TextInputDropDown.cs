using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class TextInputDropDown : TextInput
    {
        protected SimpleButton DropDownButton;
        protected TextInput UsedEdit;

        public override string GetDisplayFormat()
        {
            return UsedEdit.GetDisplayFormat();
        }

        public virtual float GetDropdownWidth()
        {
            return (float)this.Content.GetBoundingClientRect().Width;            
        }

        public override void SetDisplayFormat(string value)
        {
            UsedEdit.SetDisplayFormat(value);
        }

        public override void OnFocus()
        {
            UsedEdit.Focus();
        }        

        public override HTMLInputElement GetInput()
        {
            return UsedEdit.GetInput();
        }

        public TextInputDropDown(InputType inputType = InputType.Text) : base(new HTMLDivElement(), true, false)
        {
            int dropDownWidth = 17;

            if(Helper.NotDesktop)
            {
                dropDownWidth = 45;
            }

            Type = inputType;

            UsedEdit = new TextInput(inputType) { DisableFocusPopup = true, Location = new Vector2(0, 0), Size = new Vector2("(100% - " + (dropDownWidth - 1) + "px)", "100%") };
            DropDownButton = new SimpleButton() { Location = new Vector2("(100% - " + dropDownWidth + "px)", 0), Size = new Vector2(dropDownWidth, "100%")};
            DropDownButton.Content.OnMouseDown = (ev) =>
            {
                if(!Readonly && Enabled)
                    OnDropDownClicked(ev);
            };
            
            Style.Border = "0";

            DropDownButton.ClassList.Add("dropdown");

            if(Helper.NotDesktop)
            {
                DropDownButton.Style.BackgroundPosition = "right 16px center";
            }

            Content.AppendChildren(UsedEdit, DropDownButton);            
        }

        public override string GetValue()
        {
            return UsedEdit.Text;
        }

        public override void SetValue(string value)
        {
            UsedEdit.Text = value;
        }

        public virtual void OnDropDownClicked(MouseEvent mouseEvent)
        {

        }        
    }
}
