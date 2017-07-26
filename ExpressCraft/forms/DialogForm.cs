using System.Collections.Generic;
using Bridge;
using Bridge.Html5;
using ExpressCraft;

namespace ExpressCraft
{
	public class DialogForm : Form
	{
		protected List<SimpleDialogButton> _buttonCollection;

		public Control ButtonSection;
		
		public DialogForm(string text = "") : base()
		{
			this.Text = text;
			base.Body.Style.BackgroundColor = "white";

    //           top:calc(100% - 70px);
    //width:100%;
    //height:70px;
            
    
			ButtonSection = new Control("dialogbuttonsection");			

            if(Helper.NotDesktop)
            {
                ButtonSection.Top = "(100% - 70px)";
                ButtonSection.Size = new Vector2("100%", 70);
            }
		}

		protected override void OnShowing()
		{
			this.Body.AppendChild(ButtonSection);
			base.OnShowing();
		}
	}
}
