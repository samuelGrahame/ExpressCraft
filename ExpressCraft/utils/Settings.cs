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
        public const string Font = "8.25pt \"Tahoma\"";
        //public const string Font = "8.25pt Tahoma";//Consolas
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
            

        public static int ToolTipPopupDelayMs = 1000;
        public static int ToolTipPopupStayOpenDelayPerWordMs = 250;
    }
}