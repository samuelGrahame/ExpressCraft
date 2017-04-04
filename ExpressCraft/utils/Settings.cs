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
		private static HTMLStyleElement themeElement = null;
		private static string _primaryThemeColor = "#0173C7";
		public static string PrimaryThemeColor {
			get { return _primaryThemeColor; }
			set {
				if(_primaryThemeColor != value)
				{
					if(themeElement != null)
					{
						themeElement.ParentElement.RemoveChild(themeElement);
					}
					_primaryThemeColor = value;
					if(!string.IsNullOrWhiteSpace(value))
					{											
						themeElement = new HTMLStyleElement();

						themeElement.InnerHTML = string.Format(ThemeTemplate, _primaryThemeColor) ;

						Document.Body.AppendChild(themeElement);
					}
				}
			}
		}

		private static string ThemeTemplate = @"
.form-base{
	border-color:{0};
}
.form-heading
{
	background-color:{0};
}
.progressbarbody
{
	background-color:{0};
}
.control:focus:not(.grid)
{
	outline: dashed 1px {0};
}
.ribboncontrol
{
	background-color:{0};
    border-left-color:{0};
    border-right-color:{0};
}
.ribbonpageheader-hidden
{
	background-color:{0};
}
@keyframes ColorFlash
{
	from {background-color: white;}
    to {background-color: {0};}
}
";
	}
}
