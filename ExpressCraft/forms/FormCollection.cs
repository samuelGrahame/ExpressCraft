using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class FormCollection
    {
        public Form FormOwner;
        public List<Form> VisibleForms = new List<Form>();

        public FormCollection(Form formOwner)
        {
            FormOwner = formOwner;			
		}
    }
}
