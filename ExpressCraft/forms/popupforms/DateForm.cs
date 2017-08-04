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

        public DateControl DateControl;
        public bool ClickedClose = false;

        public DateForm(TextInput inputControl)
        {
            if(inputControl.Content.ParentElement != null && inputControl.Content.ParentElement.ParentElement != null && inputControl.Content.ParentElement.ParentElement.ParentElement != null)
            {
                PreviousScrollTop = inputControl.Content.ParentElement.ParentElement.ParentElement.ScrollTop;
                ParentContainer = inputControl.Content.ParentElement.ParentElement.ParentElement;
            }

            Size = new Vector2(232, 247);

            InputControl = inputControl;
            DateControl = new DateControl(inputControl.GetDateTime());
            DateControl.SetBoundsFull();

            DateControl.OnDateChanged = (date) =>
            {
                if(date == DateTime.MinValue)
                {
                    inputControl.SetDate("");
                }
                else {                     
                    inputControl.SetDate(string.Format("{0:" + inputControl.DisplayFormat + "}", date));
                }                
            };

            DateControl.OnRequestToClose = () =>
            {
                this.Close();
            };

            Content.OnKeyDown = DateControl.BlockTabEvent;

            AppendChild(DateControl);            
        }

        protected override void OnClosed()
        {
            base.OnClosed();
            if(!Helper.NotDesktop)
                InputControl.Focus();
            else
            {
                InputControl.Scroll(PreviousScrollTop, ParentContainer);
            }
        }
        
        protected override void OnShowed()
        {
            base.OnShowed();
            if(InputControl == null)
                this.Close();

            DateControl.btnToday.Focus();
        }
    }
}
