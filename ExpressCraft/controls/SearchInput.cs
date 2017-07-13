using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class SearchInput : TextInputDropDown
    {
        public object EditValue { get; set; }
        public string DisplayMember { get; set; }
        public string ValueMember { get; set; }
        private int popupTimerIndex = -1;
        
        public SearchInput() : base(InputType.Text)
        {            
            UsedEdit.OnKeyDown = (obj, ev) =>
            {              
                if(popupTimerIndex != -1)
                {                    
                    Global.ClearTimeout(popupTimerIndex);
                }                
                if(ev.KeyCode != 9)
                {
                    popupTimerIndex = Global.SetTimeout(() =>
                    {
                        OnDropDownClicked(new MouseEvent("onmousedown"));
                    }, 100);                    
                }    
            };
            UsedEdit.Content.OnMouseDown = (ev) =>
            {
                OnDropDownClicked(new MouseEvent("onmousedown"));
            };            
        }

        public Action<string, GridView> OnSearch;

        public virtual void OnRequestSearch(string searchValue, GridView grid)
        {
            if(OnSearch != null)
                OnSearch(searchValue, grid);
        }

        public virtual void OnAcceptResult(DataRow value)
        {
            if(ValueMember != "")
            {
                EditValue = value[ValueMember];                
            }
            if(DisplayMember != null)
            {
                Text = (value[DisplayMember] + "");
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
            (new SearchLookupForm(this)).
                ShowPopup(FormPopup.
                    GetPopupDefaultLocation(DropDownButton, true));
        }
    }
}
