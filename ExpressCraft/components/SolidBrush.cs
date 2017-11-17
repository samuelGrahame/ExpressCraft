using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class SolidBrush : Brush
    {
        public Color Color;
        public SolidBrush(Color color)
        {
            Color = color;
        }
    }
}
