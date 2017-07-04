using System;
using System.Collections.Generic;
using System.Globalization;
using Bridge;
using Bridge.Html5;

namespace ExpressCraft
{
    public class InputDialogCheckbox : InputDialogBase
    {

        /// <summary>
        ///     Creates a Question Dialog with a checkbox
        ///     The Result Property contains a boolean value of the checkbox state
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        public InputDialogCheckbox(string title, string question) : this(title, question, 360)
        {
            
        }

        /// <summary>
        ///     Creates a Question Dialog with a checkbox
        ///     The Result Property contains a boolean value of the checkbox state
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        /// <param name="size">The width of this dialog. The default size is 360</param>
        public InputDialogCheckbox(string title, string question, int size) : base(title, size, question)
        {
            var input = Input("inputcontrol", InputType.Checkbox);
            input.Id = "DialogAnswerBox";
            input.SetBounds("10px", "0px", "90%", "40px");
            input.OnChange = ev => {
                Result = input.Checked;
            };
            AnswerDiv.AppendChild(input);
            Create(QuestionSize + 40 + 25 + 78);
        }

        public bool Result { get; private set; }
    }

    public class InputDialogColour : InputDialogBase
    {
        /// <summary>
        ///     Creates a Question Dialog with a colour selector
        ///     The Result Property contains the HexCode for the selected colour
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        public InputDialogColour(string title, string question) : this(title, question, 360)
        {
        }

        /// <summary>
        ///     Creates a Question Dialog with a colour selector
        ///     The Result Property contains the HexCode for the selected colour
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        /// <param name="size">The width of this dialog. The default size is 360</param>
        public InputDialogColour(string title, string question, int size) : base(title, size, question)
        {
            var input = Input("inputcontrol", InputType.Color);
            input.Id = "DialogAnswerBox";
            input.SetBounds("10px", "0px", "90%", "40px");
            input.OnChange = ev => { Result = input.Value; };
            AnswerDiv.AppendChild(input);
            Create(QuestionSize + 40 + 25 + 78);
        }

        public string Result { get; private set; }
    }

    public class InputDialogDate : InputDialogBase
    {
        /// <summary>
        ///     Creates a Question Dialog with a Date Selector
        ///     The Result Property contains the selected Date
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        public InputDialogDate(string title, string question) : this(title, question, 360)
        {
        }

        /// <summary>
        ///     Creates a Question Dialog with a Date Selector
        ///     The Result Property contains the selected Date
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        /// <param name="size">The width of this dialog. The default size is 360</param>
        public InputDialogDate(string title, string question, int size) : base(title, size, question)
        {
            var input = Input("inputcontrol", InputType.Date);
            input.Id = "DialogAnswerBox";
            input.SetBounds("10px", "0px", "90%", "auto");
            input.OnChange = ev => { Result = input.Value; };
            AnswerDiv.AppendChild(input);
            Create(QuestionSize + 25 + 25 + 78);
        }

        public string Result { get; private set; }
    }


    public class InputDialogDateTimeLocal : InputDialogBase {
        /// <summary>
        ///     Creates a Question Dialog with a Date Selector
        ///     The Result Property contains the selected Date
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        public InputDialogDateTimeLocal(string title, string question) : this(title, question, 360) {
        }

        /// <summary>
        ///     Creates a Question Dialog with a Date Selector
        ///     The Result Property contains the selected Date
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        /// <param name="size">The width of this dialog. The default size is 360</param>
        public InputDialogDateTimeLocal(string title, string question, int size) : base(title, size, question)
        {
            Result = DateTime.Now;
            var input = Input("inputcontrol", InputType.DateTimeLocal);
            input.Id = "DialogAnswerBox";
            input.SetBounds("10px", "0px", "90%", "auto");
            input.OnChange = ev =>
            {
                Result = DateTime.ParseExact(input.Value, "yyyy-MM-ddTHH:mm", CultureInfo.InvariantCulture);
            };
            AnswerDiv.AppendChild(input);
            Create(QuestionSize + 25 + 25 + 78);
        }

        public DateTime Result
        {
            get; private set;
        }
    }

    public class InputDialogEmail : InputDialogBase {
        /// <summary>
        ///     Creates a Question Dialog with an email input
        ///     The Result Property contains the Entered email address
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        public InputDialogEmail(string title, string question) : this(title, question, 360) {
        }

        /// <summary>
        ///     Creates a Question Dialog with an email input
        ///     The Result Property contains the Entered email
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        /// <param name="size">The width of this dialog. The default size is 360</param>
        public InputDialogEmail(string title, string question, int size) : base(title, size, question) {
            var input = Input("inputcontrol", InputType.Email);
            input.Id = "DialogAnswerBox";
            input.SetBounds("10px", "0px", "90%", "auto");
            input.OnChange = ev => {
                //todo css for email input not showing up
                //todo could always validate email here
                Result = input.Value;
            };
            AnswerDiv.AppendChild(input);
            Create(QuestionSize + 25 + 25 + 78);
        }

        public string Result
        {
            get; private set;
        }
    }

    public class InputDialogWeek : InputDialogBase {
        /// <summary>
        ///     Creates a Question Dialog with a Week input
        ///     The Result Property contains the Entered week
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        public InputDialogWeek(string title, string question) : this(title, question, 360) {
        }

