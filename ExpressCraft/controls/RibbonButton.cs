using Bridge;
using static Retyped.dom;
using System;

namespace ExpressCraft
{
    [Namespace(true)]
    public class RibbonButton : Control
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

        public bool BeginGroup = false;
        public bool IsSmallCaption = false;

        public Action<RibbonButton> OnItemClick;

        private bool enabled = true;

        public HTMLDivElement captionDiv = null;
        public HTMLDivElement imageDiv = null;

        public void setEnabled(bool value)
        {
            ChangeState(value);
            if(value)
            {
                if(imageDiv != null)
                {
                    imageDiv.classList.remove("disabled");
                }
                if(captionDiv != null)
                {
                    captionDiv.classList.remove("disabled");
                }
            }
            else
            {
                if(imageDiv != null)
                {
                    imageDiv.classList.add("disabled");
                }
                if(captionDiv != null)
                {
                    captionDiv.classList.add("disabled");
                }
            }
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

        public RibbonButton(string caption = "", bool _isSmallCaption = false) : base(_isSmallCaption ? "ribbonbuttonsmall" : "ribbonbutton")
        {
            Caption = caption;
            IsSmallCaption = _isSmallCaption;
        }

        public Action<RibbonButton> AfterItemClick;

        public override void Render()
        {
            HasRendered = true;

            Content.onclick = (ev) =>
            {
                bool wasEnabled = enabled;

                if(enabled && OnItemClick != null)
                    OnItemClick(this);
                if(wasEnabled && AfterItemClick != null)
                    AfterItemClick(this);

                ev.stopPropagation();

                return null;
            };

            ProcessCaption();
            ProcessImage();

            setEnabled(enabled);
        }

        public void ProcessCaption()
        {
            if(captionDiv != null)
            {
                captionDiv.remove();
                captionDiv = null;
            }
            if(!string.IsNullOrWhiteSpace(Caption))
            {
                captionDiv = Div(IsSmallCaption ? "ribbonbuttonsmallcaption" : "ribbonbuttoncaption");

                captionDiv.innerHTML = Caption;

                Content.AppendChild(captionDiv);
            }
        }

        public void ProcessImage()
        {
            if(imageDiv == null)
            {
                if(!string.IsNullOrWhiteSpace(Icon))
                {
                    imageDiv = Div(IsSmallCaption ? "ribbonbuttonsmallicon" : "ribbonbuttonicon");
                    imageDiv.style.background = GetImageString(Icon);
                }
                else if(!string.IsNullOrWhiteSpace(IconURL))
                {
                    imageDiv = Div(IsSmallCaption ? "ribbonbuttonsmallicon" : "ribbonbuttonicon");
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

                if(captionDiv != null && IsSmallCaption)
                    captionDiv.style.left = "28px";
            }
            else
            {
                if(captionDiv != null && IsSmallCaption)
                    captionDiv.style.left = "6px";
            }
        }
    }
}