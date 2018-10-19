using static Retyped.dom;
using System;

namespace ExpressCraft
{
    public class CheckEdit : Control
    {
        public TextInput Edit;
        public HTMLSpanElement span;
        public Action<CheckEdit> OnCheckChanged;        
        public bool Checked
        {
            get { return Edit.Text.IsTrue() == 1; }
            set { Edit.Text = value.ToString(); }
        }

        public static int InputHeight = 20;

        public CheckEdit(string label = "") : base(new HTMLLabelElement() { className = "inputcontrol" + BaseClass(true, true) })
        {
            Edit = new TextInput("checkbox");
            Edit.Controller = this;
            Edit.OnTextChanged = (sender) => {                
                if(OnCheckChanged != null)
                    OnCheckChanged(this);
            };
            span = new HTMLSpanElement();

            span.style.left = (InputHeight - 2).ToPx();
            span.style.position = "absolute";
            span.style.whiteSpace = "pre";
            
            if (Content.As<HTMLInputElement>().type == "checkbox")
            {                
                Edit.Width = (InputHeight - 4).ToPx();
                Edit.Height = (InputHeight - 4).ToPx();
            }

            Text = label;

            this.Content.AppendChildren(Edit, span);
        }

        public static implicit operator TextInput(CheckEdit checkEdit)
        {
            return checkEdit.Edit;
        }

        public string Text
        {
            get { return span.innerHTML; }
            set { span.innerHTML = value; }
        }
    }
}