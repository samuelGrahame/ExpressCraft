using System.Collections.Generic;
using ExpressCraft;

namespace ExpressCraftDesign
{
	public class NewFileDialog : DialogForm
	{
		public NewFileDialog()
		{
			this.SetSize(550, 300);

			_buttonCollection = new List<SimpleDialogButton>() {
				new SimpleDialogButton(this, DialogResultEnum.Cancel) { Text = "Cancel", Location = new Vector2("calc(100% - 85px)", "calc(100% - 35px)") },
				new SimpleDialogButton(this, DialogResultEnum.OK) { Text = "Add", Location = new Vector2("calc(100% - 170px)", "calc(100% - 35px)")}
			};			
		}
	}
}
