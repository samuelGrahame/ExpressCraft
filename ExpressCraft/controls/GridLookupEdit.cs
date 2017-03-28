using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

namespace ExpressCraft
{
	public class GridLookupEdit : Control
	{
		public GridView gridView;
		public string FieldName;
		public string DisplayName;
		private bool Visible;		
				
		public GridLookupEdit() : base("inputcontrol", ComboBoxTypes.Default)
		{
			gridView = new GridView(true, true) { Size = new Vector2(250, 400) };
			gridView.ContextMenu = null;
			gridView.OnFocusedRowChanged = (rowHandle, PrevRowhandle) =>
			{
				this.Content.Empty();

				if(rowHandle > -1)				
				{							
					this.Content.AppendChild(new HTMLOptionElement()
					{
						InnerHTML = (gridView.GetRowCellValue(rowHandle, DisplayName) as string),
						Value = (gridView.GetRowCellValue(rowHandle, FieldName) as string)
					});					
				}
				if(Visible)
				{
					ClosePopup();
				}
			};

			gridView.Content.OnMouseLeave = (ev) =>
			{
				ClosePopup();
			};
			this.Content.OnMouseDown = (ev) =>
			{
				ev.PreventDefault();
				ev.StopImmediatePropagation();
				if(Visible)
					ClosePopup();
				else
					ShowPopup();
			};
		}		

		public void ShowPopup()
		{
			if(Visible)
				return;
			var x = this.Content.GetBoundingClientRect();
			gridView.Location = new Vector2((int)x.Left, (int)(x.Top + x.Height));
			
			ContextMenu.TotalContextHandles++;
			this.Content.ParentElement.AppendChild(gridView);

			gridView.RenderGrid();

			gridView.Content.Style.ZIndex = (ContextMenu.TotalContextHandles + Settings.ContextMenuStartingZIndex).ToString();
			Visible = true;
		}

		public void ClosePopup()
		{
			if(Visible)
			{
				gridView.Content.ParentElement.RemoveChild(gridView);
				ContextMenu.TotalContextHandles--;
				Visible = false;
			}
		}
	}
}
