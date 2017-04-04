﻿using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ExpressCraft.Settings;

namespace ExpressCraft
{
	public enum ApplicationDefitnion
	{
		BrowserConsole,
		BridgeConsole,
		ExpressCraftConsole
	}

	public static class Application
    {
		public static Form MainForm = null;		

        public static void Close()
        {
			if(MainForm != null)
			{
				MainForm.Close();
			}
            Window.Close();
            Window.Location.Reload();
        }

		public static void Run(ApplicationDefitnion applicationDefition = ApplicationDefitnion.BrowserConsole)
		{			
			switch(applicationDefition)
			{
				case ApplicationDefitnion.BrowserConsole:
					/*@			
					Bridge.Console.log = function(message) { console.log(message); };
					Bridge.Console.error = function(message) { console.error(message); };
					Bridge.Console.debug = function(message) { console.debug(message); };
					Bridge.Console.clear = function() { console.clear(); };
					*/
					break;
				case ApplicationDefitnion.ExpressCraftConsole:
					/*@
					Bridge.Console.log = function(message) { ExpressCraft.ConsoleForm.log(message) };
					Bridge.Console.error = function(message) { ExpressCraft.ConsoleForm.log(message, ExpressCraft.ConsoleLogType.Error); };
					Bridge.Console.debug = function(message) { ExpressCraft.ConsoleForm.log(message, ExpressCraft.ConsoleLogType.Debug); };
					console.clear = function() { ExpressCraft.ConsoleForm.clear(); };
					*/
					break;
				default:
					break;
			}
		}

		public static void Run(Form _Mainform, ApplicationDefitnion applicationDefition = ApplicationDefitnion.BrowserConsole)
		{
			MainForm = _Mainform;
			MainForm.ShowStartNewLevel();
			Run(applicationDefition);
		}
    }
}
