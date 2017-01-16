using Bridge.Html5;
using Bridge.jQuery2;

namespace ExpressCraft
{
	public struct Rectange
	{
		public int X;
		public int Y;
		public int Width;
		public int Height;

		public Rectange(Point location, Size size)
		{
			X = location.X;
			Y = location.Y;

			Width = size.Width;
			Height = size.Height;
		}

		public static void SetBounds(out int x, out int y, out int w, out int h, jQuery obj)
		{
			x = Global.ParseInt(obj.Css("left"));
			y = Global.ParseInt(obj.Css("top"));
			w = Global.ParseInt(obj.Css("width"));
			h = Global.ParseInt(obj.Css("height"));
		}

		public static bool valueInRange(int value, int min, int max)
		{
			return (value >= min) && (value <= max);
		}

		public static bool rectOverlap(Rectange A, Rectange B)
		{
			bool xOverlap = valueInRange(A.X, B.X, B.X + B.Width) ||
							valueInRange(B.X, A.X, A.X + A.Width);

			bool yOverlap = valueInRange(A.Y, B.Y, B.Y + B.Height) ||
							valueInRange(B.Y, A.Y, A.Y + A.Height);

			return xOverlap && yOverlap;
		}

		public Rectange(int x, int y, int width, int height)
		{
			X = x; Y = y; Width = width; Height = height;
		}

		public static Rectange CreateFromHTMLElement(HTMLElement element)
		{
			if(element == null)
				return new Rectange();

			var obj = jQuery.Select(element);
			return new Rectange()
			{
				X = Global.ParseInt(obj.Css("left")),
				Y = Global.ParseInt(obj.Css("top")),
				Width = Global.ParseInt(obj.Css("width")),
				Height = Global.ParseInt(obj.Css("height"))
			};
		}
	}
}
