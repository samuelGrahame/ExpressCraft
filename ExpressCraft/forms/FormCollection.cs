using System.Collections.Generic;

namespace ExpressCraft
{
    public class FormCollection
    {
        public ExForm FormOwner;
        public List<ExForm> VisibleForms = new List<ExForm>();

        public FormCollection(ExForm formOwner)
        {
            FormOwner = formOwner;
        }
    }
}