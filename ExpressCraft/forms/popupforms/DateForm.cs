using System;

namespace ExpressCraft
{
    public class DateForm : FormPopup
    {
        public TextInput InputControl;

        public DateControl DateControl;
        public bool ClickedClose = false;

        public DateForm(TextInput inputControl)
        {
            if(inputControl.Content.parentElement != null && inputControl.Content.parentElement.parentElement != null && inputControl.Content.parentElement.parentElement.parentElement != null)
            {
                PreviousScrollTop = inputControl.Content.parentElement.parentElement.parentElement.scrollTop;
                ParentContainer = inputControl.Content.parentElement.parentElement.parentElement;
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
                else
                {
                    inputControl.SetDate(string.Format("{0:" + inputControl.DisplayFormat + "}", date));
                }
            };

            DateControl.OnRequestToClose = () =>
            {
                this.Close();
            };

            Content.onkeydown = DateControl.BlockTabEvent;

            AppendChild(DateControl);
        }

        protected override void OnClosed()
        {
            base.OnClosed();
            InputControl.ValidateData();
            if(!Helper.NotDesktop)
                InputControl.Focus();
            else
            {
                InputControl.Scroll((int)PreviousScrollTop, ParentContainer);
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