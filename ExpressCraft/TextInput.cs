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

        public TextInput(InputType type = InputType.Text) : base("inputcontrol", type)
		{
            this.Content.OnChange = (ev) => {
                CheckTextChanged();
            };
			this.Content.OnContextMenu = (ev) => {
				ev.StopPropagation();
			};
            this.Content.OnKeyPress = (ev) =>
            {
                CheckTextChanged();
                if (OnKeyPress != null)
                    OnKeyPress(this, ev);
            };
            this.Content.OnKeyDown = (ev) =>
            {
                CheckTextChanged();
                if (OnKeyDown != null)
                    OnKeyDown(this, ev);
            };
            this.Content.OnKeyUp = (ev) =>
            {
                CheckTextChanged();
                if (OnKeyUp != null)
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
			get { return this.Content.As<HTMLInputElement>().Value; }
			set
			{
				this.Content.As<HTMLInputElement>().Value = value;

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
