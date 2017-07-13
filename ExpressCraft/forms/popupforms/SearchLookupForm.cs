using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class SearchLookupForm : FormPopup
    {
        public SearchInput SearchInput;
        public DataRow FocusedRow;
        public GridView View;

        public TextInput SearchEdit;
        public SimpleButton btnSearch;
        public SimpleButton btnClose;
        public SimpleButton btnNew;

        protected override void OnShowed()
        {
            base.OnShowed();

            SearchEdit.Focus();
        }

        public SearchLookupForm(SearchInput searchInput) : base()
        {
            var x = searchInput.Content.GetBoundingClientRect();

            MinHeight = 100;
            MinWidth = 100;

            Size = new Vector2((float)x.Width, 250);

            AllowSizeChange = true;

            SearchInput = searchInput;
            
            var frag = Document.CreateDocumentFragment();

            frag.AppendChildren(
                SearchEdit = new TextInput() { Text = SearchInput.Text, OnFocusDontSelectAll = true,
                    Bounds = new Vector4(4, 4, "calc(100% - 68px)", 20)
                },
                btnSearch = new SimpleButton() { Text = "Search",
                    Bounds = new Vector4("calc(100% - 65px)", 4, 61, 20), ItemClick = (s) => {
                        SearchInput.OnRequestSearch(SearchEdit.Text, View);
                    } },
                View =  new GridView() { ColumnHeadersVisible = false, AllowMultiSelection = false,
                    Bounds = new Vector4(4, 28, "calc(100% - 10px)", "calc(100% - 60px)") },
                btnClose = new SimpleButton() { Text = "&times;" ,
                    Bounds = new Vector4(4, "calc(100% - 25px)", 20, 20), ItemClick = (s) => {
                        Close();
                    } },
                btnNew = new SimpleButton()
                {
                    Text = "New",
                    Bounds = new Vector4("calc(100% - 65px)", "calc(100% - 25px)", 61, 20),
                    ItemClick = (s) => {
                        SearchInput.OnRequestNew(View);
                    }
                });

            btnClose.Style.Color = "red";

            SearchEdit.OnKeyDown = (obj, ev) =>
            {
                if(ev.KeyCode == 9)
                {
                    Close();
                    ev.PreventDefault();
                }else if(ev.KeyCode == 13)
                {
                    SearchInput.OnRequestSearch(SearchEdit.Text, View);
                    ev.PreventDefault();
                }
                else if(ev.KeyCode == 27)
                {
                    FocusedRow = null;
                    this.Close();
                    ev.PreventDefault();
                }
            };

            Content.AppendChild(frag);

            SearchEdit.OnGotFocus = (obj) =>
            {
                SearchEdit.GetInput().SelectionStart = SearchEdit.Text.Length;
            };
        }

        protected override void OnClosed()
        {
            base.OnClosed();

            SearchInput.OnClosed(FocusedRow);

            SearchInput.GetInput().Focus();
        }
    }
}
