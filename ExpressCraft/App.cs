using Bridge.Html5;
using System;

namespace ExpressCraft
{
    public class App
    {
        public static void Main()
        {
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
                for(int i = 0; i < 10; i++)
                {                    
                    g.DrawLine(new Pen(Color.FromArgb(rnd.Next())), rnd.Next(10, 300), rnd.Next(10, 300), rnd.Next(10, 300), rnd.Next(10, 300));
                }
                

                base.OnPaint();
            }
        }
    }
}