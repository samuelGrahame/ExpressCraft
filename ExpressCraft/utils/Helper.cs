using Bridge;
using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using static ExpressCraft.Settings;

namespace ExpressCraft
{
    public static class Helper
    {
        public class DataTableJson
        {
            public string[] fieldNames = null;
            public object[][] rows = null;
            public DataType[] dataTypes = null;

            public static DataTableJson FromExternal(object o)
            {
                DataTableJson x;
                x = Script.Write<DataTableJson>("Bridge.merge(Bridge.createInstance(ExpressCraft.Helper.DataTableJson), o);");
                return x;
            }

            public static DataTable Parse(dynamic o)
            {
                DataTable dt = new DataTable();
                var length = o.fieldNames.length;
                for(int i = 0; i < length; i++)
                {
                    dt.AddColumn(o.fieldNames[i], o.dataTypes[i]);
                }
                if(o.rows != null)
                {
                    length = o.rows.length;
                    dt.BeginNewRow(length);

                    for(int i = 0; i < length; i++)
                    {
                        var dr = dt.NewRow();
                        dr.batchData = o.rows[i];
                    }
                    dt.AcceptNewRows();
                }
                return dt;
            }

            public DataTable ToTable()
            {
                var dt = new DataTable();

                for(int i = 0; i < fieldNames.Length; i++)
                {
                    dt.AddColumn(fieldNames[i], dataTypes[i]);
                }

                if(rows != null)
                {
                    dt.BeginNewRow(rows.Length);

                    for(int i = 0; i < rows.Length; i++)
                    {
                        var dr = dt.NewRow();
                        dr.batchData = rows[i];
                    }
                    dt.AcceptNewRows();
                }

                return dt;
            }
        }

        public static bool IsIPhone()
        {
            bool r = false;
            /*@
           r = !!navigator.userAgent.match(/iPhone/i);
           */
            return r;
        }

        public static bool IsIPad()
        {
            bool r = false;
            /*@
           r = !!navigator.userAgent.match(/iPad/i);
           */
            return r;
        }

        private static bool _notDesktop;
        public static bool _setupDesktop;

        public static bool NotDesktop
        {
            get
            {
                var result = _setupDesktop ? _notDesktop : _notDesktop = (!Browser.IsDesktop || IsIPhone() || IsIPad());
                _setupDesktop = true;
                return result;
            }
        }

        public static int IsTrue(this string value)
        {
            return ((value = value.ToLower()) == "true" || value == "1" || value == "on") ? 1 : 0;
        }

        public static int ToInt(this Union<string, int, float> value)
        {
            return Global.ParseInt(value.As<string>());
        }

        public static float ToFloat(this Union<string, int, float> value)
        {
            return (float)Global.ParseFloat(value.As<string>());
        }

        public static string ToStr(this Union<string, int, float> value)
        {
            return value.As<string>();
        }

        public static bool IsFireFox()
        {
            bool value = false;

            /*@
if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
{
    value = true;
}
			*/
            return value;
        }

        public static void FocusElement(this HTMLElement element)
        {
            Global.SetTimeout(() =>
            {
                element.Focus();
            }, 0);
        }

        public static decimal StripNonNumberString(this string value)
        {
            if(string.IsNullOrWhiteSpace(value))
                return 0;

            var builder = new StringBuilder();

            bool AddedDigits = false;

            for(int i = 0; i < value.Length; i++)
            {
                if(char.IsDigit(value[i]) || value[i] == '.')
                {
                    builder.Append(value[i]);
                    AddedDigits = true;
                }
                else if(value[i] == '-' && !AddedDigits)
                {
                    builder.Append(value[i]);
                    AddedDigits = true;
                }
            }

            decimal value1 = 0;
            decimal.TryParse(builder.ToString(), out value1);

            return value1;
        }

