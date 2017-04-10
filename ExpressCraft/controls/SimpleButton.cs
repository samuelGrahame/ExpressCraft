using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

namespace ExpressCraft
{
	public class SimpleButton : Control
	{
		public Action<SimpleButton> ItemClick;
        public Form ParentForm = null;
        public DialogResultEnum DialogResult = DialogResultEnum.None;        

        public SimpleButton(ButtonType button = ButtonType.Button, bool ac = true) : base("simplebutton", button, ac)
		{
            Content.OnContextMenu = (ev) =>
            {
                ev.StopPropagation();
                ev.PreventDefault();
            };

            this.SetSize("69px", "20px");

			Content.OnClick = (ev) => {                
				if(enabled)
                {
                    this.Content.Blur();

                    if (DialogResult != DialogResultEnum.None &&
                        ParentForm != null && ParentForm.IsDialog()) // Just incase we set disabled and is dialog
                    {
                        ParentForm.DialogResult = DialogResult;                        
                    }

                    if (ItemClick != null)                   
                        ItemClick(this);  
                                      
                    if (DialogResult != DialogResultEnum.None && ParentForm.DialogResult != DialogResultEnum.None &&
                        ParentForm != null && ParentForm.IsDialog()) // Just incase we set disabled and is dialog
                    {
                        ParentForm.Close();
                    }
                }
					
				ev.StopPropagation();
                ev.StopImmediatePropagation();
			};
            Content.OnDblClick = (ev) =>
            {
                ev.StopPropagation();
                ev.StopImmediatePropagation();
            };
            Content.OnMouseDown = (ev) =>
            {
                ev.StopPropagation();
                ev.StopImmediatePropagation();
            };
            Content.OnMouseUp = (ev) =>
            {
                ev.StopPropagation();
                ev.StopImmediatePropagation();
            };

        }

		public string Text
		{
			get { return this.Content.As<HTMLInputElement>().InnerHTML; }
			set
			{
				this.Content.As<HTMLInputElement>().InnerHTML = value;
			}
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
                    this.Content.SetAttribute("disabled", (!enabled).ToString());
                }                                
			}
		}	
	}
}
