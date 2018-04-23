using static Retyped.dom;

namespace ExpressCraft
{
    public class TextInputDropDown : TextInput
    {
        public SimpleButton DropDownButton;
        public TextInput UsedEdit;

        public override string GetDisplayFormat()
        {
            return UsedEdit.GetDisplayFormat();
        }
        private bool _disableTextEditor;
        public bool DisableTextEditor
        {
            get { return _disableTextEditor; }
            set {
                _disableTextEditor = value;
                UsedEdit.DisableFocus = value;
                if(value)
                {
                    UsedEdit.SetAttribute("contenteditable", "false");
                    UsedEdit.Style.backgroundColor = Color.White;
                    UsedEdit.Style.cursor = "pointer";
                }
                else
                {
                    UsedEdit.Style.backgroundColor = null;
                    UsedEdit.Content.removeAttribute("contenteditable");
                }
            }
        }        

        public virtual float GetDropdownWidth()
        {
            return (float)((DOMRect)this.Content.getBoundingClientRect()).width;
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

        public TextInputDropDown(string inputType = "text") : base(new HTMLDivElement(), true, false)
        {
            int dropDownWidth = 17;

            if(Helper.NotDesktop)
            {
                dropDownWidth = 45;
            }

            Type = inputType;

            UsedEdit = new TextInput(inputType) { DisableFocusPopup = true, Location = new Vector2(0, 0), Size = new Vector2("(100% - " + (dropDownWidth - 1) + "px)", "100%") };
            UsedEdit.OnTextChanged = (sender) =>
            {
                if(OnTextChanged != null)
                    OnTextChanged(sender);
            };

            _displayFormat = UsedEdit.DisplayFormat;

            DropDownButton = new SimpleButton() { Location = new Vector2("(100% - " + dropDownWidth + "px)", 0), Size = new Vector2(dropDownWidth, "100%") };
            DropDownButton.Content.onmousedown = (ev) =>
            {
                if(!Readonly && Enabled)
                    OnDropDownClicked(ev);
                return null;
            };

            Style.border = "0";

            DropDownButton.ClassList.add("dropdown");

            if(Helper.NotDesktop)
            {
                DropDownButton.Style.backgroundPosition = "right 16px center";
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