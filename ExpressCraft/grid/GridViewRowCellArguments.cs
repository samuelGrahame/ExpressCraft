using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Retyped.dom;

namespace ExpressCraft
{
    public class GridViewRowCellArguments
    {
        public int DataRowHandle;
        public HTMLElement Element;
        public GridViewColumn ViewColumn;
        public string DisplayValue;
        public object Value => ViewColumn.GetCellValueByDataRowHandle(DataRowHandle);
    }
}
