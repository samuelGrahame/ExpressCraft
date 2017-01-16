using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
	public class StatusListForm : Form
	{
		public RibbonControl ribbonControl;

		public override void Render()
		{
			HasRendered = true;

			this.SetBoundsFull();

			ribbonControl = new RibbonControl();

			var status = new RibbonPage("Status Lists");

			status.AddRibbonGroups(
				new RibbonGroup("Print and Export",
					new RibbonButton("Print"),
					new RibbonButton("Print Picking Slip(s)") { BeginGroup = true },
					new RibbonButton("Print Unit Label(s)"),
					new RibbonButton("eMail List", true) { BeginGroup = true },
					new RibbonButton("Export as XLS", true),
					new RibbonButton("Export as PDF", true)),
				new RibbonGroup("Actions", new RibbonButton("Refresh")),
				new RibbonGroup("Filters", new RibbonButton("Show Total New Documents", true))
				);

			var dataRecords = new RibbonPage("Data Records");
			
			var accounts = new RibbonPage("Accounts");
			var inventory = new RibbonPage("Inventory");
			var tools = new RibbonPage("Tools");
			var config = new RibbonPage("Configuration");
			var callCentre = new RibbonPage("Call Centre");
			var quickReports = new RibbonPage("Quick Reports");
			var design = new RibbonPage("Design");

			ribbonControl.AddRibbonPages(
				status,
				dataRecords,
				accounts,
				inventory,
				tools,
				config,
				callCentre,
				quickReports,
				design);

			this.Content.AppendChild(ribbonControl);
		}
	}
}
