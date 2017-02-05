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
		public RibbonControl ribbonControl1;
		public TabControl tabControl1;
		public SplitControlContainer splitControlContainer1;
		public GridView gridView1;

		public StudioForm()
		{
			ribbonControl1 = new RibbonControl(RibbonControl.RibbonType.Compact);

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
					}
					else
					{
						var nfd = new NewFileDialog();
						nfd.ShowDialog(new DialogResult(DialogResultEnum.OK, () => {
							var stcp = new FormDesignerTabControlPage() { Filename = nfd.Value.Text.HtmlEscape(), Caption = (nfd.Value.Text + ".xml").HtmlEscape() };
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
						
					}
					else
					{
						new MessageBoxForm("Please create a new form before trying to view the designer.", MessageBoxLayout.Information).ShowDialog();
					}
				}
			}));

			ribbonControl1.AddRibbonPages(ribbonPage);

			splitControlContainer1 = new SplitControlContainer();

			splitControlContainer1.SplitterPosition = 176;
			splitControlContainer1.SetBounds(0, 128, "100%", "calc(100% - 128px)");

			tabControl1 = new TabControl();
			
			tabControl1.SetBoundsFull();
			tabControl1.Content.Style.BorderTopStyle = Bridge.Html5.BorderStyle.Solid;
			tabControl1.Content.Style.BorderTopColor = "#C3C3C3";
			tabControl1.Content.Style.BorderTopWidth = Bridge.Html5.BorderWidth.Thin;

			splitControlContainer1.Panel2.AppendChild(tabControl1);

			gridView1 = new GridView(false, true);

			gridView1.SetBoundsFull();

			splitControlContainer1.Panel1.AppendChild(gridView1);

			this.Body.AppendChildren(ribbonControl1, splitControlContainer1);

			this.SetWindowState(WindowState.Maximized);
		}
	}

	public class FormDesignerTabControlPage : TabControlPage
	{
		public string Filename { get; set; }
		public SplitControlContainer splitControlContainer1;		

		public FormDesignerTabControlPage()
		{
			splitControlContainer1 = new SplitControlContainer();
			splitControlContainer1.SetBoundsFull();
			
			splitControlContainer1.SplitterPosition = 150;

			this.AppendChild(splitControlContainer1);
		}

		public override void Render()
		{
			base.Render();
		}
	}
}