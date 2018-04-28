using static Retyped.dom;
using System;
using System.Collections.Generic;

namespace ExpressCraft
{
    public class MessageBoxForm : DialogForm
    {
        private static HTMLAudioElement snd = null;
        private string _prompt;

        public static void Beep()
        {
            if(!Settings.MessageFormBeep)
                return;
            if(snd == null)
            {
                snd = new HTMLAudioElement();
                snd.src = ResourceManager.GetResourceString("beepSound");                
            }
            snd.play();
        }

        private readonly MessageBoxButtons _buttons;

        /// <summary>
        /// Create a new Message Dialog
        /// </summary>
        /// <param name="prompt">The text to be displayed in the message box</param>
        /// <param name="ui">The UI settings to be applied to the form</param>
        public MessageBoxForm(string prompt, MessageBoxLayout ui) : this(prompt, ui, MessageBoxButtons.Auto, ui.ToString()) { }

        /// <summary>
        /// Create a new Message Dialog
        /// </summary>
        /// <param name="prompt">The text to be displayed in the message box</param>
        /// <param name="ui">The UI settings to be applied to the form</param>
        /// <param name="title">The title of the message box</param>
        public MessageBoxForm(string prompt, MessageBoxLayout ui, string title) : this(prompt, ui, MessageBoxButtons.Auto, title) { }

        /// <summary>
        /// Create a new Message Dialog
        /// </summary>
        /// <param name="prompt">The text to be displayed in the message box</param>
        /// <param name="ui">The UI settings to be applied to the form</param>
        /// <param name="buttons">The Type of button to be displayed with this message</param>
        public MessageBoxForm(string prompt, MessageBoxLayout ui, MessageBoxButtons buttons) : this(prompt, ui, buttons, ui.ToString()) { }

