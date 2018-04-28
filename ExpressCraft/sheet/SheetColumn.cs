using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class SheetColumn
    {
        private float _width = 100;
        protected Sheet _sheet;

        public SheetColumn(Sheet sheet)
        {
            _sheet = sheet;
        }

        public float Width
        {
            get { return _width; }
            set {
                if(_width != value)
                {
                    _width = value;
                    _sheet?.RequestRefresh();
                }
            }
        }
    }
}
