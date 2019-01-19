using static Retyped.dom;

namespace ExpressCraft
{
    public class GridLookupEdit : ExControl
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
                        innerHTML = (gridView.GetRowCellValue(rowHandle, DisplayName) as string),
                        value = (gridView.GetRowCellValue(rowHandle, FieldName) as string)
                    });
                }
                if(Visible)
                {
                    ClosePopup();
                }
            };

            gridView.Content.onmouseleave = (ev) =>
            {
                ClosePopup();
            };
            this.Content.onmousedown = (ev) =>
            {
                ev.preventDefault();
                ev.stopImmediatePropagation();
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
            var x = (DOMRect)this.Content.getBoundingClientRect();
            gridView.Location = new Vector2((int)x.left, (int)(x.top + x.height));

            ContextMenu.TotalContextHandles++;
            this.Content.parentElement.AppendChild(gridView);

            gridView.RenderGrid();

            gridView.Content.style.zIndex = (ContextMenu.TotalContextHandles + Settings.ContextMenuStartingZIndex).ToString();
            Visible = true;
        }

        public void ClosePopup()
        {
            if(Visible)
            {
                gridView.Content.parentElement.removeChild((Node)gridView);
                ContextMenu.TotalContextHandles--;
                Visible = false;
            }
        }
    }
}