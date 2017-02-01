using ExpressCraft;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraftDesign
{
    public class StudioForm : Form
    {
        public RibbonControl ribbonControl;
        public TabControl tabControl1;
		
        public StudioForm()
        {
            ribbonControl = new RibbonControl(RibbonControl.RibbonType.Compact);

			var ribbonPage = new RibbonPage("Actions");
			ribbonPage.AddRibbonGroups(new RibbonGroup("Project", new RibbonButton("New Form")
			{
				OnItemClick = (rb) =>
				{
					tabControl1.AddPages(new TabControlPage() { Caption = "" });
				}
			}));


			ribbonControl.AddRibbonPages(ribbonPage);				

			tabControl1 = new TabControl();
            tabControl1.SetBounds(0, 154, "100%", "calc(100% - 154px)");			

            this.Body.AppendChildren(ribbonControl, tabControl1);

			this.SetWindowState(WindowState.Maximized);
		}
    }

	public class SourceTabControlPage : TabControlPage
	{
		public string Filename { get; set; }

		public SourceTabControlPage()
		{
			
		}

		public override void Render()
		{
			base.Render();
		}
	}
}