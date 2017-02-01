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
		private static string Audio_beek = "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=";

		private static HTMLAudioElement snd = null;
		public static void Beep()
		{
			if(!Settings.MessageFormBeep)
				return;
			if(snd == null)
				snd = new HTMLAudioElement(Audio_beek);
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
			var textContent = Div();
			            
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
                        _buttons = MessageBoxButtons.AbortIgnoreRetry;
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
                        new SimpleDialogButton(this, DialogResultEnum.OK) { Text = "Ok"}
                    };
                    _buttonCollection[0].SetLocation("calc(50% - 37.5px)", "calc(100% - 35px)");
                    break;
                case MessageBoxButtons.YesNo:
                    _buttonCollection = new List<SimpleDialogButton>() {
                        new SimpleDialogButton(this, DialogResultEnum.No) { Text = "No"},
                        new SimpleDialogButton(this, DialogResultEnum.Yes) { Text = "Yes"}
                    };
                    _buttonCollection[0].SetLocation("calc(100% - 85px)", "calc(100% - 35px)");
                    _buttonCollection[1].SetLocation("calc(100% - 170px)", "calc(100% - 35px)");
                    break;
                case MessageBoxButtons.YesNoCancel:
                    _buttonCollection = new List<SimpleDialogButton>() {
                        new SimpleDialogButton(this, DialogResultEnum.Cancel) { Text = "Cancel" },
                        new SimpleDialogButton(this, DialogResultEnum.No) { Text = "No" },
                        new SimpleDialogButton(this, DialogResultEnum.Yes) { Text = "Yes" }
                    };
                    _buttonCollection[0].SetLocation("calc(100% - 85px)", "calc(100% - 35px)");
                    _buttonCollection[1].SetLocation("calc(100% - 170px)", "calc(100% - 35px)");
                    _buttonCollection[2].SetLocation("calc(100% - 255px)", "calc(100% - 35px)");
                    break;
                case MessageBoxButtons.AbortIgnoreRetry:
                    _buttonCollection = new List<SimpleDialogButton>() {
                        new SimpleDialogButton(this, DialogResultEnum.Abort) { Text = "Abort" },
                        new SimpleDialogButton(this, DialogResultEnum.Retry) { Text = "Retry" },
                        new SimpleDialogButton(this, DialogResultEnum.Ignore) { Text = "Ignore"}
                    };
                    _buttonCollection[0].SetLocation("calc(100% - 85px)", "calc(100% - 35px)");
                    _buttonCollection[1].SetLocation("calc(100% - 170px)", "calc(100% - 35px)");
                    _buttonCollection[2].SetLocation("calc(100% - 255px)", "calc(100% - 35px)");
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

            textContent.InnerHTML = tb.ComputedSource;            
            textContent.Style.Left = "65px";
			textContent.Style.Height = "auto";

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
        AbortIgnoreRetry
    }


    //public class MessageBoxForm : Form
    //{
    //    List<SimpleButton> Buttons = new List<SimpleButton>();
    //    public SimpleDialogButton ButtonOk;

    //    public MessageBoxForm(string message, string title = "Intelogy Group - Business Manager")
    //    {
    //        this.Text = title;
    //        this.Body.InnerHTML = message;
    //        this.Width = "400px";
    //        this.Height = "200px";

    //        ButtonOk = new SimpleDialogButton(this, DialogResultEnum.OK) { Text = "Ok" };            
    //        //var ButtonCancel = new SimpleDialogButton(this, DialogResultEnum.Cancel) { Text = "Cancel" };
    //        //var ButtonOpenMeAgain = new SimpleDialogButton(this, DialogResultEnum.None) { Text = "New Dialog", ItemClick = (r) =>
    //        //{
    //        //    var dlg = new MessageBoxForm("This is a new Order!");

    //        //    dlg.ShowDialog();
    //        //}};

    //        //var Input = new TextInput() { Text = "hello" };
    //        //Input.SetBounds("calc(100% - 103px)", "calc(100% - 52px)", "100px", "23px");

    //        //ButtonOpenMeAgain.SetLocation("calc(100% - 234px)", "calc(100% - 26px)");
    //        ButtonOk.SetLocation("calc(100% - 78px)", "calc(100% - 26px)"); //.SetLocation("calc(100% - 156px)", "calc(100% - 26px)");

    //        Body.AppendChildren(ButtonOk); //, ButtonCancel, ButtonOpenMeAgain, Input);
    //        ButtonOk.Content.TabIndex = 0;            

    //        AllowSizeChange = false;
    //    }

    //    protected override void OnShowed()
    //    {
    //        base.OnShowed();
    //        ButtonOk.Content.Focus();
    //    }
    //}
}
