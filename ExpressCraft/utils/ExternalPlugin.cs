using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

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

		public void Setup()
		{
			if(!SetupCompleted)
			{
				if(InLoad) return;
				InLoad = true;

				Document.Head.AppendChild(new HTMLScriptElement()
				{
					OnLoad = (ele) => {
						SetupCompleted = true;
						InLoad = false;
						if(OnReady != null)
							OnReady();
					},
					Src = SourceUrl
				});
			}
		}

		public void UsageCheck()
		{
			if(!SetupCompleted)
				throw new Exception("'" + SourceUrl +  "' requires to be setup!");
			if(InLoad)
				throw new Exception("'" + SourceUrl + "' is currently loading, Please try again in a few seconds!");
		}
	}
}
