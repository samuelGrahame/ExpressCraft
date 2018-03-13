using static Retyped.dom;
using static Retyped.jquery;
using System;
using static Retyped.es5;

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

        public static void InvokeMethodUI(string interfaceName, string method, Action<object, string, JQueryXHR> Success = null, Action<JQueryXHR, string, string> Error = null, params object[] arguments)
        {
            PostJsonProgressForm(new MethodRequest(interfaceName, method, arguments), Success, Error);
        }

        public static void InvokeMethodUIControl(string interfaceName, string method, ProgressControl progressControl, Action<object, string, JQueryXHR> Success = null, Action<JQueryXHR, string, string> Error = null, params object[] arguments)
        {
            PostJsonProgressControl(new MethodRequest(interfaceName, method, arguments), progressControl, Success, Error);
        }

        public static void InvokeMethod(string interfaceName, string method, Action<object, string, JQueryXHR> Success = null, Action<JQueryXHR, string, string> Error = null, params object[] arguments)
        {
            PostJson(new MethodRequest(interfaceName, method, arguments), Success, Error);
        }

        public static void PostJson(object JsonFile, Action<object, string, JQueryXHR> Success = null, Action<JQueryXHR, string, string> Error = null, bool Async = true)
        {
            // lets convert the JsonFileObject to a string;
            var ajo = GetAjaxOptions(JsonFile, Async);
            if(Success != null)
                ajo.success = new JQueryAjaxSettings.successFn((o, s, j) => { Success(o, s, j); return null; });
            if(Error != null)
                ajo.error = new JQueryAjaxSettings.errorFn((j, s, s2) => { Error(j, s, s2); return null; });

            jQuery.ajax(ajo);
        }

        public static void PostJsonProgressControl(object JsonFile, ProgressControl progressControl, Action<object, string, JQueryXHR> Success = null, Action<JQueryXHR, string, string> Error = null, bool Async = true)
        {
            // lets convert the JsonFileObject to a string;
            Func<object> inline = () =>
            {
                var xmlRequest = new XMLHttpRequest();
                xmlRequest.addEventListener("progress", (e) =>
                {
                    var pe = e as ProgressEvent;
                    if(progressControl == null)
                        return;
                    var pc = progressControl;

                    float Percent = 0;

                    if(pe.loaded != 0 && pe.total != 0)
                    {
                        Percent = ((float)pe.loaded / (float)pe.total) * 100.0f;
                    }
                    pc.internalProgressControl.style.width = Percent.ToString() + "%";
                });

                return xmlRequest;
            };

            var ajo = GetAjaxOptions(JsonFile, Async);
            ajo.xhr = inline;
            if(Success != null)
                ajo.success = new JQueryAjaxSettings.successFn((o, s, j) => { Success(o, s, j); return null; });
            if(Error != null)
                ajo.error = new JQueryAjaxSettings.errorFn((j, s, s2) => { Error(j, s, s2); return null; });

            jQuery.ajax(ajo);
        }

        public static void PostJsonProgressForm(object JsonFile, Action<object, string, JQueryXHR> Success = null, Action<JQueryXHR, string, string> Error = null, bool Async = true)
        {
            // lets convert the JsonFileObject to a string;
            var npf = new NetworkProgressForm();
            Func<object> inline = () =>
            {
                var xmlRequest = new XMLHttpRequest();
                xmlRequest.addEventListener("progress", (e) =>
                {
                    var pe = e as ProgressEvent;
                    if(npf == null || npf.progressControl == null)
                        return;
                    var pc = npf.progressControl;

                    float Percent = 0;

                    if(pe.loaded != 0 && pe.total != 0)
                    {
                        Percent = ((float)pe.loaded / (float)pe.total) * 100.0f;
                    }
                    pc.internalProgressControl.style.width = Percent.ToString() + "%";
                });

                return xmlRequest;
            };

            var ajo = GetAjaxOptions(JsonFile, Async);
            ajo.xhr = inline;

            ajo.success = new JQueryAjaxSettings.successFn((o, s, j) => {
                npf.DialogResult = DialogResultEnum.OK;
                if(Success != null)
                    Success(o, s, j);
                return null;
            });
            ajo.error = new JQueryAjaxSettings.errorFn((j, s, s2) => {
                npf.DialogResult = DialogResultEnum.Cancel;
                if(Error != null)
                    Error(j, s, s2);
                return null;
            });

            ajo.complete = new JQueryAjaxSettings.completeFn((jq, str) =>
            {
                npf.Close();
                return null;
            });      

            var ajr = jQuery.ajax(ajo);

            npf.ShowDialog(new DialogResult(DialogResultEnum.Cancel, () =>
            {
                ajr.abort();
            }));
        }

        public class NetworkProgressForm : Form
        {
            public ProgressControl progressControl;
            public SimpleDialogButton buttonCancel;

            public NetworkProgressForm(string _text = "Loading...")
            {
                this.Text = _text;
                this.Width = 400;
                this.Height = 200;

                progressControl = new ProgressControl();
                progressControl.SetBounds(50, 50, "(100% - 100px)", "23px");

                buttonCancel = new SimpleDialogButton(this, DialogResultEnum.Cancel) { Text = "Cancel" };
                buttonCancel.SetLocation("(100% - 78px)", "(100% - 26px)");
                buttonCancel.Content.tabIndex = 0;

                Body.AppendChildren(buttonCancel, progressControl);

                AllowSizeChange = false;
            }
        }
    }
}