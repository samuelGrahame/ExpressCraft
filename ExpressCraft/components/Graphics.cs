using static Retyped.dom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class Graphics
    {
        private HTMLCanvasElement _canvas;
        public CanvasRenderingContext2D _context;

        public Graphics(CanvasControl control)
        {
            _canvas = control.Canvas;
            _context = _canvas.getContext("2d").As<CanvasRenderingContext2D>();
        }

        public void Clear(Color color)
        {
            _context.clearRect(0, 0, _canvas.width, _canvas.height);
            if(Color.Transparent != color)
            {
                FillRectangle(new SolidBrush(color), 0, 0, (float)_canvas.width, (float)_canvas.height);
            }            
        }

        public void ApplyFill(Brush brush)
        {
            if(brush is SolidBrush)
            {
                _context.fillStyle = brush.As<SolidBrush>().Color.ToHex();
            }else if(brush is StyleBrush)
            {
                _context.fillStyle = brush.As<StyleBrush>().Style;
            }
        }

        public void ApplyPen(Pen pen)
        {
            if(pen.Brush is SolidBrush)
            {
                _context.strokeStyle = pen.Brush.As<SolidBrush>().Color.ToHex();
            }
            else if(pen.Brush is StyleBrush)
            {
                _context.strokeStyle = pen.Brush.As<StyleBrush>().Style;
            }
            float width = pen.Width;
            if(width < 0)
                width = 1;            
            _context.lineWidth = width;

            // who knows???
            if(pen.DashStyle != DashStyle.Solid)
            {
                switch(pen.DashStyle)
                {                    
                    case DashStyle.Dash:
                        _context.setLineDash(new double[] { 2, 2 });
                        break;
                    case DashStyle.Dot:
                        _context.setLineDash(new double[] { 1, 1 });
                        break;
                    case DashStyle.DashDot:
                        _context.setLineDash(new double[] { 2, 1, 1, 1 });
                        break;
                    case DashStyle.DashDotDot:
                        break;
                    case DashStyle.Custom:
                        break;
                    default:
                        break;
                }                
            }            
        }

        public void FillRectangle(Brush brush, float x, float y, float width, float height)
        {
            FillRectangle(brush, (int)x, (int)y, (int)width, (int)height);
        }
        
        public void FillRectangle(Brush brush, int x, int y, int width, int height)
        {
            ApplyFill(brush);
            _context.fillRect(x, y, width, height);
        }
        
        public void FillRectangle(Brush brush, Rectangle rect)
        {
            FillRectangle(brush, rect.X, rect.Y, rect.Width, rect.Height);
        }
        
        public void FillRectangle(Brush brush, RectangleF rect)
        {
            FillRectangle(brush, rect.X, rect.Y, rect.Width, rect.Height);
        }
        // Ellcipse

        public void FillEllipse(Brush brush, float x, float y, float width, float height)
        {
            var width_over_2 = width / 2;
            var width_two_thirds = width * 2 / 3;
            var height_over_2 = height / 2;

            x += width_over_2;
            y += height_over_2;

            _context.beginPath();            
            _context.moveTo(x, y - height_over_2);
            _context.bezierCurveTo(x + width_two_thirds, y - height_over_2, x + width_two_thirds, y + height_over_2, x, y + height_over_2);
            _context.bezierCurveTo(x - width_two_thirds, y + height_over_2, x - width_two_thirds, y - height_over_2, x, y - height_over_2);
            _context.closePath();
            ApplyFill(brush);
            _context.fill();
        }

        public void FillEllipse(Brush brush, int x, int y, int width, int height)
        {
            FillEllipse(brush, (float)x, (float)y, (float)width, (float)height);
        }

        public void FillEllipse(Brush brush, Rectangle rect)
        {
            FillEllipse(brush, rect.X, rect.Y, rect.Width, rect.Height);
        }

        public void FillEllipse(Brush brush, RectangleF rect)
        {
            FillEllipse(brush, rect.X, rect.Y, rect.Width, rect.Height);
        }

        public void DrawEllipse(Pen pen, float x, float y, float width, float height)
        {            
            var width_over_2 = width / 2;
            var width_two_thirds = width * 2 / 3;
            var height_over_2 = height / 2;

            x += width_over_2;
            y += height_over_2;

            _context.beginPath();
            ApplyPen(pen);
            _context.moveTo(x, y - height_over_2);
            _context.bezierCurveTo(x + width_two_thirds, y - height_over_2, x + width_two_thirds, y + height_over_2, x, y + height_over_2);
            _context.bezierCurveTo(x - width_two_thirds, y + height_over_2, x - width_two_thirds, y - height_over_2, x, y - height_over_2);
            _context.closePath();
            _context.stroke();            
        }

        public void DrawEllipse(Pen pen, int x, int y, int width, int height)
        {
            DrawEllipse(pen, (float)x, (float)y, (float)width, (float)height);
        }

        public void DrawEllipse(Pen pen, Rectangle rect)
        {
            DrawEllipse(pen, rect.X, rect.Y, rect.Width, rect.Height);
        }

        public void DrawEllipse(Pen pen, RectangleF rect)
        {
            DrawEllipse(pen, rect.X, rect.Y, rect.Width, rect.Height);
        }


        // Draw rec

        public void DrawRectangle(Pen pen, float x, float y, float width, float height)
        {
            DrawRectangle(pen, (int)x, (int)y, (int)width, (int)height);
        }

        public void DrawRectangle(Pen pen, int x, int y, int width, int height)
        {
            ApplyPen(pen);
            _context.strokeRect(x, y, width, height);            
        }

        public void DrawRectangle(Pen pen, Rectangle rect)
        {
            DrawRectangle(pen, rect.X, rect.Y, rect.Width, rect.Height);
        }

        public void DrawRectangle(Pen pen, RectangleF rect)
        {
            DrawRectangle(pen, rect.X, rect.Y, rect.Width, rect.Height);
        }

        // End Draw rec

        public void DrawLine(Pen pen, float x1, float y1, float x2, float y2)
        {
            _context.beginPath();
            _context.moveTo(x1, y1);
            _context.lineTo(x2, y2);
            ApplyPen(pen);
            _context.stroke();
        }
        
        public void DrawLine(Pen pen, PointF pt1, PointF pt2)
        {
            DrawLine(pen, pt1.X, pt1.Y, pt2.X, pt2.Y);
        }
        
        public void DrawLine(Pen pen, int x1, int y1, int x2, int y2)
        {
            _context.beginPath();
            _context.moveTo(x1, y1);
            _context.lineTo(x2, y2);
            ApplyPen(pen);
            _context.stroke();
        }
        
        public void DrawLine(Pen pen, Point pt1, Point pt2)
        {
            DrawLine(pen, pt1.X, pt1.Y, pt2.X, pt2.Y);
        }

        
        public void DrawString(string s, Font font, Brush brush, RectangleF layoutRectangle, StringFormat format)
        {
            DrawString(s, font, brush, layoutRectangle.X, layoutRectangle.Y, format);
        }
        
        public void DrawString(string s, Font font, Brush brush, RectangleF layoutRectangle)
        {
            DrawString(s, font, brush, layoutRectangle, null);
        }
        
        public void DrawString(string s, Font font, Brush brush, PointF point, StringFormat format)
        {
            DrawString(s, font, brush, point.X, point.Y, format);
        }        
        
        public void DrawString(string s, Font font, Brush brush, float x, float y, StringFormat format)
        {
            ApplyFill(brush);
            _context.font = font.FontString;
            _context.fillText(s, x, y);
        }

        public void DrawString(string s, Font font, Brush brush, double x, double y, double maxWidth, bool alignmentCentre = false, bool baseIsTop = true)
        {
            ApplyFill(brush);
            if(baseIsTop)
                _context.textBaseline = "top";

            if(alignmentCentre)
            {
                _context.textAlign = "center";
            }else
            {
                _context.textAlign = "left";
            }
            
            _context.font = font.FontString;
            _context.fillText(s, x, y, maxWidth);
        }

        public void DrawString(string s, Font font, Brush brush, PointF point)
        {
            DrawString(s, font, brush, point.X, point.Y);
        }
        
        public void DrawString(string s, Font font, Brush brush, float x, float y)
        {
            DrawString(s, font, brush, x, y, null);
        }
        
        public void DrawBezier(Pen pen, float x1, float y1, float x2, float y2, float x3, float y3, float x4, float y4)
        {
            _context.beginPath();
            ApplyPen(pen);
            _context.moveTo(x1, y1);
            _context.bezierCurveTo(x2, y2, x3, y3, x4, y4);
            _context.closePath();
            _context.stroke();
        }
        
        public void DrawBezier(Pen pen, PointF pt1, PointF pt2, PointF pt3, PointF pt4)
        {
            DrawBezier(pen, pt1.X, pt1.Y, pt2.X, pt2.Y, pt3.X, pt3.Y, pt4.X, pt4.Y);
        }
        
        public void DrawBezier(Pen pen, Point pt1, Point pt2, Point pt3, Point pt4)
        {
            DrawBezier(pen, pt1.X, pt1.Y, pt2.X, pt2.Y, pt3.X, pt3.Y, pt4.X, pt4.Y);
        }
        
        public void DrawBeziers(Pen pen, PointF[] points)
        {
            _context.beginPath();
            ApplyPen(pen);
            var point = points[0];
            _context.moveTo(point.X, point.Y);
            for (int i = 1; i < points.Length; i+=3)
            {
                point = points[i];
                var point2 = points[i + 1];
                var point3 = points[i + 2];
                _context.bezierCurveTo(point.X, point.Y, point2.X, point2.Y, point3.X, point3.Y);
            }            
            _context.closePath();
            _context.stroke();
        }

        public void DrawBeziers(Pen pen, Point[] points)
        {
            _context.beginPath();
            ApplyPen(pen);
            var point = points[0];
            _context.moveTo(point.X, point.Y);
            for (int i = 1; i < points.Length; i += 3)
            {
                point = points[i];
                var point2 = points[i + 1];
                var point3 = points[i + 2];
                _context.bezierCurveTo(point.X, point.Y, point2.X, point2.Y, point3.X, point3.Y);
            }
            _context.closePath();
            _context.stroke();
        }
     
        public SizeF MeasureString(string text, Font font, SizeF layoutArea, StringFormat stringFormat, out int charactersFitted, out int linesFilled)
        {
            throw new NotImplementedException();
        }
        
        public SizeF MeasureString(string text, Font font, int width)
        {
            throw new NotImplementedException();
        }
        
        public SizeF MeasureString(string text, Font font, int width, StringFormat format)
        {
            throw new NotImplementedException();
        }
        
        public SizeF MeasureString(string text, Font font, PointF origin, StringFormat stringFormat)
        {
            throw new NotImplementedException();
        }
        
        public SizeF MeasureString(string text, Font font, SizeF layoutArea, StringFormat stringFormat)
        {
            throw new NotImplementedException();
        }

        public float MeasureStringWidth(string text, Font font)
        {
            _context.font = font.FontString;
            var size = _context.measureText(text);
            var sp = new HTMLSpanElement();
            sp.style.font = font.FontString;
            return (float)size.width;
        }

        public float MeasureStringHeight(string text, Font font)
        {
            return internalMeasureHeight(text, font);
        }

        public SizeF MeasureString(string text, Font font)
        {
            _context.font = font.FontString;
            var size = _context.measureText(text);
            var sp = new HTMLSpanElement();
            sp.style.font = font.FontString;
            
            return new SizeF(size.width, internalMeasureHeight(text, font));
        }

        private static Dictionary<string, float> cacheGetHeight = new Dictionary<string, float>();
        private static float internalMeasureHeight(string text, Font font)
        {
            if (cacheGetHeight.ContainsKey(font.FontString))
            {
                return cacheGetHeight[font.FontString];
            }
            
            var div = new Control();
            div.Content.textContent = text;            
            div.Left = -100;
            div.Top = -100;
            div.Style.font = font.FontString;

            document.body.AppendChild(div);

            var height = (float)((DOMRect)div.Content.getBoundingClientRect()).height;

            document.body.removeChild((Node)div);

            return cacheGetHeight[font.FontString] = height;
        }
        
        public SizeF MeasureString(string text, Font font, SizeF layoutArea)
        {
            throw new NotImplementedException();
        }
    }
}
