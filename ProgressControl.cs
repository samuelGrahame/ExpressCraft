﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge;
using Bridge.Html5;

namespace ExpressCraft
{
	public class ProgressControl : Control
	{
		private int position;

		private HTMLDivElement internalProgressControl;

		private int maximum;

		public int Step = 1;

		public bool DisableUpdate = false;

		public void NextStep()
		{
			Position += Step;
		}

		public int Maximum
		{
			get { return maximum; }
			set {
				if(value < 1)
					value = 1;
				if(value < position)
					position = value;
				maximum = value;
				if(!DisableUpdate)
					Update();
			}
		}

		public int Position
		{
			get { return position; }
			set {
				if(value < 0)
					value = 0;
				else if(value > maximum)
					value = maximum;
				position = value;
				if(!DisableUpdate)
					Update();
			}
		}

		public ProgressControl() : base("progressbar")
		{
			internalProgressControl = Div("progressbarbody");
		}

		public override void Render()
		{
			base.Render();

			Content.AppendChild(internalProgressControl);

			Update();
		}

		public void Update()
		{
			if(DisableUpdate || internalProgressControl == null)
				return;
			if(maximum == 0 || position == 0)
				internalProgressControl.Style.Width = "0%";
			else
			{
				string source = Script.Write<string>("this.position / this.maximum * 100.00 + '%';");				
				internalProgressControl.Style.Width = "calc(" + source + " - 2px)"; 
			}
		}
	}
}
