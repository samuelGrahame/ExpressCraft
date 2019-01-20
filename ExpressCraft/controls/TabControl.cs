using static Retyped.dom;
using System;
using System.Collections.Generic;
using Bridge;

namespace ExpressCraft
{
    public class TabControl : Control
    {
        public List<TabControlPage> TabPages { get; set; } = new List<TabControlPage>();
        private Control tabHeaders;
        private Control tabHeaderContainer;

        public TabControl() : base("tabcontrol")
        {            
            Content.oncontextmenu = (ev) =>
            {
                ev.stopPropagation();
                ev.preventDefault();
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
                page.TabPageHeader.classList.remove("tabcontrolpageheader-hidden");
                page.TabPageHeader.classList.remove("tabcontrolpageheader-active");

                page.TabPageHeader.classList.add("tabcontrolpageheader-" + state);
            }
            else
            {
                page.TabPageHeader = Div("tabcontrolpageheader tabcontrolpageheader-" + state);
            }
            if(Helper.NotDesktop)
            {
                if(Isselected)
                {
                    page.TabPageHeader.style.lineHeight = "44px";
                }
                else
                {
                    page.TabPageHeader.style.lineHeight = "46px";
                }
                page.TabPageHeader.style.height = "45px";
            }

            page.TabPageHeader.setAttribute("i", i.ToString());
            if(showClosedButton)
            {
                if(page.TabPageHeaderClose == null)
                {
                    page.TabPageHeaderClose = Div("tabcontrolpageheader-closebutton");
                    page.TabPageHeaderClose.onclick = (ev) =>
                    {
                        var index = Script.ParseInt(ev.currentTarget.As<HTMLElement>().parentElement.getAttribute("i"));
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

                        ev.stopPropagation();

                        SelectedIndex = index;

                        ResizeTabHeaders();
                    };
                    page.TabPageHeader.appendChild(page.TabPageHeaderClose);
                }
            }
            else
            {
                if(page.TabPageHeaderClose != null)
                {
                    page.TabPageHeader.removeChild(page.TabPageHeaderClose);
                }
            }

            page.Content.style.visibility = Isselected ? "inherit" : "collapse";
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
                    tabHeaderContainer.Style.backgroundColor = "transparent";
                    tabHeaderContainer.Style.overflowX = "auto";

                    tabHeaders.Style.minWidth = "100%";

                    Content.appendChild((Node)tabHeaderContainer);
                }
                else
                {
                    tabHeaders.Height = 23;
                    Content.appendChild((Node)tabHeaders);
                    tabHeaders.Width = "100%";
                }
            }
            if(TabPages != null && TabPages.Count > 0)
            {
                int width = 2;

                for(int i = 0; i < TabPages.Count; i++)
                {
                    var page = TabPages[i];
                    if(page == null || page.Hidden)
                        continue;
                    page.Render();

                    

                    if(page.TabPageHeader == null)
                    {
                        TabControlActiveStyleChange(i, ref page);
                        page.TabPageHeader.onmousedown = (ev) =>
                        {
                            SelectedIndex = Script.ParseInt(ev.currentTarget.As<HTMLDivElement>().getAttribute("i"));
                        };
                        page.TabPageHeader.ontouchstart = (ev) =>
                        {
                            SelectedIndex = Script.ParseInt(ev.currentTarget.As<HTMLDivElement>().getAttribute("i"));
                        };
                        tabHeaders.Content.appendChild(page.TabPageHeader);
                        Content.appendChild(page.Content);
                    }
                    page.TabPageHeader.setAttribute("i", i.ToString());

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
                    for(uint k = 0; k < page.TabPageHeader.children.length; k++)
                    {
                        var item = page.TabPageHeader.children[k];
                        if(item is HTMLSpanElement)
                        {
                            (span = item.As<HTMLSpanElement>()).innerHTML = page.Caption;
                            break;
                        }
                    }                    
                    if(span == null)
                    {
                        span = new HTMLSpanElement() { innerHTML = page.Caption };

                        page.TabPageHeader.AppendChild(span);
                    }
                    if(Helper.NotDesktop)
                    {
                        span.style.fontSize = "14px";
                    }

                    page.TabPageHeader.style.left = width.ToPx();
                    page.TabPageHeader.style.width = inwidth.ToPx();

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