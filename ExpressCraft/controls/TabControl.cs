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
			}
			page.TabPageHeader.SetAttribute("i", i.ToString());
			if(showClosedButton)
			{
				if(page.TabPageHeaderClose == null)
				{
					page.TabPageHeaderClose = Div("tabcontrolpageheader-closebutton");
					page.TabPageHeaderClose.OnClick = (ev) =>
					{
						var index = Global.ParseInt(ev.CurrentTarget.ParentElement.GetAttribute("i"));
						var cpage = TabPages[index];						
						if(cpage.Content != null)
						{
							cpage.Content.Empty();
							cpage.Content.Delete();
						}
						if(cpage.TabPageHeader != null)
						{
							cpage.TabPageHeader.Empty();
							cpage.TabPageHeader.Delete();
						}
						TabPages.Remove(cpage);
						if(index > TabPages.Count - 1)
							index = TabPages.Count - 1;

						ev.StopPropagation();

						SelectedIndex = index;

						ResizeTabHeaders();						
					};
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
								SelectedIndex = Global.ParseInt(ev.CurrentTarget.As<HTMLDivElement>().GetAttribute("i"));
								ev.StopPropagation();
							};
						}else
						{
							page.TabPageHeader.OnMouseDown = (ev) =>
							{
								SelectedIndex = Global.ParseInt(ev.CurrentTarget.As<HTMLDivElement>().GetAttribute("i"));
								ev.StopPropagation();
							};
						}

						Content.AppendChildren(page.Content, page.TabPageHeader);
					}
					page.TabPageHeader.SetAttribute("i", i.ToString());

					int inwidth = 24;

					if(!string.IsNullOrEmpty(page.Caption))
					{
						inwidth += (int)GetTextWidth(page.Caption, Settings.DefaultFont);
					}
					
					if(showClosedButton)
					{
						inwidth += 19;													
					}
					HTMLSpanElement span = null;
					foreach(var item in page.TabPageHeader.Children)
					{
						if(item is HTMLSpanElement)
						{
							(span = item.As<HTMLSpanElement>()).InnerHTML = page.Caption;
							break;
						}
					}
					if(span == null)
					{
						page.TabPageHeader.AppendChild(new HTMLSpanElement() { InnerHTML = page.Caption });
					}

					page.TabPageHeader.Style.Left = width.ToPx();
					page.TabPageHeader.Style.Width = inwidth.ToPx();

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
