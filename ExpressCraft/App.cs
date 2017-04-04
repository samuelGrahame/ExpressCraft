using System;
using System.Diagnostics;
using Bridge;
using Bridge.Html5;

namespace ExpressCraft
{
	public class App
	{
		public static void Main()
		{			
			Settings.Setup();
			Form.Setup();
			Settings.ShowExceptionDialog = false;

			Application.Run(ApplicationDefitnion.ExpressCraftConsole);

			var m = 10;
			var x = m / 0;
		}
	}
}
