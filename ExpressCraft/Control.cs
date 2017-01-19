using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge;
using Bridge.Html5;

namespace ExpressCraft
{
	public enum ComboBoxTypes
	{		
		Default
	}
	
	public class Control
	{
		public HTMLElement Content;
		public string Name { get; set; }
		public bool HasRendered { get; set; } = false;
		public const string ControlClass = "control";

		public Action<Control> OnResize = null;
		public Action<Control> OnLoaded = null;

		public ContextMenu ContextMenu = null;

		public static string BaseClass(bool add = true)
		{
			return add ? " " + ControlClass :
				ControlClass;
		}
		
		public static string GetImageString(string s)
        {
			//url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAIAAAA35e4mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACSSURBVFhH7dbRCYAgFIXhRnASN3ADJ3GSu4gbuIGD1SUlejCOBpLE+R4NOT/0UJtZDIMQBiEMQhiEMAj5b5C11nsfQhCRlFLOeT/Vx93eBDnndFuHY4w6rCdlu6lc6TccVHdumoeXcqsfgxAGIcNBs/GVIQxCGIQMB6m1Pq5Pvvz9mIpBCIMQBiEMQhiELBZkzAGoRY/1a8YOvQAAAABJRU5ErkJggg==') no-repeat
			return string.Format("url('data:image/png;base64,{0}') no-repeat", s);
        }

        public static string GetImageStringURI(string s, bool useResourceURL = true)
        {
            //"./Images/"
            return string.Format("url('{0}{1}') no-repeat", useResourceURL ? Settings.ResourceURL : "", s);
        }		

		public Control()
		{
			Content = Div();
		}

		public Control(string cn)
		{
			Content = Div(cn);
		}

		public Control(string cn, ButtonType bt)
		{
			Content = Button(cn, bt);
		}

		public Control(string cn, ComboBoxTypes ct)
		{
			Content = ComboBox(cn, ct);
		}

		public Control(string cn, InputType it)
		{
			Content = Input(cn, it);
		}

		public virtual void Render()
		{
			HasRendered = true;
		}
		
		public static HTMLDivElement Div()
		{
			return new HTMLDivElement() { ClassName = BaseClass(false) };
		}

		public static HTMLSpanElement Span()
		{
			return new HTMLSpanElement() { ClassName = BaseClass(false) };
		}

		public static HTMLSpanElement Label(string Caption, float X, float Y, bool IsBold = false, bool IsTiny = false)
		{
			var lbl = new HTMLSpanElement() { ClassName = BaseClass(false) };

			lbl.InnerHTML = Caption;//.HtmlEscape();
			lbl.SetLocation(X, Y);
            SetBT(lbl, IsBold, IsTiny);

            return lbl;
		}

		public static HTMLSpanElement Label(string Caption, float X, float Y, float width, float height, bool IsBold = false, bool IsTiny = false, string classr = "", TextAlign Alignment = TextAlign.Left, string Forecolor = null)
		{
			var lbl = new HTMLSpanElement() { ClassName = classr + BaseClass(!string.IsNullOrWhiteSpace(classr)) };

			lbl.InnerHTML = Caption;//.HtmlEscape();
			lbl.SetBounds(X, Y, width, height);			
			if(Alignment != TextAlign.Left)
			{
				lbl.Style.TextAlign = Alignment;
			}
            SetBT(lbl, IsBold, IsTiny);
            if (Forecolor != null)
			{
				lbl.Style.Color = Forecolor;
			}

			return lbl;
		}

		public static HTMLSpanElement Label(string Caption, float X, float Y, float width, bool IsBold = false, bool IsTiny = false, string classr = "", TextAlign Alignment = TextAlign.Left, string Forecolor = null)
		{
			var lbl = new HTMLSpanElement();
			lbl.ClassName = classr + BaseClass(!string.IsNullOrWhiteSpace(classr));
			lbl.InnerHTML = Caption;//.HtmlEscape();
			lbl.SetLocation(X, Y);
			lbl.Style.Width = width.ToPx();
			if(Alignment != TextAlign.Left)
			{				
				if(Alignment == TextAlign.Right)
				{
					lbl.Style.Direction = Direction.Rtl;
				}
				else
				{
					lbl.Style.TextAlign = Alignment;
				}				
			}
            SetBT(lbl, IsBold, IsTiny);
            if (Forecolor != null)
			{
				lbl.Style.Color = Forecolor;
			}

			return lbl;
		}

