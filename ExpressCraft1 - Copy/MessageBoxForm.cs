using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

namespace ExpressCraft
{
    public class MessageBoxForm : Form
    {
        private readonly MessageBoxButtons _buttons;
        private List<SimpleDialogButton> _buttonCollection;

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
        /// <param name="ui">The UI settings to be applied to the form</param>
        /// <param name="buttons">The Type of button to be displayed with this message</param>
        /// <param name="title">The title of the message box</param>
        public MessageBoxForm(string prompt, MessageBoxLayout ui, MessageBoxButtons buttons, string title) {
            base.Text = title;
			
            var section = Div();
			var pic = Div();
			var textContent = Div();
			var buttonSection = Div();				
            
            _buttons = buttons;

			buttonSection.SetBounds("0", "calc(100% - 48px)", "100%", "48px");
			buttonSection.Style.BackgroundColor = "#F0F0F0";

			switch( ui ) {
                case MessageBoxLayout.Exclamation:
                    if(_buttons == MessageBoxButtons.Auto ) {
                        _buttons = MessageBoxButtons.Ok;
                    }
                    pic.Style.Background = GetImageStringURI("Warning_32x32.png");
                    break;
                case MessageBoxLayout.Information:
                    if(_buttons == MessageBoxButtons.Auto ) {
                        _buttons = MessageBoxButtons.Ok;
                    }
                    pic.Style.Background = GetImageStringURI("Info_32x32.png");
                    break;
                case MessageBoxLayout.Question:
                    if(_buttons == MessageBoxButtons.Auto ) {
                        _buttons = MessageBoxButtons.YesNo;
                    }
                    pic.Style.Background = GetImageStringURI("Index_32x32.png");
                    break;
                case MessageBoxLayout.Error:
                    if(_buttons == MessageBoxButtons.Auto ) {
                        _buttons = MessageBoxButtons.AbortIgnoreRetry;
                    }
                    pic.Style.Background = GetImageStringURI("Error_32x32.png");
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(ui), ui, null);
            }

			pic.SetBounds(25, 32, 32, 32);
			pic.Style.BackgroundSize = "100% 100%";            
			
			var tb = new TextBlock(prompt, 480 - 65 - 37);			
			tb.ComputeString();

			int width = 480;
			if(!tb.ElelemtsOverMax)
			{
				width = (int)tb.MaxCalculatedWidth + 65 + 37;
				if(width < Settings.MessageFormMinimumWidthInPx)
					width = Settings.MessageFormMinimumWidthInPx;
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

			base.Body.Style.BackgroundColor = "white";
			base.Body.AppendChildren(pic, section, buttonSection);		
			
			if(tb.ComputedHeight > Settings.MessageFormTextMaximumHeightInPx)
				tb.ComputedHeight = Settings.MessageFormTextMaximumHeightInPx;
			if(tb.ComputedHeight < Settings.MessageFormTextMinimumHeightInPx)
				tb.ComputedHeight = Settings.MessageFormTextMinimumHeightInPx;


			switch (_buttons) {
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

			buttonSection.AppendChildrenTabIndex(_buttonCollection.ToArray());

			base.Height = tb.ComputedHeight + 77 + 29 + 32 + "px";
			base.Width = width.ToPx();
			base.AllowSizeChange = false;
        }

        protected override void OnShowed() {
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