        /// <summary>
        /// Create a new Message Dialog
        /// </summary>
        /// <param name="prompt">The text to be displayed in the message box</param>
        /// <param name="ui">The UI settings  to be applied to the form</param>
        /// <param name="buttons">The Type of button to be displayed with this message</param>
        /// <param name="title">The title of the message box</param>
        public MessageBoxForm(string prompt, MessageBoxLayout ui, MessageBoxButtons buttons, string title) : base(title)
        {
            var section = Div();
            var pic = Div("image32");
            var textContent = Div("messag-box-content");
            _prompt = prompt;
            _buttons = buttons;

            switch(ui)
            {
                case MessageBoxLayout.Exclamation:
                    if(_buttons == MessageBoxButtons.Auto)
                    {
                        _buttons = MessageBoxButtons.Ok;
                    }
                    pic.classList.add("imagewarning");
                    break;

                case MessageBoxLayout.Information:
                    if(_buttons == MessageBoxButtons.Auto)
                    {
                        _buttons = MessageBoxButtons.Ok;
                    }
                    pic.classList.add("imageinfo");
                    break;

                case MessageBoxLayout.Question:
                    if(_buttons == MessageBoxButtons.Auto)
                    {
                        _buttons = MessageBoxButtons.YesNo;
                    }
                    pic.classList.add("imageindex");
                    break;

                case MessageBoxLayout.Error:
                    if(_buttons == MessageBoxButtons.Auto)
                    {
                        _buttons = MessageBoxButtons.AbortSendCancel;
                    }
                    pic.classList.add("imageerror");
                    break;

                default:
                    throw new ArgumentOutOfRangeException(nameof(ui), ui, null);
            }
            string heightCalc = Helper.NotDesktop ? "(100% - 60px)" : "(100% - 35px)";
            switch(_buttons)
            {
                case MessageBoxButtons.Ok:
                    _buttonCollection = new List<SimpleDialogButton>() {
                        new SimpleDialogButton(this, DialogResultEnum.OK) { Text = "Ok", Location = new Vector2("(50% - 37.5px)", heightCalc)}
                    };
                    break;

                case MessageBoxButtons.YesNo:
                    _buttonCollection = new List<SimpleDialogButton>() {
                        new SimpleDialogButton(this, DialogResultEnum.No) { Text = "No", Location = new Vector2("(100% - 85px)", heightCalc)},
                        new SimpleDialogButton(this, DialogResultEnum.Yes) { Text = "Yes", Location = new Vector2("(100% - 170px)", heightCalc)}
                    };
                    break;

                case MessageBoxButtons.YesNoCancel:
                    _buttonCollection = new List<SimpleDialogButton>() {
                        new SimpleDialogButton(this, DialogResultEnum.Cancel) { Text = "Cancel", Location = new Vector2("(100% - 85px)", heightCalc) },
                        new SimpleDialogButton(this, DialogResultEnum.No) { Text = "No", Location = new Vector2("(100% - 170px)", heightCalc) },
                        new SimpleDialogButton(this, DialogResultEnum.Yes) { Text = "Yes", Location = new Vector2("(100% - 255px)", heightCalc) }
                    };
                    break;

                case MessageBoxButtons.AbortSendCancel:
                    _buttonCollection = new List<SimpleDialogButton>() {
                        new SimpleDialogButton(this, DialogResultEnum.Cancel) { Text = "Cancel", Location = new Vector2("(100% - 85px)", heightCalc)},
                        new SimpleDialogButton(this, DialogResultEnum.Send) { Text = "Send", Location = new Vector2("(100% - 170px)", heightCalc), ItemClick = (ev) => {
                            if(Settings.OnSendError != null)
                                Settings.OnSendError(_prompt);
                        } },
                        new SimpleDialogButton(this, DialogResultEnum.Abort) { Text = "Abort", Location = new Vector2("(100% - 255px)", heightCalc), ItemClick = (ev) => {
                            bool pre =Settings.AllowCloseWithoutQuestion;

                            Settings.AllowCloseWithoutQuestion = false;
                            Application.Close();
                            Settings.AllowCloseWithoutQuestion = pre;
                        }}
                    };
                    break;

                default:
                    throw new ArgumentOutOfRangeException();
            }
            TextBlock tb = null;

            int width = 480;

            if(!Helper.NotDesktop)
            {
                tb = new TextBlock(prompt, 480 - 25);
                tb.ComputeString();
                if(_buttonCollection.Count > 2)
                {
                    if(width < 320)
                        width = 320;
                }
                if(!tb.ElelemtsOverMax)
                {
                    width = (int)tb.MaxCalculatedWidth + 65 + 37;
                    if(width < Settings.MessageFormMinimumWidthInPx)
                        width = Settings.MessageFormMinimumWidthInPx;
                }
            }
            else
            {
                int count = _buttonCollection.Count;
                for(int i = 0; i < count; i++)
                {
                    var but = _buttonCollection[i];
                    but.Height = 45;
                    but.Style.borderRadius = "4px";
                    but.Style.fontSize = "14px";
                    if(but.DialogResult == DialogResultEnum.OK || but.DialogResult == DialogResultEnum.Yes)
                    {
                        but.ClassList.add("primary");
                        but.Style.color = "white";
                        but.Style.border = "0";
                    }
                }
            }

            textContent.innerHTML = prompt;

            section.style.overflowY = "auto";
            section.style.height = "100%";
            section.style.maxHeight = Settings.MessageFormTextMaximumHeightInPx.ToPx();
            section.appendChild(textContent);
            section.style.top = "32px";
            section.style.width = "90%";

            base.Body.AppendChildren(pic, section);

            ButtonSection.AppendChildrenTabIndex(_buttonCollection.ToArray());
            if(Helper.NotDesktop)
            {
                section.style.textAlign = "center";
                section.style.lineHeight = "100%";

                WindowState = WindowStateType.Maximized;
                Heading.style.display = "none";
                Body.SetLocation(0, 0);
                Body.SetSize("100%", "100%");
                StartPosition = FormStartPosition.Manual;
                AllowSizeChange = false;
                AllowMoveChange = false;

                ShowMaximize = false;
                ShowMinimize = false;
                ShowClose = false;

                textContent.style.display = "inlineBlock";
                textContent.style.fontSize = "14px";
                textContent.style.verticalAlign = "middle";
                textContent.style.lineHeight = "normal";
            }
            else
            {
                if(tb.ComputedHeight > Settings.MessageFormTextMaximumHeightInPx)
                    tb.ComputedHeight = Settings.MessageFormTextMaximumHeightInPx;
                if(tb.ComputedHeight < Settings.MessageFormTextMinimumHeightInPx)
                    tb.ComputedHeight = Settings.MessageFormTextMinimumHeightInPx;

                base.Height = tb.ComputedHeight + 77 + 29 + 32 + "px";
                base.Width = width.ToPx();
            }

            base.AllowSizeChange = false;
        }

        protected override void OnShowed()
        {
            Beep();

            base.OnShowed();
            _buttonCollection[0].Content.focus();
        }
    }

    public enum MessageBoxLayout
    {
        Information,
        Exclamation,
        Question,
        Error
    }

    public enum MessageBoxButtons
    {
        Auto,
        Ok,
        YesNo,
        YesNoCancel,
        AbortSendCancel
    }
}