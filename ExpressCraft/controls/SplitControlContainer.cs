using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

namespace ExpressCraft
{
	public class SplitControlContainer : Control
	{
		public Control Panel1;
		public Control Panel2;
		public Control Splitter;

		private ClientRect _prevClientRect = null;
		private bool IsMouseDown = false;
		private Vector2 _mouseDownVector;
		private Vector2 _currentMouseDownVector;
		private int _startingSplitterPos;		
		private int _splitterPosition = -1;		

		private FixedSplitterPosition fixedSplitterPostion = FixedSplitterPosition.Panel1;
		public FixedSplitterPosition FixedSplitterPostion
		{
			get { return fixedSplitterPostion; }
			set {
				fixedSplitterPostion = value;
				RenderControls();
			}
		}

		public bool SplitterResizable = true;

		public int SplitterPosition
		{
			get { return _splitterPosition; }
			set {
				if(value < 0)
					value = 0;				
				_splitterPosition = value;
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

		private void ResizeChildren()
		{			
			if(this.LinkedForm != null && this.Content != null)
			{
				this.LinkedForm.ResizeChildren(this.Content);				
			}
		}
		
		public SplitControlContainer() : base("splitcontrol")
		{
			Panel1 = new Control() { Location = new Vector2(0, 0) };
			Panel2 = new Control();
			Splitter = new Control();
			
			Splitter.Content.OnMouseDown = (ev) =>
			{
				if(!SplitterResizable)
					return;
				IsMouseDown = true;
				_mouseDownVector = Helper.GetClientMouseLocation(ev);
				var maxSize = GetMaxSplitterSize();
				_startingSplitterPos = _splitterPosition > maxSize ? maxSize : _splitterPosition;				
				ev.StopImmediatePropagation();
			};								

			OnResize = (ev) =>
			{
				if(this.LinkedForm != null)
				{
					if(!this.LinkedForm.IsVisible())
					{
						return;
					}
				}
				var clientRec = this.Content.GetBoundingClientRect();

				if(_prevClientRect == null)
				{
					_prevClientRect = clientRec;
				}

				if(fixedSplitterPostion == FixedSplitterPosition.None)
				{
					double V1 = 0;
					double V2 = 0;
					bool dirty = false;

					if(Horizontal)
					{
						if(clientRec.Height != _prevClientRect.Height)
						{
							V1 = clientRec.Height;
							V2 = _prevClientRect.Height;
							dirty = true;
						}
					}
					else
					{
						if(clientRec.Width != _prevClientRect.Width)
						{
							V1 = clientRec.Width;
							V2 = _prevClientRect.Width;
							dirty = true;
						}
					}
					if(dirty)
					{						
						SplitterPosition = V1 == 0 || V2 == 0 ? 0 : (int)(SplitterPosition * (V1 / V2));
					}
				}

				_prevClientRect = clientRec;
				
				RenderControls();

				ResizeChildren();
			};

			Content.OnMouseMove = (ev) =>
			{
				if(IsMouseDown)
				{					
					_currentMouseDownVector = Helper.GetClientMouseLocation(ev);
					int x;
					int m = horizontal ? (_mouseDownVector.Yi - _currentMouseDownVector.Yi) : (_mouseDownVector.Xi - _currentMouseDownVector.Xi);					
					
					var y = GetMaxSplitterSize();
					if((x = fixedSplitterPostion == FixedSplitterPosition.Panel2 ? _startingSplitterPos + m : _startingSplitterPos - m)
						> y)
					{
						x = y;
					}
					SplitterPosition = x;
					_currentMouseDownVector = _mouseDownVector;

					ResizeChildren();
				}
			};

			Content.OnMouseUp = (ev) =>
			{
				IsMouseDown = false;
				RenderControls();
			};

			this.AppendChildren(Panel1, Splitter, Panel2);
		}		

		private int GetMaxSplitterSize()
		{
			var maxSize = (int)(Horizontal ? this.Content.GetBoundingClientRect().Height : this.Content.GetBoundingClientRect().Width) - 12;
			if(maxSize < 0)
				maxSize = 0;
			return maxSize;
		}

		private void RenderControls()
		{
			var sp = SplitterPosition;
			var maxSize = GetMaxSplitterSize();

			if(_prevClientRect != null)
			{
				if(sp > maxSize)
				{
					sp = maxSize;
				}
			}			

			if(Horizontal)
			{
				Panel1.ExchangeClass("splitvertical", "splithorizontal");
				Panel2.ExchangeClass("splitvertical", "splithorizontal");
				Splitter.ExchangeClass("splittervertical", "splitterhorizontal");

				Panel1.Width = "";
				Splitter.Width = "";
				Panel2.Width = "";
				
				if(fixedSplitterPostion != FixedSplitterPosition.Panel2)
				{
					Splitter.Location = new Vector2(0, sp);

					Panel1.Height = sp;				
					Panel2.Location = new Vector2(0, sp + 12);
					Panel2.Height = "calc(100% - " + (sp + 12) + "px)"; ;
				}
				else
				{					
					Splitter.Location = new Vector2(0, "calc(100% - " + sp + "px)");

					Panel1.Height = "calc(100% - " + sp + "px)";

					Panel2.Height = sp;
					Panel2.Location = new Vector2(0, "calc(100% - " + (sp + 12) + "px)");
				}
			}
			else
			{
				Panel1.ExchangeClass("splithorizontal", "splitvertical");
				Panel2.ExchangeClass("splithorizontal", "splitvertical");
				Splitter.ExchangeClass("splitterhorizontal", "splittervertical");
				
				Panel1.Height = "";
				Splitter.Height = "";
				Panel2.Height = "";

				if(fixedSplitterPostion != FixedSplitterPosition.Panel2)
				{
					Splitter.Location = new Vector2(sp, 0);

					Panel1.Width = sp;

					Panel2.Width = "calc(100% - " + (sp + 12) + "px)";
					Panel2.Location = new Vector2(sp + 12, 0);
				}
				else
				{
					Splitter.Location = new Vector2("calc(100% - " + sp + "px)", 0);

					Panel1.Width = "calc(100% - " + sp + "px)";

					Panel2.Width = sp;
					Panel2.Location = new Vector2("calc(100% - " + (sp + 12) + "px)", 0);
				}				
			}
		}
	}
}
