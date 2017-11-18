using Bridge.Html5;
using System;

namespace ExpressCraft
{
    public class App
    {
        public static void Main()
        {
            Document.Head.AppendChild(new HTMLLinkElement() { Rel = "Stylesheet", Type = "text/css", Href = "data:text/css;base64," + Settings.ExpressCraftCssBase64 });
            Settings.Setup();
            
            var frm = new Form()  { Size = new Vector2(500, 500), StartPosition = FormStartPosition.Center };

            var x = new Test();
            x.SetBoundsFull();
            
            frm.AppendChild(x);

            frm.LinkchildToForm(x);

            frm.Show();
        }

        public class Test : CanvasControl
        {
            public override void OnPaint()
            {
                var g = CreateGraphics();
                var rnd = new Random();
                for(int i = 0; i < 100; i++)
                {                    
                    g.DrawLine(new Pen(Color.FromArgb(rnd.Next())), rnd.Next(10, 300), rnd.Next(10, 300), rnd.Next(10, 300), rnd.Next(10, 300));
                }
                g.DrawString("Hello World", new Font("Arial 10pt"), new SolidBrush(Color.Black), 50, 50);

                base.OnPaint();
            }
        }
    }
}