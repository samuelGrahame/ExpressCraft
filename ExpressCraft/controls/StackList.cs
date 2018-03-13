using static Retyped.dom;
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
        private TextInput searchInput;
        private bool _showFindScreen;
        private string searchText;
        private bool clearMark = false;
        public Control contentBody;        


        private StackItem _focusedStackItem;

        public StackItem FocusedStackItem
        {
            get { return _focusedStackItem; }
            set {
                if(_focusedStackItem != value)
                {
                    if(_focusedStackItem != null)
                    {
                        _focusedStackItem.ClassList.remove("stack-item-active");                        
                    }
                    _focusedStackItem = value;
                    if(_focusedStackItem != null)
                    {
                        _focusedStackItem.ClassList.add("stack-item-active");
                        if(_focusedStackItem.OnFocused != null)
                            _focusedStackItem.OnFocused(_focusedStackItem);
                    }                    
                }
                
            }
        }


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

                        Content.appendChild((Node)searchInput);
                        
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
                        Content.removeChild(searchInput.Content);
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
            contentBody.Style.overflowY = "auto";
            Content.appendChild((Node)contentBody);
        }

        private void AddMark(HTMLElement item)
        {
            if(item.childElementCount == 0)
            {
                if((item.textContent + "").ToLower().Contains((searchText + "").ToLower()))
                {
                    string x = item.textContent;
                    item.Empty();

                    var builder = new StringBuilder();
                    var builder2 = new StringBuilder();                    

                    for(int i = 0; i < x.Length; i++)
                    {
                        builder2.Append(x[i]);
                        builder.Append(x[i]);
                        if(builder2.ToString().ToLower() == (searchText + "").ToLower())
                        {
                            var word = builder2.ToString();
                            builder.Length -= searchText.Length;
                            builder.Append("<mark>" + word.HtmlEscape() + "</mark>");
                            builder2 = new StringBuilder();
                        }else if(builder2.ToString().ToLower().EndsWith((searchText + "").ToLower()))
                        {                            
                            var word = builder2.ToString().Substring(builder2.ToString().Length - searchText.Length);
                            builder.Length -= searchText.Length;
                            builder.Append("<mark>" + word.HtmlEscape() + "</mark>");
                            builder2 = new StringBuilder();
                        }
                        if(builder2.Length > searchText.Length)
                        {
                            builder2 = new StringBuilder(builder2.ToString().Substring(1)); //? ??
                        }
                    }                    

                    item.innerHTML = builder.ToString();
                }
            }else
            {
                for(int i = 0; i < item.childElementCount; i++)
                {
                    var child = item.children[i];
                    AddMark(child.As<HTMLElement>());
                }
            }
            
        }

        private void RemoveMark(HTMLElement item)
        {
            if(item.innerHTML.Contains("<mark>") && item.innerHTML.Contains("</mark>"))
            {
                item.innerHTML = item.innerHTML.Replace("<mark>", "").Replace("</mark>", "");
            }
            else
            {
                for(int i = 0; i < item.childElementCount; i++)
                {
                    var child = item.children[i];
                    AddMark(child.As<HTMLElement>());
                }                
            }
        }


        public void RebuildData()
        {
            contentBody.Content.Empty();
            //this.Content.Empty();

            foreach(var item in StackItems)
            {
                if(item.Content.onclick == null)
                {
                    item.Content.onclick = (ev) => {
                        FocusedStackItem = item;
                        return null;                 
                    };
                }

                if(clearMark)
                {
                    RemoveMark(item.Content);
                }

                if(!string.IsNullOrWhiteSpace(searchText))
                {
                    if((item.Content.textContent + "").ToLower().Contains((searchText + "").ToLower()) )
                    {
                        AddMark(item.Content);
                        contentBody.Content.appendChild((Node)item);
                        contentBody.Content.appendChild(new HTMLDivElement());
                    }                    
                }
                else
                {
                    contentBody.Content.appendChild((Node)item);
                    contentBody.Content.appendChild(new HTMLDivElement());
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
        public Action<StackItem> OnFocused;
        public Action<StackItem, object> OnStateChanged;
        public object ReferenceObject;

        private object _state;

        public object State
        {
            get { return _state; }
            set {
                if(_state != value)
                {
                    _state = value;
                    if(OnStateChanged != null)
                        OnStateChanged(this, _state);
                }                
            }
        }


        public StackItem() :  base("stack-item")
        {
            ClassList.remove("control");
            Style.width = "100%";
            Style.height = "auto";
            
        }
    }
    
}
