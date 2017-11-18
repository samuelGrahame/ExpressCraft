using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class SizeF
    {
        public float Width;
        public float Height;

        public SizeF(float width, float height)
        {
            Width = width;
            Height = height;
        }

        public SizeF(double width, double height)
        {
            Width = (float)width;
            Height = (float)height;
        }

        public override string ToString()
        {
            return $"{Width}, {Height}";
        }
    }
}
