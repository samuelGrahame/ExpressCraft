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
            /*@			
           Bridge.Console.log = function(message) { console.log(message); };
           Bridge.Console.error = function(message) { console.error(message); };
           Bridge.Console.debug = function(message) { console.debug(message); };
           Bridge.Console.clear = function() { console.clear(); };
           */

            Settings.Setup();            
		}
	}
}
