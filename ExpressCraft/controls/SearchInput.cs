using static Retyped.dom;
using System;

namespace ExpressCraft
{
    public class SearchInput : TextInputDropDown
    {
        public object EditValue;
        public string DisplayMember;
        public string ValueMember;

        public bool FocusedChangeCloseForm;

        public void SetValues(object editValue, string text)
        {
            this.Text = text;
            EditValue = editValue;
        }

        public SearchInput() : base("text")
        {
            UsedEdit.OnKeyDown = (obj, ev) =>
            {
                if(ev.keyCode == 13 || ev.keyCode == 40)
                {
                    OnDropDownClicked(new MouseEvent("onmousedown"));
                }
            };
            UsedEdit.Content.onmousedown = (ev) =>
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