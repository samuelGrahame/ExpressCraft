using Bridge.Html5;
using System;

namespace ExpressCraft
{
    public class SearchInput : TextInputDropDown
    {
        public object EditValue { get; set; }
        public string DisplayMember { get; set; }
        public string ValueMember { get; set; }

        public void SetValues(object editValue, string text)
        {
            this.Text = text;
            EditValue = editValue;
        }

        public SearchInput() : base(InputType.Text)
        {
            UsedEdit.OnKeyDown = (obj, ev) =>
            {
                if(ev.KeyCode == 13 || ev.KeyCode == 40)
                {
                    OnDropDownClicked(new MouseEvent("onmousedown"));
                }
            };
            UsedEdit.Content.OnMouseDown = (ev) =>
            {
                OnDropDownClicked(new MouseEvent("onmousedown"));
            };
        }
        


        public Action<string, GridView> OnSearch;

        public virtual bool ClearOnOpen()
        {
            return false;
        }

        public virtual void OnRequestSearch(string searchValue, GridView grid)
        {
            if(OnSearch != null)
                OnSearch(searchValue, grid);
        }

        public virtual bool SearchOnLoad()
        {
            return false;
        }

        public virtual void OnAcceptResult(DataRow value)
        {
            if(value == null)
            {
                EditValue = null;
                Text = "";
            }
            else
            {
                if(ValueMember != "")
                {
                    EditValue = value.GetValue(ValueMember);
                }
                if(DisplayMember != null)
                {
                    Text = (value.GetValue(DisplayMember) + "");
                }
            }
        }

        public virtual void OnRequestNew(GridView grid)
        {
        }

        public virtual void OnClosed(DataRow value)
        {
        }

        public override void OnDropDownClicked(MouseEvent mouseEvent)
        {
            if(!Readonly && Enabled)
                (new SearchLookupForm(this)).
                ShowPopup(FormPopup.
                    GetPopupDefaultLocation(DropDownButton, true));
        }
    }
}