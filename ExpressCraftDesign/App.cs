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
			
			AceCodeEditor.Setup();
            
			studio = new StudioForm();

			Application.Run(studio);
		}
    }
}