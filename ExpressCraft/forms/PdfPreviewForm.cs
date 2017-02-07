using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge;
using Bridge.Html5;

namespace ExpressCraft
{
	public class PDFPreviewForm : Form
	{
		public string Source;
		public PdfSourceType PDFSourceType;
		public HTMLElement PdfViewer;

		public PDFPreviewForm(string source, PdfSourceType pdfSourceType = PdfSourceType.Url)
		{
			Source = source;
			PDFSourceType = pdfSourceType;

			PdfViewer = Document.CreateElement(Browser.IsIE ? "iframe" : "embed");
			PdfViewer.ClassName = "control";

			PdfViewer.SetBounds(0, 0, "100%", "100%");
			PdfViewer.SetAttribute("alt", "pdf");						

			this.Body.AppendChild(PdfViewer);
		}


		protected override void OnShowing()
		{
			base.OnShowing();
			//data
			if(PDFSourceType == PdfSourceType.Url)
			{
				PdfViewer.SetAttribute("Src", Source);
			}else
			{
				PdfViewer.SetAttribute("data", GetPdfString(Source));				
			}

		}

	}

	public enum PdfSourceType
	{
		Url,
		Base64
	}
}
