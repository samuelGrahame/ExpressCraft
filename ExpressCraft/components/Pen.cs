using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{

    public class Pen : IDisposable
    {
        public Brush Brush;
        public float Width;
        public DashStyle DashStyle;

        public Pen(Color color) : this(color, 1)
        {
            
        }

        public Pen(Color color, float width)
        {
            Width = width;
            Brush = new SolidBrush(color);
        }

        public Pen(Brush brush, float width)
        {
            Width = width;
            Brush = brush;
        }

        public Pen(Brush brush) : this(brush, 1)
        {
            
        }

        public void Dispose()
        {
            
        }
    }
    
    public enum DashStyle
    {        
        Solid = 0,        
        Dash = 1,        
        Dot = 2,        
        DashDot = 3,        
        DashDotDot = 4,        
        Custom = 5 // Not yet implemented
    }
}
