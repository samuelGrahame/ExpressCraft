using static Retyped.dom;
using System;

namespace ExpressCraft
{
    public class MemoInput : TextInput
    {
        public int Rows
        {
            get { return (int)Content.As<HTMLTextAreaElement>().rows; }
            set { Content.As<HTMLTextAreaElement>().rows = value; }
        }

        public int Cols
        {
            get { return (int)Content.As<HTMLTextAreaElement>().cols; }
            set { Content.As<HTMLTextAreaElement>().cols = value; }
        }

        public int MaxLength
        {
            get { return (int)Content.As<HTMLTextAreaElement>().maxLength; }
            set { Content.As<HTMLTextAreaElement>().maxLength = value; }
        }

        private Vector2 PreSize;
        private Vector2 PrePreSize;
        private string PreZIndex;
        private bool _hasGotFocus;

        public bool DisableResize { get; set; }

        public override string GetValue()
        {
            return Content.As<HTMLTextAreaElement>().value;
        }

        public override void SetValue(string value)
        {
            Content.As<HTMLTextAreaElement>().value = value;
        }

        public MemoInput() : base(new HTMLTextAreaElement())
        {
            Style.resize = "none";

            OnGotFocus = (memo) =>
            {
                if(DisableResize)
                    return;

                Style.resize = "both";
                PrePreSize = Size;

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
                Style.resize = "none";
                PreSize = Size;
                Size = PrePreSize;
            };
        }
    }
}