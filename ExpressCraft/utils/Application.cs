using Bridge.Html5;

namespace ExpressCraft
{
    public enum ApplicationDefitnion
    {
        None,
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

        private static ApplicationDefitnion _applicationDefition = ApplicationDefitnion.BridgeConsole;
        public static ApplicationDefitnion AplicationDefition { get { return _applicationDefition; } }

        public static void Run(Form _Mainform)
        {
            MainForm = _Mainform;
            MainForm.ShowStartNewLevel();
        }
    }
}