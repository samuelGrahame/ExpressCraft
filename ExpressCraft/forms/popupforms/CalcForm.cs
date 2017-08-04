using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class CalcForm : FormPopup
    {
        public TextInput InputControl;

        public CalculatorControl CalControl;
        public bool ClickedClose = false;
        
        public CalcForm(TextInput inputControl)
        {
            if(inputControl.Content.ParentElement != null && inputControl.Content.ParentElement.ParentElement != null && inputControl.Content.ParentElement.ParentElement.ParentElement != null)
            {
                PreviousScrollTop = inputControl.Content.ParentElement.ParentElement.ParentElement.ScrollTop;
                ParentContainer = inputControl.Content.ParentElement.ParentElement.ParentElement;
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
            if(!Helper.NotDesktop)
                InputControl.Focus();
            else
            {
                InputControl.Scroll(PreviousScrollTop, ParentContainer);
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
