using System.Collections.Generic;

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