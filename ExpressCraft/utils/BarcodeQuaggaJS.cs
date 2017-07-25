using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class BarcodeQuaggaJS
    {
        private static ExternalPlugin ExternalQuaggaJS = new ExternalPlugin("https://cdnjs.cloudflare.com/ajax/libs/quagga/0.12.1/quagga.min.js");

        public static void Setup()
        {
            ExternalQuaggaJS.Setup(true, true);
        }

        public static void DecodeSingle(string source, Action<string> onDetect, Action onNoDetect = null, bool locate = true, Readers reader = Readers.Code_39_Reader, bool sourceIsBase64 = false)
        {
            if(!ExternalQuaggaJS.SetupCompleted)
                return;
            
            if(onDetect == null)
                return;

            string codeName = reader.ToString("G").ToLower();
            if(codeName.StartsWith("_"))
                codeName = codeName.Substring(1);
            if(sourceIsBase64 && !source.StartsWith("data:image"))
            {
                source = "data:image/jpg;base64," + source;
            }
            /*@			
            Quagga.decodeSingle({
                decoder: {
                    readers: [codeName] // List of active readers
                },
                locate: locate,
                src: source
            }, function(ond, onnd) { 
                return function(result){
                    if(result.codeResult) {
                        ond(result.codeResult.code);
                    } else {
                        if(onnd != null)
                        {
                            onnd();
                        }                        
                    }
                }            
            }(onDetect, onNoDetect));        
            */


        }

        public enum Readers
        {
            Code_128_Reader,
            Ean_Reader,
            Ean_8_Reader,
            Code_39_Reader,
            Code_39_Vin_Reader,
            Codabar_Reader,
            Upc_Reader,
            Upc_e_Reader,
            I2of5_Reader,
            _2of5_Reader,
            Code_93_Reader,
        }
//        Quagga.decodeSingle({
//    decoder: {
//        readers: ["code_128_reader"] // List of active readers
//    },
//    locate: true, // try to locate the barcode in the image
//    src: '/test/fixtures/code_128/image-001.jpg' // or 'data:image/jpg;base64,' + data
//}, function(result){
//    if(result.codeResult) {
//        console.log("result", result.codeResult.code);
//    } else {
//        console.log("not detected");
//    }
//});

        
    }
}
