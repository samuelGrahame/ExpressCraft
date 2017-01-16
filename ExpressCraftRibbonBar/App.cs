using System;
using Bridge;
using Bridge.Html5;
using ExpressCraft;

namespace ExpressCraftRibbonBar
{
    public class App
    {
        public static void Main()
        {
            // Setup the form events and containers*
            Form.Setup();

            var mbf = new MessageBoxForm("Hello World!", MessageBoxLayout.Exclamation);
            mbf.ShowDialog();
        }
    }
}