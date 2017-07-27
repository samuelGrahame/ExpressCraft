using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge;
using Bridge.Html5;
using Bridge.jQuery2;

namespace ExpressCraft
{
	[Namespace(true)]
	public class RibbonControl : Control, IPages
    {
		public List<RibbonPage> RibbonPages { get; set; } = new List<RibbonPage>();
		public string IconURL = "fav.ico";
		public readonly RibbonType Type;
        public HTMLDivElement ApplicationIcon = null;
        public Action<int, RibbonPage> OnSelectedPageChange = null;       

        public enum RibbonType
		{
			Full,
			Compact
		}

		public RibbonControl(RibbonType type = RibbonType.Full) : base("ribboncontrol" + (type == RibbonType.Full ? "" : " ribboncontrol-compact"))
		{
			Type = type;

            Content.OnContextMenu = (ev) => {
                ev.StopPropagation();
                ev.PreventDefault();
            };
        }

		public void AddRibbonPages(params RibbonPage[] pages)
		{
			if(pages != null)
				RibbonPages.AddRange(pages);
		}

		private int selectedindex = -1;
		public int SelectedIndex { get {
				return selectedindex;
			} set {
				if(value < 0)
					value = 0;
                if (selectedindex >= RibbonPages.Count)
                    selectedindex = RibbonPages.Count - 1;

                if (selectedindex != value)
                {
                    selectedindex = value;
                    if(OnSelectedPageChange != null)
                        OnSelectedPageChange(selectedindex, RibbonPages[selectedindex]);
                }
				SetSelectedIndex(value);
			}
		}

        public void MenuClick()
        {
            if(Helper.NotDesktop)
            {

            }
        }

		public void SetSelectedIndex(int index)
		{
			if(RibbonPages != null && RibbonPages.Count > 0)
			{				
				for(int i = 0; i < RibbonPages.Count; i++)
				{
					if(RibbonPages[i].RibbonHeader != null)
					{
						RibbonPages[i].RibbonHeader.ClassList.Remove("ribbonpageheader-hidden");
						RibbonPages[i].RibbonHeader.ClassList.Remove("ribbonpageheader-active");

						if(i == index)
						{
							RibbonPages[i].RibbonHeader.ClassList.Add("ribbonpageheader-active");
							RibbonPages[i].Content.Style.Visibility = Visibility.Inherit;
						}else
						{
							RibbonPages[i].RibbonHeader.ClassList.Add("ribbonpageheader-hidden");
							RibbonPages[i].Content.Style.Visibility = Visibility.Hidden;
						}
					}
				}
			}
		}

		public override void Render()
		{
			HasRendered = true;
			if(Type == RibbonType.Full)
			{
				if(ApplicationIcon != null)
					ApplicationIcon.Delete();
				ApplicationIcon = Div("application-icon");
				var appIconImage = Div("fav-icon");
				appIconImage.Style.Background = RibbonButton.GetImageStringURI(IconURL);
				appIconImage.Style.BackgroundSize = "100% 100%";

                ApplicationIcon.AppendChild(appIconImage);

				Content.AppendChild(ApplicationIcon);
			}			

			if(RibbonPages != null && RibbonPages.Count > 0)			
			{
				int width = 58;
				for(int i = 0; i < RibbonPages.Count; i++)
				{
					if(Content.Contains(RibbonPages[i]))
					{
						RibbonPages[i].Content.Delete();
						RibbonPages[i].RibbonHeader.Delete();
					}
					RibbonPages[i].Render();
					
					if(Type == RibbonType.Compact)
					{
						if(!RibbonPages[i].Content.ClassName.Contains("ribbonpage-compact"))
							RibbonPages[i].Content.ClassList.Add("ribbonpage-compact");
					}else
					{
						if(RibbonPages[i].Content.ClassName.Contains("ribbonpage-compact"))
							RibbonPages[i].Content.ClassList.Remove("ribbonpage-compact");
					}

					int index = i;

					if(i == selectedindex)
					{
						RibbonPages[i].RibbonHeader = Div("ribbonpageheader ribbonpageheader-active" + (Type == RibbonType.Full ? "" : " ribbonpageheader-compact"));
						RibbonPages[i].Content.Style.Visibility = Visibility.Visible;
					}else
					{
						RibbonPages[i].RibbonHeader = Div("ribbonpageheader ribbonpageheader-hidden" + (Type == RibbonType.Full ? "" : " ribbonpageheader-compact"));
						RibbonPages[i].Content.Style.Visibility = Visibility.Hidden;
					}

					RibbonPages[i].RibbonHeader.OnMouseDown = (ev) =>
					{
						SelectedIndex = index;
					};
					RibbonPages[i].RibbonHeader.OnTouchStart = (ev) =>
					{
						SelectedIndex = index;
					};

					RibbonPages[i].RibbonHeader.InnerHTML = RibbonPages[i].Caption;

					int inwidth = 24;

					if(!string.IsNullOrEmpty(RibbonPages[i].Caption))
					{
						inwidth += (int)GetTextWidth(RibbonPages[i].Caption, Settings.DefaultFont);
					}

					RibbonPages[i].RibbonHeader.Style.Left = width + "px";
					RibbonPages[i].RibbonHeader.Style.Width = inwidth + "px";

					Content.AppendChild(RibbonPages[i].RibbonHeader);
					Content.AppendChild(RibbonPages[i]);

					width += inwidth;
				}				
			}
            SelectedIndex = selectedindex;
		}
	}
}
