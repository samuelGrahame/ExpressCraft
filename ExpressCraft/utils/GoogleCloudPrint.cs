using Bridge.jQuery2;
using System;

namespace ExpressCraft
{
    public class GoogleCloudPrint
    {
        private string _source;
        private string _mimetype;
        private string _encoding = "";
        private string _title;
        private object _gadget = null;

        private static ExternalPlugin ExternalGoogleCloudPrint = new ExternalPlugin("https://www.google.com/cloudprint/client/cpgadget.js");

        public static void Setup()
        {
            ExternalGoogleCloudPrint.Setup();
        }

        public GoogleCloudPrint(string source, string title = "", GoogleCloudPrintingMimeType gcpmt = GoogleCloudPrintingMimeType.Url, string encoding = "") : base()
        {
            _title = title;
            _source = source;
            _encoding = encoding;
            _mimetype = gcpmt.ToString("G").ToLower().Replace("_", ".");
        }

        public void Show()
        {
            ExternalGoogleCloudPrint.UsageCheck();

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