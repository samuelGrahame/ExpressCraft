using static Retyped.dom;

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
            window.close();
            window.location.reload();
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