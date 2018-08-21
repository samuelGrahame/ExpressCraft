using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Retyped.dom;

namespace ExpressCraft
{
    public class RibbonItem : Control
    {
        public bool BeginGroup = false;
        public bool IsSmallItem = false;
        public HTMLDivElement captionDiv = null;
        public void ProcessCaption()
        {
            if(captionDiv != null)
            {
                captionDiv.remove();
                captionDiv = null;
            }
            if(!string.IsNullOrWhiteSpace(Caption))
            {
                captionDiv = Div(IsSmallItem ? "ribbonbuttonsmallcaption" : "ribbonbuttoncaption");

                captionDiv.innerHTML = Caption;

                Content.AppendChild(captionDiv);
            }
        }

        private string _caption = "";

        public string Caption
        {
            get
            {
                return _caption;
            }
            set
            {
                if(_caption != value)
                {
                    _caption = value;
                    ProcessCaption();
                }
            }
        }

        public RibbonItem(string className) : base(className)
        {

        }

        protected virtual void OnSetEnabled(bool value)
        {
            if(value)
            {
                if(captionDiv != null)
                {
                    captionDiv.classList.remove("disabled");
                }
            }
            else
            {             
                if(captionDiv != null)
                {
                    captionDiv.classList.add("disabled");
                }
            }
        }        

        protected bool enabled = true;
        public void setEnabled(bool value)
        {
            ChangeState(value);
            OnSetEnabled(value);
        }

        public bool Enabled
        {
            get
            {
                return enabled;
            }
            set
            {
                enabled = value;
                setEnabled(value);
            }
        }
    }
}
