using Bridge.Html5;

namespace ExpressCraft
{
    public class ImageEdit : Control
    {
        private Control _noImageDataText;

        private bool _isURL;

        public bool isUrl
        {
            get { return _isURL; }
            set
            {
                if(_isURL != value)
                {
                    _isURL = value;
                    RefreshImage();
                }
            }
        }

        public ImageEdit() : base("inputcontrol")
        {
            _noImageDataText = new Control("form-heading-title");
            _noImageDataText.Content.InnerHTML = "No image data";
            _noImageDataText.Content.Style.Color = "black";
            _noImageDataText.Content.Style.Visibility = Visibility.Inherit;

            Content.AppendChild(_noImageDataText);
        }

        private string _image;

        public void RefreshImage()
        {
            if(string.IsNullOrWhiteSpace(_image))
            {
                _image = "";
                _noImageDataText.Content.Style.Visibility = Visibility.Hidden;
            }
            else
            {
                _noImageDataText.Content.Style.Visibility = Visibility.Inherit;
            }
            this.SetImage(_image, _isURL);
        }

        public string Image
        {
            get { return _image; }
            set
            {
                if(_image == value)
                    return;
                _image = value;
                RefreshImage();
            }
        }
    }
}