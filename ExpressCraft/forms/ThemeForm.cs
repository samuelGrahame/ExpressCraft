using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;
using Newtonsoft.Json;

namespace ExpressCraft
{
	public class ThemeForm : DialogForm
	{
		Theme currentTheme;
		Theme prevTheme;

		private static bool _themeVisible;
		private static ThemeForm themeForm = null;

		public static void ShowThemeForm()
		{
			if(!_themeVisible)
			{
				themeForm = new ThemeForm();
				themeForm.Show(null, true);

				_themeVisible = true;				
			}
		}

		protected override void OnClosed()
		{
			base.OnClosed();
			_themeVisible = false;
		}

		protected override void OnGotFocus()
		{
			if(Content != null)
			{
				Style.Opacity = "1";
			}
			base.OnGotFocus();
		}

		protected override void OnLostFocus()
		{
			if(Content != null)
			{
				Style.Opacity = "0.5";
			}
			base.OnLostFocus();
		}

		public ThemeForm()
		{
			prevTheme = Settings.ActiveTheme;
			currentTheme = JsonConvert.DeserializeObject<Theme>(JsonConvert.SerializeObject(prevTheme));

			Settings.ActiveTheme = currentTheme;
			
			_buttonCollection = new List<SimpleDialogButton>() {
						new SimpleDialogButton(this, DialogResultEnum.Cancel) { Text = "Cancel", Location = new Vector2("(100% - 85px)", "(100% - 35px)"), ItemClick = (ev) => {
							Settings.ActiveTheme = prevTheme;
							this.Close();
						}},
						new SimpleDialogButton(this, DialogResultEnum.OK) { Text = "OK", Location = new Vector2("(100% - 170px)", "(100% - 35px)"), ItemClick = (ev) => {							
							Settings.ApplyActiveTheme();
							this.Close();
						}}
					};            
			ButtonSection.AppendChildrenTabIndex(_buttonCollection.ToArray());

			int length = currentTheme.Colors.Length;
			int y = 20;
			int x = 20;

			var Panel = Div();
			Panel.Style.OverflowY = Overflow.Auto;
			Panel.SetBounds(0, 0, "100%", "(100% - 60px)");

			Body.Style.BackgroundColor = Color.White;

			for(int i = 0; i < length; i++)
			{
				Panel.AppendChild(new ColorInput() { Text = currentTheme.Colors[i].ToString(), ToolTip = new ToolTip("This is a heading test.", "This is a description test."), OnTextChanged = (tx) => {
					var index = tx.GetAttributei("i");
					currentTheme.Colors[index] = tx.Text;

					Settings.ApplyActiveTheme();
				} }.
				SetAttribute("i", i).
				SetBounds(x, y, 95, 20));
				
				x += 100;

				if(i % 2 != 0)
				{
					y += 30;
					x = 20;
				}
			}

			Body.AppendChild(Panel);
			
			this.Size = new Vector2(250, 300);
			this.Text = "Theme Form Editor";

			AllowMoveChange = true;
			AllowSizeChange = false;

			ShowClose = false;
			ShowMaximize = false;
			ShowMinimize = false;			
		}
	}
}
