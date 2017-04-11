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
		private static WindowState prevWindowState = WindowState.Normal;
		private static bool firstLoad = true;
		private static Vector2 prevLocation;
		private static Vector2 prevSize = Settings.ConsoleDefaultSize;

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
			para.ScrollIntoView(false);
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

		public ConsoleForm()
		{			
			logContent = Div("console-body");
			this.Body.AppendChild(logContent);
			this.Body.Style.Background = Color.Black;
			this.Body.Style.OverflowY = Overflow.Scroll;

			this.Text = Document.Title + " - Console";
			if(firstLoad)
			{				
				this.StartPosition = FormStartPosition.Center;
				this.Size = prevSize;
			}
			else
			{
				this.StartPosition = FormStartPosition.Manual;
				this.Location = prevLocation;

				if(prevWindowState == WindowState.Maximized)
				{
					prevSize = Settings.ConsoleDefaultSize;
				}

				this.Size = prevSize;

				if(prevWindowState == WindowState.Maximized)
				{
					SetWindowState(prevWindowState);
				}
			}

			
		}

		protected override void OnShowed()
		{
			base.OnShowed();
			ConsoleVisible = true;
			firstLoad = false;
		}

		protected override void OnClosing()
		{
			base.OnClosing();

			prevSize = Size;
			prevLocation = Location;
			prevWindowState = Windowstate;
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
