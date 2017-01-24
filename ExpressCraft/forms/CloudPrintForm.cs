using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;
using Bridge.jQuery2;

namespace ExpressCraft
{
	public class GoogleCloudPrint
	{
		private static bool printerSetup = false;
		private static bool inLoad = false;

		private string _source;
		private string _mimetype;
		private string _encoding = "";
		private string _title;
		private object _gadget = null;				

		public static void Setup()
		{
			if(!printerSetup)
			{
				if(inLoad) return;
				inLoad = true;

				Document.Head.AppendChild(new HTMLScriptElement() {
					OnLoad = (ele) => {
						printerSetup = true;
						inLoad = false;
					},
					Src = "https://www.google.com/cloudprint/client/cpgadget.js" });
			}
		}

		public GoogleCloudPrint(string source, string title = "",  GoogleCloudPrintingMimeType gcpmt = GoogleCloudPrintingMimeType.Url, string encoding = "") : base()
		{			
			_title = title;
			_source = source;
			_encoding = encoding;
			_mimetype = gcpmt.ToString("G").ToLower().Replace("_", ".");
		}

		public void Show()
		{			
			if(!printerSetup)
				throw new Exception("Google Cloud Printer library has not been loaded, use CloudPrintForm.SetupPrinter();");
			if(inLoad)
				throw new Exception("Google Cloud Printer library is currently loading, please try again in a couple of seconds.");
			
			/*@
			this._gadget = new cloudprint.Gadget();			
			*/
			if(!string.IsNullOrWhiteSpace(_encoding))
			{
				/*@
				this._gadget.setPrintDocument(this._mimetype, this._title, this._source, this._encoding);
				*/
			}
			else
			{
				/*@
				this._gadget.setPrintDocument(this._mimetype, this._title, this._source);
				*/
			}
			/*@
			this._gadget.openPrintDialog();
			this._gadget.setOnCloseCallback(this.clearContent);			
			*/			
		}

		public void clearContent()
		{
			try
			{
				jQuery.Select(".__gcp_dialog_container_cls").Parent().Get(0).Delete();
			}
			catch(Exception)
			{				
			}			
		}

		public void Close()
		{
			if(this._gadget != null)
			{
				/*@			
				this._gadget.closePrintDialog();
				this._gadget = null;
				*/
			}
		}
	}
}


//<script src = "https://www.google.com/cloudprint/client/cpgadget.js" >
//</ script >
//< script >
//  window.onload = function() {
//    var gadget = new cloudprint.Gadget();
//gadget.setPrintDocument("url", "Test Page", "https://www.google.com.au/?gfe_rd=cr&ei=JpqGWJw5xOvwB8GWocAB");
//	gadget.openPrintDialog();
//  }
//</script>