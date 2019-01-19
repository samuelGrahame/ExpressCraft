using Bridge;
using System;
using System.Collections.Generic;
using static Retyped.dom;
using System.Collections;

namespace ExpressCraft
{
    public enum ComboBoxTypes
    {
        Default
    }

    public class ExControl : IList<ExControl>
    {
        public HTMLElement Content;
        public string Name;
        public bool HasRendered = false;
        public const string ControlClass = "control";


        private ToolTip _toolTip = null;
        private Action<Event> _OnMouseEnterToolTip = null;
        private Action<Event> _OnMouseLeaveToolTip = null;



        private List<ExControl> innerList = new List<ExControl>();

        public ToolTip ToolTip
        {
            get
            {
                return _toolTip;
            }
            set
            {
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
                                ExForm.ActiveToolTip = _toolTip;
                            }
                        };
                        _OnMouseLeaveToolTip = (ev) =>
                        {
                            if(!(this is ToolTipControl))
                            {
                                ExForm.ActiveToolTip = null;
                            }
                        };

                        Content.addEventListener("moveenter", _OnMouseEnterToolTip);
                        Content.addEventListener("mouseleave", _OnMouseLeaveToolTip);
                        return;
                    }

                    if(_OnMouseEnterToolTip != null)
                    {
                        Content.removeEventListener("MouseEnter", _OnMouseEnterToolTip);
                        _OnMouseEnterToolTip = null;
                    }
                    if(_OnMouseLeaveToolTip != null)
                    {
                        Content.removeEventListener("MouseLeave", _OnMouseLeaveToolTip);
                        _OnMouseLeaveToolTip = null;
                    }
                }
            }
        }

        public ExControl SetData(string name, string value)
        {            
            return SetAttribute("data-" + name, value);
        }

        public string GetData(string name)
        {
            return GetAttribute("data-" + name);
        }

        public Action<ExControl> OnResize = null;
        public Action<ExControl> OnLoaded = null;        

        public ContextMenu ContextMenu = null;

        public CSSStyleDeclaration Style => Content.style;
        public DOMTokenList ClassList => Content.classList;

        public ExControl SetAttribute(string name, Union<string, int, float> value)
        {
            this.Content.setAttribute(name, value.ToStr());

            return this;
        }

        public string GetAttribute(string name)
        {
            return this.Content.getAttribute(name);
        }

        public int GetAttributei(string name)
        {
            return Script.ParseInt(this.Content.getAttribute(name));
        }

        public float GetAttributef(string name)
        {
            return (float)Script.ParseFloat(this.Content.getAttribute(name));
        }

        public ExForm LinkedForm = null;

        public static string BaseClass(bool add = true, bool ac = true)
        {
            return ac ? (add ? " " + ControlClass :
                ControlClass) : "";
        }

        public Union<string, int, float> Width
        {
            get { return this.Content.style.width; }
            set
            {
                var x = value.ToHtmlValue();
                x = Vector2.pf(x);
                if(this.Content.style.width != x)
                {
                    this.Content.style.width = x;
                    OnSizeChanged();
                }
            }
        }

        public Union<string, int, float> Height
        {
            get { return this.Content.style.height; }
            set
            {
                var x = value.ToHtmlValue();
                x = Vector2.pf(x);
                if(x != this.Content.style.height)
                {
                    this.Content.style.height = x;
                    OnSizeChanged();
                }
            }
        }

        public Union<string, int, float> Left
        {
            get { return this.Content.style.left; }
            set
            {
                var x = value.ToHtmlValue();
                x = Vector2.pf(x);
                if(x != this.Content.style.left)
                {
                    this.Content.style.left = x;
                    OnLocationChanged();
                }
            }
        }

        public Union<string, int, float> Top
        {
            get { return this.Content.style.top; }
            set
            {
                var x = value.ToHtmlValue();
                x = Vector2.pf(x);
                if(this.Content.style.top != x)
                {
                    this.Content.style.top = x;
                    OnLocationChanged();
                }
            }
        }

        public virtual void OnLocationChanged()
        {
        }

        public virtual void OnSizeChanged()
        {
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

        public int Count
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public bool IsReadOnly
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public ExControl this[int index]
        {
            get
            {
                throw new NotImplementedException();
            }

            set
            {
                throw new NotImplementedException();
            }
        }

        public static string GetImageString(string s)
        {
            return string.Format("url('data:image/png;base64,{0}') no-repeat", s);
        }

        public static string GetPdfString(string s)
        {
            return string.Format("data:application/pdf;base64,{0}", s);
        }

        public static string GetImageStringURI(string s, bool useResourceURL = true)
        {
            return string.Format("url('{0}{1}') no-repeat", useResourceURL ? Settings.ResourceURL : "", s);
        }

        public ExControl(bool ac = true)
        {
            Content = Div(ac);
        }

        public ExControl(HTMLElement element)
        {
            Content = element;
        }

        public ExControl(string cn, bool ac = true)
        {
            Content = Div(cn, ac);
        }
        
        public ExControl(string cn, ComboBoxTypes ct, bool ac = true)
        {
            Content = ComboBox(cn, ct, ac);
        }

        public ExControl(string cn, bool IsInput, string it, bool ac = true)
        {
            Content = (IsInput ? (HTMLElement)Input(cn, it, ac) : (HTMLElement)Button(cn, it, ac));
        }

        public virtual void Render()
        {
            HasRendered = true;
        }

        public static HTMLDivElement Div(bool ac = true)
        {
            return new HTMLDivElement() { className = BaseClass(false, ac) };
        }

        public static HTMLSpanElement Span(bool ac = true)
        {
            return new HTMLSpanElement() { className = BaseClass(false, ac) };
        }

        public static HTMLSpanElement Label(string Caption, float X, float Y, bool IsBold = false, bool IsTiny = false, bool ac = true)
        {
            var lbl = new HTMLSpanElement() { className = BaseClass(false, ac) };

            lbl.innerHTML = Caption.HtmlEscape();
            lbl.SetLocation(X, Y);
            SetBT(lbl, IsBold, IsTiny);

            return lbl;
        }

        public static HTMLSpanElement Label(string Caption, float X, float Y, float width, float height, bool IsBold = false, bool IsTiny = false, string classr = "", string Alignment = "left", string Forecolor = null, bool ac = true)
        {
            var lbl = new HTMLSpanElement() { className = classr + BaseClass(!string.IsNullOrWhiteSpace(classr), ac) };

            lbl.innerHTML = Caption.HtmlEscape();
            lbl.SetBounds(X, Y, width, height);
            if(Alignment != "left")
            {
                lbl.style.textAlign = Alignment;
            }
            SetBT(lbl, IsBold, IsTiny);
            if(Forecolor != null)
            {
                lbl.style.color = Forecolor;
            }

            return lbl;
        }

        public static HTMLDivElement DivLabel(string Caption, float X, float Y, float width, bool IsBold = false, bool IsTiny = false, string classr = "", string Alignment = "left", string Forecolor = null, bool ac = true)
        {
            var lbl = new HTMLDivElement();
            lbl.className = classr + BaseClass(!string.IsNullOrWhiteSpace(classr), ac);
            lbl.textContent = Caption;
            lbl.style.left = X.ToPx();
            lbl.style.top = Y.ToPx();
            lbl.style.width = width.ToPx();

            if(Alignment != "left")
            {
                if(Alignment == "right")
                {
                    lbl.style.direction = "rtl";
                }
                else
                {
                    lbl.style.textAlign = Alignment;
                }
            }
            if(IsBold)
            {
                lbl.style.fontWeight = "bold";
            }
            if(IsTiny)
            {
                lbl.style.fontSize = "6.75pt";
            }
            if(Forecolor != null)
            {
                lbl.style.color = Forecolor;
            }

            return lbl;
        }

        public static HTMLSpanElement Label(string Caption, float X, float Y, float width, bool IsBold = false, bool IsTiny = false, string classr = "", string Alignment = "left", string Forecolor = null, bool ac = true)
        {
            var lbl = new HTMLSpanElement();
            lbl.className = classr + BaseClass(!string.IsNullOrWhiteSpace(classr), ac);
            lbl.textContent = Caption;
            lbl.style.left = X.ToPx();
            lbl.style.top = Y.ToPx();
            lbl.style.width = width.ToPx();

            if(Alignment != "left")
            {
                if(Alignment == "right")
                {
                    lbl.style.direction = "rtl";
                }
                else
                {
                    lbl.style.textAlign = Alignment;
                }
            }
            SetBT(lbl, IsBold, IsTiny);
            if(Forecolor != null)
            {
                lbl.style.color = Forecolor;
            }

            return lbl;
        }

        public void Focus(int delay = 0)
        {
            setTimeout(new setTimeoutFn((a) =>
            {
                this.Content.focus();
            }), delay);
        }

        private static void SetBT(HTMLSpanElement lbl, bool IsBold, bool IsTiny)
        {
            if(IsBold)
            {
                lbl.style.fontWeight = "bold";
            }
            if(IsTiny)
            {
                lbl.style.fontSize = "6.75pt";
            }
        }

        public static HTMLSpanElement Label(string c, float X, float Y, float width, float height, bool IsBold = false, bool IsTiny = false, string classr = "", bool ac = true)
        {
            var lbl = new HTMLSpanElement() { className = classr + BaseClass(!string.IsNullOrWhiteSpace(classr), ac) };

            lbl.innerHTML = c.HtmlEscape();
            lbl.SetBounds(X, Y, width, height);
            SetBT(lbl, IsBold, IsTiny);

            return lbl;
        }

        public static HTMLSpanElement Label(string c, int X, int Y, int width, bool IsBold = false, bool IsTiny = false, string classr = "", bool ac = true)
        {
            var lbl = new HTMLSpanElement() { className = classr + BaseClass(!string.IsNullOrWhiteSpace(classr), ac) };

            lbl.innerHTML = c.HtmlEscape();
            lbl.SetLocation(X, Y);
            lbl.style.width = width.ToPx();
            SetBT(lbl, IsBold, IsTiny);

            return lbl;
        }

        public static HTMLSpanElement Label(string c, int X, int Y, bool IsBold = false, bool IsTiny = false, bool ac = true)
        {
            return Label(c, (float)X, (float)Y, IsBold, IsTiny, ac);
        }

        public static HTMLSpanElement Span(string cn, bool ac = true)
        {
            return new HTMLSpanElement() { className = cn + BaseClass(true, ac) };
        }

        public static HTMLSelectElement ComboBox(string cn, ComboBoxTypes ct, bool ac = true)
        {
            var combo = new HTMLSelectElement() { className = cn + BaseClass(true, ac) };
            if(ct == ComboBoxTypes.Default)
            {
            }
            return combo;
        }

        public static HTMLButtonElement Button(string cn, string bt, bool ac = true)
        {
            return new HTMLButtonElement() { className = cn + BaseClass(true, ac), type = bt };
        }

        public static HTMLDivElement Div(string cn, bool ac = true)
        {
            return new HTMLDivElement() { className = cn + BaseClass(true, ac) };
        }

        public static HTMLInputElement Input(string cn, string it, bool ac = true)
        {
            var input = new HTMLInputElement();
            input.className = cn + BaseClass(!string.IsNullOrWhiteSpace(cn), ac);
            dynamic ty = it;
            if(Browser.IsIE && (ty == "text" || ty == "date" || ty == "color" || ty == 19 || ty == 3 || ty == 2))
            {
                return input;
            }
            input.type = it;

            return input;
        }

        protected virtual HTMLElement GetControlBase()
        {
            return Content;
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
            if(f == "")
            {
                f = "8.25pt Tahoma";
            }
            var c = (cva ?? (cva = new HTMLCanvasElement())).getContext("2d").As<CanvasRenderingContext2D>();
            c.font = f;
            return c.measureText(t);
        }

        /// <summary>
        /// Returns text width
        /// </summary>
        /// <param name="t">the string</param>
        /// <param name="f">the font used</param>
        /// <returns>double</returns>
		public static double GetTextWidth(string t, string f)
        {
            return GetTextMetrics(t, f).width;
        }

        public static implicit operator Retyped.dom.Node(ExControl control)
        {
            if(Settings.AutoRender && !control.HasRendered)
                control.Render();
            return control.Content;
        }

        public void ChangeState(bool s, string sf = "disabled")
        {
            if(s)
            {
                Content.classList.remove(sf);
            }
            else
            {
                Content.classList.add(sf);
            }
        }

        public int IndexOf(ExControl item)
        {
            return innerList.IndexOf(item);
        }

        public void Insert(int index, ExControl item)
        {
            var content = GetControlBase();
            innerList.Insert(index, item);
            content.insertBefore(item.Content, (Node)content.childNodes[index]);
        }

        public void RemoveAt(int index)
        {
            var control = innerList[index];
            Remove(control);            
        }

        public void Add(ExControl item)
        {
            innerList.Add(item);
            var content = GetControlBase();
            content.appendChild(item.Content);
        }

        public void CopyTo(ExControl[] array, int arrayIndex)
        {
            innerList.CopyTo(array, arrayIndex);
        }

        public void Clear()
        {
            innerList.Clear();
            var content = GetControlBase();
            content.Empty();
        }

        public bool Contains(ExControl item)
        {
            return innerList.Contains(item);
        }

        public bool Remove(ExControl item)
        {
            innerList.Remove(item);
            var content = GetControlBase();
            content.removeChild(item.Content);

            return true;
        }

        public IEnumerator<ExControl> GetEnumerator()
        {
            return innerList.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return innerList.GetEnumerator();
        }
    }
}