using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge;
using Bridge.Html5;

namespace ExpressCraft
{
	public static class Settings
	{
		public static string NetworkURL = "Host.ashx";
		public static string ResourceURL = "./images/";
		public static bool AutoRender = true;
		public static string DefaultFont = "8.25pt Tahoma";
		public static StyleSheet DefaultStyleSheet;
		public static StyleSheet PluginStyleSheet;
        public static bool GridViewAutoColumnGenerateFormatAsDate = false;
        public static bool GridViewBlurOnScroll = false;
        public static int GridViewRowScrollPadding = 0;

		public static bool GridViewScrollDelayed = false;
		public static int GridViewScrollDelayMS = 25;

		public static int ContextMenuStartingZIndex = 500;
		public static int ContextMenuMinWidth = 200;

		public static int MessageFormTextMaximumHeightInPx = 500;
		public static int MessageFormTextMinimumHeightInPx = 32;
		public static int MessageFormMinimumWidthInPx = 195;

		public static bool MessageFormBeep = false;

		public static int MaximumPixelScrollingRows = 500000;

		private static bool _WindowManagerVisible;

		public static bool WindowManagerVisible
		{
			get { return _WindowManagerVisible; }
			set {
				if(value != _WindowManagerVisible)
				{
					_WindowManagerVisible = value;
					Form.SetupWindowManager();
				}				
			}
		}		

		public static bool IsChrome = Browser.IsChrome;

		public static bool AllowCloseWithoutQuestion = false;

		public static void Setup()
		{
			SetupStyleDefaults();			
		}

		[Init(InitPosition.Top)]
		private static void DisableConsole()
		{
			/*@
			Bridge.Console.log = function(message) { console.log(message); };
			Bridge.Console.error = function(message) { console.error(message); };
			Bridge.Console.debug = function(message) { console.debug(message); };
			*/
		}

		public static void SetupStyleDefaults()
		{
			StyleSheetList sheets = Document.StyleSheets;
			for(int i = 0; i < sheets.Length; i++)
			{
				var ownerNode = sheets[i].OwnerNode as HTMLLinkElement;
				if(ownerNode == null)
					continue;
				if(ownerNode.Id == "expresscraft")
				{
					DefaultStyleSheet = sheets[i];					
				}				
				if(ownerNode.Id == "expresscraftplugin")
				{
					PluginStyleSheet = sheets[i];
				}
			}
			if(DefaultStyleSheet == null)
				return;
            var df = GetStyleRuleValue("font", ".control");
            if (df != null)
                DefaultFont = df;

        }

		public static dynamic GetStyleRuleValue(string style, string className)
		{
            try
            {
                if (PluginStyleSheet != null)
                {
                    dynamic pStyles = PluginStyleSheet;
                    if (pStyles.cssRules)
                    {
                        for (int i = 0; i < pStyles.cssRules.length; i++)
                        {
                            dynamic rule = pStyles.cssRules[i];
                            if (rule.selectorText && rule.selectorText.split(',').indexOf(className) != -1)
                            {
                                return rule.style[style];
                            }
                        }
                    }
                }

                if (DefaultStyleSheet == null)
                    return null;
                dynamic Styles = DefaultStyleSheet;
                if (!Styles.cssRules)
                    return null;

                for (int i = 0; i < Styles.cssRules.length; i++)
                {
                    dynamic rule = Styles.cssRules[i];
                    if (rule.selectorText && rule.selectorText.split(',').indexOf(className) != -1)
                    {
                        return rule.style[style];
                    }
                }
            }
            catch (Exception)
            {
                
            }
			
			return null;
		}		

		//function getStyleRuleValue(style, selector, sheet)
		//{
		//	var sheets = typeof sheet !== 'undefined'?[sheet] : document.styleSheets;
		//	for(var i = 0, l = sheets.length; i < l; i++)
		//	{
		//		var sheet = sheets[i];
		//		if(!sheet.cssRules) { continue; }
		//		for(var j = 0, k = sheet.cssRules.length; j < k; j++)
		//		{
		//			var rule = sheet.cssRules[j];
		//			if(rule.selectorText && rule.selectorText.split(',').indexOf(selector) !== -1)
		//			{
		//				return rule.style[style];
		//			}
		//		}
		//	}
		//	return null;
		//}
	}
}
