using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
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

		public static void Run(Form _Mainform)
		{
			MainForm = _Mainform;
			MainForm.ShowStartNewLevel();
		}
    }
}
