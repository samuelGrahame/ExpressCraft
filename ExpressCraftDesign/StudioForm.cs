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
			ribbonPage.AddRibbonGroups(new RibbonGroup("Project", 
			new RibbonButton("New Form")
			{
				OnItemClick = (rb) =>
				{
					var msg = AceCodeEditor.Ready();
					if(msg != string.Empty)
					{
						new MessageBoxForm(msg, MessageBoxLayout.Exclamation, MessageBoxButtons.Ok).ShowDialog();
					}else
					{
						var nfd = new NewFileDialog();
						nfd.ShowDialog(new DialogResult(DialogResultEnum.OK, () => {
							var stcp = new SourceTabControlPage() { Filename = nfd.Value.Text.HtmlEscape(), Caption = (nfd.Value.Text + ".xml").HtmlEscape() };
							this.LinkchildToForm(stcp.splitControlContainer1);
							tabControl1.AddPages(stcp);
							tabControl1.SelectedIndex = tabControl1.TabPages.Count - 1;
						}));
					}					
				}
			},
			new RibbonButton("View Designer")
			{
				OnItemClick = (rb) =>
				{
					if(tabControl1.SelectedIndex != -1)
					{
						// get data;
						var tabpage = tabControl1.TabPages[tabControl1.SelectedIndex].As<SourceTabControlPage>();
						var code = tabpage.CodeEdtor.Source;
						
						CreateFormFromXML(code).ShowDialog();
					}
					else
					{
						new MessageBoxForm("Please create a new form before trying to view the designer.", MessageBoxLayout.Information).ShowDialog();
					}
				}
			}));


			ribbonControl.AddRibbonPages(ribbonPage);				

			tabControl1 = new TabControl();
            tabControl1.SetBounds(0, 128, "100%", "calc(100% - 128px)");			

            this.Body.AppendChildren(ribbonControl, tabControl1);

			this.SetWindowState(WindowState.Maximized);
		}
    }

	public class SourceTabControlPage : TabControlPage
	{
		public string Filename { get; set; }
		public SplitControlContainer splitControlContainer1;
		public AceCodeEditor CodeEdtor;		

		public SourceTabControlPage()
		{
			splitControlContainer1 = new SplitControlContainer();
			splitControlContainer1.SetBoundsFull();

			splitControlContainer1.Panel1.AppendChild((CodeEdtor = new AceCodeEditor(AceModeTypes.xml) { Bounds = new Vector4(0, 0, "100%", "100%") }));			

			splitControlContainer1.SplitterPosition = 500;
						
			this.AppendChild(splitControlContainer1);
		}

		public override void Render()
		{
			base.Render();
		}
	}
}