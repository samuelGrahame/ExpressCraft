using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

namespace ExpressCraft
{
	public class ContextMenu : Control
	{
		/// <summary>
		/// For internal use only - so if we click on document - we can close all context menus ---
		/// </summary>
		protected ContextMenu SubContextOpened = null;
		public List<ContextItem> ContextItems = new List<ContextItem>();
		protected bool Visible = false;
		protected static int TotalContextHandles = 0;

		public static ContextMenu MainContextMenu = null;

		public ContextMenu() : base("contextmenu")
		{
			this.Content.OnMouseLeave = (ev) =>
			{
				this.Close();
			};
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
				
				item.OnClick = (ev) =>
				{
					if(contextItem.Enabled)
                    {
                        if(contextItem.OnItemClick != null)
                        {
                            contextItem.OnItemClick(contextItem);
                        }
                        this.Close();
                    }
						
				};

				Content.AppendChild(item);

				top += 24;

				if(ContextItems[i].BeginGroup && i != ContextItems.Count)
				{
					top += 1;					
					var sep = Div("contextitemseperator");

					sep.Style.Top = top.ToPx();
					sep.Style.Width = calwidth.ToPx();

					Content.AppendChild(sep);

					top += 2;
				}
			}

			top++;

			this.Content.SetSize(width, top);
		}

		public void Show(Point Location)
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
				Content.SetLocation(Location.X - 5, Location.Y - 5);
				RenderContextMenu();

				TotalContextHandles++;
				Content.Style.ZIndex = (TotalContextHandles + Settings.ContextMenuStartingZIndex).ToString();				
				Document.Body.AppendChild(this);
				Visible = true;
			}
		}

		public void Close()
		{
			if(Visible)
			{
				TotalContextHandles--;
				Document.Body.RemoveChild(this);				
				Visible = false;
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
		public string Caption = "";
		public Action<ContextItem> OnItemClick = null;
		public bool BeginGroup = false;
		public bool Enabled = true;

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
