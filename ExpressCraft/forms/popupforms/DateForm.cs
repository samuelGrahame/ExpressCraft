using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class DateForm : FormPopup
    {
        public TextInput InputControl;

        public DateControl CalControl;
        public bool ClickedClose = false;

        public DateForm(TextInput inputControl)
        {
            Size = new Vector2(232, 247);

            InputControl = inputControl;
            CalControl = new DateControl(inputControl.GetDateTime());
            
            this.Content.AppendChild(CalControl);            
        }

        protected override void OnClosed()
        {
            base.OnClosed();
            InputControl.Focus();
        }
        
        protected override void OnShowed()
        {
            base.OnShowed();
            if(InputControl == null)
                this.Close();

            CalControl.btnClear.Focus();
        }
    }
}
