using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;
using Bridge;

namespace ExpressCraft
{
	public class TextInput : Control
	{
        private string prevText = "";

        public Action<TextInput> OnTextChanged = null;
        public Action<TextInput, KeyboardEvent> OnKeyDown = null;
        public Action<TextInput, KeyboardEvent> OnKeyUp = null;
        public Action<TextInput, KeyboardEvent> OnKeyPress = null;
        public Action<TextInput> OnGotFocus = null;
        public Action<TextInput> OnLostFocus = null;

        public bool OnFocusDontSelectAll { get; set; }

        private string _displayFormat = "";

        public virtual void SetDisplayFormat(string value)
        {
            _displayFormat = value;
            formatText();
        }

        public virtual string GetDisplayFormat()
        {
            return _displayFormat;
        }

        public string DisplayFormat
        {
            get { return _displayFormat; }
            set {
                SetDisplayFormat(value);
            }
        }
        
        public Control Controller = null;
        
        public readonly InputType Type;
        private bool IsOverride = false;

        public virtual string GetValue()
        {
            return Content.InnerHTML;
        }

        public virtual void SetValue(string value)
        {
            Content.InnerHTML = value;
        }

        public TextInput(HTMLElement overrideElement, bool addInputControl = true, bool addEventsOnControl = true) : base(overrideElement)
        {
            overrideElement.ClassName = (addInputControl ? "inputcontrol" : "") + BaseClass(addInputControl);
            IsOverride = true;
            if(addEventsOnControl)
                addEvents();            
        }

        public virtual void OnFocus()
        {

        }
        
        public virtual HTMLInputElement GetInput()
        {
            if(Content.Is<HTMLInputElement>())
            {
                return Content.As<HTMLInputElement>();
            }else
            {
                return Content.As<HTMLInputElement>();
            }            
        }

        public decimal GetNumberValue()
        {
            decimal value = Text.StripNonNumberString();
            return value;
        }

        public object GetEditValue()
        {
            if(Type == InputType.Number)
            {
                decimal value = Text.StripNonNumberString();
                return value;
            }else
            {
                return Text;
            }
        }

        public string GetDisplayValue()
        {
            if(string.IsNullOrWhiteSpace(DisplayFormat))
            {
                return Text;
            }else
            {
                if(Type == InputType.Number)
                {
                    decimal value = Text.StripNonNumberString();
                    if(DisplayFormat.StartsWith("c"))
                    {
                        return string.Format("${0:" + DisplayFormat.Replace("c", "n") + "}", value);
                    }
                    else if(DisplayFormat.StartsWith("C"))
                    {
                        return string.Format("${0:" + DisplayFormat.Replace("C", "N") + "}", value);
                    }
                    else
                    {
                        return string.Format("{0:" + DisplayFormat + "}", value);
                    }
                }else if (Type == InputType.Date)
                {
                    DateTime value = Text.StripNonDateString();
                    if(value == DateTime.MinValue)
                    {
                        return "";
                    }else
                    {
                        return string.Format("{0:" + DisplayFormat + "}", value);
                    }                    
                }
                else
                {
                    return string.Format("{0:" + DisplayFormat + "}", Text);
                }
            }            
        }

        private void formatText()
        {
            var input = GetInput();
            if(input != null && input != Document.ActiveElement) // Is Active
            {                
                if(!string.IsNullOrWhiteSpace(DisplayFormat))
                {
                    input.Type = InputType.Text;
                    string newText = GetDisplayValue();     
                                   
                    if(newText != Text)
                    {
                        Text = newText;
                    }
                }
            }
        }

        private void addEvents()
        {
            if(!IsOverride)
            {
                var input = GetInput();
                if(input != null)
                {                
                    if(!string.IsNullOrWhiteSpace(DisplayFormat))
                    {
                        if(Type == InputType.Password)
                            return;
                        input.Type = InputType.Text;
                    }
                }
            }
            
            this.Content.OnBlur = (ev) =>
            {
                formatText();

                if(OnLostFocus != null)
                    OnLostFocus(this);
            };
            this.Content.OnFocus = (ev) =>
            {
                OnFocus();

                var input = GetInput();
                if(input != null)
                {
                    if(!string.IsNullOrWhiteSpace(DisplayFormat))
                    {
                        if(Type == InputType.Number)
                        {
                            try
                            {
                                Text = Text.StripNonNumberString().ToString();
                            }
                            catch(Exception)
                            {
                                Text = "0.00";
                            }
                        }else if(Type == InputType.Date)
                        {
                            //try
                            //{
                            //    var date = GetDateTime();
                            //    if(date != DateTime.MinValue)
                            //    {
                            //        Text = string.Format  date.ToString(DisplayFormat);
                            //    }
                            //    else
                            //    {
                            //        Text = "";
                            //    }                                
                            //}
                            //catch(Exception)
                            //{
                            //    Text = "";
                            //}
                        }

                        if(!Helper.IsFireFox() && !Readonly && Type != InputType.Date)
                        {                            
                            input.Type = Type;
                        }
                    }
                    if(Type != InputType.Checkbox &&
                    Settings.OnFocusSelectAll && !OnFocusDontSelectAll) // && Helper.IsFireFox() && Browser.IsIE
                        input.Select();
                }                
                
                if(OnGotFocus != null)
                    OnGotFocus(this);
            };
            this.Content.OnChange = (ev) => {
                CheckTextChanged();
            };
            this.Content.OnContextMenu = (ev) => {
                ev.StopPropagation();
            };
            this.Content.OnKeyPress = (ev) =>
            {
                CheckTextChanged();
                if(OnKeyPress != null)
                    OnKeyPress(this, ev);
            };
            this.Content.OnKeyDown = (ev) =>
            {
                CheckTextChanged();
                if(OnKeyDown != null)
                    OnKeyDown(this, ev);
            };
            this.Content.OnKeyUp = (ev) =>
            {
                CheckTextChanged();
                if(OnKeyUp != null)
                    OnKeyUp(this, ev);
            };
            this.Content.AddEventListener(EventType.Paste, () =>
            {
                CheckTextChanged();
            });
            this.Content.AddEventListener(EventType.Cut, () => {
                CheckTextChanged();
            });
        }

