using ExpressCraft;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;
using Bridge;

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
					var nfd = new NewFileDialog();
					nfd.ShowDialog(new DialogResult(DialogResultEnum.OK, () => {
						var stcp = new FormDesignerTabControlPage(nfd.Value.Text.HtmlEscape());
						this.LinkchildToForm(stcp.splitControlContainer1);
						tabControl1.AddPages(stcp);
						tabControl1.SelectedIndex = tabControl1.TabPages.Count - 1;
					}));
				}
			}));

			ribbonControl1.AddRibbonPages(ribbonPage);

			splitControlContainer1 = new SplitControlContainer();
			
			splitControlContainer1.SplitterPosition = 176;
			splitControlContainer1.SetBounds(0, 128, "100%", "calc(100% - 128px)");

			tabControl1 = new TabControl();
			tabControl1.ShowClosedButton = true;
			tabControl1.SetBoundsFull();
			tabControl1.Content.Style.BorderTopStyle = Bridge.Html5.BorderStyle.Solid;
			tabControl1.Content.Style.BorderTopColor = "#C3C3C3";
			tabControl1.Content.Style.BorderTopWidth = Bridge.Html5.BorderWidth.Thin;

			splitControlContainer1.Panel2.AppendChild(tabControl1);

			gridView1 = new GridView(true, true);
			gridView1.SetBoundsFull();
			gridView1.DataSource = GetToolBoxItems();
			gridView1.ColumnHeadersVisible = false;
			gridView1.AllowRowDrag = true;

			var colName = gridView1.GetColumn(0);
			colName.AllowEdit = false;
			colName.ReadOnly = true;

			gridView1.SortColumn(colName);

			splitControlContainer1.Panel1.AppendChild(gridView1);

			this.LinkchildrenToForm(gridView1, splitControlContainer1);
			this.Body.AppendChildren(ribbonControl1, splitControlContainer1);
			
			this.SetWindowState(WindowState.Maximized);
		}

		public DataTable GetToolBoxItems()
		{
			var dt = new DataTable();
			
			dt.AddColumn("Name", DataType.String);

			dt.BeginDataUpdate();

			dt.AddRow("SimpleButton");
			dt.AddRow("Control");
			dt.AddRow("RibbonControl");
			dt.AddRow("RibbonControlPage");
			dt.AddRow("RibbonPageGroup");
			dt.AddRow("RibbonGroupButton");
			
			dt.AddRow("TabControl");
			dt.AddRow("TabControlPage");

			dt.AddRow("TextInput");

			dt.AddRow("GridView");
			dt.AddRow("SplitControlContainer");

			dt.EndDataUpdate();

			return dt;
		}
	}
	
	public class ControlHolder
	{
		public Control Control;
		public List<ControlHolder> Children = new List<ControlHolder>();
		public ControlHolder Parent;		

		public List<ControlHolder> GetListOfAllChildren()
		{
			var lch = new List<ControlHolder>();

			lch.Add(this);

			if(this.Children.Count > 0)
			{
				for(int i = 0; i < this.Children.Count; i++)
				{
					lch.AddRange(this.Children[i].GetListOfAllChildren());
				}
			}
			return lch;
		}

		public void GenerateDeclareDesigner(ref StringBuilder builder)
		{
			if(Control is Form && Parent == null)
			{
				// Base
			}else
			{
				builder.AppendLine("\t\tpublic " + Control.GetType().Name + " " + Control.Name + ";");
			}
			if(Children != null && Children.Count > 0)
			{
				for(int i = 0; i < Children.Count; i++)
				{
					Children[i].GenerateDeclareDesigner(ref builder);
				}
			}
		}

		public void AddSetValue(string name, object value, ref StringBuilder builder, bool ExternalString = false)
		{
			if(ExternalString)
			{
				builder.AppendLine("\t\t\t" + Control.Name + "." + name + " = " + (value as string) + ";");
			}
			else
			{
				if(value != null)
				{
					if(value is string)
					{
						builder.AppendLine("\t\t\t" + Control.Name + "." + name + " = \"" + value as string + "\";");
					}
					else if(value.IsNumber())
					{
						builder.AppendLine("\t\t\t" + Control.Name + "." + name + " = " + (value as string) + ";");
					}
				}
			}			
		}

		public string GetBoundDesignValue(Union<string, int, float> value)
		{
			if(!value.IsNumber())
			{
				if(value.ToString().EndsWith("px"))
				{
					return Global.ParseFloat(value.ToString()).ToString();
				}
			}
			return value.IsNumber() ? value.ToString() : "\"" + value + "\"";
		}

		public void GenerateIniDesigner(ref StringBuilder builder)
		{
			if(!(Control is Form && Parent == null))
			{
				builder.AppendLine("// " + Control.Name);
				
				builder.AppendLine("\t\t\t" + Control.Name + " = new " + Control.GetType().Name + "();");
			}				
			AddSetValue("Name", Control.Name, ref builder);
			var vec = Control.Bounds;

			if(vec.X != null && !string.IsNullOrWhiteSpace(vec.X.ToHtmlValue()) && vec.Y != null && !string.IsNullOrWhiteSpace(vec.Y.ToHtmlValue()))
			{
				if(vec.Z != null && !string.IsNullOrWhiteSpace(vec.Z.ToHtmlValue()) && vec.M != null && !string.IsNullOrWhiteSpace(vec.M.ToHtmlValue()))
				{
					// Bounds					
					AddSetValue("Bounds", "new Vector4(" + GetBoundDesignValue(Control.Left) + ", " + GetBoundDesignValue(Control.Top) + ", " + GetBoundDesignValue(Control.Width) + ", " + GetBoundDesignValue(Control.Height) + ")", ref builder, true);
				}
				else
				{
					// Only Location
					AddSetValue("Location", "new Vector2(" + GetBoundDesignValue(Control.Left) + ", " + GetBoundDesignValue(Control.Top) + ")", ref builder, true);
				}
			} else if(vec.Z != null && !string.IsNullOrWhiteSpace(vec.Z.ToHtmlValue()) && vec.M != null && !string.IsNullOrWhiteSpace(vec.M.ToHtmlValue()))
			{
				// Only Size
				AddSetValue("Size", "new Vector2(" + GetBoundDesignValue(Control.Width) + ", " + GetBoundDesignValue(Control.Height) + ")", ref builder, true);
			}
			else
			{
				if(vec.X != null && !string.IsNullOrWhiteSpace(vec.X.ToHtmlValue()))
				{
					AddSetValue("Left", GetBoundDesignValue(Control.Left), ref builder, true);
				}
				if(vec.Y != null && !string.IsNullOrWhiteSpace(vec.Y.ToHtmlValue()))
				{
					AddSetValue("Top", GetBoundDesignValue(Control.Top), ref builder, true);
				}
				if(vec.Z != null && !string.IsNullOrWhiteSpace(vec.Z.ToHtmlValue()))
				{
					AddSetValue("Width", GetBoundDesignValue(Control.Width), ref builder, true);
				}
				if(vec.M != null && !string.IsNullOrWhiteSpace(vec.M.ToHtmlValue()))
				{
					AddSetValue("Height", GetBoundDesignValue(Control.Height), ref builder, true);
				}
			}

			if(Children != null && Children.Count > 0)
			{
				for(int i = 0; i < Children.Count; i++)
				{
					Children[i].GenerateIniDesigner(ref builder);
				}
			}
		}

		public ControlHolder(Control control, ControlHolder parent)
		{
			Control = control;

			if(Control is Form)
			{
				AttachDrop(((Form)Control).Body, this);
			}
			else if(Control is TabControlPage)
			{
				var tb = (TabControl)parent.Control;
				tb.AddPages((TabControlPage)control);

				AttachDrop(((TabControlPage)Control).Content, this);
			}
			else if(Control is RibbonPage)
			{
				var tb = (RibbonControl)parent.Control;
				tb.AddRibbonPages((RibbonPage)control);

				AttachDrop(((RibbonPage)Control).Content, this);
			}
			else if(Control is RibbonGroup)
			{
				var tb = (RibbonPage)parent.Control;
				tb.AddRibbonGroups((RibbonGroup)control);

				AttachDrop(((RibbonGroup)Control).Content, this);
			}
			else if(Control is RibbonButton)
			{
				var tb = (RibbonGroup)parent.Control;
				tb.riList = null;
				tb.Buttons.Add((RibbonButton)control);				
			}
			else
			{
				if(Control is TabControl || control is RibbonControl)
				{
					AttachDrop(Control.Content, this);
				}

				if(parent.Control is Form)
				{
					((Form)parent.Control).Body.AppendChild(control);
				}
				else
				{
					parent.Control.AppendChild(control);
				}
				
			}

			Parent = parent;
		}

		public static string GetNewName(string namel, FormDesignerTabControlPage fdtcp)
		{
			var listOfAllControls = fdtcp.formHolder.GetListOfAllChildren();
			var ListOfNames = new List<string>();

			int x;
			for(x = 0; x < listOfAllControls.Count; x++)
			{
				ListOfNames.Add(listOfAllControls[x].Control.Name);
			}

			string newName = "";
			x = 1;

			while(ListOfNames.Contains((newName = namel + x++))){}

			return newName;


		}

		public void AttachDrop(HTMLElement element, ControlHolder holder)
		{
			element.OnDragOver = (ev) =>
			{
				ev.PreventDefault();
				//gridviewRowDrag
			};
			element.OnDrop = (ev) =>
			{
				ev.StopImmediatePropagation();
				int x = Script.Write<int>("ev.layerX");
				int y = Script.Write<int>("ev.layerY");
				var offlineDataRow = JSON.Parse<DataRow>(Script.Call<string>("ev.dataTransfer.getData", "gridviewRowDrag"));

				if(offlineDataRow.batchData.Length == 1)
				{
					string ControlName = (string)offlineDataRow[0];
					ControlHolder ch = null;
					var fdtcp = (FormDesignerTabControlPage)App.studio.tabControl1.TabPages[App.studio.tabControl1.SelectedIndex];
					//dt.AddRow("SimpleButton");
					//dt.AddRow("Control");
					//dt.AddRow("RibbonControl");
					//dt.AddRow("TabControl");
					//dt.AddRow("TextInput");
					//dt.AddRow("GridView");
					if(ControlName == "SimpleButton")
					{
						var simb = new SimpleButton() { Location = new Vector2(x, y), Name = GetNewName("simpleButton", fdtcp) };
						simb.Text = simb.Name;
						ch = new ControlHolder(simb, holder);						
						
						holder.Children.Add(ch);
						
						fdtcp.GenerateSourceCode();
					}else if(ControlName == "TabControl")
					{
						var tabc = new TabControl() { Location = new Vector2(x, y), Size = new Vector2(200, 200), Name = GetNewName("tabControl", fdtcp) };
						
						ch = new ControlHolder(tabc, holder);
						
						holder.Children.Add(ch);

						var tabp1 = new TabControlPage() { Name = GetNewName("tabPage", fdtcp) };
						var ch1 = new ControlHolder(tabp1, ch);
						tabp1.Caption = tabp1.Name;

						ch.Children.Add(ch1);

						var tabp2 = new TabControlPage() { Name = GetNewName("tabPage", fdtcp) };
						var ch2 = new ControlHolder(tabp2, ch);
						tabp2.Caption = tabp2.Name;

						ch.Children.Add(ch2);

						tabc.ResizeTabHeaders();

						fdtcp.GenerateSourceCode();
					}
					else if(ControlName == "TabControlPage" && holder.Control is TabControl)
					{
						var tabc = new TabControlPage() { Name = GetNewName("tabPage", fdtcp) };
						tabc.Caption = tabc.Name;
						ch = new ControlHolder(tabc, holder);

						holder.Children.Add(ch);						

						fdtcp.GenerateSourceCode();
					}
					else if(ControlName == "RibbonControl" && holder.Control is Form)
					{
						var ribbc = new RibbonControl(RibbonControl.RibbonType.Compact) { Name = GetNewName("ribbonControl", fdtcp) };
						
						ch = new ControlHolder(ribbc, holder);

						holder.Children.Add(ch);

						var ribp = new RibbonPage(GetNewName("ribbonPage", fdtcp));
						ribp.Name = ribp.Caption;

						var ch2 = new ControlHolder(ribp, ch);

						ch.Children.Add(ch2);

						var ribpg = new RibbonGroup(GetNewName("ribbonGroup", fdtcp));
						ribpg.Name = ribpg.Caption;

						var ch3 = new ControlHolder(ribpg, ch2);

						ch2.Children.Add(ch3);

						ribbc.Render();

						fdtcp.GenerateSourceCode();
					}
					else if(ControlName == "RibbonControlPage" && holder.Control is RibbonControl)
					{
						var ribbc = new RibbonPage(GetNewName("ribbonPage", fdtcp));
						ribbc.Name = ribbc.Caption;

						ch = new ControlHolder(ribbc, holder);

						holder.Children.Add(ch);

						((RibbonControl)holder.Control).Render();						

						fdtcp.GenerateSourceCode();
					}
					else if(ControlName == "RibbonPageGroup" && holder.Control is RibbonPage)
					{
						var ribbc = new RibbonGroup(GetNewName("ribbonGroup", fdtcp));
						ribbc.Name = ribbc.Caption;

						ch = new ControlHolder(ribbc, holder);

						holder.Children.Add(ch);

						((RibbonControl)holder.Parent.Control).Render();

						fdtcp.GenerateSourceCode();
					}
					else if(ControlName == "RibbonGroupButton" && holder.Control is RibbonGroup)
					{
						var ribbc = new RibbonButton(GetNewName("ribbonButton", fdtcp));
						ribbc.Name = ribbc.Caption;

						ch = new ControlHolder(ribbc, holder);

						holder.Children.Add(ch);

						((RibbonControl)holder.Parent.Parent.Control).Render();

						fdtcp.GenerateSourceCode();
					}
					else if(ControlName == "GridView")
					{
						var ribbc = new GridView(false, false) { Name = GetNewName("gridView", fdtcp), Location = new Vector2(x, y), Size = new Vector2(200, 200) } ;
						
						ch = new ControlHolder(ribbc, holder);

						holder.Children.Add(ch);
						
						fdtcp.GenerateSourceCode();
					}
					else if(ControlName == "Control")
					{
						var ribbc = new Control() { Name = GetNewName("control", fdtcp), Location = new Vector2(x, y), Size = new Vector2(200, 200) };

						ch = new ControlHolder(ribbc, holder);

						holder.Children.Add(ch);
						
						fdtcp.GenerateSourceCode();
					}
					else if(ControlName == "TextInput")
					{
						var ribbc = new TextInput() { Name = GetNewName("textInput", fdtcp), Location = new Vector2(x, y) };

						ch = new ControlHolder(ribbc, holder);

						holder.Children.Add(ch);

						fdtcp.GenerateSourceCode();
					}
					else if(ControlName == "SplitControlContainer")
					{
						var ribbc = new SplitControlContainer() { Name = GetNewName("splitControlContainer", fdtcp), Location = new Vector2(x, y), Size = new Vector2(200, 200) };
						ribbc.SplitterPosition = 100;

						ch = new ControlHolder(ribbc, holder);

						holder.Children.Add(ch);

						fdtcp.GenerateSourceCode();
					}

					//dt.AddRow("RibbonControlPage");
					//dt.AddRow("RibbonPageGroup");
					//dt.AddRow("RibbonGroupButton");
				}

				//gridviewRowDrag
			};
			//int x = Script.Write<int>("ev.layerX");
			//var SelectedIndex = Script.Write<int>("parseInt(ev.dataTransfer.getData(\"gridviewColumnDrag\"));");
		}
	}
	public class FormDesignerTabControlPage : TabControlPage
	{
		public string ClassName { get; set; }
		public SplitControlContainer splitControlContainer1;
		public AceCodeEditor aceCodeEditor;
		public ControlHolder formHolder;
		public HTMLElement designerContainer;
		public SplitControlContainer splitControlContainer2;

		public void GenerateSourceCode()
		{
			var builder = new StringBuilder();
			
			builder.AppendLine("using ExpressCraft;\r\n");

			builder.AppendLine("namespace ExpressDemo");
			builder.AppendLine("{");


			builder.AppendLine("\tpublic class " + ClassName);
			builder.AppendLine("\t{");

			formHolder.GenerateDeclareDesigner(ref builder);

			builder.AppendLine();

			builder.AppendLine("\t\tpublic " + ClassName + "()");

			builder.AppendLine("\t\t{");

			formHolder.GenerateIniDesigner(ref builder);

			builder.AppendLine("\t\t}");
			
			builder.AppendLine();


			builder.AppendLine("\t}");
			
			builder.AppendLine("}");

			aceCodeEditor.Source = builder.ToString();
			//	public class 
		}

		public void AddControl(ControlHolder Parent, ControlHolder Control)
		{
			Parent.Children.Add(Control);

			GenerateSourceCode();
		}

		public void RemoveControl(ControlHolder Control)
		{
			if(Control.Parent == null)
				return;

			Control.Parent.Children.Remove(Control);

			GenerateSourceCode();
		}

		public FormDesignerTabControlPage(string className)
		{
			ClassName = className;
			Caption = ClassName + ".Form";

			splitControlContainer2 = new SplitControlContainer();
			splitControlContainer2.SetBoundsFull();

			splitControlContainer1 = new SplitControlContainer();
			splitControlContainer1.SetBoundsFull();			

			aceCodeEditor = new AceCodeEditor(AceModeTypes.csharp, AceThemeTypes.twilight);			
			splitControlContainer1.Panel1.AppendChild(aceCodeEditor = new AceCodeEditor(AceModeTypes.csharp, AceThemeTypes.twilight)
			{ Bounds = new Vector4(0, 0, "100%", "100%") });
			
			aceCodeEditor.ReadOnly = true;
			formHolder = new ControlHolder(new Form() { Name = className, Size = new Vector2(640, 480), Text = ClassName }, null);
			var frm = formHolder.Control.As<Form>();
			frm.InDesign = true;			
			
			designerContainer = Div();			
			designerContainer.SetBounds(15, 15, "calc(100% - 30px)", "calc(100% - 30px)");
			
			designerContainer.AppendChild(formHolder.Control);			

			frm.Content.Style.Visibility = Visibility.Inherit;			

			splitControlContainer1.Panel2.Content.Style.Overflow = Overflow.Auto;

			splitControlContainer1.Panel2.Content.AppendChild(designerContainer);

			splitControlContainer1.Panel2.Content.Style.BackgroundColor = Color.White;

			splitControlContainer1.SplitterPosition = 572;

			splitControlContainer2.SplitterPosition = 176;
			splitControlContainer2.FixedSplitterPostion = FixedSplitterPosition.Panel2;
			splitControlContainer2.Panel1.AppendChild(splitControlContainer1);

			App.studio.LinkchildrenToForm(splitControlContainer1, splitControlContainer2);

			this.AppendChild(splitControlContainer2);

			GenerateSourceCode();

			aceCodeEditor.ClearSelection();
		}

		public override void Render()
		{
			base.Render();
		}
	}
}