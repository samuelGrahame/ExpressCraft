using static Retyped.dom;

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
        public SimpleButton btnUse;
        public SimpleButton btnClear;

        protected override void OnShowed()
        {
            base.OnShowed();

            SearchEdit.Focus();

            if(SearchInput.SearchOnLoad())
                btnSearch.Content.click();
        }

        public SearchLookupForm(SearchInput searchInput) : base()
        {
            if(searchInput.Content.parentElement != null && searchInput.Content.parentElement.parentElement != null)
            {
                PreviousScrollTop = searchInput.Content.parentElement.parentElement.scrollTop;
                ParentContainer = searchInput.Content.parentElement.parentElement;
            }
            var x = searchInput.Content.getBoundingClientRect();

            MinHeight = 100;
            MinWidth = 150;

            var wid = searchInput.GetDropdownWidth();
            if(wid < 150)
                wid = 150;

            Size = new Vector2(wid, 250);

            AllowSizeChange = true;

            SearchInput = searchInput;

            var frag = document.createDocumentFragment();

            frag.AppendChildren(
                SearchEdit = new TextInput()
                {
                    Text = searchInput.ClearOnOpen() ? "" : SearchInput.Text,
                    OnFocusDontSelectAll = true,
                    DisableFocusPopup = true,
                    Bounds = new Vector4(4, 4, "(100% - 68px)", 20),
                    ToolTip = new ToolTip("Help:", "[Enter] to Search, [CTRL] + [Enter] to Search and Use, [ESC] to close")
                },
                btnSearch = new SimpleButton()
                {
                    Text = "Search",
                    Bounds = new Vector4("(100% - 65px)", 4, 61, 20),
                    ItemClick = (s) =>
                    {
                        SearchInput.OnRequestSearch(SearchEdit.Text, View);
                    }
                },
                View = new GridView(true, true)
                {
                    AllowMultiSelection = false,
                    UseEditForm = false,
                    Bounds = new Vector4(4, 28, "(100% - 10px)", "(100% - 60px)")
                },
                btnClose = new SimpleButton()
                {
                    Text = "&times;",
                    Bounds = new Vector4(4, "(100% - 25px)", 20, 20),
                    ItemClick = (s) =>
                    {
                        Close();
                    }
                },
                btnNew = new SimpleButton()
                {
                    Text = "New",
                    Bounds = new Vector4("(100% - 65px)", "(100% - 25px)", 61, 20),
                    ItemClick = (s) =>
                    {
                        SearchInput.OnRequestNew(View);
                    }
                }, btnUse = new SimpleButton()
                {
                    Text = "Use",
                    Bounds = new Vector4("(100% - 132px)", "(100% - 25px)", 61, 20),
                    ItemClick = (s) =>
                    {
                        if(View.FocusedDataHandle == -1 && View.RowCount() > 0)
                        {
                            View.FocusedDataHandle = 0;
                        }
                        if(FocusedRow != null)
                        {
                            SearchInput.OnAcceptResult(FocusedRow);
                            this.Close();
                        }
                    }
                },
                btnClear = new SimpleButton()
                {
                    Text = "Clear",
                    Bounds = new Vector4("(100% - 199px)", "(100% - 25px)", 61, 20),
                    ItemClick = (s) =>
                    {
                        FocusedRow = null;
                        SearchInput.OnAcceptResult(FocusedRow);
                        this.Close();
                    }
                });

            btnClose.Style.color = "red";

            if(Helper.NotDesktop)
            {
                SearchEdit.Style.fontSize = "14px";
                SearchEdit.Height = "45px";

                btnSearch.Style.fontSize = "14px";
                btnSearch.Height = 45;

                View.Top = 55;
                View.Height = "(100% - 112px)";

                btnClear.Style.fontSize = "14px";
                btnClear.Height = 45;
                btnClear.Top = "(100% - 51px)";

                btnUse.Style.fontSize = "14px";
                btnUse.Height = 45;
                btnUse.Top = "(100% - 51px)";

                btnNew.Style.fontSize = "14px";
                btnNew.Height = 45;
                btnNew.Top = "(100% - 51px)";

                btnClose.Style.fontSize = "26px";
                btnClose.Style.fontWeight = "bold";
                btnClose.Height = 45;
                btnClose.Width = 61;
                btnClose.Top = "(100% - 51px)";
            }

            SearchEdit.OnKeyDown = (obj, ev) =>
            {
                if(ev.keyCode == 9)
                {
                    Close();
                    ev.preventDefault();
                }
                else if(ev.keyCode == 13)
                {
                    SearchInput.OnRequestSearch(SearchEdit.Text, View);
                    if(ev.ctrlKey)
                    {
                        btnUse.Content.click();
                    }
                    ev.preventDefault();
                }
                else if(ev.keyCode == 27)
                {
                    FocusedRow = null;
                    this.Close();
                    ev.preventDefault();
                }
            };

            View.OnFocusedRowChanged = (row, col) =>
            {
                if(View.FocusedDataHandle > -1)
                {
                    FocusedRow = View.DataSource[View.GetDataSourceRow(View.FocusedDataHandle)];
                }
                else
                {
                    FocusedRow = null;
                }
                SearchInput.OnAcceptResult(FocusedRow);

                if(SearchInput.FocusedChangeCloseForm)
                    this.Close();
            };

            View.OnRowDoubleClick = (row) =>
            {
                if(View.FocusedDataHandle > -1)
                {
                    FocusedRow = View.DataSource[View.GetDataSourceRow(View.FocusedDataHandle)];
                }
                else
                {
                    FocusedRow = null;
                }
                SearchInput.OnAcceptResult(FocusedRow);
                this.Close();
            };

            this.Body.AppendChild(frag);

            SearchEdit.OnGotFocus = (obj) =>
            {
                if(!string.IsNullOrWhiteSpace(SearchEdit.Text))
                {
                    SearchEdit.GetInput().selectionStart = (uint)SearchEdit.Text.Length;
                }
            };

            LinkchildToForm(View);
        }

        protected override void OnClosed()
        {
            base.OnClosed();

            SearchInput.OnClosed(FocusedRow);
            SearchInput.ValidateData();
            if(!Helper.NotDesktop)
                SearchInput.GetInput().focus();
            else
            {
                SearchInput.Scroll((int)PreviousScrollTop, ParentContainer);
            }
        }
    }
}