namespace ExpressCraft
{
    public class CalcForm : FormPopup
    {
        public TextInput InputControl;

        public CalculatorControl CalControl;
        public bool ClickedClose = false;

        public CalcForm(TextInput inputControl)
        {
            if(inputControl.Content.parentElement != null && inputControl.Content.parentElement.parentElement != null && inputControl.Content.parentElement.parentElement.parentElement != null)
            {
                PreviousScrollTop = inputControl.Content.parentElement.parentElement.parentElement.scrollTop;
                ParentContainer = inputControl.Content.parentElement.parentElement.parentElement;
            }

            InputControl = inputControl;
            CalControl = new CalculatorControl(InputControl.GetNumberValue(), true);
            CalControl.SetBoundsFull();
            CalControl.OnClose = () =>
            {
                ClickedClose = true;
                this.Close();
            };

            CalControl.OnEqual = (value) =>
            {
                InputControl.Text = value.ToString();
            };

            AppendChild(CalControl);

            Size = new Vector2(182, 157);
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

        protected override void OnClosing()
        {
            base.OnClosing();

            if(!ClickedClose)
            {
                CalControl.DontRefresh = true;
                CalControl.AddOperator(CalControl.btnEq);
            }
        }

        protected override void OnShowed()
        {
            base.OnShowed();
            if(InputControl == null)
                this.Close();

            CalControl.btnEq.Focus();
        }
    }
}