        private static void SetBT(HTMLSpanElement lbl, bool IsBold, bool IsTiny)
        {
            if (IsBold)
            {
                lbl.Style.FontWeight = "bold";
            }
            if (IsTiny)
            {
                lbl.Style.FontSize = "6.75pt";
            }
        }

		public static HTMLSpanElement Label(string c, float X, float Y, float width, float height, bool IsBold = false, bool IsTiny = false, string classr ="")
		{
			var lbl = new HTMLSpanElement() { ClassName = classr + BaseClass(!string.IsNullOrWhiteSpace(classr)) };

		    lbl.InnerHTML = c;//.HtmlEscape();
			lbl.SetBounds(X, Y, width, height);
            SetBT(lbl, IsBold, IsTiny);
            
            return lbl;
		}

		public static HTMLSpanElement Label(string c, int X, int Y, int width, bool IsBold = false, bool IsTiny = false, string classr = "")
		{
			var lbl = new HTMLSpanElement() { ClassName = classr + BaseClass(!string.IsNullOrWhiteSpace(classr)) };

			lbl.InnerHTML = c;//.HtmlEscape();
			lbl.SetLocation(X, Y);
			lbl.Style.Width = width.ToPx();
			SetBT(lbl, IsBold, IsTiny);

			return lbl;
		}

		public static HTMLSpanElement Label(string c, int X, int Y, bool IsBold = false, bool IsTiny = false)
		{
			return Label(c, (float)X, (float)Y, IsBold, IsTiny);			
		}

		public static HTMLSpanElement Span(string cn)
		{
			return new HTMLSpanElement() { ClassName = cn + BaseClass(true) };
		}

		public static HTMLSelectElement ComboBox(string cn, ComboBoxTypes ct)
		{			
			var combo = new HTMLSelectElement() { ClassName = cn + BaseClass(true) };
			if(ct == ComboBoxTypes.Default)
			{

			}
			return combo;
		}

		public static HTMLButtonElement Button(string cn, ButtonType bt)
		{
			return new HTMLButtonElement() { ClassName = cn + BaseClass(true), Type = bt };
		}

		public static HTMLDivElement Div(string cn)
		{
			return new HTMLDivElement() { ClassName = cn + BaseClass(true) };
		}

		public static HTMLInputElement Input(string cn, InputType it)
		{
			var input = new HTMLInputElement();
			input.ClassName = cn + BaseClass(true);
			dynamic ty = it;
			if((ty == "text" || ty == "date" || ty == 19 || ty == 3) && Browser.IsIE)
			{
				return input;
			}
			input.Type = it;

			return input;
		}

		private static HTMLCanvasElement cva = null;


        /// <summary>
        /// Returns Text Metrics for a given string
        /// </summary>
        /// <param name="t">the string</param>
        /// <param name="f">the font used</param>
        /// <returns>TextMetrics</returns>
		public static TextMetrics GetTextMetrics(string t, string f)
		{
            var c = (cva ?? (cva = new HTMLCanvasElement())).GetContext(CanvasTypes.CanvasContext2DType.CanvasRenderingContext2D).As<CanvasRenderingContext2D>();
            c.Font = f;
            return c.MeasureText(t);
        }

        /// <summary>
        /// Returns text width
        /// </summary>
        /// <param name="t">the string</param>
        /// <param name="f">the font used</param>
        /// <returns>double</returns>
		public static double GetTextWidth(string t, string f)
		{
            return GetTextMetrics(t, f).Width;	
		}        

		public static implicit operator Node(Control control)  // implicit digit to byte conversion operator
		{
			if(Settings.AutoRender && !control.HasRendered)			
				control.Render();			
			return control.Content;
		}

		public void ChangeState(bool s, string sf = "disabled")
		{
			if(s)
			{
				Content.ClassList.Remove(sf);
			}
			else
			{
				Content.ClassList.Add(sf);				
			}
		}		
	}
}
