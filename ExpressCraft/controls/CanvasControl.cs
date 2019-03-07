using static Retyped.dom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class CanvasControl : Control
    {
        public CanvasRenderingContext2D Context;
        public HTMLCanvasElement Canvas;
        public bool ClearOnResize = true;

        private int _width = -1;
        private int _height = -1;

        private Graphics _graphics = null;
        
        public CanvasControl() : base(new HTMLCanvasElement())
        {
            Canvas = this.Content.As<HTMLCanvasElement>();
     
            Context = Canvas.getContext("2d").As<CanvasRenderingContext2D>();

            OnResize = (sender) =>
            {
                var bounds = (DOMRect)Content.getBoundingClientRect();
                if(_width == -1)
                    Canvas.width = (uint)bounds.width;
                if(_height == -1)
                    Canvas.height = (uint)bounds.height;

                Refresh();
            };
        }

        public override void Render()
        {
            base.Render();

            Refresh();
        }

        public void SetClientSize(int width, int height)
        {
            Canvas.width = (uint)width;
            Canvas.height = (uint)height;
        }

        public Size GetClientSize => new Size() { Width = (int)Canvas.width, Height = (int)Canvas.height };
                                
        /// <summary>
        /// Refresh control..
        /// </summary>
        public void Refresh()
        {
            var bounds = (DOMRect)Content.getBoundingClientRect();

            if (_width == -1 && (uint)bounds.width != Canvas.width)
                Canvas.width = (uint)bounds.width;
            if (_height == -1 && (uint)bounds.height != Canvas.height)
                Canvas.height = (uint)bounds.height;
            
            if (ClearOnResize)
                OnClear();
            OnPaint(CreateGraphics());
        }

        public Graphics CreateGraphics()
        {
            if (_graphics == null)
                return _graphics = new Graphics(this);
            return _graphics;
        }

        public virtual void OnClear()
        {
            Context.clearRect(0, 0, Canvas.width, Canvas.height);
        }

        public virtual void OnPaint(Graphics graphics)
        {

        }
    }

}
