using System.Collections.Generic;
using ExpressCraft;

namespace ExpressCraftDesign
{
	public class NewFileDialog : DialogForm
	{
		public TextInput Value;

		public NewFileDialog()
		{			
			Text = "Add New Item";

			_buttonCollection = new List<SimpleDialogButton>() {
				new SimpleDialogButton(this, DialogResultEnum.Cancel) { Text = "Cancel", Location = new Vector2("calc(100% - 85px)", "calc(100% - 35px)") },
				new SimpleDialogButton(this, DialogResultEnum.OK) { Text = "Add", Location = new Vector2("calc(100% - 170px)", "calc(100% - 35px)"), Enabled = false}
			};

			Value = new TextInput() { Location = new Vector2(50, 50), Size = new Vector2("calc(100% - 100px)", 23)} ;

			Value.OnTextChanged = (inp) =>
			{
				_buttonCollection[1].Enabled = Value.Text.Length > 0;
			};

			Value.OnKeyUp = (inp, key) =>
			{
				if(key.KeyCode == 13)
				{
					_buttonCollection[1].Content.Click();
				}
			};

			this.Body.AppendChild(Value);
			ButtonSection.AppendChildrenTabIndex(_buttonCollection.ToArray());
			
			this.Size = new Vector2(300, 200);
		}

		protected override void OnShowed()
		{			
			base.OnShowed();

			Value.Content.Focus();
		}
	}
}
