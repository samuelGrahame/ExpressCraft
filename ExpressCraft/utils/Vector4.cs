using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge;

namespace ExpressCraft
{
	public struct Vector4
	{
		public Union<string, int, float> X;
		public Union<string, int, float> Y;
		public Union<string, int, float> Z;
		public Union<string, int, float> M;
		
		public Vector4(Union<string, int, float> x, Union<string, int, float> y, Union<string, int, float> z, Union<string, int, float> m)
		{            
            X = x;
			Y = y;
			Z = z;
			M = m;
		}
	}
}
