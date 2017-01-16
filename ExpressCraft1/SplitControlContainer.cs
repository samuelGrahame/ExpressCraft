using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExpressCraft
{
	public class SplitControlContainer : Control
	{
		public Control Panel1;
		public Control Panel2;
		public Control Splitter;

		private int splitterPosition;

		public int SplitterPosition
		{
			get { return splitterPosition; }
			set {
				splitterPosition = value;
				RenderControls();
			}
		}
		
		private bool horizontal;

		public bool Horizontal
		{
			get { return horizontal; }
			set {
				if(value != horizontal)
				{
					RenderControls();
					horizontal = value;
				}				
			}
		}

		public override void Render()
		{
			base.Render();

			RenderControls();
		}

		public SplitControlContainer()
		{

		}

		private void RenderControls()
		{

		}
	}
}
