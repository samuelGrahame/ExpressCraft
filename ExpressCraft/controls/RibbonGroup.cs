using Bridge;
using static Retyped.dom;
using System;
using System.Collections.Generic;
using System.Text;

namespace ExpressCraft
{
    [Namespace(true)]
    public class RibbonGroup : ExControl
    {
        public string Caption { get; set; }
        public List<RibbonItem> Items { get; set; }
        private bool enabled = true;

        private HTMLDivElement captionDiv = null;

        public bool Enabled
        {
            get
            {
                return enabled;
            }
            set
            {
                enabled = value;
                setEnabled(value);
            }
        }



        public void setEnabled(bool value)
        {
            if(Items.Count > 0)
            {
                for(int i = 0; i < Items.Count; i++)
                {
                    if(!value)
                        Items[i].setEnabled(value);
                    else
                    {
                        Items[i].setEnabled(Items[i].Enabled);
                    }
                }
            }
            ChangeState(value);
            if(value)
            {
                if(captionDiv != null)
                {
                    captionDiv.classList.remove("disabled");
                }
            }
            else
            {
                if(captionDiv != null)
                {
                    captionDiv.classList.add("disabled");
                }
            }
        }

        public RibbonGroup(string _caption = "") : base("ribbongroup")
        {
            Caption = _caption;
            Items = new List<RibbonItem>();
        }

        public RibbonGroup(string _caption, params RibbonItem[] buttons) : base("ribbongroup")
        {
            Caption = _caption;
            Items = new List<RibbonItem>();
            if(buttons != null)
            {
                foreach(var item in buttons)
                {
                    if(item != null)
                    {
                        Items.Add(item);
                    }                    
                }                
            }
                
        }

        private HTMLDivElement CreateVerticalLine(int height)
        {
            var htmlDiv = Div("ribbonseperator");
            if(height != 58)
            {
                htmlDiv.style.height = height + "px";
            }

            return htmlDiv;
        }

        public class RenderInfo
        {
            public int Left;
            public int Width;

            public bool IsSmall = false;

            public RibbonItem FirstItem;
            public RibbonItem SecondItem;
            public RibbonItem ThirdItem;

            public bool BeginGroup = false;
        }

        public List<RenderInfo> riList = null;

        public void GenerateRList()
        {
            RenderInfo ri = null;

            if(riList == null)
            {
                riList = new List<RenderInfo>();
                for(int i = 0; i < Items.Count; i++)
                {
                    if(ri == null)
                    {
                        ri = new RenderInfo();
                        ri.FirstItem = Items[i];
                        ri.IsSmall = ri.FirstItem.IsSmallItem;
                    }
                    else
                    {
                        if(ri.IsSmall != Items[i].IsSmallItem || Items[i].BeginGroup || !Items[i].IsSmallItem || (ri.FirstItem != null && ri.SecondItem != null && ri.ThirdItem != null))
                        {
                            riList.Add(ri);

                            ri = new RenderInfo();
                            ri.FirstItem = Items[i];
                            ri.IsSmall = Items[i].IsSmallItem;
                            ri.BeginGroup = Items[i].BeginGroup;
                        }
                        else
                        {
                            if(ri.SecondItem == null)
                            {
                                ri.SecondItem = Items[i];
                            }
                            else
                            {
                                ri.ThirdItem = Items[i];
                            }
                        }
                    }
                }

                if(ri != null)
                {
                    riList.Add(ri);
                    ri = null;
                }
            }
        }

        public int GetExtraWidth(RibbonItem item)
        {
            if(item is RibbonEditItem)
            {
                return item.As<RibbonEditItem>().EditWidth + 6 - 20;
            }
            return 0;
        }

