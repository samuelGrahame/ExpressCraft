using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class StyleBrush : Brush
    {
        public string Style;
        public StyleBrush(string style)
        {
            Style = style;
        }
    }
}
