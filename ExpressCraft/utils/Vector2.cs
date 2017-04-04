using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge;

namespace ExpressCraft
{
	public struct Vector2
	{
		public Union<string, int, float> X;
		public Union<string, int, float> Y;
		
		public int Xi
		{
			get { return (int)X; }
			set { X = value; }
		}

		public int Yi
		{
			get { return (int)Y; }
			set { Y = value; }
		}

		public float Xf
		{
			get { return (float)X; }
			set { X = value; }
		}

		public float Yf
		{
			get { return (float)Y; }
			set { Y = value; }
		}

		public Vector2(Union<string, int, float> x, Union<string, int, float> y)
		{
			X = x;
			Y = y;
		}
	}
}
