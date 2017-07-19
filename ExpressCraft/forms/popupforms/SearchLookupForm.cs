﻿using Bridge.Html5;
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
            MinWidth = 150;

            var wid = searchInput.GetDropdownWidth();
            if(wid < 150)
                wid = 150;

            Size = new Vector2(wid, 250);

            AllowSizeChange = true;

            SearchInput = searchInput;
            
            var frag = Document.CreateDocumentFragment();

            frag.AppendChildren(
                SearchEdit = new TextInput() { Text = SearchInput.Text, OnFocusDontSelectAll = true,
                    Bounds = new Vector4(4, 4, "(100% - 68px)", 20)
                },
                btnSearch = new SimpleButton() { Text = "Search",
                    Bounds = new Vector4("(100% - 65px)", 4, 61, 20), ItemClick = (s) => {
                        SearchInput.OnRequestSearch(SearchEdit.Text, View);
                    } },
                View =  new GridView(true, true) { AllowMultiSelection = false, UseEditForm = false,
                    Bounds = new Vector4(4, 28, "(100% - 10px)", "(100% - 60px)") },
                btnClose = new SimpleButton() { Text = "&times;" ,
                    Bounds = new Vector4(4, "(100% - 25px)", 20, 20), ItemClick = (s) => {
                        Close();
                    } },
                btnNew = new SimpleButton()
                {
                    Text = "New",
                    Bounds = new Vector4("(100% - 65px)", "(100% - 25px)", 61, 20),
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

            View.OnFocusedRowChanged = (row, col) => {
                if(View.FocusedDataHandle > -1)
                {
                    FocusedRow = View.DataSource[View.GetDataSourceRow(View.FocusedDataHandle)];
                }else
                {
                    FocusedRow = null;
                }
                SearchInput.OnAcceptResult(FocusedRow);
            };

            View.OnRowDoubleClick = (row) => {
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
                SearchEdit.GetInput().SelectionStart = SearchEdit.Text.Length;
            };

            LinkchildToForm(View);

            if(SearchInput.SearchOnLoad())
                btnSearch.Content.Click();

        }

        protected override void OnClosed()
        {
            base.OnClosed();

            SearchInput.OnClosed(FocusedRow);

            SearchInput.GetInput().Focus();
        }
    }
}