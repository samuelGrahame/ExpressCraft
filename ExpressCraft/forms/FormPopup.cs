using static Retyped.dom;
using System;

namespace ExpressCraft
{
    public class FormPopup : Form
    {
        public double PreviousScrollTop;
        public HTMLElement ParentContainer;

        public static Vector2 GetPopupDefaultLocation(Control control, bool isControlChild = false)
        {
            if(Helper.NotDesktop)
                return new Vector2(0, 0);

            if(isControlChild)
            {
                var rec = (DOMRect)control.Content.parentElement.getBoundingClientRect();
                return new Vector2((float)rec.left, (float)(rec.top + rec.height));
            }
            else
            {
                var rec = (DOMRect)control.Content.getBoundingClientRect();
                return new Vector2((float)rec.left, (float)(rec.top + rec.height));
            }
        }

        public FormPopup()
        {
            Heading.style.display = "none";
            Body.SetLocation(0, 0);
            Body.SetSize("100%", "100%");
            Content.classList.add("inputcontrol");
            Content.classList.add("popup");
            Content.classList.remove("form-base");
            Content.style.boxShadow = "0 0 63px -17px rgba(0,0,0,0.75)";

            StartPosition = FormStartPosition.Manual;

            ShowClose = false;
            ShowMaximize = false;
            ShowMinimize = false;
            AllowMoveChange = false;
            AllowSizeChange = false;
        }

        public void ShowPopup(Vector2 location)
        {
            this.Location = location;
            ShowDialog();
        }

        private void MoveFormUp()
        {
            this.Location = new Vector2(this.Left, this.Top.ToFloat() - this.Height.ToFloat() - 20);
        }

        protected override void OnShowed()
        {
            base.OnShowed();

            if(Helper.NotDesktop)
            {
                AllowSizeChange = true;
                WindowState = WindowStateType.Maximized;
                AllowSizeChange = false;
            }
            else
            {
                var rect = (DOMRect)Content.getBoundingClientRect();

                try
                {
                    if(rect.bottom > window.innerHeight || rect.bottom > document.documentElement.clientHeight)
                    {
                        MoveFormUp();
                    }
                }
                catch(Exception)
                {
                }
            }
        }

        protected override void OnClosed()
        {
            base.OnClosed();
        }
    }
}