using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class DialogResult
    {
        public DialogResultEnum ResultEnum = DialogResultEnum.None;
        public Action CallBack = null;

        public DialogResult(DialogResultEnum resultEnum, Action callBack)
        {
            ResultEnum = resultEnum;
            CallBack = callBack;
        }
        public void InvokeIfResult(DialogResultEnum resultEnum)
        {
            if (resultEnum == ResultEnum && CallBack != null)
                CallBack.Invoke();
        }
    }

    public enum DialogResultEnum
    {            
            None,
            OK,
            Cancel,
            Abort,
            Send,
            Ignore,
            Yes,
            No
    }    
}
