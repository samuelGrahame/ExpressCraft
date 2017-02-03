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
			GoogleCloudPrint.Setup();
			AceCodeEditor.Setup();
			Settings.AllowCloseWithoutQuestion = true;

            var dialogTestButton = new SimpleButton()
            {
                Text = "dialog test",
                ItemClick = (ev) =>
                {

                    //var dlg = new InputDialogWeek("Question", "Is this a question?");
                    //dlg.ShowDialog(new DialogResult(DialogResultEnum.OK, () => {
                    //    Window.Alert(dlg.Result);
                    //}));

                    //var dlg = new InputDialogMonth("Question", "Is this a question?");
                    //dlg.ShowDialog(new DialogResult(DialogResultEnum.OK, () => {
                    //    Window.Alert(dlg.Result.ToDateString());
                    //}));


                    //var dlg = new InputDialogEmail("Question", "Is this a question?");
                    //dlg.ShowDialog(new DialogResult(DialogResultEnum.OK, () =>
                    //{
                    //    Window.Alert(dlg.Result);
                    //}));

                    //var dlg = new InputDialogDateTimeLocal("Question", "Is this a question?");
                    //dlg.ShowDialog(new DialogResult(DialogResultEnum.OK, () => {
                    //    Window.Alert(dlg.Result.ToDateString());
                    //}));

                    //var dlg = new InputDialogCheckbox("Question", "Is this a question?");
                    //dlg.ShowDialog(new DialogResult(DialogResultEnum.OK, () => {
                    //    Window.Alert(dlg.Result.ToString());
                    //}));

                    //var dlg = new InputDialogColour("Question", "Is this a question?");
                    //dlg.ShowDialog(new DialogResult(DialogResultEnum.OK, () => {
                    //    Window.Alert(dlg.Result);
                    //}));

                    //var dlg = new InputDialogDate("Question", "Is this a question?");
                    //dlg.ShowDialog(new DialogResult(DialogResultEnum.OK, () => {
                    //    Window.Alert(dlg.Result.ToDateString());
                    //}));

                    //var dlg = new InputDialogNumber("Question", "Is this a question?");
                    //dlg.ShowDialog(new DialogResult(DialogResultEnum.OK, () => {
                    //    Window.Alert((dlg.Result + 1).ToString());
                    //}));

                    //var dlg = new InputDialogText("Question", "Is this a question?");
                    //dlg.ShowDialog(new DialogResult(DialogResultEnum.OK, () => {
                    //    Window.Alert(dlg.Result);
                    //}));
                }
            };

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

			var googlecloudPrintBtn = new SimpleButton()
			{
				Text = "Google Cloud Print",
				ItemClick = (ev) =>
				{
					(new GoogleCloudPrint("https://www.google.com/landing/cloudprint/testpage.pdf", "Test Print")).Show();
				}
			};
			googlecloudPrintBtn.Content.Style.Position = Position.Relative;
			googlecloudPrintBtn.Content.Style.Width = "auto";

			var aceCodeBtn = new SimpleButton()
			{
				Text = "Ace Code Editor",
				ItemClick = (ev) =>
				{
					var frm = new Form() { Text = "Ace Code Editor" };
					var codeEditor = new AceCodeEditor();
					codeEditor.SetBoundsFull();

					frm.LinkchildToForm(codeEditor);

					frm.Body.AppendChild(codeEditor);
					frm.Show();
				}
			};
			aceCodeBtn.Content.Style.Position = Position.Relative;
			aceCodeBtn.Content.Style.Width = "auto";

			Form.WindowHolder.AppendChildrenTabIndex(errorBtn, exclamationBtn, informationBtn, questionBtn, informationBtn2, googlecloudPrintBtn, aceCodeBtn, dialogTestButton);			
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