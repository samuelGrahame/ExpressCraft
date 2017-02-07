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
			Document.Body.Style.BackgroundColor = Color.Black;
		}		
	}
}
