using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge;
using Bridge.Html5;

namespace ExpressCraft
{
	public class TabControl : Control
	{
		public List<TabControlPage> TabPages { get; set; } = new List<TabControlPage>();

		public TabControl() : base("tabcontrol")
		{
            Content.OnContextMenu = (ev) => {
                ev.StopPropagation();
                ev.PreventDefault();
            };
        }

		public void AddPages(params TabControlPage[] Pages)
		{
			TabPages.AddRange(Pages);
			if(this.HasRendered)
				ResizeTabHeaders();
		}

		private bool showClosedButton;
		public bool ShowClosedButton
		{
			get
			{
				return showClosedButton;
			}
			set
			{
				if(value != showClosedButton)
				{
					showClosedButton = value;
					ResizeTabHeaders();
				}
			}
		}

		private int selectedindex = 0;
		public int SelectedIndex
		{
			get
			{
				return selectedindex;
			}
			set
			{
				if(value < 0)
					value = 0;
				selectedindex = value;
				if(TabPages != null && TabPages.Count > 0)
				{
					for(int i = 0; i < TabPages.Count; i++)
					{					
						var page = TabPages[i];						
						TabControlActiveStyleChange(i, ref page);
						TabPages[i] = page;
					}
				}
			}
		}		

		private void TabControlActiveStyleChange(int i, ref TabControlPage page)
		{
			bool Isselected = i == selectedindex;

			string state = Isselected ? "active" : "hidden";
			if(page.TabPageHeader != null)
			{
				page.TabPageHeader.ClassList.Remove("tabcontrolpageheader-hidden");
				page.TabPageHeader.ClassList.Remove("tabcontrolpageheader-active");

				page.TabPageHeader.ClassList.Add("tabcontrolpageheader-" + state);
			}else
			{
				page.TabPageHeader = Div("tabcontrolpageheader tabcontrolpageheader-" + state);
				page.TabPageHeader.SetAttribute("i", i.ToString());
			}
			if(showClosedButton)
			{
				if(page.TabPageHeaderClose == null)
				{
					page.TabPageHeaderClose = Div("tabcontrolpageheader-closebutton");
					page.TabPageHeader.AppendChild(page.TabPageHeaderClose);					
				}
			}else
			{
				if(page.TabPageHeaderClose != null)
				{
					page.TabPageHeader.RemoveChild(page.TabPageHeaderClose);
				}
			}
			
			page.Content.Style.Visibility = Isselected ? Visibility.Inherit : Visibility.Collapse;			
		}

		public void ResizeTabHeaders()
		{
			if(TabPages != null && TabPages.Count > 0)
			{
				int width = 2;

				for(int i = 0; i < TabPages.Count; i++)
				{
					var page = TabPages[i];

					page.Render();					

					if(page.TabPageHeader == null)
					{						
						TabControlActiveStyleChange(i, ref page);
						
						if(Browser.IsAndroid || Browser.iOS)
						{
							page.TabPageHeader.OnTouchStart = (ev) =>
							{
								SelectedIndex = Global.ParseInt(ev.Target.As<HTMLDivElement>().GetAttribute("i"));
							};
						}else
						{
							page.TabPageHeader.OnMouseDown = (ev) =>
							{
								SelectedIndex = Global.ParseInt(ev.Target.As<HTMLDivElement>().GetAttribute("i"));
							};
						}
												
						Content.AppendChild(page.Content);
						Content.AppendChild(page.TabPageHeader);
					}

					
					int inwidth = 24;

					if(!string.IsNullOrEmpty(page.Caption))
					{
						inwidth += (int)GetTextWidth(page.Caption, Settings.DefaultFont);
					}
					
					if(showClosedButton)
					{
						inwidth += 19;
						page.TabPageHeader.InnerHTML = "<span>" + page.Caption + "</span>";
					}
					else
					{
						page.TabPageHeader.InnerHTML = page.Caption;
					}

					page.TabPageHeader.Style.Left = width + "px";
					page.TabPageHeader.Style.Width = inwidth + "px";

					width += inwidth + 2;

					TabPages[i] = page;
				}
			}
		}

		public override void Render()
		{
			HasRendered = true;		
			ResizeTabHeaders();
		}		
	}
}
