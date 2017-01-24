Bridge.assembly("ExpressCraft", function ($asm, globals) {
    "use strict";

    Bridge.define("ExpressCraft.forms.CloudPrintForm", {
        inherits: [ExpressCraft.Form],
        statics: {
            printerSetup: false,
            inLoad: false,
            gadget: null,
            setupPrinter: function () {
                if (!ExpressCraft.forms.CloudPrintForm.printerSetup) {
                    if (ExpressCraft.forms.CloudPrintForm.inLoad) {
                        return;
                    }
                    ExpressCraft.forms.CloudPrintForm.inLoad = true;

                    document.head.appendChild(Bridge.merge(document.createElement('script'), {
                        onload: $asm.$.ExpressCraft.forms.CloudPrintForm.f1,
                        src: "https://www.google.com/cloudprint/client/cpgadget.js"
                    } ));
                }
            }
        },
        ctor: function (source, title, gcpmt, encoding) {
            if (title === void 0) { title = ""; }
            if (gcpmt === void 0) { gcpmt = 0; }
            if (encoding === void 0) { encoding = ""; }

            this.$initialize();
            ExpressCraft.Form.ctor.call(this);
            this.setText(title);

            var mimetype = System.String.replaceAll(System.Enum.format(ExpressCraft.GoogleCloudPrintingMimeType, gcpmt, "G").toLowerCase(), "_", ".");
            if (!System.String.isNullOrWhiteSpace(encoding)) {
                ExpressCraft.forms.CloudPrintForm.gadget.setPrintDocument(mimetype, title, source, encoding);
            } else {
                ExpressCraft.forms.CloudPrintForm.gadget.setPrintDocument(mimetype, title, source);
            }
            this.close();
            
			//gadget.setOnCloseCallback()
			

            //gadget.setPrintDocument("[document mimetype]", "[document title]", "[document content]", "[encoding] (optional)");
            //gadget.setPrintDocument("url", "Test Page", "https://www.google.com.au/?gfe_rd=cr&ei=JpqGWJw5xOvwB8GWocAB");
        },
        onShowing: function () {
            ExpressCraft.Form.prototype.onShowing.call(this);
            if (!ExpressCraft.forms.CloudPrintForm.printerSetup) {
                throw new System.Exception("Google Cloud Printer library has not been loaded, use CloudPrintForm.SetupPrinter();");
            }
            if (ExpressCraft.forms.CloudPrintForm.inLoad) {
                throw new System.Exception("Google Cloud Printer library is currently loading, please try again in a couple of seconds.");
            }


        }
    });

    Bridge.ns("ExpressCraft.forms.CloudPrintForm", $asm.$);

    Bridge.apply($asm.$.ExpressCraft.forms.CloudPrintForm, {
        f1: function (ele) {
            ExpressCraft.forms.CloudPrintForm.printerSetup = true;
            
						gadget = new cloudprint.Gadget();						
						
        }
    });
});