        public static DateTime StripNonDateString(this string value)
        {
            if(string.IsNullOrWhiteSpace(value))
                return DateTime.MinValue;

            try
            {
                value = value.Trim().Replace('\\', DateSeperator);

                bool startsWithPlus = (value.StartsWith("+"));
                bool startsWithMunus = !startsWithPlus && (value.StartsWith("-"));

                if(startsWithMunus)
                {
                    value = value.Substring(1);
                }

                value = value.Replace('-', DateSeperator);

                bool endsWithMonth = (startsWithPlus || startsWithMunus) && (value.ToLower().EndsWith("m"));
                bool endsWithyear = !endsWithMonth && (startsWithPlus || startsWithMunus) && (value.ToLower().EndsWith("y"));

                if(value.ToLower() == "d")
                {
                    return DateTime.Today;
                }

                var builder = new StringBuilder();

                List<int> Values = new List<int>();

                for(int i = 0; i < value.Length; i++)
                {
                    if(char.IsDigit(value[i]))
                        builder.Append(value[i]);
                    else if(value[i] == DateSeperator)
                    {
                        Values.Add(int.Parse(builder.ToString()));
                        builder = new StringBuilder();
                    }
                }

                if(builder.Length > 0)
                {
                    Values.Add(int.Parse(builder.ToString()));
                }

                builder = null;
                if(Values.Count >= 3)
                {
                    return new DateTime(Values[(int)YearPosition], Values[(int)MonthPosition], Values[(int)DayPosition]);
                }
                else if(Values.Count == 1)
                {
                    if(DayPosition == DatePosition.First)
                    {
                        if(startsWithPlus || startsWithMunus)
                        {
                            var date = DateTime.Today;
                            if(endsWithMonth)
                            {
                                date = date.AddMonths(startsWithMunus ? -Values[0] : Values[0]);
                            }
                            else if(endsWithyear)
                            {
                                if(startsWithMunus)
                                {
                                    date = date.AddYears(-Values[0]);
                                }
                                else
                                {
                                    date = date.AddYears(Values[0]);
                                }
                            }
                            else
                            {
                                date = date.AddDays(startsWithMunus ? -Values[0] : Values[0]);
                            }
                            if(date.Hour == 23)
                            {
                                date.AddHours(1);
                            }
                            return date;
                        }
                        else
                        {
                            return new DateTime(DateTime.Today.Year, DateTime.Today.Month, Values[0]);
                        }
                    }
                    else if(MonthPosition == DatePosition.First)
                    {
                        return new DateTime(DateTime.Today.Year, Values[0], DateTime.Today.Day);
                    }
                    else if(YearPosition == DatePosition.First)
                    {
                        return new DateTime(Values[0], DateTime.Today.Month, DateTime.Today.Day);
                    }
                }
                else if(Values.Count == 2)
                {
                    if(DayPosition == DatePosition.First && MonthPosition == DatePosition.Second)
                    {
                        return new DateTime(DateTime.Today.Year, Values[1], Values[0]);
                    }
                    else if(DayPosition == DatePosition.Second && MonthPosition == DatePosition.First)
                    {
                        return new DateTime(DateTime.Today.Year, Values[0], Values[1]);
                    }
                    else if(YearPosition == DatePosition.Second && MonthPosition == DatePosition.First)
                    {
                        return new DateTime(Values[1], Values[0], DateTime.Today.Day);
                    }
                    else if(YearPosition == DatePosition.First && MonthPosition == DatePosition.Second)
                    {
                        return new DateTime(Values[0], Values[1], DateTime.Today.Day);
                    }
                }
            }
            catch(Exception)
            {
            }

            return DateTime.MinValue;
        }

        public static decimal AddTax(decimal value, decimal taxPercent = -1)
        {
            if(value == 0)
                return value;

            if(taxPercent == -1)
                taxPercent = Settings.TaxPercent;
            if(taxPercent == 0)
                return value;

            return value * (1 + taxPercent);
        }

        public static decimal GetPortionTax(decimal value, decimal taxPercent = -1)
        {
            if(value == 0)
                return value;

            if(taxPercent == -1)
                taxPercent = Settings.TaxPercent;
            if(taxPercent == 0)
                return 0;

            return value - value / (1 + taxPercent);
        }

        public static decimal DeductTax(decimal value, decimal taxPercent = -1)
        {
            if(value == 0)
                return value;

            if(taxPercent == -1)
                taxPercent = Settings.TaxPercent;
            if(taxPercent == 0)
                return value;

            return value - GetPortionTax(value, taxPercent);
        }

        public static bool IsNumber(this object value)
        {
            return value is sbyte
                    || value is byte
                    || value is short
                    || value is ushort
                    || value is int
                    || value is uint
                    || value is long
                    || value is ulong
                    || value is float
                    || value is double
                    || value is decimal;
        }

