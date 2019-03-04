using static Retyped.dom;
using Bridge;
using System;

namespace ExpressCraft
{
    public class App
    {
        

        public static void Main()
        {
            document.head.AppendChild(new HTMLLinkElement() { id = "ExpressCraft", rel = "Stylesheet", type = "text/css", href = "data:text/css;base64," + Settings.ExpressCraftCssBase64 });
            Settings.Setup();
            
            //x.StartPosition = FormStartPosition.Center;
            ////var yt = new ComboBoxEdit(
            ////    new DataItem("Hello World 1"),
            ////    new DataItem("Hello World 2"),
            ////    new DataItem("Hello World 3"));

            ////yt.Bounds = new Vector4(10, 10, 100, 24);

            ////x.AppendChild(yt);

            //var gr = new GridView();
            //gr.UseInRowEditor = true;

            //gr.Bounds = new Vector4(10, 50, "(100% - 20px)", "(100% - 60px)");

            //var dt = new DataTable();

            //for (int i = 0; i < 100; i++)
            //{
            //    dt.AddColumn("Date " + (i + 1).ToString(), DataType.DateTime);
            //}
            //dt.BeginDataUpdate();
            //for (int h = 0; h < 100; h++)
            //{
            //    var dr = dt.NewRow();
            //    for (int i = 0; i < 100; i++)
            //    {
            //        dr[i] = DateTime.Now;
            //    }
            //    dt.AddRow(dr);
            //}
            //dt.AcceptNewRows();

            //gr.DataSource = dt;

            //x.LinkResize(gr, true);

            //x.Show();

            // Test Grid...1
            //var x = new Form();

            //var grid = new GridView();

            //var rs = new DataTable();
            //rs.AddColumn("A", DataType.Integer);
            //rs.AddColumn("B", DataType.Integer);
            //rs.AddColumn("C", DataType.Integer);
            //rs.AddColumn("D", DataType.Integer);
            //rs.AddColumn("E", DataType.Integer);
            //rs.AddColumn("F", DataType.Integer);
            //rs.AddColumn("G", DataType.Integer);

            //var rnd = new Random();

            //for (int i = 0; i < 100; i++)
            //{                
            //    rs.AddRow(rnd.Next(), rnd.Next(), rnd.Next(), rnd.Next(), rnd.Next(), rnd.Next(), rnd.Next());
            //}

            //grid.SetBoundsFull();
            //grid.DataSource = rs;

            //x.LinkchildToForm(grid);

            //x.AppendChild(grid);

            //Application.Run(x);

            // //var frm = new Form() { Size = new Vector2(500, 500), StartPosition = FormStartPosition.Center };

            //// var x = new Test();
            //// x.SetBoundsFull();

            //// frm.AppendChild(x);

            //// frm.LinkchildToForm(x);
            //             var x = new Sheet();
            // x.SetBoundsFull();
            // x.BeginDataUpdate();
            // for(int x1 = 0; x1 < 26; x1++)
            // {
            //     for(int y = 0; y < 1000; y++)
            //     {
            //         x[x1, y].Value = $"{x1}:{y}";
            //     }
            // }

            // frm.LinkchildToForm(x);

            // frm.AppendChild(x);

            // frm.Show();

            // x.EndDataUpdate();
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