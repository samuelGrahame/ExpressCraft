using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class SheetCell
    {
        private object _value;
        protected Sheet _sheet;

        public SheetCell(Sheet sheet)
        {
            _sheet = sheet;
        }

        public object Value
        {
            get { return _value; }
            set
            {
                if(_value != value)
                {
                    _value = value;
                    _sheet?.RequestRefresh();
                }
            }
        }
    }
}
