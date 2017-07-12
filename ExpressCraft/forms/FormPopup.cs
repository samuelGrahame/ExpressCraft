using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class FormPopup : Form
    {
        public FormPopup()
        {
            Heading.Style.Display = Display.None;
            Body.SetLocation(0, 0);
            Body.SetSize("100%", "100%");
            Content.ClassList.Add("inputcontrol");

            StartPosition = FormStartPosition.Manual;

            ShowClose = false;
            ShowMaximize = false;
            ShowMinimize = false;
            AllowMoveChange = false;
            AllowSizeChange = false;
        }

        public void ShowPopup(Vector2 location)
        {
            FormPopups.Add(this);
            this.Location = location;
            ShowDialog();
        }

        protected override void OnClosed()
        {
            base.OnClosed();
            FormPopups.Remove(this);
        }
    }
}
