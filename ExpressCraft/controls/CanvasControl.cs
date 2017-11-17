using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Bridge.Html5.CanvasTypes;

namespace ExpressCraft
{
    public class CanvasControl : Control
    {
        public CanvasRenderingContext2D Context;
        public HTMLCanvasElement Canvas;
        public bool ClearOnResize = true;

        public CanvasControl() : base(new HTMLCanvasElement())
        {
            Canvas = this.Content.As<HTMLCanvasElement>();
     
            Context = Canvas.GetContext(CanvasContext2DType.CanvasRenderingContext2D);

            OnResize = (sender) =>
            {
                var bounds = Content.GetBoundingClientRect();
                Canvas.Width = (int)bounds.Width;
                Canvas.Height = (int)bounds.Height;

                if(ClearOnResize)
                    OnClear();
                OnPaint();
            };
        }

        public Graphics CreateGraphics()
        {
            return new Graphics(this);
        }

        public virtual void OnClear()
        {
            Context.ClearRect(0, 0, Canvas.Width, Canvas.Height);
        }

        public virtual void OnPaint()
        {

        }
    }

}
