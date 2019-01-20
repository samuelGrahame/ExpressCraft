using static Retyped.dom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class PrinterControl : Control
    {
        public List<Page> Pages = new List<Page>();        
        private Page _focusedPage = null;
        private float _scale = 1;
        private HTMLDivElement wrapper;

        public Action<Page> OnFocusedPageChanged = null;

        public Layout PageLayout = Layout.Portrait;
        
        public void AddPages(List<Page> pages)
        {
            foreach(var page in pages)
            {
                if(page != null)
                {
                    Pages.Add(page);
                    wrapper.AppendChild(page);

                    FocusedPage = page;

                    page.Content.onclick = (ev) =>
                    {
                        FocusedPage = page;
                        if(page.OnClick != null)
                            page.OnClick();
                    };
                }
            }
        }

        public float Scale
        {
            get { return _scale; }
            set {
                if(value < 0.1)
                    value = 0.1f;
                if(value > 4)
                    value = 4;
                _scale = value;

                wrapper.style.transform = "scale(" + _scale + ")";
            }
        }
        
        public Page FocusedPage
        {
            get { return _focusedPage; }
            set {
                if(value != _focusedPage)
                {
                    if(_focusedPage != null)
                        _focusedPage.ClassList.remove("page-focused");

                    _focusedPage = value;

                    if(OnFocusedPageChanged != null)
                        OnFocusedPageChanged(_focusedPage);

                    if(_focusedPage != null)
                        _focusedPage.ClassList.add("page-focused");
                }                
            }
        }


        /// <summary>
        /// Page is a HTMLElement - AppendChild and Add the page to the list
        /// </summary>
        /// <param name="element"></param>
        public void AddElementFocusedPage(Control element)
        {
            AddElementFocusedPage(element.Content);
        }

        /// <summary>
        /// Page is a HTMLElement - AppendChild and Add the page to the list
        /// </summary>
        /// <param name="element"></param>
        public void AddElementFocusedPage(HTMLElement element)
        {
            if(FocusedPage == null)
                throw new Exception("There is not focused page!");

            FocusedPage.Content.AppendChild(element);
        }

        public Page CreateNewPage(PageSize size = PageSize.A4)
        {
            var page = new Page()
            {
                PageSize = size,
                Layout = PageLayout
            };

            Pages.Add(page);
            wrapper.AppendChild(page);
            
            FocusedPage = page;

            page.Content.onclick = (ev) =>
            {
                FocusedPage = page;
                if(page.OnClick != null)
                    page.OnClick();
            };

            return page;  
        }

        public void Print()
        {
            // we need to create an iframe - add css for the printing.
            // also the content
            var printingFrame = window.open("", "");
            var element =  document.getElementById("expresscraft");
            
            var headerInfo = "";
            if(element != null)
            {
                string extra;

                if(PageLayout == Layout.Portrait)
                {
                    extra = "<style type='text/css' media='print'> @page { size: portait; margin:0; } page { margin:0 !important; box-shadow: none !important; overflow: hidden; } .print-body { margin:0 !important; overflow: visible !important; } page:first-child {  margin-top: 0 !important; } </style>";                    
                }
                else
                {
                    extra = "<style type='text/css' media='print'> @page { size: landscape; margin:0; } page { margin:0 !important; box-shadow: none !important; overflow: hidden; } .print-body { margin:0 !important; overflow: visible !important; } page:first-child {  margin-top: 0 !important; } </style>";                    
                }

                headerInfo = "<head>" + element.outerHTML + "\r\n" + extra + "</head>";

//                <style type="text/css" media="print">
//  @page { size: landscape; }
//</style>
            }
            if(FocusedPage != null)
            {
                FocusedPage.ClassList.remove("page-focused");
            }
            printingFrame.document.write("<html><title>Printing...</title>" + headerInfo + "<body>" + Content.outerHTML + "</body></html>");
            printingFrame.document.close();
            printingFrame.focus();

            printingFrame.addEventListener("load", (Event a) => {
                printingFrame.print();
                printingFrame.close();
            });


            //printingFrame.Document.AddEventListener(EventType.Load, () =>
            //{
            //    Global.Alert("Hello");
            //    printingFrame.Focus();
            //    printingFrame.Print();
            //});
            
            if(FocusedPage != null)
            {
                FocusedPage.ClassList.add("page-focused");
            }
        }

        public PrinterControl() : base("print-body")
        {
            Style.overflow = "auto";

            wrapper = new HTMLDivElement();
            wrapper.style.transformOrigin = "50% 0 0";
            wrapper.style.position = "relative";
            //wrapper.Style.Margin = "0 auto";

            Content.AppendChild(wrapper);
        }
    }

    public class Page : Control
    {
        public Action OnClick = null;

        public Page() : base(document.createElement("page"))
        {
            ClassList.remove("control");

            PageSize = PageSize.A4;            
        }        

        public PageSize PageSize
        {
            get {
                var value = GetAttribute("size");
                 if(value == "A5")
                    return PageSize.A5;
                return PageSize.A4;

            }
            set {
                SetAttribute("size", value.ToString("G"));                
            }
        }

        public Layout Layout
        {
            get
            {
                var value = GetAttribute("layout");
                if(value == "Landscape")
                    return Layout.Landscape;
                return Layout.Portrait;
            }
            set
            {
                SetAttribute("layout", value.ToString("G"));
            }
        }

    }

    public enum PageSize
    {
        A4,
        A5
    }

    public enum Layout
    {
        Portrait,
        Landscape
    }
}
