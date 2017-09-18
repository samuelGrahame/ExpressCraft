using Bridge;
using Bridge.Html5;
using System;
using System.Collections.Generic;

namespace ExpressCraft
{
    public static class Settings
    {
        public static string NetworkURL = "Host.ashx";
        public static string ResourceURL = "./images/";
        public static bool AutoRender = true;
        public const string Font = "8.25pt Tahoma";
        public static decimal TaxPercent { get; set; } = 0.1m;
        public static bool AlignFormToGrid = false;
        public static int AlignmentForForm = 0;
        public static string DefaultFont = Font;

        /// <summary>
        /// Only for firefox - as no error with number input
        /// </summary>
        public static bool OnFocusSelectAll = true;

        public static StyleSheet DefaultStyleSheet;
        public static StyleSheet PluginStyleSheet;
        internal static List<StyleSheet> resourceManangerSheets = new List<StyleSheet>();

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

        public static DatePosition DayPosition = DatePosition.First;
        public static DatePosition MonthPosition = DatePosition.Second;
        public static DatePosition YearPosition = DatePosition.Third;

        public static bool DisableTextPopupEditor = false;

        public static char DateSeperator = '/';

        public enum DatePosition
        {
            First,
            Second,
            Third
        }

        public static Vector2 ConsoleDefaultSize = new Vector2(540, 240);

        public static bool MessageFormBeep = false;

        public static int MaximumPixelScrollingRows = 500000;

        public static Action<string> OnSendError = null;

        public static bool IsChrome = Browser.IsChrome;

        public static bool AllowCloseWithoutQuestion = false;

        public static Action OnApplicationClose = null;

        public static bool ShowExceptionDialog = true;

        public static int FormFadeDuration = 100;

        /// <summary>
        /// Increase Render Speed
        /// </summary>
        public static bool RemoveAttributesOffElementsWhenLoseFocus;

        public static void Setup()
        {
            ActiveTheme = Theme.Theme1;
            SetupStyleDefaults();
        }

        public static void SetupStyleDefaults()
        {
            try
            {
                StyleSheetList sheets = Document.StyleSheets;
                for(int i = 0; i < sheets.Length; i++)
                {
                    var ownerNode = sheets[i].OwnerNode as HTMLLinkElement;
                    if(ownerNode == null)
                        continue;
                    if(ownerNode.Id.ToLower() == "expresscraft")
                    {
                        DefaultStyleSheet = sheets[i];
                    }
                    if(ownerNode.Id.ToLower() == "expresscraftplugin")
                    {
                        PluginStyleSheet = sheets[i];
                    }
                    if(ownerNode.Id.ToLower() == "resourcemanager")
                    {
                        resourceManangerSheets.Add(sheets[i]);
                    }
                }
                if(DefaultStyleSheet == null)
                    return;
                var df = GetExpressStyleRuleValue("font", ".control");
                if(df != null)
                    DefaultFont = df;
            }
            catch(Exception)
            {
            }
        }

        public static dynamic GetStyleRuleValue(List<StyleSheet> cssFile, string style, string className)
        {
            try
            {
                if(cssFile != null)
                {
                    foreach(var item in cssFile)
                    {
                        dynamic value = GetStyleRuleValue(item, style, className);
                        if(value != null)
                        {
                            return value;
                        }
                    }
                }
            }
            catch(Exception)
            {
            }
            return null;
        }

        public static dynamic GetStyleRuleValue(StyleSheet cssFile, string style, string className)
        {
            try
            {
                if(cssFile != null)
                {
                    dynamic pStyles = cssFile;
                    if(pStyles.cssRules)
                    {
                        for(int i = 0; i < pStyles.cssRules.length; i++)
                        {
                            dynamic rule = pStyles.cssRules[i];
                            if(rule.selectorText && rule.selectorText.split(',').indexOf(className) != -1)
                            {
                                return rule.style[style];
                            }
                        }
                    }
                }
            }
            catch(Exception)
            {
            }
            return null;
        }

        public static dynamic GetExpressStyleRuleValue(string style, string className)
        {
            dynamic value = GetStyleRuleValue(PluginStyleSheet, style, className);
            if(value == null)
            {
                value = GetStyleRuleValue(DefaultStyleSheet, style, className);
            }
            return value;
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
            var objList = new List<object>();
            objList.AddRange(_activeTheme.Colors);
            objList.AddRange(new object[] { "control", "background-color", "border", "ribbon", "-left-color", "-top-color", "-right-color", "-bottom-color", "button", "form-heading", "pageheader", "heading" });

            themeElement = new HTMLStyleElement()
            {
                InnerHTML = string.Format(themeTemplate.Replace("#focusLine;", _includeFocusRegion ? themefocusValue : string.Empty),
                objList.ToArray())
            };

            Document.Body.AppendChild(themeElement);
        }

        private static bool _includeFocusRegion = true;

        public static bool IncludeFocusRegion
        {
            get
            {
                return _includeFocusRegion;
            }
            set
            {
                if(_includeFocusRegion != value)
                {
                    _includeFocusRegion = value;
                    ApplyActiveTheme();
                }
            }
        }

        private static Theme _activeTheme = null;

        public static Theme ActiveTheme
        {
            get { return _activeTheme; }
            set
            {
                if(_activeTheme != value)
                {
                    _activeTheme = value;
                    ApplyActiveTheme();
                }
            }
        }

        //ThemeForm

        #region ThemeTemplateCode

