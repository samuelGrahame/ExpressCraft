using Bridge.Html5;
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

                _imageElement.Style.Height = padding;
                _imageElement.Style.Position = Position.Absolute;
                _imageElement.Style.Top = "1px";

                if(!_imageRightAlign)
                {
                    _imageElement.Style.BackgroundPosition = "left";
                    _imageElement.Style.PaddingLeft = padding;
                    _imageElement.Style.PaddingRight = "";

                    _imageElement.Style.Left = "1px";

                    if(Content.LastChild == null)
                    {
                        Content.AppendChild(_imageElement);
                    }
                    else
                    {
                        Content.InsertBefore(_imageElement, Content.LastChild);
                    }                    
                }
                else
                {
                    _imageElement.Style.Right = "1px";
                    _imageElement.Style.Left = "";
                    _imageElement.Style.BackgroundPosition = "right";
                    _imageElement.Style.PaddingRight = padding;
                    _imageElement.Style.PaddingLeft = "";

                    Content.AppendChild(_imageElement);
                }                
            }           
        }

        public SimpleButton(ButtonType button = ButtonType.Button, bool ac = true) : base("simplebutton", button, ac)
        {
            Content.OnContextMenu = (ev) =>
            {
                ev.StopPropagation();
                ev.PreventDefault();
            };

            if(ac)
                Style.Font = Settings.Font;

            this.SetSize("69px", "20px");

            Content.OnClick = (ev) =>
            {
                if(enabled)
                {
                    this.Content.Blur();

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
            get { return this.Content.As<HTMLButtonElement>().InnerHTML; }
            set
            {
                if(Text != value)
                {
                    this.Content.As<HTMLButtonElement>().InnerHTML = value;

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