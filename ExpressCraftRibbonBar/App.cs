using System;
using Bridge;
using Bridge.Html5;
using ExpressCraft;

namespace ExpressCraftRibbonBar
{
    public class App
    {
        public static Random r = new Random();

        public static void Main()
        {
            Form.Setup();
			
            var ribbonForm = new RibbonForm();
            ribbonForm.Text = "ExpressCraft RibbonBar Test";
            ribbonForm.RibbonControl.AddRibbonPages(CreateRandomRibbonPage("Page 01"), CreateRandomRibbonPage("Page 02"), CreateRandomRibbonPage("Page 03"));
            ribbonForm.SetWindowState(WindowState.Maximized);	
			
			Application.Run(ribbonForm);
        }

        public static RibbonPage CreateRandomRibbonPage(string caption)
        {
            var rp = new RibbonPage(caption);

            int Groups = r.Next(1, 5);

            for (int i = 0; i < Groups; i++)
            {
                var Group = new RibbonGroup(i.ToString());

                int buttons = r.Next(5, 10);
                for (int x = 0; x < buttons; x++)
                {
                    var ribbonButt = new RibbonButton(i.ToString() + "_" + x.ToString(), r.Next(1, 3) == 1);
                    ribbonButt.BeginGroup = r.Next(1, 2) == 1;
                    
                    ribbonButt.OnItemClick = (ev) =>
                    {
                        new MessageBoxForm(ev.Caption, MessageBoxLayout.Information).ShowDialog();
                    };
                    Group.Buttons.Add(ribbonButt);
                }

                rp.AddRibbonGroups(Group);
            }

            return rp;
        }

        public class RibbonForm : Form
        {
            public RibbonControl RibbonControl;

            public RibbonForm() : base()
            {
                RibbonControl = new RibbonControl();
            }

            protected override void OnShowing()
            {
                base.OnShowing();

                this.Body.AppendChild(RibbonControl);
            }
        }
    }
}