        /// <summary>
        ///     Creates a Question Dialog with a Week input
        ///     The Result Property contains the Entered Week
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        /// <param name="size">The width of this dialog. The default size is 360</param>
        public InputDialogWeek(string title, string question, int size) : base(title, size, question) {
            var input = Input("inputcontrol", InputType.Week);
            input.Id = "DialogAnswerBox";
            input.SetBounds("10px", "0px", "90%", "auto");
            input.OnChange = ev => {
                Result = input.Value;
            };
            AnswerDiv.AppendChild(input);
            Create(QuestionSize + 25 + 25 + 78);
        }

        public string Result
        {
            get; private set;
        }
    }

    public class InputDialogMonth : InputDialogBase {
        /// <summary>
        ///     Creates a Question Dialog with a Month input
        ///     The Result Property contains the Entered Month
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        public InputDialogMonth(string title, string question) : this(title, question, 360) {
        }

        /// <summary>
        ///     Creates a Question Dialog with a Month input
        ///     The Result Property contains the Entered Month
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        /// <param name="size">The width of this dialog. The default size is 360</param>
        public InputDialogMonth(string title, string question, int size) : base(title, size, question) {
            var input = Input("inputcontrol", InputType.Month);
            input.Id = "DialogAnswerBox";
            input.SetBounds("10px", "0px", "90%", "auto");
            input.OnChange = ev => {
                Result = input.Value;
            };
            AnswerDiv.AppendChild(input);
            Create(QuestionSize + 25 + 25 + 78);
        }

        public string Result
        {
            get; private set;
        }
    }


    public class InputDialogNumber : InputDialogBase
    {
        /// <summary>
        ///     Creates a Question Dialog with a Number Selector
        ///     The Result Property contains the selected value
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        public InputDialogNumber(string title, string question) : this(title, question, 360)
        {
        }

        /// <summary>
        ///     Creates a Question Dialog with a Number Selector
        ///     The Result Property contains the selected value
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        /// <param name="size">The width of this dialog. The default size is 360</param>
        public InputDialogNumber(string title, string question, int size) : base(title, size, question)
        {
            var input = Input("inputcontrol", InputType.Number);
            input.Id = "DialogAnswerBox";
            input.SetBounds("10px", "0px", "90%", "auto");
            input.OnChange = ev => { Result = input.ValueAsNumber; };
            AnswerDiv.AppendChild(input);
            Create(QuestionSize + 25 + 25 + 78);
        }

        public double Result { get; private set; }
    }


    public class InputDialogText : InputDialogBase
    {
        /// <summary>
        ///     Creates a Question Dialog with a Text input
        ///     The Result Property contains the Entered Text
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        public InputDialogText(string title, string question) : this(title, question, 360)
        {
        }

        /// <summary>
        ///     Creates a Question Dialog with a Text input
        ///     The Result Property contains the Entered Text
        /// </summary>
        /// <param name="title">The message that will appear in the title bar of the dialog</param>
        /// <param name="question">The message that will appear about the input box on the dialog</param>
        /// <param name="size">The width of this dialog. The default size is 360</param>
        public InputDialogText(string title, string question, int size) : base(title, size, question)
        {
            var input = Input("inputcontrol", InputType.Text);
            input.Id = "DialogAnswerBox";
            input.SetBounds("10px", "0px", "90%", "auto");
            input.OnChange = ev => { Result = input.Value; };
            AnswerDiv.AppendChild(input);
            Create(QuestionSize + 25 + 25 + 78);
        }

        public string Result { get; private set; }
    }


    public class InputDialogBase : DialogForm
    {
        protected InputDialogBase(string title, int width, string question) : base(title)
        {
            Width = width.ToPx();
            Wrapper = Div();
            QuestionDiv = Div();
            AnswerDiv = Div();
            _buttonCollection = new List<SimpleDialogButton>
            {
                new SimpleDialogButton(this, DialogResultEnum.OK) {Text = "Accept"},
                new SimpleDialogButton(this, DialogResultEnum.Cancel) {Text = "Cancel"}
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

            if (!tb.ElelemtsOverMax)
            {
                width = (int) tb.MaxCalculatedWidth + 65 + 37;
                if (width < Settings.MessageFormMinimumWidthInPx)
                    width = Settings.MessageFormMinimumWidthInPx;
            }
            if (tb.ComputedHeight > Settings.MessageFormTextMaximumHeightInPx)
                tb.ComputedHeight = Settings.MessageFormTextMaximumHeightInPx;
            if (tb.ComputedHeight < Settings.MessageFormTextMinimumHeightInPx)
                tb.ComputedHeight = Settings.MessageFormTextMinimumHeightInPx;

            QuestionDiv.InnerHTML = question;
            QuestionSize = Convert.ToInt32(tb.ComputedHeight);
        }

        protected int QuestionSize { get; set; }
        private HTMLDivElement Wrapper { get; }
        protected HTMLDivElement QuestionDiv { get; set; }
        protected HTMLDivElement AnswerDiv { get; set; }
        protected HTMLDivElement ImageDiv { get; set; }

        protected void Create(int height)
        {
            Wrapper.AppendChild(QuestionDiv);
            Wrapper.AppendChild(new HTMLBRElement());
            Wrapper.AppendChild(AnswerDiv);
            Body.AppendChild(Wrapper);

            ButtonSection.AppendChildrenTabIndex(_buttonCollection.ToArray());

            Height = height.ToPx();
            AllowSizeChange = false;
        }
    }
}