        public static void Empty(this HTMLElement element)
        {
            /*@
			var len = element.childNodes.length;
			while(len--)
			{
				element.removeChild(element.lastChild);
			};
			*/
        }

        public static Vector2 GetClientMouseLocation(object e)
        {
            var x = 0;
            var y = 0;
            /*@
			  if (!e) var e = window.event;

			  if (e.pageX || e.pageY) {
				x = e.pageX;
				y = e.pageY;
			  } else if (e.clientX || e.clientY) {
				x = e.clientX + document.body.scrollLeft +
								   document.documentElement.scrollLeft;
				y = e.clientY + document.body.scrollTop +
								   document.documentElement.scrollTop;
			  }
			*/
            return new Vector2(x, y);
        }

        public static void SetChecked(this Control input, object value)
        {
            input.Content.SetChecked(value);
        }

        public static void SetChecked(this HTMLElement input, object value)
        {
            bool check = false;
            if(value != null)
            {
                if(value is bool || value.IsNumber())
                {
                    check = (bool)value;
                }
                else if(value is string)
                {
                    string strValue = ((string)value);
                    check = (strValue == "1" || string.Compare(strValue.ToLower(), "true") == 0);
                }
            }
            if(!check)
            {
                input.RemoveAttribute(GridViewCellDisplayCheckBox.resource_checked);
            }
            else
            {
                input.SetAttribute(GridViewCellDisplayCheckBox.resource_checked, null);
            }
        }

        /// <summary>
        /// IE does not support .remove on Element use delete
        /// </summary>
        /// <param name="c"></param>
        public static void Delete(this Element c)
        {
            if(c != null &&
                c.ParentElement != null &&
                c.ParentElement.Contains(c))
                c.ParentElement.RemoveChild(c);
        }

        public static string ToPx(this object i)
        {
            return Script.Write<string>("i + 'px'");
        }

        public static void Log(object jso)
        {
            Script.Call("console.log", jso);
        }

        public static void AppendChildren(this Node c, params Node[] Nodes)
        {
            if(Nodes != null && Nodes.Length > 0)
            {
                for(int i = 0; i < Nodes.Length; i++)
                {
                    c.AppendChild(Nodes[i]);
                }
            }
        }

        public static void AppendChildrenTabIndex(this Node c, params Control[] Nodes)
        {
            if(Nodes != null && Nodes.Length > 0)
            {
                for(int i = 0; i < Nodes.Length; i++)
                {
                    Nodes[i].Content.TabIndex = i;
                    c.AppendChild(Nodes[i]);
                }
            }
        }

        public static void AppendChildrenTabIndex(this Control c, params Control[] Nodes)
        {
            c.Content.AppendChildrenTabIndex(Nodes);
        }

        public static Control AppendChild(this Control c, Control Node)
        {
            c.Content.AppendChild(Node);
            return c;
        }

        public static Control AppendChildren(this Control c, params Control[] Nodes)
        {
            c.Content.AppendChildren(Nodes);

            return c;
        }

        public static void AppendChildren(this Node c, params Control[] Nodes)
        {
            if(Nodes != null && Nodes.Length > 0)
            {
                for(int i = 0; i < Nodes.Length; i++)
                {
                    c.AppendChild(Nodes[i]);
                }
            }
        }

        public static Control SetBounds(this Control c, Union<string, int, float> left, Union<string, int, float> top, Union<string, int, float> width, Union<string, int, float> height)
        {
            c.Content.SetBounds(left, top, width, height);

            return c;
        }

        public static Control SetBoundsFull(this Control c)
        {
            c.Content.SetBoundsFull();

            return c;
        }

        public static void SetBoundsFull(this HTMLElement c)
        {
            c.SetBounds(0, 0, "100%", "100%");
        }

        public static Control SetSize(this Control c, Union<string, int, float> width, Union<string, int, float> height)
        {
            c.Content.SetSize(width, height);

            return c;
        }

        public static void SetBounds(this HTMLElement c, Union<string, int, float> left, Union<string, int, float> top, Union<string, int, float> width, Union<string, int, float> height)
        {
            c.Style.Left = left.ToHtmlValue();
            c.Style.Top = top.ToHtmlValue();
            c.Style.Width = width.ToHtmlValue();
            c.Style.Height = height.ToHtmlValue();
        }

