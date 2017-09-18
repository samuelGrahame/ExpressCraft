using Bridge.Html5;
using System;

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

        public int MaxLength
        {
            get { return Content.As<HTMLTextAreaElement>().MaxLength; }
            set { Content.As<HTMLTextAreaElement>().MaxLength = value; }
        }

        private Vector2 PreSize;
        private Vector2 PrePreSize;
        private string PreZIndex;
        private bool _hasGotFocus;

        public bool DisableResize { get; set; }

        public override string GetValue()
        {
            return Content.As<HTMLTextAreaElement>().Value;
        }

        public override void SetValue(string value)
        {
            Content.As<HTMLTextAreaElement>().Value = value;
        }

        public MemoInput() : base(new HTMLTextAreaElement())
        {
            Style.Resize = Resize.None;

            OnGotFocus = (memo) =>
            {
                if(DisableResize)
                    return;

                Style.Resize = Resize.Both;
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
                Style.Resize = Resize.None;
                PreSize = Size;
                Size = PrePreSize;
            };
        }
    }
}