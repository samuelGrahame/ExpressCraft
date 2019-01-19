using static Retyped.dom;
using System;
using Bridge;

namespace ExpressCraft
{
    public class TextBlock
    {
        public string OriginalSource;
        public int MaxWidth;

        public float ComputedHeight;
        public int LinesComputed;

        public bool ElelemtsOverMax = false;
        public float MaxCalculatedWidth = 0;

        public TextBlock(string source, int maxWidth)
        {
            OriginalSource = source;
            MaxWidth = maxWidth;
        }

        public void ComputeString()
        {
            ElelemtsOverMax = false;
            string[] Lines = OriginalSource.Split(new char[] { '\r', '\n' });

            double sizePerChar = ExControl.GetTextWidth("M", Settings.DefaultFont);

            LinesComputed = 0;

            for(int i = 0; i < Lines.Length; i++)
            {
                string line = Lines[i];

                double lineWidth = ExControl.GetTextWidth(OriginalSource, Settings.DefaultFont);

                if(lineWidth > MaxWidth)
                {
                    ElelemtsOverMax = true;
                    MaxCalculatedWidth = MaxWidth;
                    int yy = 0;
                    for(int x = 0; x < line.Length; x++)
                    {
                        yy++;

                        if(yy * sizePerChar > MaxWidth)
                        {
                            LinesComputed++;
                            yy = 0;
                        }
                    }

                    if(yy > 0)
                    {
                        LinesComputed++;
                    }
                }
                else
                {
                    LinesComputed++;
                    if(lineWidth > MaxCalculatedWidth)
                    {
                        MaxCalculatedWidth = (float)lineWidth;
                    }
                }
            }
            ComputedHeight = GetFontSize(Settings.DefaultFont) * LinesComputed;
        }

        public float GetFontSize(string fontWithSize)
        {
            string[] strs = fontWithSize.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

            for(int i = 0; i < strs.Length; i++)
            {
                if(strs[i].EndsWith("pt"))
                {
                    return (float)Script.ParseFloat(strs[i]) * 1.333333F;
                }
                else if(strs[i].EndsWith("px"))
                {
                    return (float)Script.ParseFloat(strs[i]);
                }
            }

            return 8.25F * 1.333333F;
        }
    }
}