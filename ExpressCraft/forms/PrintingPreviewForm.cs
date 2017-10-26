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

        public PrintingPreviewForm() : base()
        {
            PrintingControl = new PrinterControl();
            PrintingControl.SetBoundsFull();

            Body.AppendChild(PrintingControl);
        }


    }
}
