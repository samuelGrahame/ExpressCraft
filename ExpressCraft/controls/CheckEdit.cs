using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class CheckEdit : Control
    {
        public TextInput Edit;
        public HTMLSpanElement span;
        
        public bool Checked
        {
            get { return Edit.Text.IsTrue() == 1; }
            set { Edit.Text = value.ToString(); }
        }        

        public CheckEdit(string label = "") : base(new HTMLLabelElement() { ClassName = BaseClass(false, true) })
        {
            Edit = new TextInput(InputType.Checkbox);
            Edit.Controller = this;
            span = new HTMLSpanElement();

            Text = label;

            this.Content.AppendChildren(Edit, span);            
        }

        public static implicit operator TextInput(CheckEdit checkEdit)
        {
            return checkEdit.Edit;
        }
        
        public string Text
        {
            get { return span.InnerHTML; }
            set { span.InnerHTML = value; }
        }

    }
}
