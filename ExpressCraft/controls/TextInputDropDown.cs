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

        public TextInputDropDown(InputType inputType = InputType.Text) : base(new HTMLDivElement())
        {
            UsedEdit = new TextInput(inputType) { Location = new Vector2(0, 0), Size = new Vector2("calc(100% - 20px)", "100%") };
            DropDownButton = new SimpleButton() { Location = new Vector2("calc(100% - 20px)", 0), Size = new Vector2("20px", "100%"), ItemClick = (s) => 
                {
                OnDropDownClicked();
                }
            };
            DropDownButton.ClassList.Add("dropdown");
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

        public virtual void OnDropDownClicked()
        {

        }        
    }
}
