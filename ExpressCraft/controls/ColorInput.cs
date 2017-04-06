using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
	public class ColorInput : TextInput
	{
		public ColorInput( ) : base(Bridge.Html5.InputType.Color)
		{

		}
	}
}
