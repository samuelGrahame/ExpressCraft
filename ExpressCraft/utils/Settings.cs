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
		public static bool GridViewAutoColumnFormatDates = true;
		public static bool GridViewBlurOnScroll = false;
        public static int GridViewRowScrollPadding = 0;

		public static bool GridViewScrollDelayed = false;
		public static int GridViewScrollDelayMS = 25;

		public static int ContextMenuStartingZIndex = 500;
		public static int ContextMenuMinWidth = 200;

		public static int MessageFormTextMaximumHeightInPx = 500;
		public static int MessageFormTextMinimumHeightInPx = 32;
		public static int MessageFormMinimumWidthInPx = 195;

		public static Vector2 ConsoleDefaultSize = new Vector2(540, 240);

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

		public static bool ShowExceptionDialog = true;

		public static int FormFadeDuration = 100;

		public static void Setup()
		{
			SetupStyleDefaults();
			ActiveTheme = Theme.Theme1;	
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
		public static void ApplyActiveTheme()
		{
			if(themeElement != null)
			{
				themeElement.ParentElement.RemoveChild(themeElement);
			}
			if(_activeTheme == null)
				_activeTheme = Theme.Theme1;			

			themeElement = new HTMLStyleElement()
			{
				InnerHTML = string.Format(ThemeTemplate,
				_activeTheme.Colors[0],
				_activeTheme.Colors[1],
				_activeTheme.Colors[2],
				_activeTheme.Colors[3],
				_activeTheme.Colors[4],
				_activeTheme.Colors[5],
				_activeTheme.Colors[6],
				_activeTheme.Colors[7],
				_activeTheme.Colors[8],
				_activeTheme.Colors[9],
				_activeTheme.Colors[10],
				_activeTheme.Colors[11],
				_activeTheme.Colors[12],
				_activeTheme.Colors[13],
				_activeTheme.Colors[14],
				_activeTheme.Colors[15],
				_activeTheme.Colors[16],
				_activeTheme.Colors[17],
				_activeTheme.Colors[18],
				_activeTheme.Colors[19],
				_activeTheme.Colors[20],
				_activeTheme.Colors[21],
				_activeTheme.Colors[22],
				_activeTheme.Colors[23],
				_activeTheme.Colors[24])
			};

			Document.Body.AppendChild(themeElement);
		}

		private static Theme _activeTheme = null;
		public static Theme ActiveTheme {
			get { return _activeTheme; }
			set {
				if(_activeTheme != value)
				{
					_activeTheme = value;
					ApplyActiveTheme();
				}
			}
		}
		//ThemeForm
		#region ThemeTemplateCode
		private static string ThemeTemplate = @"
.control{{
    color:{22};
}}
.control:focus:not(.grid){{
    outline: dashed 1px {0};
}}
.control::selection{{
    background-color:{1};
}}
.control::-moz-selection{{
    background-color:{1};
}}
.control:disabled{{
    background-color:{2};
}}
.inputcontrol:read-only{{
    background-color:{3};
}}
.ribboncontrol{{
    background-color:{0};
    border-left-color:{0};
    border-right-color:{0};
    border-bottom-color:{1};
}}
.ribbonpage{{
    background-color:{3};
}}
.ribbongroup{{
    background-color:{3};
}}
.ribbonbutton{{
    background-color:{3};            
}}
.ribbonbutton:hover:not(:active):not(.disabled)
{{
    background-color:{4};
}}
.ribbonbutton:active:not(.disabled){{
    background-color:{5};
}}
.ribbonbuttonsmall{{
    background-color:{3};             
}}
.ribbonbuttonsmall:hover:not(:active):not(.disabled)
{{
    background-color:{4};
}}
.ribbonbuttonsmall:active:not(.disabled){{
    background-color:{5};
}}
.ribbonseperator{{
    background-color:{1};
}}
.ribbonpageheader-hidden{{
    background-color:{0};
    color:{23};
}}
.ribbonpageheader-hidden:hover{{
    background-color:{6};
}}
.ribbonpageheader-active{{
    background-color:{3};
}}
.tabcontrol{{
    background-color:{3};
}}
.tabcontrolpage{{
    background-color:{3};
    border-top-color:{1};
    border-left-color:{1};
    border-right-color:{1};
    border-bottom-color:{1};
}}
.tabcontrolpageheader {{
    background-color:{3};           
}}
.tabcontrolpageheader-hidden{{
    border-top-color:{3};
    border-left-color:{3};
    border-right-color:{3};
    border-bottom-color:{1};
}}
.tabcontrolpageheader-hidden:hover{{
    background-color:{7};
    border-left-color:{7};
    border-right-color:{7};
}}
.tabcontrolpageheader-active{{
    border-top-color:{1};
    border-left-color:{1};
    border-right-color:{1};
    border-bottom-color:{3};
}}
.tabcontrolpageheader-closebutton{{
    color:{1};	
}}
.tabcontrolpageheader-closebutton:hover{{
    color:{24};
	background-color:{2};
	border:1px solid {19};
}}
.inputcontrol {{
    border:1px solid {1};   
    background-color:{14};    
}}
.simplebutton{{
    border:1px solid {19};
    background-color:{3};
}}
.simplebutton:hover:not(.disabled)
{{
	background-color:{1};
}}
.simplebutton:active:not(.disabled)
{{
	background-color:{12};
    border: 1px solid {20};
}}
@keyframes ColorFlash {{
    from {{ background-color: {23};}}
    to {{ background-color: {0};}}
}}
.form-base{{
    border-color:{0};
}}
.form-heading{{
    background-color:{0};      
}}
.form-heading-title{{
    color:{23};     
}}
.form-heading-button{{
    color:{23};
}}
.form-heading-button:hover:not(.form-heading-button-close){{
    background-color:{8};
}}
.form-heading-button:active:not(.form-heading-button-close){{
    background-color:{9};
}}
.form-heading-button-close:hover{{
    background-color:{10};
}}
.form-heading-button-close:active{{
    background-color:{11};
}}
.cell{{
    border: 1px solid {3};       
}}
.cellrow{{
    background-color:{14};
}}
.cellrow:hover{{
    background-color:{3} !important;    
}}
.cellrow:active{{
    background-color:{12} !important;
}}
.even{{
   background-color:{13} !important;
}}
.cellrow-selected{{
    background-color:{17} !important;    
}}
.cellrow-selected:hover{{
    background-color:{18} !important;    
}}
.heading{{
    background-color:{3};
    border-right:1px solid {19} !important;
}}
.heading:hover{{
    background-color:{1};
}}
.heading:active{{
    background-color:{12};
}}
.heading-container{{
    background-color:{3};
    border-bottom:1px solid {19} !important;	
}}
.grid{{
    background-color:{14};
    border:1px solid {19}; 
}}
.progressbar{{
    border:1px solid {19};
    background-color:{14};
}}
.progressbarbody{{
    background-color:{0};
}}
.contextmenu{{
    background-color:{14};     
    border: solid 1px {21};
}}
.contextitem:hover{{
    background-color:{15};
}}
.contextitemseperator{{
    background-color:{16};
}}
.dialogbuttonsection{{    
    background-color:{3};
}}
.splitcontrol
{{
    border:1px solid {19};
}}
.splittervertical {{
    border-left: 1px {4} solid;
    border-right: 1px {4} solid;
}}
.splitterhorizontal {{
    border-top: 1px {4} solid;
    border-bottom: 1px {4} solid;
}}
.splitterhorizontal:hover {{
    background-color:{4};    
}}
.splittervertical:hover {{
    background-color:{4};
}}
.tool-tip{
	background-color:{14};
    border: solid 1px {21};
}
";
		#endregion

		public static bool OnF2ShowThemeForm = true;

		public static int ToolTipPopupDelayMs = 1000;
		public static int ToolTipPopupStayOpenDelayPerWordMs = 250;
	}
	public class Theme
	{
		public string[] Colors { get; set; }
		//public string BackgroundColor1; // #0173C7 {0} form header color ribbon color etc, ribbon header hidden - not active..
		//public string BackgroundColor2; // #C5C5C5 {1} text selection back color, ribbon spliter
		//public string BackgroundColor3; // #CCCCCC {2} disabled backcolor
		//public string BackgroundColor4; // #F0F0F0 {3} input backcolor... - ribbon page back, ribbon group, ribbon button, ribbonsmall, ribbon header active colro
		//public string BackgroundColor5; // #C3C3C3 {4}ribbon items disabled, ribbon hover
		//public string BackgroundColor6; // #ADADAD {5} ribbon button Active		

		//public string BackgroundColor7; // #2A8AD0 {6} ribbon header hidden hover
		//public string BackgroundColor8; // #D3D3D3 {7} tabcontrol header hidden
		//public string BackgroundColor9; // #2A8AD4 {8} Form Heading Button not close Hover.
		//public string BackgroundColor10; // #015C9F {9} Form Heading Button not close Active.
		//public string BackgroundColor11; // #E81123 {10} Form Heading Button close Hover.
		//public string BackgroundColor12; // #F1707A {11} Form Heading Button close Active.
		//public string BackgroundColor13; // #AEAEAE {12} CellRow Active
		//public string BackgroundColor14; // #FAFAFA {13}; Row Even			
		//public string BackgroundColor15; // white {14} Context Menu Back Color
		//public string BackgroundColor16; // #CFCFCF {15} Context Menu Item Hover
		//public string BackgroundColor17; // #B9B9B9 {16} Context Menu Item Splitter

		//public string BackgroundColor18; // rgba(1, 115, 199, 0.3) {17} CellRow-Selected
		//public string BackgroundColor19; // rgba(1, 115, 199, 0.5) {18} CellRow-Selected

		//public string BorderColor1; // #A6A6A6 {19} Button Border, splitter Border
		//public string BorderColor2; // #777777 {20} button Border Active
		//public string BorderColor3; // #80868A {21} Context Menu Border Color
		//public string ForeColor1; // #404040 {22}
		//public string ForeColor2; // ribbonpageheader white {23} ribbonpageheader-hidden
		//public string ForeColor3; // ribbonpageheader black {24} Hover tabcontrolpageheader-closebutton

		public Theme(params string[] colors)
		{
			if(colors != null && colors.Length == 25)
			{
				Colors = colors;				
			}
			
			//BackgroundColor1 = bgc1;
			//BackgroundColor2 = bgc2;
			//BackgroundColor3 = bgc3;
			//BackgroundColor4 = bgc4;
			//BackgroundColor5 = bgc5;
			//BackgroundColor6 = bgc6;
			//BackgroundColor7 = bgc7;
			//BackgroundColor8 = bgc8;
			//BackgroundColor9 = bgc9;
			//BackgroundColor10 = bgc10;
			//BackgroundColor11 = bgc11;
			//BackgroundColor12 = bgc12;
			//BackgroundColor13 = bgc13;
			//BackgroundColor14 = bgc14;		
			//BackgroundColor15 = bgc15;
			//BackgroundColor16 = bgc16;
			//BackgroundColor17 = bgc17;
			//BackgroundColor18 = bgc18;
			//BackgroundColor19 = bgc19;
			//BorderColor1 = bc1;
			//BorderColor2 = bc2;
			//BorderColor3 = bc3;
			//ForeColor1 = fc1;
			//ForeColor2 = fc2;
			//ForeColor3 = fc3;
		}

		public static Theme Theme1 = new Theme(
			"#0173C7", "#C5C5C5", "#CCCCCC",
			"#F0F0F0", "#C3C3C3", "#ADADAD",
			"#2A8AD0", "#D3D3D3", "#2A8AD4",
			"#015C9F", "#E81123", "#F1707A",
			"#AEAEAE", "#FAFAFA", "#ffffff",
			"#CFCFCF", "#B9B9B9", "rgba(1, 115, 199, 0.3)",
			"rgba(1, 115, 199, 0.5)", "#A6A6A6",
			"#777777", "#80868A", "#404040",
			"#ffffff", "#000000");		
	}
}
