using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

namespace ExpressCraft
{
	public abstract class GridViewCellDisplay
	{
		public bool UseDefaultElement;

		public virtual HTMLDivElement OnCreate(GridView gridView, int dataRowIndex, int columnIndex)
		{
			return null;
		}

		public virtual HTMLDivElement OnCreateDefault(HTMLDivElement originalElement, GridView gridView, int dataRowIndex, int columnIndex)
		{
			return originalElement;
		}
	}
}
