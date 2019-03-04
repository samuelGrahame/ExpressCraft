using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Retyped.dom;

namespace ExpressCraft
{
    public class MenuBar : Control
    {
        public List<MenuItem> Items;

        public MenuBar(params MenuItem[] items)
        {
            this.SetBounds(0, 0, "100%", 24);
            this.Content.style.backgroundColor = "white";

            Items = new List<MenuItem>();
            if(items != null && items.Length > 0)
                Items.AddRange(items);
        }

        public override void Render()
        {
            if(!HasRendered)
            {
                HasRendered = true;
                int currentX = 0;
                foreach (var item in Items)
                {
                    var spanItme = item;
                    spanItme.Menu = this;
                    spanItme.MainItem = true;

                    var width = Math.Max((int)GetTextWidth(item.Caption, Settings.DefaultFont), 50);

                    var span = new HTMLSpanElement() { className = "control menu-item", innerText = item.Caption };
                    span.onclick = (ev) =>
                    {
                        if (spanItme.Items.Count == 0)
                            return;

                        if (spanItme.Visible)
                            spanItme.CloseMenu();
                        else
                            spanItme.ShowMenu();
                    };
                    span.SetBounds(currentX, 0, width, 24);
                    spanItme.Span = span;
                    this.Content.appendChild(span);

                    currentX += width;
                }
            }
            base.Render();
        }


    }

    public class MenuItem
    {
        public bool Visible { get; private set; }
        public bool BeginGroup { get; set; }
        public bool Enabled { get; set; } = true;
        public Action<MenuItem> OnItemClick = null;
        public MenuBar Menu;
        public bool MainItem = false;
        public HTMLSpanElement Span;
        private ContextMenu contextMenu;

        public MenuItem(string caption, params MenuItem[] items) : this(items)
        {
            Caption = caption;
        }

        public MenuItem(string caption, bool beginGroup, params MenuItem[] items) : this(caption, items)
        {
            BeginGroup = beginGroup;
        }

        public MenuItem(string caption, bool beginGroup, Action<MenuItem> onItemClick, params MenuItem[] items) : this(caption, beginGroup, items)
        {
            OnItemClick = onItemClick;
        }

        public MenuItem(params MenuItem[] items)
        {
            Items = new List<MenuItem>();
            if (items != null && items.Length > 0)
                Items.AddRange(items);
        }

        public ContextMenu GetContextMenu()
        {
            var ctx = new ContextMenu();
            foreach (var item in Items)
            {
                var psn = item;
                ctx.ContextItems.Add(new ContextItem()
                {
                    BeginGroup = item.BeginGroup,
                    Caption = item.Caption,
                    Enabled = item.Enabled,
                    CloseHandled = true,
                    Dropdown = psn.Items.Count > 0,
                    OnItemClick = (ev) =>
                    {

                        if (psn.OnItemClick != null)
                            psn.OnItemClick(psn);

                        if (psn.Items.Count == 0)
                        {
                            ContextMenu.MainContextMenu.Close();                                
                        }
                        else
                        {
                            var rec2 = (DOMRect)ev.Span.getBoundingClientRect();
                            psn.contextMenu = psn.GetContextMenu();

                            psn.contextMenu.ShowSub(new Vector2((int)rec2.left + (int)rec2.width, (int)(rec2.top)), ctx);
                        }
                    }
                });
            }
            return ctx;
        }

        public void ShowMenu()
        {
            if (Visible)
                return;


            contextMenu = GetContextMenu();
           
            var x = (DOMRect)Span.getBoundingClientRect();

            contextMenu.Show(new Vector2((int)x.left + 5, (int)(x.top + x.height) + 5));
            
            Visible = true;

            contextMenu.OnClose = () =>
            {
                CloseMenu();
            };

        }

        public void CloseMenu()
        {

            if (!Visible)
                return;
            if(contextMenu != null)
            {
                contextMenu.Close();
                contextMenu = null;
            }            

            Visible = false;
        }

        public string Caption;
        public List<MenuItem> Items;

    }
}