        public override void Render()
        {
            HasRendered = true;

            GenerateRList();

            Content.Empty();

            int width = 0;

            for(int i = 0; i < riList.Count; i++)
            {
                var ri = riList[i];

                if(ri.BeginGroup)
                {
                    width += 3;
                    var vlbg = CreateVerticalLine(58);
                    vlbg.style.left = width + "px";

                    Content.AppendChild(vlbg);
                }

                width += 3;

                if(ri.IsSmall)
                {
                    int MaxWidth;

                    if(ri.ThirdItem == null)
                    {
                        if(ri.SecondItem == null)
                        {
                            MaxWidth = Math.Max((int)GetTextWidth(ri.FirstItem.Caption, Settings.DefaultFont) + 28 + 6 + GetExtraWidth(ri.FirstItem), 64);

                            

                            ri.FirstItem.Render();

                            ri.FirstItem.Content.style.left = width + "px";
                            ri.FirstItem.Content.style.width = MaxWidth + "px";

                            ri.FirstItem.Content.style.top = "26px";

                            Content.AppendChild(ri.FirstItem);
                            // 1
                        }
                        else
                        {
                            MaxWidth = Math.Max(Math.Max((int)GetTextWidth(ri.FirstItem.Caption, Settings.DefaultFont) + GetExtraWidth(ri.FirstItem),
                                (int)GetTextWidth(ri.SecondItem.Caption, Settings.DefaultFont) + GetExtraWidth(ri.SecondItem)) + 28 + 6, 64);

                            ri.FirstItem.Render();
                            ri.SecondItem.Render();

                            ri.FirstItem.Content.style.left = width + "px";
                            ri.SecondItem.Content.style.left = width + "px";

                            ri.FirstItem.Content.style.top = (((100 - 3) / 3) - 11) + "px";

                            ri.FirstItem.Content.style.width = MaxWidth + "px";
                            ri.SecondItem.Content.style.width = MaxWidth + "px";

                            ri.FirstItem.Content.style.top = "11px";
                            ri.SecondItem.Content.style.top = "41px";

                            Content.AppendChild(ri.FirstItem);
                            Content.AppendChild(ri.SecondItem);
                            // 2
                        }
                    }
                    else
                    {
                        MaxWidth = Math.Max(
                            Math.Max(Math.Max((int)GetTextWidth(ri.FirstItem.Caption, Settings.DefaultFont) + GetExtraWidth(ri.FirstItem),
                                (int)GetTextWidth(ri.SecondItem.Caption, Settings.DefaultFont) + GetExtraWidth(ri.SecondItem)),
                                (int)GetTextWidth(ri.ThirdItem.Caption, Settings.DefaultFont) + GetExtraWidth(ri.ThirdItem)) + 28 + 6, 64);

                        ri.FirstItem.Render();
                        ri.SecondItem.Render();
                        ri.ThirdItem.Render();

                        ri.FirstItem.Content.style.left = width + "px";
                        ri.SecondItem.Content.style.left = width + "px";
                        ri.ThirdItem.Content.style.left = width + "px";

                        ri.FirstItem.Content.style.width = MaxWidth + "px";
                        ri.SecondItem.Content.style.width = MaxWidth + "px";
                        ri.ThirdItem.Content.style.width = MaxWidth + "px";

                        ri.FirstItem.Content.style.top = "3px";
                        ri.SecondItem.Content.style.top = "26px";
                        ri.ThirdItem.Content.style.top = "49px";
                        // 3

                        Content.AppendChild(ri.FirstItem);
                        Content.AppendChild(ri.SecondItem);
                        Content.AppendChild(ri.ThirdItem);
                    }

                    width += MaxWidth;
                }
                else
                {
                    ri.FirstItem.Render();

                    ri.FirstItem.Content.style.left = width + "px";
                    int inwidth = 0;
                    if(ri.FirstItem.Caption.Contains(" "))
                    {
                        var strings = ri.FirstItem.Caption.Split(' ');
                        var builder = new StringBuilder();

                        int length = ri.FirstItem.Caption.Length / 2;

                        for(int j = 0; j < strings.Length; j++)
                        {
                            if(builder.Length > length)
                            {
                                inwidth = (int)GetTextWidth(builder.ToString(), Settings.DefaultFont) + 20;
                                break;
                            }
                            if(builder.Length > 0)
                            {
                                builder.Append(" " + strings[j]);
                            }
                            else
                            {
                                builder.Append(strings[j]);
                            }
                        }
                        if(inwidth == 0)
                        {
                            inwidth = (int)GetTextWidth(builder.ToString(), Settings.DefaultFont) + 20;
                        }
                    }
                    else
                    {
                        inwidth = (int)GetTextWidth(ri.FirstItem.Caption, Settings.DefaultFont) + 20;
                    }

                    if(inwidth < 44)
                    {
                        inwidth = 44;
                    }

                    inwidth += GetExtraWidth(ri.FirstItem);

                    ri.FirstItem.Content.style.width = inwidth + "px";

                    width += inwidth;

                    Content.AppendChild(ri.FirstItem);
                }
            }

            int minWidth = (int)GetTextWidth(Caption, Settings.DefaultFont) + 20;

            if(width < minWidth)
                width = minWidth;

            width += 3;

            var vl = CreateVerticalLine(80);
            vl.style.left = width - 1 + "px";

            Content.AppendChild(vl);

            Content.style.width = width + "px";

            if(!string.IsNullOrWhiteSpace(Caption))
            {
                captionDiv = Div("ribbongroupcaption");

                captionDiv.innerHTML = Caption;
                Content.AppendChild(captionDiv);
            }

            setEnabled(enabled);
        }
    }
}