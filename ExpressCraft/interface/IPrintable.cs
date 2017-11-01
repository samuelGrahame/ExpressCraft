using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    interface IPrintable
    {
        List<Page> GetPages(Layout pageLayout, PageSize pageSize);
    }
}
