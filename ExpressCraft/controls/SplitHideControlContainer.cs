using static Retyped.dom;

namespace ExpressCraft
{
    public class SplitHideControlContainer : Control
    {
        public Control Body;
        public Control Slider;
        public Control Panel;
        private HTMLSpanElement span;

        private int _slideWidth;

        public int SlideWidth
        {
            get { return _slideWidth; }
            set
            {
                if(_slideWidth != value)
                {
                    _slideWidth = value;
                    RenderControl();
                    ResizeChildren();
                }
            }
        }

        private SliderLocation _sliderLocation = SliderLocation.Left;

        public SliderLocation SliderLocation
        {
            get { return _sliderLocation; }
            set
            {
                if(_sliderLocation != value)
                {
                    _sliderLocation = value;
                    RenderControl();
                    ResizeChildren();
                }
            }
        }

        private bool _sliderVisible = false;

        public bool SliderVisible
        {
            get { return _sliderVisible; }
            set
            {
                if(_sliderVisible != value)
                {                    
                    _sliderVisible = value;
                    RenderControl();
                    ResizeChildren();
                }
            }
        }

        private int refreshId = -1;

        private void ResizeChildren()
        {
            if(this.LinkedForm != null && this.Content != null)
            {
                
                if(refreshId != -1)
                {
                    clearTimeout(refreshId);
                }
                refreshId = (int)setTimeout((ab) =>
                {
                    this.LinkedForm.ResizeChildren(this.Content);
                    refreshId = -1;
                }, 100);
            }
        }

        public SplitHideControlContainer() : base()
        {
            Body = new Control();
            Slider = new Control("primary");
            Panel = new Control();
            Panel.Style.overflow = "hidden";
            Body.Style.overflow = "hidden";
            span = Span("form-heading-title");
            span.textContent = ">";

            span.style.fontWeight = "bold";
            span.style.color = "white";

            Slider.Content.AppendChild(span);
            
            Slider.Style.transition = "width 0.1s, left 0.1s";
            
            Panel.Style.transition = "width 0.1s";

            Slider.Style.filter = "brightness(90%)";

            if(Helper.NotDesktop)
            {
                span.style.fontStyle = "36px";
                Slider.Width = 65;
            }
            else
            {
                span.style.fontStyle = "26px";
                Slider.Width = 30;
            }

            Slider.Height = "100%";

            Slider.Content.onclick = (ev) =>
            {
                SliderVisible = !SliderVisible;
            };
            _slideWidth = 250;
            Content.AppendChildren(Panel, Slider, Body);

            RenderControl();
        }

        public void RenderControl()
        {
            int width;
            if(Helper.NotDesktop)
            {
                width = 65;
            }
            else
            {
                width = 30;
            }

            if(SliderLocation == SliderLocation.Left)
            {
                if(SliderVisible)
                {
                    span.textContent = "<";
                    Panel.Width = SlideWidth;
                    Slider.Left = SlideWidth;
                    Body.Location = new Vector2(width + SlideWidth, 0);
                    Body.Size = new Vector2("(100% - " + (width + SlideWidth) + "px)", "100%");
                }
                else
                {
                    span.textContent = ">";
                    Slider.Left = 0;
                    Panel.Width = 0;
                    Body.Location = new Vector2(width, 0);
                    Body.Size = new Vector2("(100% - " + (width) + "px)", "100%");
                }

                Panel.Location = new Vector2(0, 0);
                Panel.Height = "100%";
            }
            else
            {
                /// WORKING ON!!!!!!!!!!!!!!!!!
                if(SliderVisible)
                {
                    span.textContent = ">";
                    Panel.Width = SlideWidth;
                    Panel.Location = new Vector2("(100% - " + (SlideWidth) + "px)", 0);
                    Slider.Left = "(100% - " + (width + SlideWidth) + "px)";                    
                    Body.Size = new Vector2("(100% - " + (width + SlideWidth) + "px)", "100%");
                }
                else
                {
                    span.textContent = "<";
                    Slider.Left ="(100% - " + (width) + "px)";
                    Panel.Width = 0;
                    Body.Size = new Vector2("(100% - " + (width) + "px)", "100%");
                }

                Body.Location = new Vector2(0, 0);
                Panel.Height = "100%";
            }
        }
    }

    public enum SliderLocation
    {
        Left,
        Right
    }
}