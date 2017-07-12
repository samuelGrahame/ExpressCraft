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
        public static Vector2 GetPopupDefaultLocation(Control control, bool isControlChild = false)
        {                        
            if(isControlChild)
            {
                var rec = control.Content.ParentElement.GetBoundingClientRect();
                return new Vector2((float)rec.Left, (float)(rec.Top + rec.Height));                
            }else
            {
                var rec = control.Content.GetBoundingClientRect();
                return new Vector2((float)rec.Left, (float)(rec.Top + rec.Height));
            }                    
        }

        public FormPopup()
        {
            Heading.Style.Display = Display.None;
            Body.SetLocation(0, 0);
            Body.SetSize("100%", "100%");
            Content.ClassList.Add("inputcontrol");
            Content.ClassList.Remove("form-base");
            Content.Style.BoxShadow = "0 0 63px -17px rgba(0,0,0,0.75)";

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

        protected override void OnClosed()
        {
            base.OnClosed();            
        }
    }
}
