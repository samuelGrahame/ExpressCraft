using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Retyped;
using static Retyped.dom;

namespace ExpressCraft
{
    public class ErrorEventHandlerOverride : ErrorEventHandler
    {
        public ErrorEventHandlerOverride()
        {

        }

        public override void Self(string message)
        {
           
        }

        public override void Self(string message, string filename)
        {
            
        }

        public override void Self(string message, string filename, double lineno)
        {
            
        }

        public override void Self(string message, string filename, double lineno, double colno)
        {
            
        }

        public override void Self(string message, string filename, double lineno, double colno, es5.Error error)
        {
            
        }
    }
}