        private static string themefocusValue = @".{25}:focus:not(.grid){{
border: solid 1px {0};
}}";

        private static string themeTemplate = @".{25}{{
    color:{22};
}}
#focusLine;
.{25}::selection{{
{26}:{1};
}}
.{25}::-moz-selection{{
{26}:{1};
}}
.{25}:disabled{{
{26}:{2};
}}
.input{25}:read-only{{
{26}:{3};
}}
.{28}{25}{{
{26}:{0};
{27}{29}:{0};
{27}{31}:{0};
{27}{32}:{1};
}}
.{28}page{{
{26}:{3};
}}
.{28}group{{
{26}:{3};
}}
.{28}{33}{{
{26}:{3};
}}
.{28}{33}:hover:not(:active):not(.disabled)
{{
{26}:{4};
}}
.{28}{33}:active:not(.disabled){{
{26}:{5};
}}
.{28}{33}small{{
{26}:{3};
}}
.{28}{33}small:hover:not(:active):not(.disabled)
{{
{26}:{4};
}}
.{28}{33}small:active:not(.disabled){{
{26}:{5};
}}
.{28}seperator{{
{26}:{1};
}}
.{28}{35}-hidden{{
{26}:{0};
color:{23};
}}
.{28}{35}-hidden:hover{{
{26}:{6};
}}
.{28}{35}-active{{
{26}:{3};
}}
.tab{25}{{
{26}:{3};
}}
.tab{25}page{{
{26}:{3};
{27}{29}:{1};
{27}{31}:{1};
{27}{32}:{1};
}}
.tab{25}{35} {{
{26}:{3};
}}
.tab{25}{35}-hidden{{
{27}{30}:{3};
{27}{29}:{3};
{27}{31}:{3};
{27}{32}:transparent;
}}
.tab{25}{35}-hidden:hover{{
{26}:{7};
{27}{29}:{7};
{27}{31}:{7};
}}
.tab{25}{35}-active{{
{27}{30}:{0};
{27}{29}:{1};
{27}{31}:{1};
{27}{32}:{3};
border-top-width:2px;
line-height:18px;
top:2px;
}}
.tab{25}{35}-close{33}{{
color:{1};
}}
.tab{25}{35}-close{33}:hover{{
color:{24};
	{26}:{2};
	{27}:1px solid {19};
}}
.input{25} {{
{27}:1px solid {1};
{26}:{14};
}}
.simple{33}{{
{27}:1px solid {19};
{26}:{3};
}}
.simple{33}:hover:not(.disabled)
{{
	{26}:{1};
}}
.simple{33}:active:not(.disabled)
{{
	{26}:{12};
{27}: 1px solid {20};
}}
@keyframes ColorFlash {{
from {{ {26}: {23};}}
to {{ {26}: {0};}}
}}
.form-base{{
{27}-color:{0};
}}
.{34}{{
{26}:{0};
}}
.{34}-title{{
color:{23};
}}
.{34}-{33}{{
color:{23};
}}
.{34}-{33}:hover:not(.{34}-{33}-close){{
{26}:{8};
}}
.{34}-{33}:active:not(.{34}-{33}-close){{
{26}:{9};
}}
.{34}-{33}-close:hover{{
{26}:{10};
}}
.{34}-{33}-close:active{{
{26}:{11};
}}
.cell{{
{27}: 1px solid {3};
}}
.cellrow{{
{26}:{14};
}}
.cellrow:hover{{
{26}:{3} !important;
}}
.cellrow:active{{
{26}:{12} !important;
}}
.even{{
   {26}:{13} !important;
}}
.cellrow-selected{{
{26}:{17} !important;
}}
.cellrow-selected:hover{{
{26}:{18} !important;
}}
.{36}{{
{26}:{3};
{27}-right:1px solid {19} !important;
}}
.{36}:hover{{
{26}:{1};
}}
.{36}:active{{
{26}:{12};
}}
.{36}-container{{
{26}:{3};
{27}-bottom:1px solid {19} !important;
}}
.grid{{
{26}:{14};
{27}:1px solid {19};
}}
.progressbar{{
{27}:1px solid {19};
{26}:{14};
}}
.progressbarbody{{
{26}:{0};
}}
.contextmenu{{
{26}:{14};
{27}: solid 1px {21};
}}
.contextitem:hover{{
{26}:{15};
}}
.contextitemseperator{{
{26}:{16};
}}
.dialog{33}section{{
{26}:{3};
}}
.split{25}
{{
{27}:1px solid {19};
}}
.splittervertical {{
{27}-left: 1px {4} solid;
{27}-right: 1px {4} solid;
}}
.splitterhorizontal {{
{27}-top: 1px {4} solid;
{27}-bottom: 1px {4} solid;
}}
.splitterhorizontal:hover {{
{26}:{4};
}}
.splittervertical:hover {{
{26}:{4};
}}
.tool-tip{{
{26}:{14};
{27}: solid 1px {21};
}}
.{34}-min:hover{{
	{26}:{8};
}}
.simplebutton-active
{{
	{26}:{12};
{27}: 1px solid {20};
}}
.primary{{
    {26}:{0};
}}
.tabheader-container{{
    border-bottom: 2px {0} solid;
}}
";

        #endregion ThemeTemplateCode

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
        // control {25}
        // background-color {26}
        // border {27}
        // ribbon {28}
        // -left-color {29}
        // -top-color {30}
        // -right-color {31}
        // -bottom-color {32}
        // button {33}
        // form-heading {34}
        // pageheader {35}
        // heading {36}

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