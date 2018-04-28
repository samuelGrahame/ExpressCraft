using static Retyped.dom;
using static Retyped.jquery;
using System;
using static Retyped.es5;
using static Retyped.jquery.JQuery;

namespace ExpressCraft
{
    public static class Network
    {
        private static JQueryAjaxSettings GetAjaxOptions(object JsonFile, bool Async = true)
        {
            return new JQueryAjaxSettings()
            {
                async = Async,
                url = Settings.NetworkURL,
                cache = false,
                data = JsonFile == null ? string.Empty : JSON.stringify(JsonFile),
                dataType = "json",
                contentType = "application/json",
                type = "POST"
            };
        }

        public class MethodRequest
        {
            public string Method;
            public object[] Arguments;
            public string Interface;

            public MethodRequest(string interfaceName, string method, params object[] arguments)
            {
                Method = method;
                Arguments = arguments;
                Interface = interfaceName;
            }
        }

        [Obsolete("No Longer Used!")]
        public static void InvokeMethodUI(string interfaceName, string method, Action<object, string, JQueryXHR> Success = null, Action<JQueryXHR, string, string> Error = null, params object[] arguments)
        {
            
        }

        [Obsolete("No Longer Used!")]
        public static void InvokeMethodUIControl(string interfaceName, string method, ProgressControl progressControl, Action<object, string, JQueryXHR> Success = null, Action<JQueryXHR, string, string> Error = null, params object[] arguments)
        {
            
        }

        [Obsolete("No Longer Used!")]
        public static void InvokeMethod(string interfaceName, string method, Action<object, string, JQueryXHR> Success = null, Action<JQueryXHR, string, string> Error = null, params object[] arguments)
        {
            PostJson(new MethodRequest(interfaceName, method, arguments), Success, Error);
        }

        [Obsolete("No Longer Used!")]
        public static void PostJson(object JsonFile, Action<object, string, JQueryXHR> Success = null, Action<JQueryXHR, string, string> Error = null, bool Async = true)
        {
            
        }

        [Obsolete("No Longer Used!")]
        public static void PostJsonProgressControl(object JsonFile, ProgressControl progressControl, Action<object, string, JQueryXHR> Success = null, Action<JQueryXHR, string, string> Error = null, bool Async = true)
        {
           
        }

        [Obsolete("No Longer Used!")]
        public static void PostJsonProgressForm(object JsonFile, Action<object, string, JQueryXHR> Success = null, Action<JQueryXHR, string, string> Error = null, bool Async = true)
        {
            
        }

        [Obsolete("No Longer Used!")]
        public class NetworkProgressForm : Form
        {
            public ProgressControl progressControl;
            public SimpleDialogButton buttonCancel;

            public NetworkProgressForm(string _text = "Loading...")
            {
                
            }
        }
    }
}