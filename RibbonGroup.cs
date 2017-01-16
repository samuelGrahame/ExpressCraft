using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge;
using Bridge.Html5;

namespace ExpressCraft
{
	[Namespace(true)]
	public class RibbonGroup : Control
	{
		public string Caption { get; set; }
		public List<RibbonButton> Buttons { get; set; }
		private bool enabled = true;

		private HTMLDivElement captionDiv = null;

		public bool Enabled
		{
			get
			{
				return enabled;
			}
			set
			{
				enabled = value;
				setEnabled(value);
			}
		}

		public void setEnabled(bool value)
		{			
			if(Buttons.Count > 0)
			{
				for(int i = 0; i < Buttons.Count; i++)
				{
					if(!value)
						Buttons[i].setEnabled(value);
					else
					{
						Buttons[i].setEnabled(Buttons[i].Enabled);
					}
				}
			}
			ChangeState(value);
			if(value)
			{				
				if(captionDiv != null)
				{
					captionDiv.ClassList.Remove("disabled");
				}
			}
			else
			{				
				if(captionDiv != null)
				{
					captionDiv.ClassList.Add("disabled");
				}
			}
		}

		public RibbonGroup(string _caption = "") : base("ribbongroup")
		{
			Caption = _caption;
			Buttons = new List<RibbonButton>();
		}

		public RibbonGroup(string _caption, params RibbonButton[] buttons) : base("ribbongroup")
		{
			Caption = _caption;
			Buttons = new List<RibbonButton>();
			if(buttons !=null)
				Buttons.AddRange(buttons);
		}

		private HTMLDivElement CreateVerticalLine(int height)
		{
			var htmlDiv = Div("ribbonseperator");
			if(height != 58)
			{
				htmlDiv.Style.Height = height + "px";
			}			

			return htmlDiv;
		}

		public class RenderInfo
		{
			public int Left;
			public int Width;

			public bool IsSmall = false;
			
			public RibbonButton FirstButton;
			public RibbonButton SecondButton;
			public RibbonButton ThirdButton;

			public bool BeginGroup = false;
		}

		public List<RenderInfo> riList = null;

		public void GenerateRList()
		{

			RenderInfo ri = null;
			
			if(riList == null)
			{
				riList = new List<RenderInfo>();
				for(int i = 0; i < Buttons.Count; i++)
				{
					if(ri == null)
					{
						ri = new RenderInfo();
						ri.FirstButton = Buttons[i];
						ri.IsSmall = ri.FirstButton.IsSmallCaption;
					}
					else
					{
						if(ri.IsSmall != Buttons[i].IsSmallCaption || Buttons[i].BeginGroup || !Buttons[i].IsSmallCaption || (ri.FirstButton != null && ri.SecondButton != null && ri.ThirdButton != null))
						{							
							riList.Add(ri);

							ri = new RenderInfo();
							ri.FirstButton = Buttons[i];
							ri.IsSmall = Buttons[i].IsSmallCaption;
							ri.BeginGroup = Buttons[i].BeginGroup;
						}
						else
						{
							if(ri.SecondButton == null)
							{
								ri.SecondButton = Buttons[i];
							}
							else
							{
								ri.ThirdButton = Buttons[i];
							}
						}
					}
				}

				if(ri != null)
				{
					riList.Add(ri);
					ri = null;
				}
			}			
		}

