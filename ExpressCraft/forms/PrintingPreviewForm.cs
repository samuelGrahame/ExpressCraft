using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class PrintingPreviewForm : Form
    {
        public PrinterControl PrintingControl;
        public Page FocusedPage => PrintingControl.FocusedPage;
        public List<Page> Pages => PrintingControl.Pages;

        /// <summary>
        /// Page is a HTMLElement - AppendChild and Add the page to the list
        /// </summary>
        /// <param name="element"></param>
        public void AddElementFocusedPage(Control element)
        {
            PrintingControl.AddElementFocusedPage(element.Content);
        }

        public Page CreateNewPage(PageSize size = PageSize.A4, Layout layout = Layout.Portrait)
        {
            return PrintingControl.CreateNewPage(size, layout);
        }

        /// <summary>
        /// Page is a HTMLElement - AppendChild and Add the page to the list
        /// </summary>
        /// <param name="element"></param>
        public void AddElementFocusedPage(HTMLElement element)
        {
            if(FocusedPage == null)
                throw new Exception("There is not focused page!");

            PrintingControl.FocusedPage.Content.AppendChild(element);
        }

        public PrintingPreviewForm() : base()
        {
            PrintingControl = new PrinterControl();
            PrintingControl.SetBoundsFull();

            Body.AppendChild(PrintingControl);

            Text = "Printing Preview";
        }



        protected override void OnShowed()
        {
            base.OnShowed();

            ShowClose = true;
            ShowMinimize = true;
            ShowMaximize = true;

            WindowState = WindowStateType.Maximized;          
        }


    }
}
