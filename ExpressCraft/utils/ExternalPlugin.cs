using static Retyped.dom;
using System;

namespace ExpressCraft
{
    public class ExternalPlugin
    {
        public string SourceUrl;
        public bool SetupCompleted = false;
        public bool InLoad = false;

        public Action OnReady = null;

        public ExternalPlugin(string sourceUrl)
        {
            SourceUrl = sourceUrl;
        }

        public void Setup(bool async = false, bool defer = false)
        {
            if(!SetupCompleted)
            {
                if(InLoad) return;
                InLoad = true;
                var script = new HTMLScriptElement()
                {
                    onload = (ele) =>
                    {
                        SetupCompleted = true;
                        InLoad = false;
                        if(OnReady != null)
                            OnReady();
                    },
                    src = SourceUrl
                };
                if(async)
                    script.async = async;
                if(defer)
                    script.defer = defer;
                document.head.AppendChild(script);
            }
        }

        public void UsageCheck()
        {
            if(!SetupCompleted)
                throw new Exception("'" + SourceUrl + "' requires to be setup!");
            if(InLoad)
                throw new Exception("'" + SourceUrl + "' is currently loading, Please try again in a few seconds!");
        }
    }
}