		public override void Render()
		{
			HasRendered = true;
			if(Buttons == null || Buttons.Count == 0)
				return;

			GenerateRList();

			int width = 0;

			for(int i = 0; i < riList.Count; i++)
			{
				var ri = riList[i];

				if(ri.BeginGroup)
				{
					width += 3;
					var vlbg = CreateVerticalLine(58);
					vlbg.Style.Left = width + "px";

					Content.AppendChild(vlbg);
				}

				width += 3;

				if(ri.IsSmall)
				{
					int MaxWidth;

					if(ri.ThirdButton == null)
					{
						if (ri.SecondButton == null)
						{
							MaxWidth = Math.Max((int)GetTextWidth(ri.FirstButton.Caption, Settings.DefaultFont) + 28 + 6, 64);
							
							ri.FirstButton.Render();

							ri.FirstButton.Content.Style.Left = width + "px";
							ri.FirstButton.Content.Style.Width = MaxWidth + "px";

							ri.FirstButton.Content.Style.Top = "26px";

							Content.AppendChild(ri.FirstButton);
							// 1
						}
						else
						{
							MaxWidth = Math.Max(Math.Max((int)GetTextWidth(ri.FirstButton.Caption, Settings.DefaultFont),
								(int)GetTextWidth(ri.SecondButton.Caption, Settings.DefaultFont)) + 28 + 6, 64);
							
							ri.FirstButton.Render();
							ri.SecondButton.Render();

							ri.FirstButton.Content.Style.Left = width + "px";
							ri.SecondButton.Content.Style.Left = width + "px";

							ri.FirstButton.Content.Style.Top = (((100 - 3) / 3) - 11) + "px";

							ri.FirstButton.Content.Style.Width = MaxWidth + "px";
							ri.SecondButton.Content.Style.Width = MaxWidth + "px";

							ri.FirstButton.Content.Style.Top = "11px";
							ri.SecondButton.Content.Style.Top = "41px";

							Content.AppendChild(ri.FirstButton);
							Content.AppendChild(ri.SecondButton);							
							// 2
						}
					}else
					{
						MaxWidth = Math.Max(Math.Max((int)GetTextWidth(ri.FirstButton.Caption, Settings.DefaultFont),
								(int)GetTextWidth(ri.SecondButton.Caption, Settings.DefaultFont), 
								(int)GetTextWidth(ri.ThirdButton.Caption, Settings.DefaultFont)) + 28 + 6, 64);
						
						ri.FirstButton.Render();
						ri.SecondButton.Render();
						ri.ThirdButton.Render();

						ri.FirstButton.Content.Style.Left = width + "px";
						ri.SecondButton.Content.Style.Left = width + "px";
						ri.ThirdButton.Content.Style.Left = width + "px";

						ri.FirstButton.Content.Style.Width = MaxWidth + "px";
						ri.SecondButton.Content.Style.Width = MaxWidth + "px";
						ri.ThirdButton.Content.Style.Width = MaxWidth + "px";

						ri.FirstButton.Content.Style.Top = "3px";
						ri.SecondButton.Content.Style.Top = "26px";
						ri.ThirdButton.Content.Style.Top = "49px";
						// 3

						Content.AppendChild(ri.FirstButton);
						Content.AppendChild(ri.SecondButton);
						Content.AppendChild(ri.ThirdButton);
					}

					width += MaxWidth;					
				}
				else
				{
					ri.FirstButton.Render();

					ri.FirstButton.Content.Style.Left = width + "px";
					int inwidth = 0;
					if(ri.FirstButton.Caption.Contains(" "))
					{
						var strings = ri.FirstButton.Caption.Split(" ");
						var builder = new StringBuilder();
						
						int length = ri.FirstButton.Caption.Length / 2;						

						for(int j = 0; j < strings.Length; j++)
						{
							if(builder.Length > length)
							{
								inwidth = (int)GetTextWidth(builder.ToString(), Settings.DefaultFont) + 20;
								break;
							}
							if(builder.Length > 0)
							{
								builder.Append(" " + strings[j]);
							}
							else
							{
								builder.Append(strings[j]);
							}
						}		
						if(inwidth == 0)
						{
							inwidth = (int)GetTextWidth(builder.ToString(), Settings.DefaultFont) + 20;
						}
					}
					else
					{
						inwidth = (int)GetTextWidth(ri.FirstButton.Caption, Settings.DefaultFont) + 20;
					}

					if(inwidth < 44)
					{
						inwidth = 44;
					}

					ri.FirstButton.Content.Style.Width = inwidth + "px";

					width += inwidth;

					Content.AppendChild(ri.FirstButton);
				}
			}
			
			int minWidth = (int)GetTextWidth(Caption, Settings.DefaultFont) + 20;

			if(width < minWidth)
				width = minWidth;

			width += 3;

			var vl = CreateVerticalLine(80);
			vl.Style.Left = width - 1 + "px";

			Content.AppendChild(vl);

			Content.Style.Width = width + "px";

			if(!string.IsNullOrWhiteSpace(Caption))
			{
				captionDiv = Div("ribbongroupcaption");

				captionDiv.InnerHTML = Caption;
				Content.AppendChild(captionDiv);
			}

			setEnabled(enabled);
		}
	}
}
