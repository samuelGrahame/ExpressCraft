﻿using static Retyped.dom;
using System;
using System.Collections.Generic;

namespace ExpressCraft
{
    public class ContextMenu : Control
    {        
        public ContextMenu SubContextOpened = null;

        public List<ContextItem> ContextItems = new List<ContextItem>();
        protected bool Visible = false;
        public static int TotalContextHandles = 0;

        public static ContextMenu MainContextMenu = null;
        internal static bool IgnoreBlur = false;

        public Action OnClose = null;
        
        public ContextMenu() : base("contextmenu")
        {
            this.Content.oncontextmenu = (ev) => {
                ev.preventDefault();
            };
            this.Content.tabIndex = -1;
            this.Content.onblur = (ev) =>
            {
                if (IgnoreBlur)
                {
                    this.Close();
                    return;
                }
                    

                if (!SpanExist(ev.relatedTarget.As<HTMLElement>()))
                    MainContextMenu.Close();
            };

        }

        private bool SpanExist(HTMLElement element)
        {            
            if (element == null)
                return false;

            if (element == this.Content)
                return true;
            
            if (SubContextOpened != null)
            {
                if (element == SubContextOpened.Content)
                    return true;

                foreach (var item in SubContextOpened.ContextItems)
                {
                    if (item.Span == element)
                    {
                        return true;
                    }
                }            
            }

            foreach (var item in ContextItems)
            {
                if (item.Span == element)
                {
                    return true;
                }
            }

            return false;
        }

        protected void RenderContextMenu()
        {
            // What we need to do first is get the maxed size text...
            int x = 0;
            int ii = -1;

            this.Content.Empty();

            for(int i = 0; i < ContextItems.Count; i++)
            {
                int y = ContextItems[i].Caption.Length;
                if(y > x) { x = y; ii = i; }
            }

            if(ii == -1)
                return;
            int calwidth = (int)GetTextWidth(ContextItems[ii].Caption, Settings.DefaultFont);
            if(calwidth < Settings.ContextMenuMinWidth)
                calwidth = Settings.ContextMenuMinWidth;
            int width = (calwidth + 34 + 8 + 2);

            int top = 1;

            for(int i = 0; i < ContextItems.Count; i++)
            {
                var contextItem = ContextItems[i];
                int y = contextItem.Caption.Length;
                var item = Label(contextItem.Caption, 1, top, width - 2, false, false, "contextitem");
                item.tabIndex = -1;
                contextItem.Span = item;
                item.onblur = (ev) =>
                {                    
                    if (!SpanExist(ev.relatedTarget.As<HTMLElement>()))
                        MainContextMenu.Close();
                };

                if (contextItem.Dropdown)
                {
                    var div = new HTMLDivElement();

                    div.className = "control";                    
                    div.SetLocation("(100% - 20px)", 2);
                    div.SetSize(20, 20);
                    div.innerHTML = "&gt;";
                    div.style.textShadow = "rgba(64, 64, 64, 0.25) 0 1px 1px";
                    //text-shadow:#000 0 1px 1px,#000 0 -1px 1px
                    div.style.fontWeight = "bold";
                    div.style.textIndent = "0";
                    //                    font-weight: bold;
                    //text-indent: 0;

                    item.appendChild(div);

  //                       border: solid black;
  //border-width: 0 3px 3px 0;
  //display: inline-block;
  //padding: 3px;
                }

                item.onclick = (ev) =>
                {
                    

                    if (contextItem.Enabled)
                    {
                        if(contextItem.OnItemClick != null)
                        {
                            contextItem.OnItemClick(contextItem);
                        }
                        if(!contextItem.CloseHandled)
                        {
                            this.Close();
                        }                        
                    }
                };

                item.onmouseenter = (ev) =>
                {                    
                    if (contextItem.OnMouseEnter != null)
                    {
                        contextItem.OnMouseEnter(contextItem);
                    }                    
                };

                Content.AppendChild(item);

                top += 24;

                if(ContextItems[i].BeginGroup && i != ContextItems.Count)
                {
                    top += 1;
                    var sep = Div("contextitemseperator");

                    sep.style.top = top.ToPx();
                    sep.style.width = calwidth.ToPx();

                    Content.AppendChild(sep);

                    top += 2;
                }
            }

            top++;

            this.Content.SetSize(width, top);
        }

        public void Show(Vector2 Location)
        {
            if(MainContextMenu != null)
            {
                MainContextMenu.Close();
                MainContextMenu = null;
            }
            MainContextMenu = this;

            if(Visible)
            {
                this.Close();
            }
            if(!Visible)
            {
                if (ContextItems.Count == 0)
                    return;
                Content.SetLocation(Location.Xi - 5, Location.Yi - 5);
                RenderContextMenu();

                TotalContextHandles++;
                Content.style.zIndex = (TotalContextHandles + Settings.ContextMenuStartingZIndex).ToString();
                document.body.AppendChild(this);
                Visible = true;

                this.Focus();
            }
        }

        public void ShowSub(Vector2 Location, ContextMenu parent, bool dontcloseSub = false)
        {
            if (Visible)
            {
                this.Close();
            }
            if (!Visible)
            {
                if(parent.SubContextOpened != null && !dontcloseSub)
                {
                    parent.SubContextOpened.Close();
                }

                if (ContextItems.Count == 0)
                    return;

                parent.SubContextOpened = this;
                Content.SetLocation(Location.Xi - 1, Location.Yi);
                RenderContextMenu();

                TotalContextHandles++;
                Content.style.zIndex = (TotalContextHandles + Settings.ContextMenuStartingZIndex).ToString();
                document.body.AppendChild(this);
                Visible = true;
                this.Focus();
            }
        }

        public void Close()
        {
            if(Visible)
            {
                Visible = false;
                TotalContextHandles--;
                document.body.removeChild((Node)this);                
                if (OnClose != null)
                    OnClose();
            }

            if(SubContextOpened != null)
            {
                SubContextOpened.Close();
                SubContextOpened = null;
            }
        }
    }

    public class ContextItem
    {
        public bool CloseHandled = false;
        public string Caption = "";
        public Action<ContextItem> OnItemClick = null;
        public Action<ContextItem> OnMouseEnter = null;
        public bool BeginGroup = false;
        public bool Enabled = true;
        public HTMLSpanElement Span;
        public bool Dropdown = false;

        public ContextItem()
        {
        }

        public ContextItem(string caption, bool beginGroup = false)
        {
            Caption = caption;
            BeginGroup = beginGroup;
        }

        public ContextItem(string caption, Action<ContextItem> _OnItemClick, bool beginGroup = false)
        {
            Caption = caption;
            BeginGroup = beginGroup;
            OnItemClick = _OnItemClick;
        }
    }
}