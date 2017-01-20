using System.Collections.Generic;
using Bridge;
using Bridge.Html5;
using ExpressCraft;

namespace ExpressCraft
{
	public class DialogForm : Form
	{
		protected List<SimpleDialogButton> _buttonCollection;

		public HTMLDivElement ButtonSection;
		
		public DialogForm(string text = "") : base()
		{
			this.Text = text;
			ButtonSection = Div("dialogbuttonsection");

			this.Body.AppendChild(ButtonSection);
		}
	}
}
