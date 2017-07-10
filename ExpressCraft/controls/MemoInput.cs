using Bridge;
using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
    public class MemoInput : TextInput
    {        
        public int Rows
        {
            get { return Content.As<HTMLTextAreaElement>().Rows; }
            set { Content.As<HTMLTextAreaElement>().Rows = value; }
        }

        public int Cols
        {
            get { return Content.As<HTMLTextAreaElement>().Cols; }
            set { Content.As<HTMLTextAreaElement>().Cols = value; }
        }

        private Vector2 PreSize;
        private Vector2 PrePreSize;
        private string PreZIndex;
        private bool _hasGotFocus;

        public MemoInput() : base(new HTMLTextAreaElement())
        {
            Style.Resize = Resize.None;
            
            OnGotFocus = (memo) =>
            {
                Style.Resize = Resize.Both;
                PrePreSize = Size;
                PreZIndex = Content.Style.ZIndex;
                Content.Style.ZIndex = "10000";
                if(_hasGotFocus)                
                    Size = PreSize;
                else
                {
                    _hasGotFocus = true;
                    PreSize = Size;
                }
                
            };
            OnLostFocus = (memo) =>
            {
                Style.Resize = Resize.None;
                PreSize = Size;
                Size = PrePreSize;
                Content.Style.ZIndex = PreZIndex;
            };
        }


    }
}
