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

        public event EventHandler<MouseEvent> MouseDown = null;
        public event EventHandler<MouseEvent> MouseUp = null;
        public event EventHandler<MouseEvent> MouseMove = null;

        public event EventHandler<MouseEvent> MouseWheel = null;

        public virtual void OnMouseWheel(CanvasControl canvasControl, MouseEvent mouseEvent)
        {
            if (MouseWheel != null)
                MouseWheel(canvasControl, mouseEvent);
        }

        public virtual void OnMouseDown(CanvasControl canvasControl, MouseEvent mouseEvent)
        {
            if (MouseDown != null)
                MouseDown(canvasControl, mouseEvent);
        }

        public virtual void OnMouseUp(CanvasControl canvasControl, MouseEvent mouseEvent)
        {
            if (MouseUp != null)
                MouseUp(canvasControl, mouseEvent);
        }

        public virtual void OnMouseMove(CanvasControl canvasControl, MouseEvent mouseEvent)
        {
            if (MouseMove != null)
                MouseMove(canvasControl, mouseEvent);
        }

        public event EventHandler<TouchEvent> TouchStart = null;
        public event EventHandler<TouchEvent> TouchEnd = null;
        public event EventHandler<TouchEvent> TouchMove = null;

        public virtual void OnTouchStart(CanvasControl canvasControl, TouchEvent touchEvent)
        {
            if (TouchStart != null)
                TouchStart(canvasControl, touchEvent);
        }

        public virtual void OnTouchEnd(CanvasControl canvasControl, TouchEvent touchEvent)
        {
            if (TouchEnd != null)
                TouchEnd(canvasControl, touchEvent);
        }

        public virtual void OnTouchMove(CanvasControl canvasControl, TouchEvent touchEvent)
        {
            if (TouchMove != null)
                TouchMove(canvasControl, touchEvent);
        }

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

            onmousedown = (ev) =>
            {
                OnMouseDown(this, ev);
            };

            onmousemove = (ev) =>
            {
                OnMouseMove(this, ev);
            };

            onmouseup = (ev) =>
            {
                OnMouseUp(this, ev);
            };

            onmousewheel = (ev) =>
            {
                OnMouseWheel(this, ev);
            };

            ontouchstart = (ev) =>
            {                
                OnTouchStart(this, ev);
            };

            ontouchmove = (ev) =>
            {
                OnTouchMove(this, ev);
            };

            ontouchend = (ev) =>
            {
                OnTouchMove(this, ev);
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
