using Bridge;
using static Retyped.dom;
using System;
using System.Collections.Generic;

namespace ExpressCraft
{
    [Namespace(true)]
    public class RibbonControl : Control, IPages
    {
        public List<RibbonPage> RibbonPages { get; set; } = new List<RibbonPage>();
        public string IconURL = "fav.ico";
        public readonly RibbonType Type;
        public HTMLDivElement ApplicationIcon = null;
        public Action<int, RibbonPage> OnSelectedPageChange = null;

        public enum RibbonType
        {
            Full,
            Compact
        }

        public RibbonControl(RibbonType type = RibbonType.Full) : base("ribboncontrol" + (type == RibbonType.Full ? "" : " ribboncontrol-compact"))
        {
            Type = type;

            Content.oncontextmenu = (ev) =>
            {
                ev.stopPropagation();
                ev.preventDefault();
            };
        }

        public void AddRibbonPages(params RibbonPage[] pages)
        {
            if(pages != null)
            {
                foreach(var item in pages)
                {
                    if(item != null)
                    {
                        RibbonPages.Add(item);
                    }
                }
            }
        }

        private int selectedindex = -1;

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
                if(selectedindex >= RibbonPages.Count)
                    selectedindex = RibbonPages.Count - 1;

                if(selectedindex != value)
                {
                    selectedindex = value;
                    if(OnSelectedPageChange != null)
                        OnSelectedPageChange(selectedindex, RibbonPages[selectedindex]);
                }
                SetSelectedIndex(value);
            }
        }

        public void MenuClick()
        {
            if(Helper.NotDesktop)
            {
            }
        }

        public void SetSelectedIndex(int index)
        {
            if(RibbonPages != null && RibbonPages.Count > 0)
            {
                for(int i = 0; i < RibbonPages.Count; i++)
                {
                    if(RibbonPages[i].RibbonHeader != null)
                    {
                        RibbonPages[i].RibbonHeader.classList.remove("ribbonpageheader-hidden");
                        RibbonPages[i].RibbonHeader.classList.remove("ribbonpageheader-active");

                        if(i == index)
                        {
                            RibbonPages[i].RibbonHeader.classList.add("ribbonpageheader-active");
                            RibbonPages[i].Content.style.visibility = "inherit";
                        }
                        else
                        {
                            RibbonPages[i].RibbonHeader.classList.add("ribbonpageheader-hidden");
                            RibbonPages[i].Content.style.visibility = "hidden";
                        }
                    }
                }
            }
        }

        public override void Render()
        {
            HasRendered = true;
            if(Type == RibbonType.Full)
            {
                if(ApplicationIcon != null)
                    ApplicationIcon.Delete();
                ApplicationIcon = Div("application-icon");
                var appIconImage = Div("fav-icon");
                appIconImage.style.background = RibbonButton.GetImageStringURI(IconURL);
                appIconImage.style.backgroundSize = "100% 100%";

                ApplicationIcon.AppendChild(appIconImage);

                Content.AppendChild(ApplicationIcon);
            }

            if(RibbonPages != null && RibbonPages.Count > 0)
            {
                int width = 58;
                for(int i = 0; i < RibbonPages.Count; i++)
                {
                    if(Content.contains(RibbonPages[i]))
                    {
                        RibbonPages[i].Content.Delete();
                        RibbonPages[i].RibbonHeader.Delete();
                    }
                    RibbonPages[i].Render();

                    if(Type == RibbonType.Compact)
                    {
                        if(!RibbonPages[i].Content.className.Contains("ribbonpage-compact"))
                            RibbonPages[i].Content.classList.add("ribbonpage-compact");
                    }
                    else
                    {
                        if(RibbonPages[i].Content.className.Contains("ribbonpage-compact"))
                            RibbonPages[i].Content.classList.remove("ribbonpage-compact");
                    }

                    int index = i;

                    if(i == selectedindex)
                    {
                        RibbonPages[i].RibbonHeader = Div("ribbonpageheader ribbonpageheader-active" + (Type == RibbonType.Full ? "" : " ribbonpageheader-compact"));
                        RibbonPages[i].Content.style.visibility = "visible";
                    }
                    else
                    {
                        RibbonPages[i].RibbonHeader = Div("ribbonpageheader ribbonpageheader-hidden" + (Type == RibbonType.Full ? "" : " ribbonpageheader-compact"));
                        RibbonPages[i].Content.style.visibility = "hidden";
                    }

                    RibbonPages[i].RibbonHeader.onmousedown = (ev) =>
                    {
                        SelectedIndex = index;
                    };
                    RibbonPages[i].RibbonHeader.ontouchstart = (ev) =>
                    {
                        SelectedIndex = index;
                    };

                    RibbonPages[i].RibbonHeader.innerHTML = RibbonPages[i].Caption;

                    int inwidth = 24;

                    if(!string.IsNullOrEmpty(RibbonPages[i].Caption))
                    {
                        inwidth += (int)GetTextWidth(RibbonPages[i].Caption, Settings.DefaultFont);
                    }

                    RibbonPages[i].RibbonHeader.style.left = width + "px";
                    RibbonPages[i].RibbonHeader.style.width = inwidth + "px";

                    Content.AppendChild(RibbonPages[i].RibbonHeader);
                    Content.AppendChild(RibbonPages[i]);

                    width += inwidth;
                }
            }
            SelectedIndex = selectedindex;
        }
    }
}