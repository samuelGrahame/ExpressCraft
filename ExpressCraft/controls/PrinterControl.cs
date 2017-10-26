using Bridge.Html5;
using Bridge.jQuery2;
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
        public Page FocusedPage = null;

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

        public Page CreateNewPage(PageSize size = PageSize.A4, Layout layout = Layout.Portrait)
        {
            var page = new Page()
            {
                PageSize = size,
                Layout = layout
            };

            Pages.Add(page);
            Content.AppendChild(page);

            FocusedPage = page;

            return page;  
        }

        public void Print()
        {
            // we need to create an iframe - add css for the printing.
            // also the content
        }

        public PrinterControl() : base("print-body")
        {
            Style.Overflow = Overflow.Auto;
        }
    }

    public class Page : Control
    {
        public Page() : base(Document.CreateElement("page"))
        {
            ClassList.Remove("control");

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
