using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public interface IPages
    {
        void AddRibbonPages(params RibbonPage[] pages);
    }
}