        public static string ToHtmlValue(this Union<string, int, float> value)
        {
            if(value.Is<string>())
                return Vector2.pf(value.As<string>());
            else if(value.Is<int>())
                return value.As<int>().ToPx();
            else
                return value.As<float>().ToPx();
        }

        public static void SetImage(this Control c, string str, bool useURL = true, bool useResource = true, bool center = true)
        {
            if(!str.StartsWith("url("))
            {
                str = useURL ? Control.GetImageStringURI(str, useResource) : Control.GetImageString(str);
            }
            SetImage(c.Content, str, useURL, center);
        }

        public static void SetImage(this HTMLElement c, string str, bool useURL = true, bool center = true)
        {
            if(string.IsNullOrWhiteSpace(str))
            {
                c.Style.Background = "";
                c.Style.BackgroundSize = "";
                return;
            }
            else if(!str.StartsWith("url("))
            {
                str = useURL ? Control.GetImageStringURI(str) : Control.GetImageString(str);
            }
            c.Style.Background = str;
            if(center)
            {
                c.Style.BackgroundSize = "100% 100%";
            }                
        }

        public static void SetSize(this HTMLElement c, Union<string, int, float> width, Union<string, int, float> height)
        {
            c.Style.Width = width.ToHtmlValue();
            c.Style.Height = height.ToHtmlValue();
        }

        public static void SetLocation(this Control c, int left, int top)
        {
            c.Content.SetLocation(left.ToPx(), top.ToPx());
        }

        public static void SetLocation(this Control c, Union<string, int, float> left, Union<string, int, float> top)
        {
            c.Content.SetLocation(left, top);
        }

        public static void SetLocation(this HTMLElement c, Union<string, int, float> left, Union<string, int, float> top)
        {
            c.Style.Left = left.ToHtmlValue();
            c.Style.Top = top.ToHtmlValue();
        }

        /// <summary>
        /// HtmlEscape XSS
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string HtmlEscape(this object obj)
        {
            return (obj as string).HtmlEscape();
        }

        /// <summary>
        /// HtmlUrlUnescape XSS
        /// </summary>
        /// <returns></returns>
        public static string HtmlUrlUnescape(this string input)
        {
            return !string.IsNullOrEmpty(input)
                ? input
                    .Replace("&amp", "&")
                    .Replace("&lt", "<")
                    .Replace("&gt", ">")
                    .Replace("&#x27", "'")
                : "";
        }

        /// <summary>
        /// HtmlUrlEscape XSS
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string HtmlUrlEscape(this string input)
        {
            return !string.IsNullOrEmpty(input)
                ? input
                    .Replace("&", "&amp")
                    .Replace("<", "&lt")
                    .Replace(">", "&gt")
                    .Replace("'", "&#x27")
                : string.Empty;
        }

        /// <summary>
        /// HtmlEscape XSS
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string HtmlEscape(this string input)
        {
            return !string.IsNullOrEmpty(input) ?
                HtmlUrlEscape(input).Replace(@"\/", "&#x2F").Replace("\"", "&quot") :
                string.Empty;
        }

        /// <summary>
        /// HtmlUnescape XSS
        /// </summary>
        /// <returns></returns>
        public static string HtmlUnescape(this string input)
        {
            return !IsEmpty(input) ?
                HtmlUrlUnescape(input).Replace("&#x2F", @"\/").Replace("&quot", "\"") :
                string.Empty;
        }

        public static void ExchangeClass(this Control control, string oldClass, string newClass)
        {
            ExchangeClass(control.Content, oldClass, newClass);
        }

        public static void ExchangeClass(this HTMLElement control, string oldClass, string newClass)
        {
            if(!IsEmpty(oldClass) && control.ClassList.Contains(oldClass))
                control.ClassList.Remove(oldClass);
            if(!IsEmpty(newClass) && !control.ClassList.Contains(newClass))
                control.ClassList.Add(newClass);
        }

        public static bool IsEmpty(this string value)
        {
            return string.IsNullOrWhiteSpace(value);
        }

        public static void StopAndLog(this Stopwatch sw, string logName = "Task")
        {
            sw.Stop();
            ConsoleForm.Log(logName + " took " + sw.ElapsedMilliseconds + "ms to finish");
        }
    }
}