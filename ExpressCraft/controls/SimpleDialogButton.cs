using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class SimpleDialogButton : SimpleButton
    {
        public SimpleDialogButton(Form parentForm, DialogResultEnum dialogResult = DialogResultEnum.None) : base()
        {
            this.ParentForm = parentForm;
            this.DialogResult = dialogResult;
            
            this.SetSize(75, 23);
        }
    }
}
