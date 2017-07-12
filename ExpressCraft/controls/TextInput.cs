using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

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

        public TextInput(HTMLElement overrideElement) : base(overrideElement)
        {
            overrideElement.ClassName = "inputcontrol" + BaseClass();
            IsOverride = true;
            addEvents();
        }        

        private void addEvents()
        {
            this.Content.OnBlur = (ev) =>
            {
                if(OnLostFocus != null)
                    OnLostFocus(this);
            };
            this.Content.OnFocus = (ev) =>
            {
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

        public TextInput(InputType type = InputType.Text, bool ac = true) : base("inputcontrol", type, ac)
		{			
            Type = type;
            addEvents();
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
                    }
                }
                                
                CheckTextChanged();
            }
		}

		public void SetDate(string date)
		{
			dynamic obj = this.Content;
			
			if(date != null)
			{
				DateTime dt;
				if(DateTime.TryParse(date, out dt) && dt != DateTime.MinValue)
				{
					obj.value = dt.ToString("yyyy-MM-dd");
				}
				else
				{
					obj.value = null;
				}				
			}
			else
			{
				obj.value = null;
			}
			//obj.value = DateTime.Parse(Convert.ToString(date)).ToString("yyyy-MM-dd");
		}

		public string GetDate()
		{
			dynamic obj = this.Content;
			var str = obj.value;
			DateTime dt;

			if(DateTime.TryParse(str, out dt))
			{
				return dt.ToString("yyyy-MM-dd");
			}
			else
			{
				return "0001-01-01";
			}
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
