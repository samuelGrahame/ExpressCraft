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
        public static string Image_x32_x32_Error = "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";
        public static string Image_x32_x32_Index = "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";
        public static string Image_x32_x32_Info = "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";
        public static string Image_x32_x32_Warning = "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEn0lEQVR42u2UeUxUVxTG26ZSxG5J/2natPGPilC2MmUXCaV2sWkaGhcsFauylRYJYCoSUBAYUwbCUkZAnAJSlrDDsBRkGRgYgY6ADLKDUgjDOsO+U77e+9JaVNBaGU0Tb/JLvnzn3HfOO2fePAPgifL0/H+PKML8tfqLFmcJp0qDTVUed/3nxJEWl3qu+KH71zMgmku9x1X82RKO6a76KIuV5ekuLE93gmrq0ZjCq4c6aavURZi39YsisCQTM/RVheE3rnk711lnm8Lfvjpkd2BrhguWJyRYHK6kME20ZjiDxEIUOoXiAGPD2lCz5fnheiwOCrA0IqIQXYE5qQgktlLkb2ymkCaCjmuoVHFMW3oFYVgcqcXCeAcEJXwKoxdIE7fKOKgO2t3JddJ+cdNHL2CbBEqSnbA83o6FIRHieNEwMj9EoZrxFqWVkCQ5geSGb+oU8r0NDIXnTZbnhpsw11eIeWkForhhMDA7yBB9IZzx5nr5mOkTgOSu5Hnpf7ApTfhaqW4t8zVq6b7CweJoI2a7UzH/exFy0y9Dz3Q/hWrq0RhpIh9dhQEoP2fczbXTfOmRR1/kpc9uiLUl33s/ZjpSCEmY7cmGWJgLlsmXFKqpR2NMzhxppiHODsXe+o/2B5XhxtIr8TJYmh1oJG9WiOmWeIaZtiQMtAuhY/gFhWrq/RPvSMbMrWKQu39kurM+/E+rOPnZduXCH96XtOf6YVHWhsnmS5iUxNxmYUgMltHnFKrXxpjc6Y5UtGefRdEpvZvhNuovP/Toc1112bUXDjOjn7oRj8nGC3cw31+Jjz/dR6GaenfSdBEznVmoi7QB340V9VCrSHHU0itw1V2a6Cwm48yAvIaNiWshmKgPv81MVw58vTwoVK+N0Vx6h+APeSMP5FmraU7ae/7VKlz3vK2c872O5HqCC+YHajFa7o7RUleCG8YEHpAJz0Au8sfkdR754RUQCsnb8qhHYzSHyWXulLlDfpWNpstO4Du/1xtqpfrKA0ef6qDpL+RYkuI15KEBGCn+7h5kld5orkiA9df2sLa2p5p66+bSRsbFYRAGWSLdUSvmvquIP6Kum+mgtTRan4SppngMF9ivBxlzFJwdHfAuay+FauptlE+acMdYXQSyHLRWE49qfLLuKk5avKWUekyjURzjQHaaj6HCbzHI/2ZdZFcD4e95Att3GjP4nT5BPRpbn7xjGBV4ooFnj/Tjmn3Blu+8es/oEw+r+Zaf20uKF2Cs0gfSbOuNIA+0hbw5DdEcDwqjB/Nt73+HfxSy6vMo87FAso067+5VPJ9io97TV/4TppoTMVbFhjTrEAYyDmxMphVGyk5TqKbeAxnKs8dNvidoLVJzy9oGlOKsVEtqQg5gXBwJeV04ZDXBkIl+ZJDXhjD+RGMsJiW/YKolDdPt2Zhuy8JUawYmb6SQLyEB49eiwNwVcTBa4YORUg8MF7tiKN8R0pwjkGZaQxjwEWIPqhaRmi+sbWCLy643zH7ev6Mt+audqwQoiFXevh3Ndgav6989AbqPbYQ3CWoEDQWh9lcNlfU+R2ooEbYqEGVag6n19Px9ADxR/gRqajV3IeVeZAAAAABJRU5ErkJggg==";
        
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
                    pic.Style.Background = GetImageString(Image_x32_x32_Warning);
                    break;
                case MessageBoxLayout.Information:
                    if(_buttons == MessageBoxButtons.Auto ) {
                        _buttons = MessageBoxButtons.Ok;
                    }
                    pic.Style.Background = GetImageString(Image_x32_x32_Info);
                    break;
                case MessageBoxLayout.Question:
                    if(_buttons == MessageBoxButtons.Auto ) {
                        _buttons = MessageBoxButtons.YesNo;
                    }
                    pic.Style.Background = GetImageString(Image_x32_x32_Index);
                    break;
                case MessageBoxLayout.Error:
                    if(_buttons == MessageBoxButtons.Auto ) {
                        _buttons = MessageBoxButtons.AbortIgnoreRetry;
                    }
                    pic.Style.Background = GetImageString(Image_x32_x32_Error);
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