        public static InputType FixInput(InputType type)
        {
            if(type == InputType.Date || (Helper.IsFireFox() && type != InputType.Password && type != InputType.Checkbox))
            {
                return InputType.Text;
            }else
            {
                return type;
            }            
        }

        public TextInput(InputType type = InputType.Text, bool ac = true) : base("inputcontrol", FixInput(type), ac)
		{			
            Type = type;

            if(Type == InputType.Number)
            {
                Content.Style.TextAlign = TextAlign.Right;
                Content.Style.TextIndent = "3px";
                Content.Style.TextIndent = "3px";
                DisplayFormat = "n2";                
            }else if(Type == InputType.Date)
            {
                var str = new string[3];
                str[(int)Settings.DayPosition] = "dd";
                str[(int)Settings.MonthPosition] = "MM";
                str[(int)Settings.YearPosition] = "yyyy";
                var builder = new StringBuilder();

                for(int i = 0; i < 3; i++)
                {
                    builder.Append(str[i] + Settings.DateSeperator);
                }
                builder.Length--;                
                DisplayFormat = builder.ToString();
            }

            addEvents();            

            formatText();
        }

        private void CheckTextChanged()
        {            
            if (Text != prevText)
            {
                if (OnTextChanged != null)
                    OnTextChanged(this);
                prevText = Text;
            }
        }

        public override void Render()
        {
            base.Render();
            prevText = Text;
        }

        public string Text
		{
			get
            {
                if(IsOverride)
                {
                    return GetValue();
                }
                else
                {
                    if(Type == InputType.Checkbox)
                    {
                        return this.Content.As<HTMLInputElement>().Checked.ToString();
                    }
                    else
                    {
                        return this.Content.As<HTMLInputElement>().Value;
                    }
                }                
            }
			set
			{
                if(IsOverride)
                {
                    SetValue(value);
                }
                else
                {
                    if(Type == InputType.Checkbox)
                    {
                        value = value.ToLower();
                        this.Content.As<HTMLInputElement>().Checked = value.IsTrue() == 1;
                    }
                    else
                    {
                        this.Content.As<HTMLInputElement>().Value = value;
                        formatText();
                    }
                }
                                
                CheckTextChanged();
            }
		}

		public void SetDate(string date)
		{			
			if(!string.IsNullOrWhiteSpace(date))
			{
                var dd = date.StripNonDateString();
                if(dd == DateTime.MinValue)
                {
                    Text = "";
                }else
                {
                    Text = string.Format("{0:" + DisplayFormat + "}", dd);
                }                
			}
			else
			{
                Text = "";
            }			
		}

		public string GetDate()
		{
            if(!string.IsNullOrWhiteSpace(Text))
            {
                var dd = Text.StripNonDateString();
                if(dd == DateTime.MinValue)
                {
                    return "";
                }
                else
                {
                    return string.Format("{0:" + DisplayFormat + "}", dd);
                }
            }
            else
            {
                return "";
            }
        }

        public DateTime GetDateTime()
        {
            return Text.StripNonDateString();
        }

        private bool enabled = true;
		public bool Enabled
		{
			get { return enabled; }
			set {
				enabled = value;
				this.Content.SetAttribute("disabled", (!enabled).ToString());								
			}
		}

		private bool _readonly = false;
		public bool Readonly
		{
			get { return _readonly; }
			set
			{
				_readonly = value;
				if(_readonly)
				{
					this.Content.SetAttribute("readonly", (_readonly).ToString());
				}
				else
				{
					this.Content.RemoveAttribute("readonly");
				}
			}
		}		
	}
}
