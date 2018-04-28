using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class SheetRow
    {
        private float _height = 22;
        protected Sheet _sheet;

        public SheetRow(Sheet sheet)
        {
            _sheet = sheet;
        }

        public float Height
        {
            get { return _height; }
            set
            {
                if(_height != value)
                {
                    _height = value;
                    _sheet?.RequestRefresh();
                }
            }
        }
    }
}
