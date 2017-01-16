using System;
using System.Diagnostics;
using Bridge;
using Bridge.Html5;

namespace ExpressCraft
{
	public class App
	{
		public static void Main()
		{
			Settings.Setup();

			//UntiTestLiveAdd();
			//UnitTestBatchAdd();
		}

		public static DataTable UntiTestLiveAdd()
		{
			var dt = new DataTable();

			dt.AddColumn("Index", DataType.Integer);
			dt.AddColumn("A", DataType.Integer);
			dt.AddColumn("B", DataType.Integer);
			dt.AddColumn("C", DataType.Integer);
			
			var sw = Stopwatch.StartNew();
			var r = new Random();

			for(int i = 0; i < 100000; i++)
			{
				dt.AddRow(i, r.Next(), r.Next(), r.Next());					
			}

			sw.Stop();

			//Global.Alert("took: " + sw.ElapsedMilliseconds + "ms to set data/add for 1000000 row(s)");			
			return dt;
		}

		public static void UnitTestBatchAdd()
		{
			var dt = new DataTable();

			dt.AddColumn("CNTR", DataType.Long);
			dt.AddColumn("Name", DataType.String);
			dt.AddColumn("Date", DataType.DateTime);

			dt.BeginNewRow(1000000);

			var sw = Stopwatch.StartNew();

			for(long i = 0; i < 1000000; i++)
			{
				var dr = dt.NewRow();

				dr[0] = i;
				dr[1] = "this is a new test";
				dr[2] = DateTime.Now;
			}

			sw.Stop();

			Global.Alert("took: " + sw.ElapsedMilliseconds + "ms to set data for 1000000 row(s)");

			sw = Stopwatch.StartNew();

			dt.AcceptNewRows();

			sw.Stop();

			Global.Alert("took: " + sw.ElapsedMilliseconds + "ms to add 1000000 row(s)");
		}
	}
}
