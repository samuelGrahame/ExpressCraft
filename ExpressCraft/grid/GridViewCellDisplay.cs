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

		public virtual HTMLElement OnCreate(GridView gridView, int dataRowIndex, int columnIndex)
		{
			return null;
		}

		public virtual HTMLElement OnCreateDefault(HTMLElement originalElement, GridView gridView, int dataRowIndex, int columnIndex)
		{
			return originalElement;
		}
	}
}
