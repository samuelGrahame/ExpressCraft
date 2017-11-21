using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class StackList : Control
    {
        public List<StackItem> StackItems = new List<StackItem>();
        public HTMLElement prevFocused;
        private TextInput searchInput;
        private bool _showFindScreen;
        private string searchText;
        private bool clearMark = false;
        private Control contentBody;

        public bool ShowFindScreen
        {
            get { return _showFindScreen; }
            set {
                if(_showFindScreen != value)
                {
                    clearMark = false;
                    _showFindScreen = value;
                    if(_showFindScreen)
                    {
                        searchInput = new TextInput();
                        searchInput.Location = new Vector2(6, 6);
                        searchInput.Size = new Vector2("(100% - 12px)", 38);                        
                        searchInput.OnTextChanged = (sender) =>
                        {
                            clearMark = true;
                            searchText = searchInput.Text;
                            RebuildData();
                        };

                        Content.AppendChild(searchInput);
                        
                        contentBody.Top = 50;
                        contentBody.Size = new Vector2("100%", "(100% - 50px)");
                    }
                    else
                    {
                        if(!string.IsNullOrWhiteSpace(searchText))
                        {
                            clearMark = true;
                        }else
                        {
                            clearMark = false;
                        }
                        searchText = "";
                        Content.RemoveChild(searchInput.Content);
                        searchInput = null;

                        contentBody.Top = 0;
                        contentBody.Size = new Vector2("100%", "100%");
                    }                                        
                }                
            }
        }

        public StackList() : base()
        {                        
            contentBody = new Control();
            contentBody.Size = new Vector2("100%", "100%");
            contentBody.Style.OverflowY = Overflow.Auto;
            Content.AppendChild(contentBody);
        }

        private void AddMark(HTMLElement item)
        {
            if(item.ChildElementCount == 0)
            {
                if((item.TextContent + "").ToLower().Contains((searchText + "").ToLower()))
                {
                    string x = item.TextContent;
                    item.Empty();

                    var builder = new StringBuilder();
                    var builder2 = new StringBuilder();

                    for(int i = 0; i < x.Length; i++)
                    {
                        builder2.Append(x[i]);
                        builder.Append(x[i]);
                        if(builder.ToString().ToLower() == (searchText + "").ToLower())
                        {
                            var word = builder2.ToString();
                            builder.Length -= searchText.Length;
                            builder.Append("<mark>" + word.HtmlEscape() + "</mark>");
                            builder2 = new StringBuilder();
                        }else if(builder.ToString().ToLower().EndsWith((searchText + "").ToLower()))
                        {                            
                            var word = builder2.ToString().Substring(builder2.ToString().Length - searchText.Length);
                            builder.Length -= searchText.Length;
                            builder.Append("<mark>" + word.HtmlEscape() + "</mark>");
                            builder2 = new StringBuilder();
                        }
                    }                    

                    item.InnerHTML = builder.ToString();
                }
            }else
            {
                foreach(var child in item.Children)
                {
                    AddMark(child);
                }
            }
            
        }

        private void RemoveMark(HTMLElement item)
        {
            if(item.InnerHTML.Contains("<mark>") && item.InnerHTML.Contains("</mark>"))
            {
                item.InnerHTML = item.InnerHTML.Replace("<mark>", "").Replace("</mark>", "");
            }
            else
            {
                foreach(var child in item.Children)
                {
                    AddMark(child);
                }
            }
        }


        public void RebuildData()
        {
            contentBody.Content.Empty();
            //this.Content.Empty();

            foreach(var item in StackItems)
            {
                if(item.Content.OnClick == null)
                {
                    item.Content.OnClick = (ev) => {
                        if(prevFocused != item.Content)
                        {
                            if(prevFocused != null)
                            {
                                prevFocused.ClassList.Remove("stack-item-active");
                            }
                            prevFocused = item.Content;
                            prevFocused.ClassList.Add("stack-item-active");
                        }
                    };
                }

                if(clearMark)
                {
                    RemoveMark(item.Content);
                }

                if(!string.IsNullOrWhiteSpace(searchText))
                {
                    if((item.Content.TextContent + "").ToLower().Contains((searchText + "").ToLower()) )
                    {
                        AddMark(item.Content);
                        contentBody.Content.AppendChild(item);
                        contentBody.Content.AppendChild(new HTMLDivElement());
                    }                    
                }
                else
                {
                    contentBody.Content.AppendChild(item);
                    contentBody.Content.AppendChild(new HTMLDivElement());
                }                
            }
            clearMark = false;
        }

        public override void Render()
        {
            if(!HasRendered)
            {
                RebuildData();
                HasRendered = true;
            }            

            base.Render();
        }
    }

    public class StackItem : Control
    {
        public string UniqueId = "";

        public StackItem() :  base("stack-item")
        {
            ClassList.Remove("control");
            Style.Width = "100%";
            Style.Height = "auto";
            
        }
    }
    
}
