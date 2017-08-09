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
        private Control tabHeaders;
        private Control tabHeaderContainer;
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

        public Action<int> OnSelectedTabIndexChanged = null;

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
                if(selectedindex != value)
                {                    
                    selectedindex = value;
                    OnSelectedTabIndexChanged?.Invoke(value);
                }
                    
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
            if(Helper.NotDesktop)
            {
                if(Isselected)
                {
                    page.TabPageHeader.Style.LineHeight = "44px";
                }
                else
                {
                    page.TabPageHeader.Style.LineHeight = "46px";
                }
                page.TabPageHeader.Style.Height = "45px";
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
            if(tabHeaders == null)
            {
                tabHeaders = new Control("tabheader-container") { Location = new Vector2(0, 0) };
                if(Helper.NotDesktop)
                {
                    tabHeaders.Height = 47;
                    tabHeaderContainer = new Control() { Location = new Vector2(0, 0) };
                    tabHeaderContainer.Width = "100%";
                    tabHeaderContainer.Height = 50;
                    tabHeaderContainer.AppendChild(tabHeaders);
                    tabHeaderContainer.Style.BackgroundColor = "transparent";
                    tabHeaderContainer.Style.OverflowX = Overflow.Auto;

                    tabHeaders.Style.MinWidth = "100%";

                    Content.AppendChild(tabHeaderContainer);
                }
                else
                {
                    tabHeaders.Height = 23;
                    Content.AppendChild(tabHeaders);
                    tabHeaders.Width = "100%";
                }


            }
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
                        page.TabPageHeader.OnMouseDown = (ev) =>
                        {
                            SelectedIndex = Global.ParseInt(ev.CurrentTarget.As<HTMLDivElement>().GetAttribute("i"));                            
                        };
                        page.TabPageHeader.OnTouchStart = (ev) =>
                        {
                            SelectedIndex = Global.ParseInt(ev.CurrentTarget.As<HTMLDivElement>().GetAttribute("i"));                            
                        };
                        tabHeaders.Content.AppendChild(page.TabPageHeader);                        
                        Content.AppendChild(page.Content);
					}
					page.TabPageHeader.SetAttribute("i", i.ToString());

					int inwidth = 24;

					if(!string.IsNullOrEmpty(page.Caption))
					{
                        if(Helper.NotDesktop)
                        {                            
                            inwidth += (int)GetTextWidth(page.Caption, "14px Tahoma");
                        }
                        else
                        {
                            inwidth += (int)GetTextWidth(page.Caption, Settings.DefaultFont);
                        }						
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
                        span = new HTMLSpanElement() { InnerHTML = page.Caption };
                        
                        page.TabPageHeader.AppendChild(span);
					}
                    if(Helper.NotDesktop)
                    {
                        span.Style.FontSize = "14px";
                    }


                    page.TabPageHeader.Style.Left = width.ToPx();
					page.TabPageHeader.Style.Width = inwidth.ToPx();

                    //                height: calc(100% - 26px);
                    //top: 24px;

                    if(Helper.NotDesktop)
                    {
                        page.Height = "(100% - 49px)";
                        page.Top = 49;                        
                    }

                    width += inwidth + 2;

					TabPages[i] = page;
				}
                if(Helper.NotDesktop)
                {
                    tabHeaders.Width = width;
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
