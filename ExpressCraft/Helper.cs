using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge;
using Bridge.Html5;
using Bridge.jQuery2;
using Bridge.Text.RegularExpressions;

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
				var sw = Stopwatch.StartNew();
				//var obj = JSON.Parse<DataTableJson>(JSON.Stringify(o));				
				var obj = Script.Write<DataTableJson>("Bridge.merge(Bridge.createInstance(ExpressCraft.Helper.DataTableJson), o);");

				//Console.WriteLine(JSON.Stringify(o));

				sw.Stop();

				Console.WriteLine("FromExternal: " + sw.ElapsedMilliseconds);

				return obj;
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
				var sw = Stopwatch.StartNew();

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

				sw.Stop();
				Console.WriteLine("ToTable: " + sw.ElapsedMilliseconds);

				return dt;
			}
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

		public static Point GetClientMouseLocation(object e)
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
			return new Point(x, y);
		}

		/// <summary>
		/// IE does not support .remove on Element use delete
		/// </summary>
		/// <param name="c"></param>
		public static void Delete(this Element c)
		{
			jQuery.Select(c).Remove();
		}		

		public static string ToPx(this float i)
		{
			Script.Write("return i + 'px';");
			//return i.ToString() + "px";
			return "";
		}

		public static string ToPx(this int i)
		{
			Script.Write("return i + 'px';");
			return "";
		}

		public static string ToPx(this decimal i)
		{
			Script.Write("return i + 'px';");
			return "";
		}

		public static void Log(object jso)
		{
			Script.Call("console.log", jso);
		}
		
		public static void AppendChildren(this Node c, params Node[] Nodes)
        {
            if(Nodes != null && Nodes.Length > 0)
            {
                for (int i = 0; i < Nodes.Length; i++)
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

		public static void SetBounds(this HTMLElement c, int left, int top, int width, int height)
		{
			c.SetBounds(left.ToPx(), top.ToPx(), width.ToPx(), height.ToPx());
		}

		public static void SetBounds(this HTMLElement c, decimal left, decimal top, decimal width, decimal height)
		{
			c.SetBounds(left.ToPx(), top.ToPx(), width.ToPx(), height.ToPx());
		}

		public static void SetBounds(this HTMLElement c, float left, float top, float width, float height)
		{
			c.SetBounds(left.ToPx(), top.ToPx(), width.ToPx(), height.ToPx());
		}

		public static void SetSize(this HTMLElement c, int width, int height)
		{
			c.SetSize(width.ToPx(), height.ToPx());
		}

		public static void SetBounds(this Control c, int left, int top, int width, int height)
		{
			c.Content.SetBounds(left.ToPx(), top.ToPx(), width.ToPx(), height.ToPx());
		}

		public static void SetSize(this Control c, int width, int height)
		{
			c.Content.SetSize(width.ToPx(), height.ToPx());
		}

		public static void SetBounds(this Control c, string left, string top, string width, string height)
		{
			c.Content.SetBounds(left, top, width, height);			
		}

		public static void SetBoundsFull(this Control c)
		{
			c.Content.SetBounds("0", "0", "100%", "100%");
		}

		public static void SetSize(this Control c, string width, string height)
		{
			c.Content.SetSize(width, height);
		}    

        public static void SetBounds(this HTMLElement c, string left, string top, string width, string height)
		{
			c.Style.Left = left;
			c.Style.Top = top;
			c.Style.Width = width;
			c.Style.Height = height;
		}

        public static void SetImage(this Control c, string str, bool useURL = true)
        {
            if(!str.StartsWith("url("))
            {
                str = useURL ? Control.GetImageStringURI(str) : Control.GetImageString(str);
            }
            SetImage(c.Content, str, useURL);
        }

        public static void SetImage(this HTMLElement c, string str, bool useURL = true)
        {
            if(string.IsNullOrWhiteSpace(str))
            {
                c.Style.Background = "";
                c.Style.BackgroundSize = "";
                return;
            }
            else if (!str.StartsWith("url("))
            {
                str = useURL ? Control.GetImageStringURI(str) : Control.GetImageString(str);
            }
            c.Style.Background = str;
            c.Style.BackgroundSize = "100% 100%";
        }

        public static void SetSize(this HTMLElement c, string width, string height)
		{
			c.Style.Width = width;
			c.Style.Height = height;
		}

        public static void SetLocation(this Control c, int left, int top)
        {
            c.Content.SetLocation(left.ToPx(), top.ToPx());
        }

        public static void SetLocation(this Control c, string left, string top)
        {
            c.Content.SetLocation(left, top);
        }

		public static void SetLocation(this HTMLElement c, decimal left, decimal top)
		{
			c.SetLocation(left.ToPx(), top.ToPx());
		}

		public static void SetLocation(this HTMLElement c, float left, float top)
		{
			c.SetLocation(left.ToPx(), top.ToPx());
		}

		public static void SetLocation(this HTMLElement c, int left, int top)
        {
            c.SetLocation(left.ToPx(), top.ToPx());
        }

        public static void SetLocation(this HTMLElement c, string left, string top)
        {
            c.Style.Left = left;
            c.Style.Top = top;
        }

        /// <summary>
        /// Escape XSS
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string HtmlEscape(this string input) {
            return !string.IsNullOrEmpty(input)
                ? input
                    .Replace("&", "&amp")
                    .Replace("<", "&lt")
                    .Replace(">", "&gt")
                    .Replace("'", "&#x27")
                    .Replace(@"\/", "&#x2F")
                    .Replace("\"", "&quot")
                : "";
        }

        /// <summary>
        /// Unescape XSS
        /// </summary>
        /// <returns></returns>
        public static string HtmlUnescape(this string input) {
            return !string.IsNullOrEmpty(input)
                ? input
                    .Replace("&amp", "&")
                    .Replace("&lt", "<")
                    .Replace("&gt", ">")
                    .Replace("&#x27", "'")
                    .Replace("&#x2F", "/")
                    .Replace("&quot", "\"")
                : "";
        }
    }
}
