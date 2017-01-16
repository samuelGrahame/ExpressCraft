using System;
using Bridge;
using Bridge.Html5;
using ExpressCraft;
using System.Text;

namespace ExpressCraftHelloWorldDialog
{
    public class App
    {
        public static Random r = new Random();

        public static void Main()
        {
            // Setup the form events and containers*
            Form.Setup();

            var errorBtn = new SimpleButton()
            {
                Text = MessageBoxLayout.Error.ToString("G"),
                ItemClick = (ev) =>
                {
                    (new MessageBoxForm("Hello World!", MessageBoxLayout.Error)).ShowDialog();
                }
            };
            errorBtn.Content.Style.Position = Position.Relative;

            var exclamationBtn = new SimpleButton()
            {
                Text = MessageBoxLayout.Exclamation.ToString("G"),
                ItemClick = (ev) =>
                {
                    (new MessageBoxForm("Hello World!", MessageBoxLayout.Exclamation)).ShowDialog();
                }
            };
            exclamationBtn.Content.Style.Position = Position.Relative;

            var informationBtn = new SimpleButton()
            {
                Text = MessageBoxLayout.Information.ToString("G"),
                ItemClick = (ev) =>
                {
                    (new MessageBoxForm("Hello World!", MessageBoxLayout.Information)).ShowDialog();
                }
            };
            informationBtn.Content.Style.Position = Position.Relative;

            var questionBtn = new SimpleButton()
            {
                Text = MessageBoxLayout.Question.ToString("G"),
                ItemClick = (ev) =>
                {
                    (new MessageBoxForm("Hello World!", MessageBoxLayout.Question)).ShowDialog();
                }
            };
            questionBtn.Content.Style.Position = Position.Relative;

            var informationBtn2 = new SimpleButton()
            {
                Text = "Large Information",
                ItemClick = (ev) =>
                {
                    (new MessageBoxForm(GetRandomText(), MessageBoxLayout.Information)).ShowDialog();
                }
            };
            informationBtn2.Content.Style.Position = Position.Relative;
            informationBtn2.Content.Style.Width = "auto";

            Form.WindowHolder.AppendChildrenTabIndex(errorBtn, exclamationBtn, informationBtn, questionBtn, informationBtn2);
        }

        public static string GetRandomText()
        {
            StringBuilder builder = new StringBuilder();

            for (int i = 0; i < 1000; i++)
            {
                builder.Append(r.Next().ToString());
            }
            return builder.ToString();
        }
    }
}