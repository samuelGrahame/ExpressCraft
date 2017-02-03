using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Bridge.Html5;

namespace ExpressCraft
{
    class InputDialogNumber : InputDialogBase
    {
        public InputDialogNumber(string title, string question, int size) : base(title, size, question)
        {
            var tb = new TextBlock(question, size - 25);
            tb.ComputeString();

            if( !tb.ElelemtsOverMax ) {
                size = (int)tb.MaxCalculatedWidth + 65 + 37;
                if( size < Settings.MessageFormMinimumWidthInPx )
                    size = Settings.MessageFormMinimumWidthInPx;
            }
            if( tb.ComputedHeight > Settings.MessageFormTextMaximumHeightInPx )
                tb.ComputedHeight = Settings.MessageFormTextMaximumHeightInPx;
            if( tb.ComputedHeight < Settings.MessageFormTextMinimumHeightInPx )
                tb.ComputedHeight = Settings.MessageFormTextMinimumHeightInPx;
        }
    }


    public class InputDialogText : InputDialogBase
    {
        public InputDialogText(string title, string question, int size = 360) : base(title, size, question)
        {
            var input = Input("inputcontrol", InputType.Text);
            input.Id = "DialogAnswerBox";
            input.SetBounds("10px", "0px", "90%", "auto");
            base.AnswerDiv.AppendChild(input);
            Create(base.QuestionSize + 25 + 60);
        }

        private string Result { get; set; }

        protected override void OnClosing() {
            Result = ((HTMLInputElement)Document.GetElementById("DialogAnswerBox")).Value;
            base.OnClosing();
        }

        protected override void OnClosed() {
            Window.Alert(Result);
            base.OnClosed();
        }
    }

    public class InputDialogBase : DialogForm
    {
        protected InputDialogBase(string title, int width, string question) : base(title)
        {
            base.Width = width.ToPx();
            Wrapper = Div();
            QuestionDiv = Div();
            AnswerDiv = Div();
            _buttonCollection = new List<SimpleDialogButton>() {
                new SimpleDialogButton(this, DialogResultEnum.OK) { Text = "Accept"},
                new SimpleDialogButton(this, DialogResultEnum.Cancel) { Text = "Cancel"}
            };

            Wrapper.Style.OverflowY = Overflow.Hidden;
            Wrapper.SetBounds("0px", "0px", "100%", "calc(100% - 60px)");
            QuestionDiv.Style.Position = Position.Relative;
            QuestionDiv.Style.Height = "auto";
            QuestionDiv.Style.MarginLeft = "10px";
            QuestionDiv.Style.MarginRight = "10px";
            QuestionDiv.Style.MarginTop = "10px";
            AnswerDiv.Style.Position = Position.Relative;
            AnswerDiv.Style.Height = "auto";
            _buttonCollection[0].SetLocation("calc(100% - 170px)", "calc(100% - 35px)");
            _buttonCollection[1].SetLocation("calc(100% - 85px)", "calc(100% - 35px)");

            var tb = new TextBlock(question, width - 25);
            tb.ComputeString();

            if( !tb.ElelemtsOverMax ) {
                width = (int)tb.MaxCalculatedWidth + 65 + 37;
                if( width < Settings.MessageFormMinimumWidthInPx )
                    width = Settings.MessageFormMinimumWidthInPx;
            }
            if( tb.ComputedHeight > Settings.MessageFormTextMaximumHeightInPx )
                tb.ComputedHeight = Settings.MessageFormTextMaximumHeightInPx;
            if( tb.ComputedHeight < Settings.MessageFormTextMinimumHeightInPx )
                tb.ComputedHeight = Settings.MessageFormTextMinimumHeightInPx;

            QuestionDiv.InnerHTML = tb.ComputedSource;
            QuestionSize = Convert.ToInt32(tb.ComputedHeight);
        }

        protected void Create(int height)
        {
            Wrapper.AppendChild(QuestionDiv);
            Wrapper.AppendChild(new HTMLBRElement());
            Wrapper.AppendChild(AnswerDiv);
            this.Body.AppendChild(Wrapper);

            this.ButtonSection.AppendChildrenTabIndex(_buttonCollection.ToArray());

            base.Height = height.ToPx();
            base.AllowSizeChange = false;
            
            
        }

        protected int QuestionSize { get; set; }
        private HTMLDivElement Wrapper { get;set; }
        protected HTMLDivElement QuestionDiv { get; set; }
        protected HTMLDivElement AnswerDiv { get; set; }
        protected HTMLDivElement ImageDiv { get; set; }
    }





    //public class InputDialog : DialogForm
    //{
    //    private InputType _inputType;


    //    /// <summary>
    //    /// Creates a user input dialog
    //    /// </summary>
    //    /// <param name="size">The size of the dialog, in px</param>
    //    /// <param name="inputType">What type of user input the dialog contains</param>
    //    public InputDialog(Size size , InputType inputType)
    //    {
    //        _inputType = inputType;
    //        Width = size.Width.ToPx();
    //        Height = size.Height.ToPx();
    //    }
    //}

    //public enum InputType
    //{
        
    //}
}