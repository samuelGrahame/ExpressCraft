using static Retyped.dom;
using System;

namespace ExpressCraft
{
    public class SimpleButton : Control
    {
        public Action<SimpleButton> ItemClick;
        public Form ParentForm = null;
        public DialogResultEnum DialogResult = DialogResultEnum.None;
        private HTMLImageElement _imageElement = null;
        private string _image;
                
        public string Image
        {
            get { return _image; }
            set {
                value = (value + "").Trim();
                if(value != _image)
                {
                    _image = value;
                    _ProcessButtonImage();
                }                
            }
        }

        private bool _useBase64Image;

        public bool UseBase64Image
        {
            get { return _useBase64Image; }
            set {
                if(_useBase64Image != value)
                {
                    _useBase64Image = value;
                    _ProcessButtonImage();
                }
            }
        }

        private bool _imageRightAlign;

        public bool ImageRightAlign
        {
            get { return _imageRightAlign; }
            set {
                if(_imageRightAlign != value)
                {
                    _imageRightAlign = value;
                    _ProcessButtonImage();
                }
                
            }
        }

        private int _buttonImageSize;

        public int ButtonImageSize
        {
            get { return _buttonImageSize; }
            set
            {
                if(_buttonImageSize != value)
                {
                    _buttonImageSize = value;
                    _ProcessButtonImage();
                }

            }
        }
               

        private void _ProcessButtonImage()
        {
            if(string.IsNullOrWhiteSpace(_image))
            {
                if(_imageElement != null)
                {
                    _imageElement.Delete();
                    _imageElement = null;
                }
            }else
            {
                if(_imageElement == null)
                {
                    _imageElement = new HTMLImageElement();                    
                }else
                {
                    _imageElement.Delete();
                }
                _imageElement.SetImage(_image, !_useBase64Image, false);
                string padding = _buttonImageSize == 0 ? "16px" : _buttonImageSize.ToPx();

                _imageElement.style.height = padding;
                _imageElement.style.position = "absolute";
                _imageElement.style.top = "1px";

                if(!_imageRightAlign)
                {
                    _imageElement.style.backgroundPosition = "left";
                    _imageElement.style.paddingLeft = padding;
                    _imageElement.style.paddingRight = "";

                    _imageElement.style.left = "1px";

                    if(Content.lastChild == null)
                    {
                        Content.appendChild(_imageElement);
                    }
                    else
                    {
                        Content.insertBefore(_imageElement, Content.lastChild);
                    }                    
                }
                else
                {
                    _imageElement.style.right = "1px";
                    _imageElement.style.left = "";
                    _imageElement.style.backgroundPosition = "right";
                    _imageElement.style.paddingRight = padding;
                    _imageElement.style.paddingLeft = "";

                    Content.appendChild(_imageElement);
                }                
            }           
        }

        public SimpleButton() : this("button", true)
        {

        }

        public SimpleButton(string button = "button", bool ac = true) : base("simplebutton", false, button, ac)
        {
            Content.oncontextmenu = (ev) =>
            {
                ev.stopPropagation();
                ev.preventDefault();
                return null;
            };

            if(ac)
                Style.font = Settings.Font;

            this.SetSize("69px", "20px");

            Content.onclick = (ev) =>
            {
                if(enabled)
                {
                    this.Content.blur();

                    if(DialogResult != DialogResultEnum.None &&
                        ParentForm != null && ParentForm.IsDialog()) // Just incase we set disabled and is dialog
                    {
                        ParentForm.DialogResult = DialogResult;
                    }

                    if(ItemClick != null)
                        ItemClick(this);

                    if(DialogResult != DialogResultEnum.None && ParentForm.DialogResult != DialogResultEnum.None &&
                        ParentForm != null && ParentForm.IsDialog()) // Just incase we set disabled and is dialog
                    {
                        ParentForm.Close();
                    }
                }

                ev.stopPropagation();
                ev.stopImmediatePropagation();
                return null;
            };
            Content.ondblclick = (ev) =>
            {
                ev.stopPropagation();
                ev.stopImmediatePropagation();
                return null;
            };
            Content.onmousedown = (ev) =>
            {
                ev.stopPropagation();
                ev.stopImmediatePropagation();
                return null;
            };
            Content.onmouseup = (ev) =>
            {
                ev.stopPropagation();
                ev.stopImmediatePropagation();
                return null;
            };
        }

        public string Text
        {
            get { return this.Content.As<HTMLButtonElement>().innerHTML; }
            set
            {
                if(Text != value)
                {
                    this.Content.As<HTMLButtonElement>().innerHTML = value;

                    if(_imageElement != null)
                    {
                        _imageElement.Delete();
                        _imageElement = null;
                    }                    
                    _ProcessButtonImage();
                }                
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
                    this.Content.removeAttribute("disabled");
                }
                else
                {
                    this.Content.setAttribute("disabled", (!enabled).ToString());
                }
            }
        }
    }
}