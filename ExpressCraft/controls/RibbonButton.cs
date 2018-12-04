using Bridge;
using static Retyped.dom;
using System;

namespace ExpressCraft
{
    [Namespace(true)]
    public class RibbonButton : RibbonItem<RibbonButton>
    {
        private string _icon = "";

        public string Icon
        {
            get
            {
                return _icon;
            }
            set
            {
                if(_icon != value)
                {
                    _icon = value;
                    ProcessImage();
                }
            }
        }

        private string _iconURL = "";

        public string IconURL
        {
            get
            {
                return _iconURL;
            }
            set
            {
                if(_iconURL != value)
                {
                    _iconURL = value;
                    ProcessImage();
                }
            }
        }
        

        public HTMLDivElement imageDiv = null;

        protected override void OnSetEnabled(bool value)
        {
            if(value)
            {
                if(imageDiv != null)
                {
                    imageDiv.classList.remove("disabled");
                }                
            }
            else
            {
                if(imageDiv != null)
                {
                    imageDiv.classList.add("disabled");
                }                
            }
            base.OnSetEnabled(value);
        }        

        public RibbonButton(string caption = "", bool _isSmallCaption = false) : base(_isSmallCaption ? "ribbonbuttonsmall" : "ribbonbutton")
        {
            Caption = caption;
            IsSmallItem = _isSmallCaption;
        }

        

        public override void Render()
        {
            HasRendered = true;

            Content.onclick = (ev) =>
            {
                performClick(this, ev);
            };

            ProcessCaption();
            ProcessImage();

            setEnabled(enabled);

            base.Render();
        }

        

        public void ProcessImage()
        {
            if(imageDiv == null)
            {
                if(!string.IsNullOrWhiteSpace(Icon))
                {
                    imageDiv = Div(IsSmallItem ? "ribbonbuttonsmallicon" : "ribbonbuttonicon");
                    imageDiv.style.background = GetImageString(Icon);
                }
                else if(!string.IsNullOrWhiteSpace(IconURL))
                {
                    imageDiv = Div(IsSmallItem ? "ribbonbuttonsmallicon" : "ribbonbuttonicon");
                    imageDiv.style.background = GetImageStringURI(IconURL);
                }
                if(imageDiv != null)
                {
                    Content.AppendChild(imageDiv);
                }
            }
            else
            {
                if(!string.IsNullOrWhiteSpace(Icon))
                {
                    imageDiv.style.background = GetImageString(Icon);
                }
                else if(!string.IsNullOrWhiteSpace(IconURL))
                {
                    imageDiv.style.background = GetImageStringURI(IconURL);
                }
            }

            if(imageDiv != null)
            {
                imageDiv.style.backgroundSize = "100% 100%";

                if(captionDiv != null && IsSmallItem)
                    captionDiv.style.left = "28px";
            }
            else
            {
                if(captionDiv != null && IsSmallItem)
                    captionDiv.style.left = "6px";
            }
        }
    }
}