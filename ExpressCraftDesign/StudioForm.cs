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
					var msg = AceCodeEditor.Ready();
					if(msg != string.Empty)
					{
						new MessageBoxForm(msg, MessageBoxLayout.Exclamation, MessageBoxButtons.Ok).ShowDialog();
					}
					else
					{
						var nfd = new NewFileDialog();
						nfd.ShowDialog(new DialogResult(DialogResultEnum.OK, () => {
							var stcp = new FormDesignerTabControlPage(nfd.Value.Text.HtmlEscape());
							this.LinkchildToForm(stcp.splitControlContainer1);
							tabControl1.AddPages(stcp);
							tabControl1.SelectedIndex = tabControl1.TabPages.Count - 1;
						}));
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


	public class ControlHolder
	{
		public Control Control;
		public List<ControlHolder> Children = new List<ControlHolder>();
		public ControlHolder Parent;

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

			Parent = parent;
		}

		public void AttachDrop(HTMLElement element, ControlHolder holder)
		{

		}
	}

	public class FormDesignerTabControlPage : TabControlPage
	{
		public string ClassName { get; set; }
		public SplitControlContainer splitControlContainer1;
		public AceCodeEditor aceCodeEditor;
		public ControlHolder formHolder;
		public HTMLElement designerContainer;

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

			this.AppendChild(splitControlContainer1);

			GenerateSourceCode();

			aceCodeEditor.ClearSelection();
		}

		public override void Render()
		{
			base.Render();
		}
	}
}