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

		private ToolTip _toolTip = null;
		private Action<MouseEvent> _OnMouseEnterToolTip = null;
		private Action<MouseEvent> _OnMouseLeaveToolTip = null;
		public ToolTip ToolTip
		{
			get {
				return _toolTip; }
			set {
				if(_toolTip != value)
				{
					if(value != null) 
					{						
						if(value.AttachedControl != null && value.AttachedControl != this)
						{
							value = null;
						}
						else
						{
							value.AttachedControl = this;
						}												
					}
					_toolTip = value;

					if(_toolTip != null && (!_toolTip.Heading.IsEmpty() || !_toolTip.Description.IsEmpty()))
					{						
						_OnMouseEnterToolTip = (ev) =>
						{
							if(!(this is ToolTipControl))
							{
								Form.ActiveToolTip = _toolTip;
							}
						};
						_OnMouseLeaveToolTip = (ev) =>
						{
							if(!(this is ToolTipControl))
							{
								Form.ActiveToolTip = null;
							}
						};

						Content.AddEventListener(EventType.MouseEnter, _OnMouseEnterToolTip);
						Content.AddEventListener(EventType.MouseLeave, _OnMouseLeaveToolTip);
						return;
					}

					if(_OnMouseEnterToolTip != null)
					{
						Content.RemoveEventListener(EventType.MouseEnter, _OnMouseEnterToolTip);
						_OnMouseEnterToolTip = null;
					}
					if(_OnMouseLeaveToolTip != null)
					{
						Content.RemoveEventListener(EventType.MouseLeave, _OnMouseLeaveToolTip);
						_OnMouseLeaveToolTip = null;
					}
				}
			}
		}		

		public Action<Control> OnResize = null;
		public Action<Control> OnLoaded = null;

		public ContextMenu ContextMenu = null;

        public CSSStyleDeclaration Style => Content.Style;
        public DOMTokenList ClassList => Content.ClassList;
        
        public Control SetAttribute(string name, Union<string, int, float> value)
		{
			this.Content.SetAttribute(name, value.ToStr());

			return this;
		}
		public string GetAttribute(string name)
		{
			return this.Content.GetAttribute(name);
		}
		public int GetAttributei(string name)
		{
			return Global.ParseInt(this.Content.GetAttribute(name));
		}
		public float GetAttributef(string name)
		{
			return (float)Global.ParseFloat(this.Content.GetAttribute(name));
		}
		public Form LinkedForm = null;		

		public static string BaseClass(bool add = true, bool ac = true)
		{
			return ac ? (add ? " " + ControlClass :
				ControlClass) : "";
		}		

		public Union<string, int, float> Width
		{
			get { return this.Content.Style.Width; }
			set {
				this.Content.Style.Width = value.ToHtmlValue();				
			}
		}
		
		public Union<string, int, float> Height
		{
			get { return this.Content.Style.Height; }
			set
			{
				this.Content.Style.Height = value.ToHtmlValue();
			}
		}

		public Union<string, int, float> Left
		{
			get { return this.Content.Style.Left; }
			set
			{
				this.Content.Style.Left = value.ToHtmlValue();
			}
		}

		public Union<string, int, float> Top
		{
			get { return this.Content.Style.Top; }
			set
			{
				this.Content.Style.Top = value.ToHtmlValue();
			}
		}

		public Vector2 Size
		{
			get { return new Vector2(this.Width, this.Height); }
			set
			{
				this.Width = value.X;
				this.Height = value.Y;
			}
		}

		public Vector2 Location
		{
			get { return new Vector2(this.Left, this.Top); }
			set
			{
				this.Left = value.X;
				this.Top = value.Y;
			}
		}

		public Vector4 Bounds
		{
			get { return new Vector4(this.Left, this.Top, this.Width, this.Height); }
			set
			{
				this.Left = value.X;
				this.Top = value.Y;
				this.Width = value.Z;
				this.Height = value.M;
			}
		}

		public static string GetImageString(string s)
        {
			//url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAIAAAA35e4mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACSSURBVFhH7dbRCYAgFIXhRnASN3ADJ3GSu4gbuIGD1SUlejCOBpLE+R4NOT/0UJtZDIMQBiEMQhiEMAj5b5C11nsfQhCRlFLOeT/Vx93eBDnndFuHY4w6rCdlu6lc6TccVHdumoeXcqsfgxAGIcNBs/GVIQxCGIQMB6m1Pq5Pvvz9mIpBCIMQBiEMQhiELBZkzAGoRY/1a8YOvQAAAABJRU5ErkJggg==') no-repeat
			return string.Format("url('data:image/png;base64,{0}') no-repeat", s);
        }

		public static string GetPdfString(string s)
		{
			//url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAIAAAA35e4mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACSSURBVFhH7dbRCYAgFIXhRnASN3ADJ3GSu4gbuIGD1SUlejCOBpLE+R4NOT/0UJtZDIMQBiEMQhiEMAj5b5C11nsfQhCRlFLOeT/Vx93eBDnndFuHY4w6rCdlu6lc6TccVHdumoeXcqsfgxAGIcNBs/GVIQxCGIQMB6m1Pq5Pvvz9mIpBCIMQBiEMQhiELBZkzAGoRY/1a8YOvQAAAABJRU5ErkJggg==') no-repeat
			return string.Format("data:application/pdf;base64,{0}", s);
		}

		public static string GetImageStringURI(string s, bool useResourceURL = true)
        {
            //"./Images/"
            return string.Format("url('{0}{1}') no-repeat", useResourceURL ? Settings.ResourceURL : "", s);
        }		

		public Control(bool ac = true)
		{
			Content = Div(ac);
		}

		public Control(HTMLElement element)
		{
			Content = element;
		}

		public Control(string cn, bool ac = true)
		{
			Content = Div(cn, ac);
		}

		public Control(string cn, ButtonType bt, bool ac = true)
		{
			Content = Button(cn, bt, ac);
		}

		public Control(string cn, ComboBoxTypes ct, bool ac = true)
		{
			Content = ComboBox(cn, ct, ac);
		}

		public Control(string cn, InputType it, bool ac = true)
		{
			Content = Input(cn, it, ac);			
		}
        
        public virtual void Render()
		{
			HasRendered = true;
		}

		public static HTMLDivElement Div(bool ac = true)
		{
			return new HTMLDivElement() { ClassName = BaseClass(false, ac) };
		}

		public static HTMLSpanElement Span(bool ac = true)
		{
			return new HTMLSpanElement() { ClassName = BaseClass(false, ac) };
		}

		public static HTMLSpanElement Label(string Caption, float X, float Y, bool IsBold = false, bool IsTiny = false, bool ac = true)
		{
			var lbl = new HTMLSpanElement() { ClassName = BaseClass(false, ac) };

			lbl.InnerHTML = Caption.HtmlEscape();
			lbl.SetLocation(X, Y);
            SetBT(lbl, IsBold, IsTiny);

            return lbl;
		}

		public static HTMLSpanElement Label(string Caption, float X, float Y, float width, float height, bool IsBold = false, bool IsTiny = false, string classr = "", TextAlign Alignment = TextAlign.Left, string Forecolor = null, bool ac = true)
		{
			var lbl = new HTMLSpanElement() { ClassName = classr + BaseClass(!string.IsNullOrWhiteSpace(classr), ac) };

			lbl.InnerHTML = Caption.HtmlEscape();
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

		public static HTMLSpanElement Label(string Caption, float X, float Y, float width, bool IsBold = false, bool IsTiny = false, string classr = "", TextAlign Alignment = TextAlign.Left, string Forecolor = null, bool ignoreHtml = false, bool ac = true)
		{
			var lbl = new HTMLSpanElement();
			lbl.ClassName = classr + BaseClass(!string.IsNullOrWhiteSpace(classr), ac);
			if(!ignoreHtml)
			{
				lbl.TextContent = Caption.HtmlEscape();
			}else
			{
				lbl.TextContent = Caption;
			}						
            lbl.Style.Left = X.ToPx();
            lbl.Style.Top = Y.ToPx();
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

		public static HTMLSpanElement Label(string c, float X, float Y, float width, float height, bool IsBold = false, bool IsTiny = false, string classr ="", bool ac = true)
		{
			var lbl = new HTMLSpanElement() { ClassName = classr + BaseClass(!string.IsNullOrWhiteSpace(classr), ac) };

		    lbl.InnerHTML = c.HtmlEscape();
			lbl.SetBounds(X, Y, width, height);
            SetBT(lbl, IsBold, IsTiny);
            
            return lbl;
		}

		public static HTMLSpanElement Label(string c, int X, int Y, int width, bool IsBold = false, bool IsTiny = false, string classr = "", bool ac = true)
		{
			var lbl = new HTMLSpanElement() { ClassName = classr + BaseClass(!string.IsNullOrWhiteSpace(classr), ac) };

			lbl.InnerHTML = c.HtmlEscape();
			lbl.SetLocation(X, Y);
			lbl.Style.Width = width.ToPx();
			SetBT(lbl, IsBold, IsTiny);

			return lbl;
		}

		public static HTMLSpanElement Label(string c, int X, int Y, bool IsBold = false, bool IsTiny = false, bool ac = true)
		{
			return Label(c, (float)X, (float)Y, IsBold, IsTiny, ac);			
		}

		public static HTMLSpanElement Span(string cn, bool ac = true)
		{
			return new HTMLSpanElement() { ClassName = cn + BaseClass(true, ac) };
		}

		public static HTMLSelectElement ComboBox(string cn, ComboBoxTypes ct, bool ac = true)
		{			
			var combo = new HTMLSelectElement() { ClassName = cn + BaseClass(true, ac) };
			if(ct == ComboBoxTypes.Default)
			{

			}
			return combo;
		}

		public static HTMLButtonElement Button(string cn, ButtonType bt, bool ac = true)
		{
			return new HTMLButtonElement() { ClassName = cn + BaseClass(true, ac), Type = bt };
		}

		public static HTMLDivElement Div(string cn, bool ac = true)
		{
			return new HTMLDivElement() { ClassName = cn + BaseClass(true, ac) };
		}

		public static HTMLInputElement Input(string cn, InputType it, bool ac = true)
		{
			var input = new HTMLInputElement();
			input.ClassName = cn + BaseClass(!string.IsNullOrWhiteSpace(cn), ac);
			dynamic ty = it;
			if(Browser.IsIE && (ty == "text" || ty == "date" || ty == "color" || ty == 19 || ty == 3 || ty == 2))
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

		public static implicit operator Node(Control control)
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
