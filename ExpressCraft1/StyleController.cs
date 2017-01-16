using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge;

namespace ExpressCraft
{
	public static class StyleController
	{
		public static string CSS_calc = "calc";

		public static void Setup()
		{
			if(Browser.IsChrome)
			{
				if(Browser.ChromeVersion < 26.0)
					CSS_calc = "-webkit-calc";
			}
			else if(IsFireFox())
			{
				if(Browser.FirefoxVersion < 16.0)
				{
					CSS_calc = "-moz-calc";
				}
			}
			else if(Browser.IsSafari)
			{
				if(Browser.SafariVersion < 7.0)
				{
					CSS_calc = "-webkit-calc";
				}
			}
		}

		public static bool IsFireFox()
		{
			return Browser.IsFF10 || Browser.IsFF3_0 || Browser.IsFF3_5 || Browser.IsFF3_6 || Browser.IsFF4 || Browser.IsFF5;
		}

		public static string Calc(float percent, int value, bool isPixels = true, bool roundPercent = true)
		{
			return string.Format("{0}({1}% - {2}{3})", CSS_calc, roundPercent ? Math.Round(percent, 0) : percent, value, isPixels ? "px" : "em");
		}
	}
}
