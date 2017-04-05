using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

namespace ExpressCraft
{
	public class ConsoleForm : Form
	{
		public static bool ConsoleVisible = false;
		private static ConsoleForm _consoleForm = null;
		private HTMLDivElement logContent = null;

		public void InternalClear()
		{
			logContent.Empty();
		}

		public void InternalLog(string source, ConsoleLogType logType = ConsoleLogType.Log)
		{
			var para = new HTMLParagraphElement() { ClassName = "console-para" };
			switch(logType)
			{
				case ConsoleLogType.Debug:
					para.Style.Color = Color.ForestGreen;
					break;
				case ConsoleLogType.Error:
					para.Style.Color = Color.Red;
					break;
			}

			para.InnerHTML = source;
			logContent.AppendChild(para);
			if(logContent.Children.Length > 1000)
			{
				logContent.RemoveChild(logContent.Children[0]);
			}
		}

		public ConsoleForm()
		{			
			logContent = Div("console-body");
			this.Body.AppendChild(logContent);
			this.Body.Style.Background = Color.Black;
			this.Body.Style.OverflowY = Overflow.Scroll;

			this.Text = Document.Title + " - Console";

			this.StartPosition = FormStartPosition.Center;
			this.Size = new Vector2(979, 512);			
		}

		protected override void OnShowed()
		{
			base.OnShowed();
			ConsoleVisible = true;
		}

		protected override void OnClosed()
		{
			base.OnClosed();
			ConsoleVisible = false;
		}
		private static void CheckConsoleState()
		{
			if(!ConsoleVisible)
			{
				_consoleForm = new ConsoleForm();
				_consoleForm.Show(null, true);
			}
		}
		public static void Log(string source, ConsoleLogType logType = ConsoleLogType.Log)
		{
			CheckConsoleState();
			_consoleForm.InternalLog(source, logType);		
		}

		public static void Clear()
		{
			CheckConsoleState();
			_consoleForm.InternalClear();
		}
	}

	public enum ConsoleLogType
	{
		Log,
		Debug,
		Error
	}
}
