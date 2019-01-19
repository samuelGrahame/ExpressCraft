using static Retyped.dom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class CanvasControl : ExControl
    {
        public CanvasRenderingContext2D Context;
        public HTMLCanvasElement Canvas;
        public bool ClearOnResize = true;

        public CanvasControl() : base(new HTMLCanvasElement())
        {
            Canvas = this.Content.As<HTMLCanvasElement>();
     
            Context = Canvas.getContext("2d").As<CanvasRenderingContext2D>();

            OnResize = (sender) =>
            {
                var bounds = (DOMRect)Content.getBoundingClientRect();
                Canvas.width = (uint)bounds.width;
                Canvas.height = (uint)bounds.height;

                Refresh();
            };
        }

        public override void Render()
        {
            base.Render();

            Refresh();
        }


        /// <summary>
        /// Refresh control..
        /// </summary>
        public void Refresh()
        {
            if(ClearOnResize)
                OnClear();
            OnPaint();
        }

        public Graphics CreateGraphics()
        {
            return new Graphics(this);
        }

        public virtual void OnClear()
        {
            Context.clearRect(0, 0, Canvas.width, Canvas.height);
        }

        public virtual void OnPaint()
        {

        }
    }

}
