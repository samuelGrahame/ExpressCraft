using Bridge;
using static Retyped.dom;
using System;
using System.Collections.Generic;
using System.Text;

namespace ExpressCraft
{
    [Namespace(true)]
    public class RibbonGroup : Control
    {
        public string Caption { get; set; }
        public List<RibbonButton> Buttons { get; set; }
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
            if(Buttons.Count > 0)
            {
                for(int i = 0; i < Buttons.Count; i++)
                {
                    if(!value)
                        Buttons[i].setEnabled(value);
                    else
                    {
                        Buttons[i].setEnabled(Buttons[i].Enabled);
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
            Buttons = new List<RibbonButton>();
        }

        public RibbonGroup(string _caption, params RibbonButton[] buttons) : base("ribbongroup")
        {
            Caption = _caption;
            Buttons = new List<RibbonButton>();
            if(buttons != null)
            {
                foreach(var item in buttons)
                {
                    if(item != null)
                    {
                        Buttons.Add(item);
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

            public RibbonButton FirstButton;
            public RibbonButton SecondButton;
            public RibbonButton ThirdButton;

            public bool BeginGroup = false;
        }

        public List<RenderInfo> riList = null;

        public void GenerateRList()
        {
            RenderInfo ri = null;

            if(riList == null)
            {
                riList = new List<RenderInfo>();
                for(int i = 0; i < Buttons.Count; i++)
                {
                    if(ri == null)
                    {
                        ri = new RenderInfo();
                        ri.FirstButton = Buttons[i];
                        ri.IsSmall = ri.FirstButton.IsSmallCaption;
                    }
                    else
                    {
                        if(ri.IsSmall != Buttons[i].IsSmallCaption || Buttons[i].BeginGroup || !Buttons[i].IsSmallCaption || (ri.FirstButton != null && ri.SecondButton != null && ri.ThirdButton != null))
                        {
                            riList.Add(ri);

                            ri = new RenderInfo();
                            ri.FirstButton = Buttons[i];
                            ri.IsSmall = Buttons[i].IsSmallCaption;
                            ri.BeginGroup = Buttons[i].BeginGroup;
                        }
                        else
                        {
                            if(ri.SecondButton == null)
                            {
                                ri.SecondButton = Buttons[i];
                            }
                            else
                            {
                                ri.ThirdButton = Buttons[i];
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

                    if(ri.ThirdButton == null)
                    {
                        if(ri.SecondButton == null)
                        {
                            MaxWidth = Math.Max((int)GetTextWidth(ri.FirstButton.Caption, Settings.DefaultFont) + 28 + 6, 64);

                            ri.FirstButton.Render();

                            ri.FirstButton.Content.style.left = width + "px";
                            ri.FirstButton.Content.style.width = MaxWidth + "px";

                            ri.FirstButton.Content.style.top = "26px";

                            Content.AppendChild(ri.FirstButton);
                            // 1
                        }
                        else
                        {
                            MaxWidth = Math.Max(Math.Max((int)GetTextWidth(ri.FirstButton.Caption, Settings.DefaultFont),
                                (int)GetTextWidth(ri.SecondButton.Caption, Settings.DefaultFont)) + 28 + 6, 64);

                            ri.FirstButton.Render();
                            ri.SecondButton.Render();

                            ri.FirstButton.Content.style.left = width + "px";
                            ri.SecondButton.Content.style.left = width + "px";

                            ri.FirstButton.Content.style.top = (((100 - 3) / 3) - 11) + "px";

                            ri.FirstButton.Content.style.width = MaxWidth + "px";
                            ri.SecondButton.Content.style.width = MaxWidth + "px";

                            ri.FirstButton.Content.style.top = "11px";
                            ri.SecondButton.Content.style.top = "41px";

                            Content.AppendChild(ri.FirstButton);
                            Content.AppendChild(ri.SecondButton);
                            // 2
                        }
                    }
                    else
                    {
                        MaxWidth = Math.Max(
                            Math.Max(Math.Max((int)GetTextWidth(ri.FirstButton.Caption, Settings.DefaultFont),
                                (int)GetTextWidth(ri.SecondButton.Caption, Settings.DefaultFont)),
                                (int)GetTextWidth(ri.ThirdButton.Caption, Settings.DefaultFont)) + 28 + 6, 64);

                        ri.FirstButton.Render();
                        ri.SecondButton.Render();
                        ri.ThirdButton.Render();

                        ri.FirstButton.Content.style.left = width + "px";
                        ri.SecondButton.Content.style.left = width + "px";
                        ri.ThirdButton.Content.style.left = width + "px";

                        ri.FirstButton.Content.style.width = MaxWidth + "px";
                        ri.SecondButton.Content.style.width = MaxWidth + "px";
                        ri.ThirdButton.Content.style.width = MaxWidth + "px";

                        ri.FirstButton.Content.style.top = "3px";
                        ri.SecondButton.Content.style.top = "26px";
                        ri.ThirdButton.Content.style.top = "49px";
                        // 3

                        Content.AppendChild(ri.FirstButton);
                        Content.AppendChild(ri.SecondButton);
                        Content.AppendChild(ri.ThirdButton);
                    }

                    width += MaxWidth;
                }
                else
                {
                    ri.FirstButton.Render();

                    ri.FirstButton.Content.style.left = width + "px";
                    int inwidth = 0;
                    if(ri.FirstButton.Caption.Contains(" "))
                    {
                        var strings = ri.FirstButton.Caption.Split(' ');
                        var builder = new StringBuilder();

                        int length = ri.FirstButton.Caption.Length / 2;

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
                        inwidth = (int)GetTextWidth(ri.FirstButton.Caption, Settings.DefaultFont) + 20;
                    }

                    if(inwidth < 44)
                    {
                        inwidth = 44;
                    }

                    ri.FirstButton.Content.style.width = inwidth + "px";

                    width += inwidth;

                    Content.AppendChild(ri.FirstButton);
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