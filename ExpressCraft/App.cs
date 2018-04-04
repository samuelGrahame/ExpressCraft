using static Retyped.dom;
using System;

namespace ExpressCraft
{
    public class App
    {
        public static void Main()
        {
            document.head.AppendChild(new HTMLLinkElement() { id = "ExpressCraft", rel = "Stylesheet", type = "text/css", href = "data:text/css;base64," + Settings.ExpressCraftCssBase64 });
            Settings.Setup();

            var frm = new Form() { Size = new Vector2(500, 500), StartPosition = FormStartPosition.Center };

            ////var x = new Test();
            ////x.SetBoundsFull();

            ////frm.AppendChild(x);

            ////frm.LinkchildToForm(x);

            //var x = new Sheet();
            //x.SetBoundsFull();
            //x.BeginDataUpdate();
            //for(int x1 = 0; x1 < 26; x1++)
            //{
            //    for(int y = 0; y < 1000; y++)
            //    {
            //        x[x1, y].Value = $"{x1}:{y}";
            //    }
            //}
            
            //frm.LinkchildToForm(x);

            //frm.AppendChild(x);

            //frm.Show();

            //x.EndDataUpdate();
        }

        //public class Test : CanvasControl
        //{
        //    public override void OnPaint()
        //    {
        //        var g = CreateGraphics();
        //        var rnd = new Random();
        //        for(int i = 0; i < 100; i++)
        //        {
        //            g.DrawLine(new Pen(Color.FromArgb(rnd.Next())), rnd.Next(10, 300), rnd.Next(10, 300), rnd.Next(10, 300), rnd.Next(10, 300));
        //        }
        //        g.DrawString("Hello World", new Font("Arial 10pt"), new SolidBrush(Color.Black), 50, 50);

        //        g.DrawEllipse(new Pen(Color.Red, 2), 100, 100, 50, 50);

        //        g.FillEllipse(new SolidBrush(Color.Green), 100, 200, 50, 50);

        //        var size = g.MeasureString("Hello World", new Font("Arial 11pt"));

        //        g.DrawString(size.ToString(), new Font("Arial 11pt"), new SolidBrush(Color.Black), 200, 50);

        //        base.OnPaint();
        //    }
        //}
    }
}