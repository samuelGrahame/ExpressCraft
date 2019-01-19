using Bridge;
using static Retyped.dom;

namespace ExpressCraft
{
    public class PDFPreviewForm : ExForm
    {
        public string Source;
        public PdfSourceType PDFSourceType;
        public HTMLElement PdfViewer;

        public PDFPreviewForm(string source, PdfSourceType pdfSourceType = PdfSourceType.Url)
        {
            Source = source;
            PDFSourceType = pdfSourceType;

            PdfViewer = document.createElement(Browser.IsIE ? "iframe" : pdfSourceType == PdfSourceType.Url ? "embed" : "object");
            PdfViewer.className = "control";

            PdfViewer.SetBounds(0, 0, "100%", "100%");
            PdfViewer.setAttribute("alt", "pdf");
            PdfViewer.setAttribute("type", "application/pdf");
            //object

            this.Body.AppendChild(PdfViewer);
        }

        protected override void OnShowing()
        {
            base.OnShowing();
            //data
            if(PDFSourceType == PdfSourceType.Url)
            {
                PdfViewer.setAttribute("Src", Source);
            }
            else
            {
                PdfViewer.setAttribute("data", GetPdfString(Source));
            }
        }
    }

    public enum PdfSourceType
    {
        Url,
        Base64
    }
}