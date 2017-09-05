using Bridge.Html5;
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

        public InputType Type;
        public bool DisableFocusPopup;
        private bool IsOverride = false;

        public virtual string GetValue()
        {
            return Content.InnerHTML;
        }

        public virtual void SetValue(string value)
        {
            Content.InnerHTML = value;
        }

        public void SetDateTime(DateTime date)
        {
            SetDate(string.Format("{0:" + GetDisplayFormat() + "}", date));
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
                if(Type == InputType.Number)
                {
                    decimal value = Text.StripNonNumberString();
                    return value;
                }
                else if(Type == InputType.Date)
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
            parent.ScrollTop = value;
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
                if(Type == InputType.Number)
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
                else if(Type == InputType.Date)
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
                        if(Type == InputType.Password)
                            return;
                        input.Type = InputType.Text;
                    }
                }
            }

            this.Content.OnBlur = (ev) =>
            {
                Content.Style.ZIndex = PreZIndex;

                formatText();

                if(OnLostFocus != null)
                    OnLostFocus(this);
            };
            this.Content.OnFocus = (ev) =>
            {
                PreZIndex = Content.Style.ZIndex;
                Content.Style.ZIndex = "10000";

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

                if(!DisableFocusPopup && !Readonly && Enabled && Helper.NotDesktop && !(this is TextInputDropDown) && Controller == null)
                {
                    if(!Settings.DisableTextPopupEditor)
                        new TextForm(this).ShowPopup(new Vector2(0, 0));
                }
            };
            this.Content.OnChange = (ev) =>
            {
                CheckTextChanged();
            };
            this.Content.OnContextMenu = (ev) =>
            {
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
            this.Content.AddEventListener(EventType.Cut, () =>
            {
                CheckTextChanged();
            });
        }

        public static InputType FixInput(InputType type)
        {
            if(type == InputType.Date || (Helper.IsFireFox() && type != InputType.Password && type != InputType.Checkbox))
            {
                return InputType.Text;
            }
            else
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
                Content.Style.PaddingRight = "3px";

                DisplayFormat = "n2";
            }
            else if(Type == InputType.Date)
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
            return Type == InputType.Number;
        }

        public bool IsDateType()
        {
            return Type == InputType.Date;
        }

        private bool enabled = true;

        public bool Enabled
        {
            get { return enabled; }
            set
            {
                enabled = value;
                if(enabled)
                {
                    this.Content.RemoveAttribute("disabled");
                }
                else
                {
                    this.Content.SetAttribute("disabled", null);
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