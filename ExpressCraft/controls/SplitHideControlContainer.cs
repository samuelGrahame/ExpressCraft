using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class SplitHideControlContainer : Control
    {
        public Control Body;
        public Control Slider;
        public Control Panel;

        private int _slideWidth;
        public int SlideWidth { get { return _slideWidth; } set
            {
                if(_slideWidth != value)
                {
                    _slideWidth = value;
                    RenderControl();
                }
            }
        }

        private SliderLocation _sliderLocation = SliderLocation.Left;
        public SliderLocation SliderLocation { get { return _sliderLocation; } set
            {
                if(_sliderLocation != value)
                {
                    _sliderLocation = value;
                    RenderControl();
                }                
            } }

        private bool _sliderVisible = false;
        public bool SliderVisible { get { return _sliderVisible; } set
            {
                if(_sliderVisible != value)
                {
                    _sliderVisible = value;
                    RenderControl();
                }
            } }

        public SplitHideControlContainer() : base()
        {
            Body = new Control();
            Slider = new Control("primary");
            Panel = new Control();
            var span = Span("form-heading-title");
            span.TextContent = ">";
            span.Style.FontStyle = "26px";
            span.Style.FontWeight = "bold";
            span.Style.Color = "white";

            Slider.Content.AppendChild(span);

            RenderControl();
        }

        public void RenderControl()
        {
            
        }

    }

    public enum SliderLocation
    {
        Left,
        Right
    }
}
