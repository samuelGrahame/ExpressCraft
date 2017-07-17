using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

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
				snd = new HTMLAudioElement(ResourceManager.GetResourceString("beepSound"));
			snd.Play();													
		}

        private readonly MessageBoxButtons _buttons;
        
        /// <summary>
        /// Create a new Message Dialog
        /// </summary>
        /// <param name="prompt">The text to be displayed in the message box</param>
        /// <param name="ui">The UI settings to be applied to the form</param>
        public MessageBoxForm(string prompt, MessageBoxLayout ui) : this(prompt, ui, MessageBoxButtons.Auto, ui.ToString()) {}

        /// <summary>
        /// Create a new Message Dialog
        /// </summary>
        /// <param name="prompt">The text to be displayed in the message box</param>
        /// <param name="ui">The UI settings to be applied to the form</param>
        /// <param name="title">The title of the message box</param>
        public MessageBoxForm(string prompt, MessageBoxLayout ui, string title) : this(prompt, ui, MessageBoxButtons.Auto, title) {}

        /// <summary>
        /// Create a new Message Dialog
        /// </summary>
        /// <param name="prompt">The text to be displayed in the message box</param>
        /// <param name="ui">The UI settings to be applied to the form</param>
        /// <param name="buttons">The Type of button to be displayed with this message</param>
        public MessageBoxForm(string prompt, MessageBoxLayout ui, MessageBoxButtons buttons) : this(prompt, ui, buttons, ui.ToString()) {}

        /// <summary>
        /// Create a new Message Dialog
        /// </summary>
        /// <param name="prompt">The text to be displayed in the message box</param>
        /// <param name="ui">The UI settings  to be applied to the form</param>
        /// <param name="buttons">The Type of button to be displayed with this message</param>
        /// <param name="title">The title of the message box</param>
        public MessageBoxForm(string prompt, MessageBoxLayout ui, MessageBoxButtons buttons, string title) : base(title) {            		
            var section = Div();
			var pic = Div("image32");
			var textContent = Div("messag-box-content");
            _prompt = prompt;
            _buttons = buttons;
			
			switch( ui ) {
                case MessageBoxLayout.Exclamation:
                    if(_buttons == MessageBoxButtons.Auto ) {
                        _buttons = MessageBoxButtons.Ok;
                    }
					pic.ClassList.Add("imagewarning");
                    break;
                case MessageBoxLayout.Information:
                    if(_buttons == MessageBoxButtons.Auto ) {
                        _buttons = MessageBoxButtons.Ok;
                    }
					pic.ClassList.Add("imageinfo");
					break;
                case MessageBoxLayout.Question:
                    if(_buttons == MessageBoxButtons.Auto ) {
                        _buttons = MessageBoxButtons.YesNo;
                    }
					pic.ClassList.Add("imageindex");
					break;
                case MessageBoxLayout.Error:
                    if(_buttons == MessageBoxButtons.Auto ) {
                        _buttons = MessageBoxButtons.AbortSendCancel;
                    }
					pic.ClassList.Add("imageerror");
					break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(ui), ui, null);
            }

            switch (_buttons)
            {
                case MessageBoxButtons.Ok:
                    _buttonCollection = new List<SimpleDialogButton>() {
                        new SimpleDialogButton(this, DialogResultEnum.OK) { Text = "Ok", Location = new Vector2("(50% - 37.5px)", "(100% - 35px)")}
                    };                    
                    break;
                case MessageBoxButtons.YesNo:
                    _buttonCollection = new List<SimpleDialogButton>() {
                        new SimpleDialogButton(this, DialogResultEnum.No) { Text = "No", Location = new Vector2("(100% - 85px)", "(100% - 35px)")},
                        new SimpleDialogButton(this, DialogResultEnum.Yes) { Text = "Yes", Location = new Vector2("(100% - 170px)", "(100% - 35px)")}
                    };                    
                    break;
                case MessageBoxButtons.YesNoCancel:
                    _buttonCollection = new List<SimpleDialogButton>() {
                        new SimpleDialogButton(this, DialogResultEnum.Cancel) { Text = "Cancel", Location = new Vector2("(100% - 85px)", "(100% - 35px)") },
                        new SimpleDialogButton(this, DialogResultEnum.No) { Text = "No", Location = new Vector2("(100% - 170px)", "(100% - 35px)") },
                        new SimpleDialogButton(this, DialogResultEnum.Yes) { Text = "Yes", Location = new Vector2("(100% - 255px)", "(100% - 35px)") }
                    };                    
                    break;
                case MessageBoxButtons.AbortSendCancel:
                    _buttonCollection = new List<SimpleDialogButton>() {
                        new SimpleDialogButton(this, DialogResultEnum.Cancel) { Text = "Cancel", Location = new Vector2("(100% - 85px)", "(100% - 35px)")},                        
                        new SimpleDialogButton(this, DialogResultEnum.Send) { Text = "Send", Location = new Vector2("(100% - 170px)", "(100% - 35px)"), ItemClick = (ev) => {
                            if(Settings.OnSendError != null)
                                Settings.OnSendError(_prompt);
                        } },
                        new SimpleDialogButton(this, DialogResultEnum.Abort) { Text = "Abort", Location = new Vector2("(100% - 255px)", "(100% - 35px)"), ItemClick = (ev) => {
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
			var tb = new TextBlock(prompt, 480 - 25);			
			tb.ComputeString();

			int width = 480;
			if(!tb.ElelemtsOverMax)
			{
				width = (int)tb.MaxCalculatedWidth + 65 + 37;
				if(width < Settings.MessageFormMinimumWidthInPx)
					width = Settings.MessageFormMinimumWidthInPx;
			}

            if (_buttonCollection.Count > 2)
            {
                if(width < 320)
                    width = 320;
            }

			textContent.InnerHTML = prompt;

			section.Style.OverflowY = Overflow.Auto;		
            section.Style.Height = "100%";
			section.Style.MaxHeight = Settings.MessageFormTextMaximumHeightInPx.ToPx();
            section.AppendChild(textContent);
			section.Style.Top = "32px";
			section.Style.Width = "90%";
			
			base.Body.AppendChildren(pic, section);		
			
			if(tb.ComputedHeight > Settings.MessageFormTextMaximumHeightInPx)
				tb.ComputedHeight = Settings.MessageFormTextMaximumHeightInPx;
			if(tb.ComputedHeight < Settings.MessageFormTextMinimumHeightInPx)
				tb.ComputedHeight = Settings.MessageFormTextMinimumHeightInPx;
            
			ButtonSection.AppendChildrenTabIndex(_buttonCollection.ToArray());

			base.Height = tb.ComputedHeight + 77 + 29 + 32 + "px";
			base.Width = width.ToPx();
			base.AllowSizeChange = false;
        }
		
        protected override void OnShowed() {
			Beep();

			base.OnShowed();
            _buttonCollection[0].Content.Focus();
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
