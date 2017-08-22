using Bridge;
using Bridge.Html5;
using System.Collections.Generic;

namespace ExpressCraft
{
    public class TileControl : Control, IPages
    {
        public List<RibbonPage> RibbonPages { get; set; } = new List<RibbonPage>();
        private TileViewState _viewState = TileViewState.Hidden;
        private Union<string, Overflow> prevOverFlow = null;
        private int ClearTimeOut = -1;

        public TileViewState ViewState
        {
            get { return _viewState; }
            set
            {
                if(ClearTimeOut != -1)
                {
                    Global.ClearTimeout(ClearTimeOut);
                    ClearTimeOut = -1;
                }
                if(value != _viewState)
                {
                    _viewState = value;
                    if(_viewState == TileViewState.Hidden)
                    {
                        ClearTimeOut = Global.SetTimeout(() =>
                        {
                            Content.Style.Visibility = Visibility.Hidden;
                        }, 1000);
                        Location = new Vector2("(100% * -1)", 0);

                        if(Content.ParentElement != null && prevOverFlow != null)
                        {
                            Content.ParentElement.Style.Overflow = prevOverFlow;
                        }
                    }
                    else
                    {
                        Location = new Vector2(0, 0);
                        Content.Style.Visibility = Visibility.Inherit;
                        RenderTiles();
                        if(Content.ParentElement != null)
                        {
                            prevOverFlow = Content.ParentElement.Style.Overflow;
                            Content.ParentElement.Style.Overflow = Overflow.Hidden;
                        }
                    }
                }
            }
        }

        public void RenderTiles()
        {
            int x = 0;
            int y = 6;

            var doc = Document.CreateDocumentFragment();
            var div = new Control();
            div.Width = "100%";
            div.SetLocation(0, 0);
            div.Style.ZIndex = "10";

            var div2 = new Control("primary");
            div2.Width = "100%";
            div2.Style.MinHeight = "100%";
            div2.SetLocation(0, 0);
            div2.Style.Filter = "brightness(50%)";

            div2.Style.Opacity = "0.9";
            div2.Style.ZIndex = "9";

            foreach(var page in RibbonPages)
            {
                if(!string.IsNullOrWhiteSpace(page.Caption))
                {
                    var llb = Control.Label(page.Caption, 6, y);
                    llb.Style.FontSize = "14px";
                    llb.Style.Color = "white";
                    doc.AppendChild(llb);
                    y += 26;
                }

                foreach(var group in page.RibbonGroups)
                {
                    foreach(var button in group.Buttons)
                    {
                        button.ExchangeClass("ribbonbuttonsmall", "ribbonbutton");
                        button.Style.BorderRadius = "4px";
                        button.AfterItemClick = (ev) =>
                        {
                            ViewState = TileViewState.Hidden;
                        };
                        if(button.Enabled)
                        {
                            button.ExchangeClass("primary", "primary");
                            button.Style.Border = "0";
                            button.Style.Filter = "brightness(110%)";
                        }
                        else
                        {
                            button.ExchangeClass("primary", "");
                            button.Style.Border = "1px";
                            button.Style.Filter = "";
                        }
                        button.Style.Opacity = "1";
                        button.Style.BoxShadow = "0px 0px 10px -2px rgba(0,0,0,0.25)";
                        button.IsSmallCaption = false;
                        button.ProcessCaption();
                        button.ProcessImage();
                        button.Size = new Vector2("((100% - 24px) * 0.33)", 100);
                        button.Location = new Vector2("(((100% - 24px) * (" + (x * 0.33m) + ")) + (" + (6 * (x)) + "px) + 6px)", y);

                        if(button.captionDiv != null)
                        {
                            if(button.Enabled)
                            {
                                button.captionDiv.Style.Color = "white";
                            }
                            else
                            {
                                button.captionDiv.Style.Color = "grey";
                            }

                            button.captionDiv.Style.FontSize = "14px";
                            button.captionDiv.Style.Top = "65px";
                        }

                        if(button.imageDiv != null)
                        {
                            button.imageDiv.ExchangeClass("ribbonbuttonsmallicon", "ribbonbuttonicon");
                            button.IconURL = (button.IconURL + "").Replace("x16x16", "x32x32");
                            button.imageDiv.Style.Top = "27px";
                            if(button.Enabled)
                            {
                                //  button.imageDiv.Style.Filter = "brightness(90%) grayscale(100%) contrast(60%) brightness(180%)";
                            }
                            else
                            {
                                //  button.imageDiv.Style.Filter = "";
                            }
                        }

                        if(x == 2)
                        {
                            x = 0;
                            y += 106;
                        }
                        else
                        {
                            x++;
                        }
                        button.Style.Opacity = "1";
                        doc.AppendChild(button);
                    }
                }

                if(x != 0)
                {
                    x = 0;
                    y += 106;
                }
            }

            div.Height = y;
            div2.Height = y;

            Content.Empty();
            div.Content.AppendChild(doc);

            div2.Content.OnMouseDown = (ev) =>
            {
                ev.StopPropagation();
            };

            Content.AppendChild(div2);
            Content.AppendChild(div);

            div.Content.Click();
        }

        public override void Render()
        {
            base.Render();
            RenderTiles();
        }

        public TileControl() : base()
        {
            Style.OverflowY = Overflow.Auto;
            Location = new Vector2("(100% * -1)", 0);
            Size = new Vector2("100%", "100%");

            Content.Style.BackgroundColor = "transparent";
            Content.Style.Visibility = Visibility.Hidden;
            Content.Style.Transition = "left 1s ease";
        }

        public void AddRibbonPages(params RibbonPage[] pages)
        {
            if(pages != null)
                RibbonPages.AddRange(pages);
        }
    }

    public enum TileViewState
    {
        Hidden,
        Visible
    }
}