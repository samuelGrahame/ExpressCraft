using static Retyped.dom;
using System;
using System.Text;

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
        public Action<TextInput> OnValidateData = null;

        public bool DisableFocus;

        public virtual void ValidateData()
        {
            if(this is TextInputDropDown)
            {
                var c = this.As<TextInputDropDown>();
                if(c.UsedEdit != null && c.OnValidateData != null)
                    c.OnValidateData(c.UsedEdit);
            }
            if(OnValidateData != null)
                OnValidateData(this);
        }

        public bool IsSubmit { get; set; }
        public bool GoNext { get; set; }

        public bool OnFocusDontSelectAll { get; set; }

        protected string _displayFormat = "";

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
            set
            {
                SetDisplayFormat(value);
            }
        }

        public Control Controller = null;

        public string Type;
        public bool DisableFocusPopup;
        private bool IsOverride = false;

        public virtual string GetValue()
        {
            return Content.innerHTML;
        }

        public virtual void SetValue(string value)
        {
            Content.innerHTML = value;
        }

        public void SetDateTime(DateTime date)
        {
            SetDate(string.Format("{0:" + GetDisplayFormat() + "}", date));
        }

        public TextInput(HTMLElement overrideElement, bool addInputControl = true, bool addEventsOnControl = true) : base(overrideElement)
        {
            overrideElement.className = (addInputControl ? "inputcontrol" : "") + BaseClass(addInputControl);
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
            }
            else
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
            if(this is SearchInput)
            {
                var value = ((SearchInput)this).EditValue;
                if(value == null)
                    return 0;
                return value;             
            }else
            {
                if(Type == "number")
                {
                    decimal value = Text.StripNonNumberString();
                    return value;
                }
                else if(Type == "date")
                {
                    DateTime date = GetDateTime();
                    return date;
                }
                else
                {
                    return Text;
                }
            }
        }

        public void Scroll(int value, HTMLElement parent)
        {
            if(parent == null)
                return;
            parent.scrollTop = value;
            //Global.SetTimeout(() =>
            //{
            //    if(this.Content.ParentElement == null || this.Content.ParentElement.ParentElement == null)
            //        return;
            //    this.Content.ParentElement.ParentElement.ScrollTop = value;
            //}, 0);
        }

        public string GetDisplayValue()
        {
            if(string.IsNullOrWhiteSpace(DisplayFormat))
            {
                return Text;
            }
            else
            {
                if(Type == "number")
                {
                    decimal value = Text.StripNonNumberString();
                    if(DisplayFormat.ToLower().StartsWith("c"))
                    {
                        bool wasNeg = false;
                        if(value < 0)
                        {
                            wasNeg = true;
                            value = -value;
                        }

                        return (wasNeg ? "-" : "") +
                            string.Format("${0:" + DisplayFormat.Replace("c", "n").Replace("C", "N") + "}", value);
                    }
                    else if(DisplayFormat.ToLower().StartsWith("p"))
                    {
                        return string.Format("{0:" + DisplayFormat + "}", value == 0 ? 0 : value / 100.0m);
                    }
                    else
                    {
                        return string.Format("{0:" + DisplayFormat + "}", value);
                    }
                }
                else if(Type == "date")
                {
                    DateTime value = Text.StripNonDateString();
                    if(value == DateTime.MinValue)
                    {
                        return "";
                    }
                    else
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
            if(input != null && input != document.activeElement) // Is Active
            {
                if(!string.IsNullOrWhiteSpace(DisplayFormat))
                {
                    input.type = "text";
                    string newText = GetDisplayValue();

                    if(newText != Text)
                    {
                        Text = newText;
                    }
                }
            }
        }

        private string PreZIndex;

        private void addEvents()
        {
            if(!IsOverride)
            {
                var input = GetInput();
                if(input != null)
                {
                    if(!string.IsNullOrWhiteSpace(DisplayFormat))
                    {
                        if(Type == "password")
                            return;
                        input.type = "text";
                    }
                }
            }

            this.Content.onblur = (ev) =>
            {
                Content.style.zIndex = PreZIndex;

                formatText();

                if(OnLostFocus != null)
                    OnLostFocus(this);
            };
            this.Content.onfocus = (ev) =>
            {
                if(DisableFocus)
                {
                    Content.blur();
                    return;
                }

                PreZIndex = Content.style.zIndex;
                Content.style.zIndex = "10000";

                OnFocus();
                var input = GetInput();
                if(input != null)
                {
                    if(!string.IsNullOrWhiteSpace(DisplayFormat))
                    {
                        if(Type == "number")
                        {
                            try
                            {
                                Text = Text.StripNonNumberString().ToString();
                            }
                            catch(Exception)
                            {
                                Text = "0.00";
                            }
                        }

                        if(!Helper.IsFireFox() && !Readonly && Type != "date")
                        {
                            input.type = Type;
                        }
                    }
                    if(Type != "checkbox" &&
                    Settings.OnFocusSelectAll && !OnFocusDontSelectAll) // && Helper.IsFireFox() && Browser.IsIE
                        input.select();
                }



                if(OnGotFocus != null)
                    OnGotFocus(this);

                if(!DisableFocusPopup && !Readonly && Enabled && Helper.NotDesktop && !(this is TextInputDropDown) && Controller == null)
                {
                    if(!Settings.DisableTextPopupEditor)
                        new TextForm(this).ShowPopup(new Vector2(0, 0));
                }
            };
            this.Content.onchange = (ev) =>
            {
                CheckTextChanged();
            };
            this.Content.oncontextmenu = (ev) =>
            {
                ev.stopPropagation();
            };
            this.Content.onkeypress = (ev) =>
            {
                CheckTextChanged();
                if(OnKeyPress != null)
                    OnKeyPress(this, ev);
            };
            this.Content.onkeydown = (ev) =>
            {
                CheckTextChanged();
                if(OnKeyDown != null)
                    OnKeyDown(this, ev);
            };
            this.Content.onkeyup = (ev) =>
            {
                CheckTextChanged();
                if(OnKeyUp != null)
                    OnKeyUp(this, ev);
            };
            this.Content.addEventListener("paste", () =>
            {
                CheckTextChanged();
            });
            this.Content.addEventListener("cut", () =>
            {
                CheckTextChanged();
            });
        }

        public static string FixInput(string type)
        {
            if(type == "date" || (Helper.IsFireFox() && type != "password" && type != "checkbox" && type != "radio"))
            {
                return "text";
            }
            else
            {
                return type;
            }
        }

        public TextInput() : this("text", true)
        {

        }

        public TextInput(string type = "text", bool ac = true) : base("inputcontrol", true, FixInput(type), ac)
        {
            Type = type;

            if(Type == "number")
            {
                Content.style.textAlign = "right";
                Content.style.textIndent = "3px";
                Content.style.paddingRight = "3px";

                DisplayFormat = "n2";
            }
            else if(Type == "date")
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
            if(Text != prevText)
            {
                if(OnTextChanged != null)
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
                    if(Type == "checkbox" || Type == "radio")
                    {
                        return this.Content.As<HTMLInputElement>().@checked.ToString();
                    }
                    else
                    {
                        return this.Content.As<HTMLInputElement>().value;
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
                    if(Type == "checkbox" || Type == "radio")
                    {
                        value = value.ToLower();
                        this.Content.As<HTMLInputElement>().@checked = value.IsTrue() == 1;
                    }
                    else
                    {
                        this.Content.As<HTMLInputElement>().value = value;
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
                }
                else
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

        public bool IsNumericType()
        {
            return Type == "number";
        }

        public bool IsDateType()
        {
            return Type == "date";
        }

        private bool enabled = true;

        public bool Enabled
        {
            get { return enabled; }
            set
            {
                enabled = value;

                if(this is TextInputDropDown)
                {
                    var inp = this.As<TextInputDropDown>();
                    inp.UsedEdit.Enabled = value;
                }else if(this is RadioElement)
                {
                    var inp = this.As<RadioElement>();
                    if(inp.labelElement != null)
                    {
                        inp.ProcessIsEnabled();
                    }
                }

                
                if(enabled)
                {
                    this.Content.removeAttribute("disabled");
                }
                else
                {
                    this.Content.setAttribute("disabled", "");
                }
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
                    this.Content.setAttribute("readonly", (_readonly).ToString());
                }
                else
                {
                    this.Content.removeAttribute("readonly");
                }
            }
        }
    }
}