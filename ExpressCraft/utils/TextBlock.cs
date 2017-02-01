using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

namespace ExpressCraft {
    public class TextBlock
    {
        public string OriginalSource;        
		public int MaxWidth;

		public float ComputedHeight;
		public int LinesComputed;
		public string ComputedSource;

		public bool ElelemtsOverMax = false;
		public float MaxCalculatedWidth = 0;

		public TextBlock(string source, int maxWidth) {
			OriginalSource = source;
			MaxWidth = maxWidth;
		}

		public void ComputeString()
		{
			ElelemtsOverMax = false;
			string[] Lines = OriginalSource.Split("\r\n");
			var builder = new StringBuilder();

			double sizePerChar = Control.GetTextWidth("M", Settings.DefaultFont);

			LinesComputed = 0;

			for(int i = 0; i < Lines.Length; i++)
			{
				string line = Lines[i];

				double lineWidth = Control.GetTextWidth(OriginalSource, Settings.DefaultFont);
				
				if(lineWidth > MaxWidth)
				{
					ElelemtsOverMax = true;
					MaxCalculatedWidth = MaxWidth;
					int yy = 0;
					var lineBuilder = new StringBuilder();
					for(int x = 0; x < line.Length; x++)
					{
						yy++;
						
						if(yy * sizePerChar > MaxWidth)
						{
							lineBuilder.Append(line[x]);

							builder.AppendLine(lineBuilder.ToString());
							lineBuilder = new StringBuilder();							
							LinesComputed++;
							yy = 0;
						}
						else{
							lineBuilder.Append(line[x]);							
						}
					}

					if(lineBuilder.Length > 0)
					{
						builder.AppendLine(lineBuilder.ToString());						
						LinesComputed++;
					}										
				}
				else
				{
					builder.AppendLine(line);
					LinesComputed++;
					if(lineWidth > MaxCalculatedWidth)
					{
						MaxCalculatedWidth = (float)lineWidth;
					}
				}
			}

			ComputedSource = builder.ToString();			
			ComputedHeight = GetFontSize(Settings.DefaultFont) * LinesComputed;			
		}

		public float GetFontSize(string fontWithSize)
		{
			string[] strs = fontWithSize.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

			for(int i = 0; i < strs.Length; i++)
			{
				if(strs[i].EndsWith("pt"))
				{
					return (float)Global.ParseFloat(strs[i]) * 1.333333F;
				}else if(strs[i].EndsWith("px"))
				{
					return (float)Global.ParseFloat(strs[i]);
				}
			}

			return 8.25F * 1.333333F;
		}
    }
}
