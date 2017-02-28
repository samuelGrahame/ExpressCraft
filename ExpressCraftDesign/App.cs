using System;
using Bridge;
using Bridge.Html5;
using ExpressCraft;

namespace ExpressCraftDesign
{
    public class App
    {
		public static StudioForm studio;
        public static void Main()
        {
			Settings.AllowCloseWithoutQuestion = true;

			Form.Setup();
			AceCodeEditor.Setup();

			studio = new StudioForm();
			studio.Show();

		}
    }
}